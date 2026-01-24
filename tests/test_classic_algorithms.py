import unittest
import numpy as np
from rao_algorithms import PSO_algorithm, DE_algorithm, objective_function
from tests.test_config import NUM_ITERATIONS, POPULATION_SIZE, NUM_VARIABLES, BOUNDS_RANGE

class TestClassicAlgorithms(unittest.TestCase):

    def setUp(self):
        self.bounds = np.array([[-BOUNDS_RANGE, BOUNDS_RANGE]] * NUM_VARIABLES)
        self.num_iterations = NUM_ITERATIONS
        self.population_size = POPULATION_SIZE
        self.num_variables = NUM_VARIABLES

    def test_pso_sphere(self):
        best_solution, _, _ = PSO_algorithm(
            self.bounds, 
            self.num_iterations, 
            self.population_size, 
            self.num_variables, 
            objective_function
        )
        self.assertEqual(len(best_solution), self.num_variables)
        self.assertLess(objective_function(best_solution), 10.0)

    def test_de_sphere(self):
        best_solution, _, _ = DE_algorithm(
            self.bounds, 
            self.num_iterations, 
            self.population_size, 
            self.num_variables, 
            objective_function
        )
        self.assertEqual(len(best_solution), self.num_variables)
        self.assertLess(objective_function(best_solution), 10.0)

if __name__ == '__main__':
    unittest.main()
