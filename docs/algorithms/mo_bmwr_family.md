# MO-BMR / MO-BWR / MO-BMWR

Multi-objective extensions of the BMR/BWR/BMWR family (Rao 2025/2026). Wraps the per-variable single-objective base updates with five MOO features:

1. **Elite seeding** — best solutions of rank 0 used as the "best" reference; rank-N solutions as "worst".
2. **Fast non-dominated sorting** (Deb et al. 2002) — O(M·c²) ranking.
3. **Constraint repairing** — bound-clipping first, then quadratic penalty fallback for inequality/equality violations.
4. **Local exploration** — per iteration, ~10% of the population is replaced by Gaussian-perturbed elites (σ = 5% of bound range).
5. **Edge boosting** — with probability `edge_boost_prob` per iteration, perturb the extreme solutions of each objective to extend the Pareto front.

Total complexity per iteration: `O(M·c² + c·(m + tf + tp))` where `M` = number of objectives, `c` = population size, `m` = variables, `tf` = objective evaluation cost, `tp` = penalty evaluation cost.

## Python usage

```python
from rao_algorithms import samyama_optimization as rust_opt
import numpy as np

def objs(x):
    return np.array([x[0], (1 + 9*np.sum(x[1:])/(len(x)-1)) * (1 - np.sqrt(x[0] / (1 + 9*np.sum(x[1:])/(len(x)-1))))])

lower = np.zeros(30)
upper = np.ones(30)
result = rust_opt.solve_mo_bmwr(objs, lower, upper, 50, 100)  # population, iterations
for ind in result.pareto_front:
    print(ind.variables, ind.fitness, ind.rank, ind.crowding_distance)
```

`solve_mo_bmr`, `solve_mo_bwr`, `solve_mo_bmwr` all share the same signature.

## Variant choice

- **MO-BMR** — favors exploitation of the best solutions; smoother fronts on convex problems.
- **MO-BWR** — favors exploration via worst-repulsion; better on disconnected/discontinuous fronts (ZDT3-style).
- **MO-BMWR** — balanced, recommended default. Mirrors the JMMP 2025 paper's recommended choice for manufacturing problems.

## References

- Rao, R. V. (2025). *Optimization of Different Metal Casting Processes...*. Metals 15(9), 1057. https://www.mdpi.com/2075-4701/15/9/1057
- Rao, R. V. (2026). MDPI Energies 19(1), 34.
- Rao, R. V. (2025). *Single, Multi-, and Many-Objective Optimization of Manufacturing Processes Using Two Novel and Efficient Algorithms with Integrated Decision-Making*. JMMP 9(8), 249. https://www.mdpi.com/2504-4494/9/8/249
