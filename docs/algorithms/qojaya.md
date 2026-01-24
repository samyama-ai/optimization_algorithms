# Quasi-Oppositional Jaya (QOJAYA)

## Overview

QOJAYA is an enhancement of the standard Jaya algorithm. It incorporates **Quasi-Opposition Based Learning (QOBL)** to improve convergence speed and avoid local optima. By considering not just the current solutions but also their "quasi-opposites," the algorithm can explore the search space more effectively.

## Concept: Quasi-Opposition

For a number $x$ in the interval $[a, b]$, its opposite is $x^{op} = a + b - x$.
The **quasi-opposite** $x^{q}$ lies randomly between the center of the interval $c = (a+b)/2$ and the opposite point $x^{op}$.

$$x^{q} = rand(c, x^{op})$$

This effectively focuses the search on the "promising" side of the center relative to the current point.

## Algorithm Steps

### Workflow

```mermaid
graph TD
    A[Start] --> B[Initialize Population]
    B --> C[Evaluate Fitness]
    C --> D[Identify Best & Worst]
    D --> E[Jaya Update Equation]
    E --> F[Generate Quasi-Opposites]
    F --> G[Select Better (Update vs Q-Opposite)]
    G --> H{Termination?}
    H -->|No| C
    H -->|Yes| I[End]
```

1.  **Initialization:** Initialize population $P$.
2.  **QOBL Initialization (Optional):** Generate quasi-opposites for the initial population and select the best $N$ individuals from the combined pool.
3.  **Jaya Update:** For each iteration:
    *   Identify $X_{best}$ and $X_{worst}$.
    *   Update each solution using the standard Jaya equation:
        $$X'_{i,j} = X_{i,j} + r_1 \cdot (X_{best,j} - |X_{i,j}|) - r_2 \cdot (X_{worst,j} - |X_{i,j}|)$$
4.  **QOBL Phase (Jumping):**
    *   With a certain probability (jumping rate), generate the quasi-opposite of the updated solution.
    *   Evaluate both the updated solution and its quasi-opposite.
    *   Select the better one for the next generation.
5.  **Termination:** Repeat until criteria met.

## References

- R.V. Rao, et al., "Optimization of welding processes using quasi-oppositional-based Jaya algorithm", Journal of Mechanical Science and Technology, 2017.
