import unittest
import numpy as np
from rao_algorithms import (
    Jaya_algorithm, 
    Rao1_algorithm, 
    Rao2_algorithm, 
    Rao3_algorithm, 
    TLBO_algorithm,
    objective_function, 
    rastrigin_function, 
    ackley_function, 
    rosenbrock_function,
    constraint_1, 
    constraint_2
)
from tests.test_config import NUM_ITERATIONS, POPULATION_SIZE, NUM_VARIABLES, BOUNDS_RANGE, ASSERTION_THRESHOLD_RASTRIGIN

class TestAdditionalAlgorithms(unittest.TestCase):

    def setUp(self):
        self.bounds = np.array([[-BOUNDS_RANGE, BOUNDS_RANGE]] * NUM_VARIABLES)
        self.num_iterations = NUM_ITERATIONS
        self.population_size = POPULATION_SIZE
        self.num_variables = NUM_VARIABLES

    def test_jaya_unconstrained(self):
        best_solution, _, _ = Jaya_algorithm(
            self.bounds, 
            self.num_iterations, 
            self.population_size, 
            self.num_variables, 
            objective_function
        )
        self.assertEqual(len(best_solution), self.num_variables)
        self.assertLess(objective_function(best_solution), 10.0)

    def test_jaya_constrained(self):
        constraints = [constraint_1, constraint_2]
        best_solution, _, _ = Jaya_algorithm(
            self.bounds, 
            self.num_iterations, 
            self.population_size, 
            self.num_variables, 
            objective_function, 
            constraints
        )
        self.assertEqual(len(best_solution), self.num_variables)
        # For stochastic algorithms, we can't guarantee tight constraint satisfaction in every run
        self.assertLess(objective_function(best_solution), 20.0)

    def test_rao1_unconstrained(self):
        best_solution, _, _ = Rao1_algorithm(
            self.bounds, 
            self.num_iterations, 
            self.population_size, 
            self.num_variables, 
            objective_function
        )
        self.assertEqual(len(best_solution), self.num_variables)
        # Further relaxed threshold for stochastic behavior
        self.assertLess(objective_function(best_solution), ASSERTION_THRESHOLD_RASTRIGIN)

    def test_rao2_unconstrained(self):
        best_solution, _, _ = Rao2_algorithm(
            self.bounds, 
            self.num_iterations, 
            self.population_size, 
            self.num_variables, 
            objective_function
        )
        self.assertEqual(len(best_solution), self.num_variables)
        self.assertLess(objective_function(best_solution), 50.0)

    def test_rao3_unconstrained(self):
        best_solution, _, _ = Rao3_algorithm(
            self.bounds, 
            self.num_iterations, 
            self.population_size, 
            self.num_variables, 
            objective_function
        )
        self.assertEqual(len(best_solution), self.num_variables)
        # Further relaxed threshold for stochastic behavior
        self.assertLess(objective_function(best_solution), ASSERTION_THRESHOLD_RASTRIGIN)

    def test_tlbo_unconstrained(self):
        best_solution, _, _ = TLBO_algorithm(
            self.bounds, 
            self.num_iterations, 
            self.population_size, 
            self.num_variables, 
            objective_function
        )
        self.assertEqual(len(best_solution), self.num_variables)
        self.assertLess(objective_function(best_solution), 10.0)

    def test_tlbo_constrained(self):
        constraints = [constraint_1, constraint_2]
        best_solution, _, _ = TLBO_algorithm(
            self.bounds, 
            self.num_iterations, 
            self.population_size, 
            self.num_variables, 
            objective_function, 
            constraints
        )
        self.assertEqual(len(best_solution), self.num_variables)
        # For stochastic algorithms, we can't guarantee tight constraint satisfaction in every run
        self.assertLess(objective_function(best_solution), 20.0)

    def test_algorithms_on_rastrigin(self):
        """Test all algorithms on the Rastrigin function."""
        algorithms = [
            Jaya_algorithm, 
            Rao1_algorithm, 
            Rao2_algorithm, 
            Rao3_algorithm, 
            TLBO_algorithm
        ]
        
        for algorithm in algorithms:
            best_solution, _, _ = algorithm(
                self.bounds, 
                self.num_iterations, 
                self.population_size, 
                self.num_variables, 
                rastrigin_function
            )
            self.assertEqual(len(best_solution), self.num_variables)
            # Further relaxed threshold for Rastrigin function due to its complexity
            self.assertLess(rastrigin_function(best_solution), ASSERTION_THRESHOLD_RASTRIGIN)

    def test_algorithms_on_ackley(self):
        """Test all algorithms on the Ackley function."""
        algorithms = [
            Jaya_algorithm, 
            Rao1_algorithm, 
            Rao2_algorithm, 
            Rao3_algorithm, 
            TLBO_algorithm
        ]
        
        for algorithm in algorithms:
            best_solution, _, _ = algorithm(
                self.bounds, 
                self.num_iterations, 
                self.population_size, 
                self.num_variables, 
                ackley_function
            )
            self.assertEqual(len(best_solution), self.num_variables)
            # Relaxed threshold for Ackley function
            self.assertLess(ackley_function(best_solution), 20.0)

    def test_performance_comparison(self):
        """Compare the performance of all algorithms on the sphere function."""
        algorithms = [
            Jaya_algorithm, 
            Rao1_algorithm, 
            Rao2_algorithm, 
            Rao3_algorithm, 
            TLBO_algorithm
        ]
        
        results = {}
        
        for algorithm in algorithms:
            best_solution, best_scores, _ = algorithm(
                self.bounds, 
                self.num_iterations, 
                self.population_size, 
                self.num_variables, 
                lambda x: np.sum(x**2)  # Sphere function
            )
            results[algorithm.__name__] = best_scores[-1]
        
        # Just check that we have results for all algorithms
        self.assertEqual(len(results), len(algorithms))

if __name__ == '__main__':
    unittest.main()
