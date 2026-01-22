import os

def get_int_env(key, default):
    """Get an integer environment variable or return default."""
    try:
        return int(os.environ.get(key, default))
    except ValueError:
        return default

# Test Configuration
# These can be overridden by setting environment variables, e.g.:
# export TEST_NUM_ITERATIONS=1000 pytest tests/

# Default for fast CI
NUM_ITERATIONS = get_int_env("TEST_NUM_ITERATIONS", 200)
POPULATION_SIZE = get_int_env("TEST_POPULATION_SIZE", 50)
NUM_VARIABLES = get_int_env("TEST_NUM_VARIABLES", 2) # Default dimension for simple tests
BOUNDS_RANGE = get_int_env("TEST_BOUNDS_RANGE", 100) # [-100, 100]

# Thresholds for assertions (relaxed for stochastic algorithms)
ASSERTION_THRESHOLD_DEFAULT = 50.0
ASSERTION_THRESHOLD_RASTRIGIN = 500.0
ASSERTION_THRESHOLD_ACKLEY = 50.0
