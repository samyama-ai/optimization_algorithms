# Teaching-Learning-Based Optimization (TLBO)

## Overview

TLBO is a nature-inspired, population-based metaheuristic optimization algorithm proposed by R.V. Rao, V.J. Savsani, and D.P. Vakharia in 2011. It mimics the teaching-learning process in a classroom.

## Algorithm Phases

### 1. Teacher Phase
This phase simulates learning from a teacher. The teacher is the most knowledgeable person in the class (best solution).
*   **Teacher ($X_{teacher}$):** The best solution in the iteration.
*   **Mean ($X_{mean}$):** The average of the population.
*   **Update:**
    $$X_{new} = X_{old} + r \cdot (X_{teacher} - T_F \cdot X_{mean})$$
    Where $T_F$ (Teaching Factor) is randomly 1 or 2.

### 2. Learner Phase
This phase simulates peer learning. Students interact with each other to improve their knowledge.
*   For a learner $X_i$, randomly select another learner $X_j$.
*   **Update:**
    *   If $f(X_i) < f(X_j)$ (better): $X_{new} = X_i + r \cdot (X_i - X_j)$
    *   Else: $X_{new} = X_i + r \cdot (X_j - X_i)$

## Features
- **Parameter-less:** No specific parameters to tune (like mutation/crossover rates).
- **Simple:** Easy to implement.

## References
- Rao, R. V., Savsani, V. J., & Vakharia, D. P. (2011). Teaching-learning-based optimization: a novel method for constrained mechanical design optimization problems. *Computer-Aided Design*, 43(3), 303-315.