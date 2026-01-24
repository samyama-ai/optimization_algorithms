import numpy as np
import pytest
from rao_algorithms import GOTLBO_algorithm
from tests.test_config import NUM_ITERATIONS, POPULATION_SIZE

def sphere_function(x):
    return np.sum(x**2)

def test_gotlbo_algorithm():
    # 5D Sphere function
    dim = 5
    bounds = np.array([[-5.0, 5.0]] * dim)
    
    # Run GOTLBO
    best_solution, convergence, history = GOTLBO_algorithm(
        bounds, 
        NUM_ITERATIONS, 
        POPULATION_SIZE, 
        dim, 
        sphere_function,
        track_history=True
    )
    
    # Check results
    assert len(best_solution) == dim
    assert len(convergence) > 0
    assert convergence[-1] < convergence[0]  # Should improve
    assert convergence[-1] < 1.0  # Should converge close to 0
    
    print(f"GOTLBO Best Fitness: {convergence[-1]}")

if __name__ == "__main__":
    test_gotlbo_algorithm()
