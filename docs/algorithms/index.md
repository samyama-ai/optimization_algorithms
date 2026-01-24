# Optimization Algorithms Documentation

Welcome to the documentation for the Samyama Optimization Algorithms library. This library provides robust, Rust-accelerated implementations of various modern optimization algorithms, focusing on the works of Prof. Ravipudi Venkata Rao.

## Available Algorithms

### Rao Algorithms
Metaphor-less algorithms that use simple mathematical operations to guide the population towards the optimal solution.
- [Rao-1, Rao-2, Rao-3](rao.md)

### Jaya Family
Algorithms based on the principle of moving towards the best solution and away from the worst.
- [Jaya](jaya.md)
- [Quasi-Oppositional Jaya (QOJAYA)](qojaya.md)

### Teaching-Learning Based Optimization (TLBO) Family
Algorithms inspired by the teaching-learning process in a classroom.
- [TLBO](tlbo.md)
- [Improved TLBO (ITLBO)](itlbo.md)
- [Generalized Oppositional TLBO (GOTLBO)](gotlbo.md)
- [Multi-Objective TLBO (MO-TLBO)](multiobjective_tlbo.md) (Concept)

### New Metaphor-Free Algorithms
Recent algorithms introduced in 2024.
- [BMR (Best-Mean-Random)](bmr.md)
- [BWR (Best-Worst-Random)](bwr.md)

### Other Implemented Algorithms
- [Particle Swarm Optimization (PSO)](https://en.wikipedia.org/wiki/Particle_swarm_optimization)
- [Differential Evolution (DE)](https://en.wikipedia.org/wiki/Differential_evolution)

## Implementation Details

The core logic is implemented in **Rust** for performance, exposed to Python via `pyo3`. 
See the `rust_bindings` directory for the source code.