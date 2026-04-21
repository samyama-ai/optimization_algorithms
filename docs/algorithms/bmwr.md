# BMWR — Best-Mean-Worst-Random

Parameter-free, metaphor-free optimization algorithm introduced by R. Venkata Rao (2025) in *Optimization of Different Metal Casting Processes Using Three Simple and Efficient Advanced Algorithms* (MDPI Metals 15/9/1057). Combines BMR's best-vs-mean attraction with BWR's worst-vs-random repulsion.

## Update rule

For each candidate `V_{j,k}` (variable j, candidate k) at iteration i, with random factors `r1..r5 ∼ U(0,1)` and `T ∼ {1, 2}`:

If `r4 > 0.5`:

```
V'_{j,k} = V_{j,k}
         + r1 · (V_{j,best} − T · V_{j,mean})
         + r2 · (V_{j,best} − V_{j,random})
         − r5 · (V_{j,worst} − V_{j,random})
```

Otherwise (random reset, exploration):

```
V'_{j,k} = U_j − (U_j − L_j) · r3
```

Greedy acceptance: keep `V'` iff `f(V') < f(V)`.

## Python usage

```python
from rao_algorithms import BMWR_algorithm
import numpy as np

bounds = np.array([[-10, 10], [-10, 10]])
result = BMWR_algorithm(
    bounds=bounds,
    num_iterations=500,
    population_size=50,
    num_variables=2,
    objective_func=lambda x: float(np.sum(x**2)),
    track_history=True,
)
best_x, history, history_dict = result
```

## When to use

- Problems where BMR alone over-exploits (only attraction terms).
- Problems where BWR alone under-exploits (no mean information).
- BMWR balances both — recommended default within the BMR/BWR/BMWR family.

## Reference

Rao, R. V. (2025). *Optimization of Different Metal Casting Processes Using Three Simple and Efficient Advanced Algorithms*. Metals, 15(9), 1057. https://www.mdpi.com/2075-4701/15/9/1057
