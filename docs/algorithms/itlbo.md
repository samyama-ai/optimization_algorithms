# Improved TLBO (ITLBO)

## Overview

Improved Teaching-Learning-Based Optimization (ITLBO) refers to variants of the standard TLBO algorithm designed to overcome limitations like premature convergence. A common improvement is the introduction of **Elitism**.

## Key Improvements

1.  **Elitism:** The best solutions from the current generation are preserved and carried over to the next generation, ensuring that the quality of the population never degrades.
2.  **Adaptive Teaching Factor:** Instead of a random 1 or 2, the Teaching Factor ($T_F$) might be adaptive based on the progress of the algorithm.
3.  **Modified Update Equations:** Some variants introduce weighted adjustments to the teacher or learner phases.

## Workflow

1.  **Initialization:** Create random population.
2.  **Teacher Phase:** Standard TLBO teacher phase update.
3.  **Learner Phase:** Standard TLBO learner phase update.
4.  **Elitism Strategy:**
    *   Combine the new population with the old population (or just keep the best few).
    *   Sort by fitness.
    *   Select the top $N$ solutions to form the next generation.
5.  **Termination:** Check stopping criteria.

## References

- R.V. Rao, V. Patel, "An elitist teaching-learning-based optimization algorithm for solving complex constrained optimization problems", International Journal of Industrial Engineering Computations, 2013.