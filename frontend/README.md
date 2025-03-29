# Rao Optimization Algorithms Visualizer

An interactive web application for visualizing and exploring optimization algorithms developed by Prof. R.V. Rao.

## Overview

This frontend application provides a comprehensive visualization platform for understanding and comparing various optimization algorithms:

- **BMR (Best-Mean-Random) Algorithm**
- **BWR (Best-Worst-Random) Algorithm**
- **Jaya Algorithm**
- **Rao Algorithms (Rao-1, Rao-2, Rao-3)**
- **TLBO (Teaching-Learning-Based Optimization) Algorithm**
- **QOJAYA (Quasi-Oppositional Jaya) Algorithm**
- **GOTLBO (Generalized Oppositional TLBO) Algorithm**
- **ITLBO (Improved TLBO) Algorithm**
- **Multi-objective TLBO Algorithm**

## Features

- **Algorithm Exploration**: Detailed information about each algorithm, including pseudocode, paper references, and applications
- **Interactive Visualizations**: 2D contour plots, 3D surface plots, and optimization path visualizations
- **Algorithm Comparison**: Compare multiple algorithms on the same objective function
- **Step-by-Step Simulation**: Educational walkthrough of how each algorithm works
- **Research Papers**: Access to original research papers and proper citations

## Project Structure

```
frontend/
├── public/              # Public assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Main application pages
│   ├── utils/           # Utility functions and data
│   ├── algorithms/      # Algorithm implementations
│   ├── assets/          # Static assets (images, etc.)
│   ├── App.js           # Main application component
│   └── index.js         # Application entry point
└── package.json         # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VaidhyaMegha/optimization_algorithms.git
   cd optimization_algorithms/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

- **Home Page**: Overview of all available algorithms
- **Algorithm Page**: Detailed information and visualizations for a specific algorithm
- **Comparison Page**: Compare multiple algorithms on the same objective function
- **Papers Page**: Browse research papers related to the algorithms
- **About Page**: Information about the project and Prof. R.V. Rao's work

## Technologies Used

- React.js
- React Router
- React Bootstrap
- Chart.js
- Plotly.js
- MathJS
- KaTeX
- Three.js
- D3.js

## References

The algorithms implemented in this visualizer are based on the research work of Prof. R.V. Rao and his colleagues. For detailed information about each algorithm, please refer to the original research papers cited in the application.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
