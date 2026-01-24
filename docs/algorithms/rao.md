# Rao Algorithms

## Overview

The Rao algorithms are a family of three metaphor-less optimization algorithms developed by Prof. R.V. Rao in 2020. These algorithms (Rao-1, Rao-2, and Rao-3) are designed to be simple, effective, and free from any metaphorical inspiration, focusing purely on mathematical principles for optimization. They operate by moving the population towards the best solution and away from the worst solution, with variations in how they interact with other candidate solutions.

## Key Features

- **Metaphor-free**: Unlike many nature-inspired algorithms, Rao algorithms don't rely on metaphors from natural or physical processes.
- **Simple formulation**: All three algorithms have straightforward mathematical formulations.
- **Effective performance**: Despite their simplicity, these algorithms demonstrate competitive performance on various optimization problems.
- **No algorithm-specific parameters**: The algorithms don't require tuning of special parameters.

## Rao-1 Algorithm

The Rao-1 algorithm updates solutions based purely on the difference between the best and worst solutions in the population.

### Mathematical Formulation

For each candidate solution $X_{i}$ in the population at iteration $t$, the new solution $X'_{i}$ is calculated as:

$$X'_{i,j} = X_{i,j} + r_1 \cdot (X_{best,j} - X_{worst,j})$$

Where:
- $X'_{i,j}$ is the new value of the $j$-th variable for the $i$-th candidate.
- $X_{i,j}$ is the current value of the $j$-th variable for the $i$-th candidate.
- $X_{best,j}$ is the value of the $j$-th variable for the best solution in the population.
- $X_{worst,j}$ is the value of the $j$-th variable for the worst solution in the population.
- $r_1$ is a random number between 0 and 1.

## Rao-2 Algorithm

The Rao-2 algorithm incorporates the best and worst solutions, but also adds a term for random interaction between the candidate solution and another randomly selected solution from the population.

### Mathematical Formulation

For each candidate solution $X_{i}$, randomly select another solution $X_{k}$ (where $i \neq k$).

If $f(X_i) < f(X_k)$ (i.e., $X_i$ is better):
$$X'_{i,j} = X_{i,j} + r_1 \cdot (X_{best,j} - X_{worst,j}) + r_2 \cdot ( |X_{i,j}| - |X_{k,j}| )$$ 

If $f(X_i) \geq f(X_k)$ (i.e., $X_i$ is worse or equal):
$$X'_{i,j} = X_{i,j} + r_1 \cdot (X_{best,j} - X_{worst,j}) + r_2 \cdot ( |X_{k,j}| - |X_{i,j}| )$$ 

Where:
- $r_1, r_2$ are random numbers between 0 and 1.
- $|X|$ denotes the absolute value.

## Rao-3 Algorithm

The Rao-3 algorithm is similar to Rao-2 but modifies the interaction term to be less restrictive with absolute values, enhancing exploration.

### Mathematical Formulation

For each candidate solution $X_{i}$, randomly select another solution $X_{k}$ (where $i \neq k$).

If $f(X_i) < f(X_k)$ (i.e., $X_i$ is better):
$$X'_{i,j} = X_{i,j} + r_1 \cdot (X_{best,j} - X_{worst,j}) + r_2 \cdot ( |X_{i,j}| - X_{k,j} )$$ 

If $f(X_i) \geq f(X_k)$ (i.e., $X_i$ is worse or equal):
$$X'_{i,j} = X_{i,j} + r_1 \cdot (X_{best,j} - X_{worst,j}) + r_2 \cdot ( X_{k,j} - |X_{i,j}| )$$ 

*Note: The difference lies in applying the absolute value to only the "self" term in the interaction difference, allowing the "other" term to retain its sign.*

## Example Usage

```python
import numpy as np
from rao_algorithms import Rao1_algorithm, Rao2_algorithm, Rao3_algorithm

def sphere_function(x):
    return np.sum(x**2)

bounds = np.array([[-10, 10]] * 5)
num_iterations = 100
population_size = 50
num_variables = 5

# Run Rao-1
best_sol, history, _ = Rao1_algorithm(bounds, num_iterations, population_size, num_variables, sphere_function)
print("Rao-1 Best:", best_sol)
```

## References

- R.V. Rao, "Rao algorithms: Three metaphor-less simple algorithms for solving optimization problems", International Journal of Industrial Engineering Computations, 11(2), 2020, 193-212.