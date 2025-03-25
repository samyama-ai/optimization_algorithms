# Optimization Algorithms Documentation

Welcome to the comprehensive documentation for the BMR and BWR optimization algorithms package.

## Contents

1. [Introduction](introduction.md)
2. [Installation Guide](installation.md)
3. [Algorithm Documentation](algorithms/index.md)
   - [BMR Algorithm](algorithms/bmr.md)
   - [BWR Algorithm](algorithms/bwr.md)
4. [API Reference](api/index.md)
5. [Examples](examples/index.md)
6. [Testing](testing.md)
7. [Contributing](contributing.md)

## Quick Start

```python
import numpy as np
from rao_algorithms import run_optimization, BMR_algorithm, objective_function

# Define the bounds for a 2D problem
bounds = np.array([[-100, 100]] * 2)

# Set parameters
num_iterations = 100
population_size = 50
num_variables = 2

# Run the BMR algorithm
best_solution, best_scores = BMR_algorithm(
    bounds, 
    num_iterations, 
    population_size, 
    num_variables, 
    objective_function
)
print(f"Best solution found: {best_solution}")
```

## Project Overview

This package implements two simple yet powerful optimization algorithms:
- **BMR (Best-Mean-Random) Algorithm**
- **BWR (Best-Worst-Random) Algorithm**

These algorithms are designed to solve both **constrained** and **unconstrained** optimization problems without relying on metaphors or algorithm-specific parameters.

For detailed documentation, please navigate through the sections above.
