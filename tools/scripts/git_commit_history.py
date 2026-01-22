#!/usr/bin/env python
"""
Script to extract Git commit history and save it to a CSV file.
Includes commit hash, author, date, and commit message.
"""

import os
import csv
import argparse
import subprocess
from datetime import datetime
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

def get_git_commit_history(repo_path=None, since=None, until=None, author=None, max_count=None):
    """
    Get the git commit history for a repository.
    
    Args:
        repo_path (str): Path to the git repository. If None, uses current directory.
        since (str): Get commits more recent than this date (e.g., "2023-01-01")
        until (str): Get commits older than this date (e.g., "2023-12-31")
        author (str): Filter commits by author
        max_count (int): Maximum number of commits to retrieve
        
    Returns:
        list: List of dictionaries containing commit information
    """
    # Change to the repository directory if specified
    current_dir = os.getcwd()
    if repo_path:
        os.chdir(repo_path)
    
    try:
        # Construct the git log command
        git_cmd = ["git", "log", "--pretty=format:%H|%an|%ad|%s", "--date=iso"]
        
        if since:
            git_cmd.extend(["--since", since])
        if until:
            git_cmd.extend(["--until", until])
        if author:
            git_cmd.extend(["--author", author])
        if max_count:
            git_cmd.extend(["-n", str(max_count)])
        
        # Execute the git command
        logger.info(f"Executing command: {' '.join(git_cmd)}")
        result = subprocess.run(git_cmd, capture_output=True, text=True, check=True)
        
        # Process the output
        commits = []
        for line in result.stdout.strip().split("\n"):
            if line:
                parts = line.split("|", 3)
                if len(parts) == 4:
                    commit_hash, author, date_str, message = parts
                    # Parse the date string to a datetime object
                    try:
                        commit_date = datetime.fromisoformat(date_str.strip())
                        formatted_date = commit_date.strftime("%Y-%m-%d %H:%M:%S")
                    except ValueError:
                        formatted_date = date_str.strip()
                    
                    commits.append({
                        "hash": commit_hash,
                        "author": author,
                        "date": formatted_date,
                        "message": message
                    })
        
        return commits
    
    finally:
        # Return to the original directory
        os.chdir(current_dir)

def save_to_csv(commits, output_file):
    """
    Save the commit history to a CSV file.
    
    Args:
        commits (list): List of dictionaries containing commit information
        output_file (str): Path to the output CSV file
    """
    if not commits:
        logger.warning("No commits to save.")
        return
    
    try:
        with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ["hash", "author", "date", "message"]
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for commit in commits:
                writer.writerow(commit)
        
        logger.info(f"Successfully saved {len(commits)} commits to {output_file}")
    
    except Exception as e:
        logger.error(f"Error saving to CSV: {str(e)}")

def main():
    """Main function to parse arguments and execute the script."""
    parser = argparse.ArgumentParser(description="Extract Git commit history to CSV")
    parser.add_argument("--repo-path", help="Path to the git repository (default: current directory)")
    parser.add_argument("--output", default="git_commit_history.csv", help="Output CSV file path")
    parser.add_argument("--since", help="Get commits more recent than this date (e.g., 2023-01-01)")
    parser.add_argument("--until", help="Get commits older than this date (e.g., 2023-12-31)")
    parser.add_argument("--author", help="Filter commits by author")
    parser.add_argument("--max-count", type=int, help="Maximum number of commits to retrieve")
    
    args = parser.parse_args()
    
    try:
        logger.info(f"Retrieving git commit history...")
        commits = get_git_commit_history(
            repo_path=args.repo_path,
            since=args.since,
            until=args.until,
            author=args.author,
            max_count=args.max_count
        )
        
        logger.info(f"Found {len(commits)} commits")
        save_to_csv(commits, args.output)
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
