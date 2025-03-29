const algorithmData = [
  {
    id: "bmr",
    name: "BMR (Best-Mean-Random) Algorithm",
    shortName: "BMR",
    description: "The BMR algorithm is a simple, metaphor-free optimization algorithm that uses the best solution, mean solution, and a random solution to guide the search process. It is designed to solve both constrained and unconstrained optimization problems efficiently.",
    paperTitle: "BMR and BWR: Two simple metaphor-free optimization algorithms for solving real-life non-convex constrained and unconstrained problems",
    authors: "Ravipudi Venkata Rao and Ravikumar Shah",
    year: "2024",
    journal: "arXiv:2407.11149v2",
    link: "https://arxiv.org/abs/2407.11149",
    pseudocode: `Initialize population randomly within bounds
For each iteration:
  Evaluate fitness of all solutions
  Identify best solution and calculate mean solution
  For each solution:
    r1, r2, r3, r4 = random numbers between 0 and 1
    T = random choice between 1 and 2
    If r4 > 0.5:
      Update solution: solution += r1 * (best_solution - T * mean_solution) + r2 * (best_solution - random_solution)
    Else:
      Perform random exploration
  Clip solutions to stay within bounds
Return best solution found`,
    category: "Metaphor-free",
    parameters: "No algorithm-specific parameters",
    applications: ["Engineering design", "Manufacturing optimization", "Resource allocation"]
  },
  {
    id: "bwr",
    name: "BWR (Best-Worst-Random) Algorithm",
    shortName: "BWR",
    description: "The BWR algorithm is a simple, metaphor-free optimization algorithm that uses the best solution, worst solution, and a random solution to guide the search process. It effectively balances exploration and exploitation for both constrained and unconstrained optimization problems.",
    paperTitle: "BMR and BWR: Two simple metaphor-free optimization algorithms for solving real-life non-convex constrained and unconstrained problems",
    authors: "Ravipudi Venkata Rao and Ravikumar Shah",
    year: "2024",
    journal: "arXiv:2407.11149v2",
    link: "https://arxiv.org/abs/2407.11149",
    pseudocode: `Initialize population randomly within bounds
For each iteration:
  Evaluate fitness of all solutions
  Identify best solution and worst solution
  For each solution:
    r1, r2, r3, r4 = random numbers between 0 and 1
    T = random choice between 1 and 2
    If r4 > 0.5:
      Update solution: solution += r1 * (best_solution - T * random_solution) - r2 * (worst_solution - random_solution)
    Else:
      Perform random exploration
  Clip solutions to stay within bounds
Return best solution found`,
    category: "Metaphor-free",
    parameters: "No algorithm-specific parameters",
    applications: ["Engineering design", "Manufacturing optimization", "Resource allocation"]
  },
  {
    id: "jaya",
    name: "Jaya Algorithm",
    shortName: "Jaya",
    description: "Jaya is a simple, parameter-free optimization algorithm that always tries to move toward the best solution and away from the worst solution. The name 'Jaya' means 'victory' in Sanskrit, symbolizing the algorithm's tendency to move towards success and away from failure.",
    paperTitle: "Jaya: A simple and new optimization algorithm for solving constrained and unconstrained optimization problems",
    authors: "R.V. Rao",
    year: "2016",
    journal: "International Journal of Industrial Engineering Computations, 7(1), 19-34",
    link: "https://doi.org/10.5267/j.ijiec.2015.8.004",
    pseudocode: `Initialize population randomly within bounds
For each iteration:
  Evaluate fitness of all solutions
  Identify best solution and worst solution
  For each solution:
    r1, r2 = random vectors between 0 and 1
    Update solution: solution += r1 * (best_solution - |solution|) - r2 * (worst_solution - |solution|)
  Clip solutions to stay within bounds
Return best solution found`,
    category: "Metaphor-free",
    parameters: "No algorithm-specific parameters",
    applications: ["Mechanical design", "Thermal system design", "Manufacturing process optimization"]
  },
  {
    id: "rao1",
    name: "Rao-1 Algorithm",
    shortName: "Rao-1",
    description: "Rao-1 is a simple, metaphor-free optimization algorithm that uses the best solution to guide the search. It employs a comparison-based approach with another randomly selected solution to determine the update direction.",
    paperTitle: "Rao algorithms: Three metaphor-less simple algorithms for solving optimization problems",
    authors: "R.V. Rao",
    year: "2020",
    journal: "International Journal of Industrial Engineering Computations, 11(2), 193-212",
    link: "https://doi.org/10.5267/j.ijiec.2019.8.003",
    pseudocode: `Initialize population randomly within bounds
For each iteration:
  Evaluate fitness of all solutions
  Identify best solution
  For each solution:
    r = random number between 0 and 1
    Randomly select another solution
    If current solution is worse than random solution:
      Update solution: solution += r * (best_solution - |solution|) + r * (random_solution - |solution|)
    Else:
      Update solution: solution += r * (best_solution - |solution|) - r * (random_solution - |solution|)
  Clip solutions to stay within bounds
Return best solution found`,
    category: "Metaphor-free",
    parameters: "No algorithm-specific parameters",
    applications: ["Engineering design", "Manufacturing optimization", "Resource allocation"]
  },
  {
    id: "rao2",
    name: "Rao-2 Algorithm",
    shortName: "Rao-2",
    description: "Rao-2 is a simple, metaphor-free optimization algorithm that uses the best and worst solutions to guide the search. It employs a comparison-based approach with another randomly selected solution to determine the update direction.",
    paperTitle: "Rao algorithms: Three metaphor-less simple algorithms for solving optimization problems",
    authors: "R.V. Rao",
    year: "2020",
    journal: "International Journal of Industrial Engineering Computations, 11(2), 193-212",
    link: "https://doi.org/10.5267/j.ijiec.2019.8.003",
    pseudocode: `Initialize population randomly within bounds
For each iteration:
  Evaluate fitness of all solutions
  Identify best solution and worst solution
  For each solution:
    r = random number between 0 and 1
    Randomly select another solution
    If current solution is worse than random solution:
      Update solution: solution += r * (best_solution - |solution|) - r * (worst_solution - |solution|) + r * (random_solution - |solution|)
    Else:
      Update solution: solution += r * (best_solution - |solution|) - r * (worst_solution - |solution|) - r * (random_solution - |solution|)
  Clip solutions to stay within bounds
Return best solution found`,
    category: "Metaphor-free",
    parameters: "No algorithm-specific parameters",
    applications: ["Engineering design", "Manufacturing optimization", "Resource allocation"]
  },
  {
    id: "rao3",
    name: "Rao-3 Algorithm",
    shortName: "Rao-3",
    description: "Rao-3 is a simple, metaphor-free optimization algorithm that uses the best solution and a phase factor to guide the search. It introduces a phase factor that depends on the current iteration to balance exploration and exploitation.",
    paperTitle: "Rao algorithms: Three metaphor-less simple algorithms for solving optimization problems",
    authors: "R.V. Rao",
    year: "2020",
    journal: "International Journal of Industrial Engineering Computations, 11(2), 193-212",
    link: "https://doi.org/10.5267/j.ijiec.2019.8.003",
    pseudocode: `Initialize population randomly within bounds
For each iteration:
  Evaluate fitness of all solutions
  Identify best solution
  Calculate phase factor = (1 - current_iteration/max_iterations)
  For each solution:
    r = random number between 0 and 1
    Update solution: solution += r * (best_solution - phase_factor * |solution|)
  Clip solutions to stay within bounds
Return best solution found`,
    category: "Metaphor-free",
    parameters: "No algorithm-specific parameters",
    applications: ["Engineering design", "Manufacturing optimization", "Resource allocation"]
  },
  {
    id: "tlbo",
    name: "Teaching-Learning-Based Optimization (TLBO) Algorithm",
    shortName: "TLBO",
    description: "TLBO is a parameter-free algorithm inspired by the teaching-learning process in a classroom. It consists of two phases: Teacher Phase (learning from the teacher) and Learner Phase (learning through interaction between learners).",
    paperTitle: "Teaching-Learning-Based Optimization: An optimization method for continuous non-linear large scale problems",
    authors: "R.V. Rao, V.J. Savsani, D.P. Vakharia",
    year: "2012",
    journal: "Information Sciences, 183(1), 1-15",
    link: "https://doi.org/10.1016/j.ins.2011.08.006",
    pseudocode: `Initialize population randomly within bounds
For each iteration:
  // Teacher Phase
  Evaluate fitness of all solutions
  Identify best solution (teacher)
  Calculate mean of each design variable
  For each solution:
    Teaching factor = random choice between 1 and 2
    Update solution based on difference between mean and teacher
  
  // Learner Phase
  For each solution:
    Randomly select another solution
    If current solution is better than selected solution:
      Move current solution towards selected solution
    Else:
      Move current solution away from selected solution
  
  Clip solutions to stay within bounds
Return best solution found`,
    category: "Teaching-Learning",
    parameters: "No algorithm-specific parameters",
    applications: ["Mechanical design", "Thermal system design", "Manufacturing process optimization", "Structural optimization"]
  },
  {
    id: "qojaya",
    name: "Quasi-Oppositional Jaya (QOJAYA) Algorithm",
    shortName: "QOJAYA",
    description: "QOJAYA enhances the standard Jaya algorithm by incorporating quasi-oppositional learning to improve convergence speed and solution quality. It uses the concept of quasi-opposite points to enhance the diversity of the population.",
    paperTitle: "Jaya: An Advanced Optimization Algorithm and its Engineering Applications",
    authors: "R.V. Rao",
    year: "2019",
    journal: "Springer International Publishing",
    link: "https://doi.org/10.1007/978-3-030-31503-0",
    pseudocode: `Initialize population randomly within bounds
Generate quasi-opposite population
Combine and select best solutions
For each iteration:
  Evaluate fitness of all solutions
  Identify best solution and worst solution
  For each solution:
    r1, r2 = random vectors between 0 and 1
    Update solution: solution += r1 * (best_solution - |solution|) - r2 * (worst_solution - |solution|)
  Generate quasi-opposite solutions for a portion of the population
  Combine and select best solutions
  Clip solutions to stay within bounds
Return best solution found`,
    category: "Opposition-based",
    parameters: "Jumping rate (probability of applying quasi-opposition)",
    applications: ["Welding process optimization", "Manufacturing process optimization", "Engineering design"]
  },
  {
    id: "tlbo_elitism",
    name: "TLBO with Elitism Algorithm",
    shortName: "TLBO-Elitism",
    description: "This version of TLBO incorporates elitism to preserve the best solutions across generations, improving convergence and solution quality. It ensures that the best solutions are not lost during the optimization process.",
    paperTitle: "Improved teaching-learning-based optimization algorithm for solving unconstrained optimization problems",
    authors: "R.V. Rao, V. Patel",
    year: "2013",
    journal: "Scientia Iranica, 20(3), 710-720",
    link: "https://doi.org/10.1016/j.scient.2012.12.005",
    pseudocode: `Initialize population randomly within bounds
For each iteration:
  // Teacher Phase
  Evaluate fitness of all solutions
  Identify best solution (teacher)
  Calculate mean of each design variable
  For each solution:
    Teaching factor = random choice between 1 and 2
    Generate new solution based on difference between mean and teacher
    Accept new solution if better
  
  // Learner Phase
  For each solution:
    Randomly select another solution
    Generate new solution based on comparison
    Accept new solution if better
  
  // Elitism
  Combine original and new populations
  Select best solutions for next generation
  
  Clip solutions to stay within bounds
Return best solution found`,
    category: "Teaching-Learning",
    parameters: "No algorithm-specific parameters",
    applications: ["Mechanical design", "Thermal system design", "Manufacturing process optimization", "Structural optimization"]
  },
  {
    id: "jcro",
    name: "Jaya-based Chemical Reaction Optimization (JCRO) Algorithm",
    shortName: "JCRO",
    description: "JCRO is a hybrid algorithm combining Jaya with Chemical Reaction Optimization principles for enhanced exploration and exploitation balance. It uses different types of chemical reactions to diversify the search process.",
    paperTitle: "Optimization of welding processes using quasi-oppositional-based Jaya algorithm",
    authors: "R.V. Rao, D.P. Rai",
    year: "2017",
    journal: "Journal of Mechanical Science and Technology, 31(5), 2513-2525",
    link: "https://doi.org/10.1007/s12206-017-0454-0",
    pseudocode: `Initialize population randomly within bounds
For each iteration:
  Evaluate fitness of all solutions
  Identify best solution and worst solution
  For each solution:
    Randomly select a reaction type (synthesis, decomposition, displacement, redox)
    Based on reaction type:
      Synthesis: Combine two solutions to form a new one
      Decomposition: Split a solution into two new ones
      Displacement: Modify a solution using Jaya principles
      Redox: Apply both Jaya and opposition-based learning
  Select best solutions for next generation
  Clip solutions to stay within bounds
Return best solution found`,
    category: "Hybrid",
    parameters: "Reaction type probabilities",
    applications: ["Welding process optimization", "Manufacturing process optimization", "Engineering design"]
  },
  {
    id: "gotlbo",
    name: "Generalized Oppositional Teaching-Learning-Based Optimization (GOTLBO) Algorithm",
    shortName: "GOTLBO",
    description: "GOTLBO incorporates oppositional-based learning into TLBO for faster convergence and better exploration. It uses the concept of opposite points to enhance the diversity of the population in both teacher and learner phases.",
    paperTitle: "An improved teaching-learning-based optimization algorithm for solving unconstrained optimization problems",
    authors: "R.V. Rao, V. Patel",
    year: "2014",
    journal: "Scientia Iranica, 21(3), 670-688",
    link: "https://doi.org/10.1016/j.scient.2013.09.007",
    pseudocode: `Initialize population randomly within bounds
Generate opposite population
Combine and select best solutions
For each iteration:
  // Teacher Phase with Opposition
  Evaluate fitness of all solutions
  Identify best solution (teacher)
  Calculate mean of each design variable
  For each solution:
    Teaching factor = random choice between 1 and 2
    Generate new solution based on difference between mean and teacher
    Generate opposite solution with some probability
    Select better solution
  
  // Learner Phase with Opposition
  For each solution:
    Randomly select another solution
    Generate new solution based on comparison
    Generate opposite solution with some probability
    Select better solution
  
  Clip solutions to stay within bounds
Return best solution found`,
    category: "Opposition-based",
    parameters: "Jumping rate (probability of applying opposition)",
    applications: ["Mechanical design", "Thermal system design", "Manufacturing process optimization", "Structural optimization"]
  },
  {
    id: "itlbo",
    name: "Improved Teaching-Learning-Based Optimization (ITLBO) Algorithm",
    shortName: "ITLBO",
    description: "ITLBO enhances TLBO by modifying the teacher phase and learner phase for better convergence and solution quality. It introduces adaptive teaching factor and modified update equations.",
    paperTitle: "An elitist teaching-learning-based optimization algorithm for solving complex constrained optimization problems",
    authors: "R.V. Rao, V. Patel",
    year: "2013",
    journal: "International Journal of Industrial Engineering Computations, 4(1), 1-14",
    link: "https://doi.org/10.5267/j.ijiec.2012.09.001",
    pseudocode: `Initialize population randomly within bounds
For each iteration:
  // Modified Teacher Phase
  Evaluate fitness of all solutions
  Identify best solution (teacher)
  Calculate mean of each design variable
  For each solution:
    Calculate adaptive teaching factor based on fitness
    Generate new solution with modified update equation
    Accept new solution if better
  
  // Modified Learner Phase
  For each solution:
    Randomly select another solution
    Generate new solution with modified update equation
    Accept new solution if better
  
  // Elitism
  Preserve best solutions for next generation
  
  Clip solutions to stay within bounds
Return best solution found`,
    category: "Teaching-Learning",
    parameters: "No algorithm-specific parameters",
    applications: ["Mechanical design", "Thermal system design", "Manufacturing process optimization", "Structural optimization"]
  },
  {
    id: "mo_tlbo",
    name: "Multi-objective Teaching-Learning-Based Optimization (MO-TLBO) Algorithm",
    shortName: "MO-TLBO",
    description: "MO-TLBO extends TLBO to handle multi-objective optimization problems using Pareto dominance and crowding distance for selection. It maintains an external archive of non-dominated solutions.",
    paperTitle: "Multi-objective TLBO algorithm for optimization of modern machining processes",
    authors: "R.V. Rao, V.D. Kalyankar",
    year: "2013",
    journal: "Advances in Manufacturing, 1(1), 1-9",
    link: "https://doi.org/10.1007/s40436-013-0007-4",
    pseudocode: `Initialize population randomly within bounds
Initialize empty external archive
For each iteration:
  // Teacher Phase for Multi-objective
  Evaluate all objectives for all solutions
  Update external archive with non-dominated solutions
  Identify teacher for each objective
  For each solution:
    Generate new solution based on teachers
    Evaluate dominance and update if better
  
  // Learner Phase for Multi-objective
  For each solution:
    Randomly select another solution
    Generate new solution based on dominance comparison
    Evaluate dominance and update if better
  
  Update external archive
  Apply crowding distance sorting if archive exceeds limit
  
  Clip solutions to stay within bounds
Return Pareto front from external archive`,
    category: "Multi-objective",
    parameters: "Archive size",
    applications: ["Machining process optimization", "Engineering design with multiple objectives", "Multi-criteria decision making"]
  }
];

export default algorithmData;
