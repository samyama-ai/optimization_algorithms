import numpy as np
from .penalty import constrained_objective_function

try:
    from . import samyama_optimization as rust_opt
    RUST_AVAILABLE = True
except ImportError:
    try:
        import samyama_optimization as rust_opt
        RUST_AVAILABLE = True
    except ImportError:
        RUST_AVAILABLE = False
        print("Warning: Rust optimization backend not found. Falling back to slow Python implementation.")

def _run_rust_solver(solver_func, bounds, num_iterations, population_size, objective_func, constraints=None, variant=None):
    # Handle constraints via penalty wrapper
    if constraints:
        # Define a wrapper that calculates objective + penalty
        # This matches the signature expected by Rust (x -> float)
        def penalized_objective(x):
            return constrained_objective_function(x, objective_func, constraints)
        
        target_func = penalized_objective
    else:
        target_func = objective_func
    
    # Extract lower and upper bounds and ensure they are float64 for Rust
    lower = bounds[:, 0].astype(np.float64)
    upper = bounds[:, 1].astype(np.float64)
    
    # Call Rust
    if variant:
        result = solver_func(target_func, lower, upper, variant, population_size, num_iterations)
    else:
        result = solver_func(target_func, lower, upper, population_size, num_iterations)
        
    return result.best_variables, result.history, {'best_scores': result.history, 'best_solutions': []}

# --- Algorithms ---

def BMR_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_bmr, bounds, num_iterations, population_size, objective_func, constraints)
    raise NotImplementedError("Python fallback disabled for rewrite")

def BWR_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_bwr, bounds, num_iterations, population_size, objective_func, constraints)
    raise NotImplementedError("Python fallback disabled for rewrite")

def Jaya_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_jaya, bounds, num_iterations, population_size, objective_func, constraints)
    raise NotImplementedError("Python fallback disabled for rewrite")

def Rao1_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_rao, bounds, num_iterations, population_size, objective_func, constraints, variant="Rao1")
    raise NotImplementedError("Python fallback disabled for rewrite")

def Rao2_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_rao, bounds, num_iterations, population_size, objective_func, constraints, variant="Rao2")
    raise NotImplementedError("Python fallback disabled for rewrite")

def Rao3_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_rao, bounds, num_iterations, population_size, objective_func, constraints, variant="Rao3")
    raise NotImplementedError("Python fallback disabled for rewrite")

def TLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_tlbo, bounds, num_iterations, population_size, objective_func, constraints)
    raise NotImplementedError("Python fallback disabled for rewrite")

# Re-enable Python fallbacks or keep NotImplemented for algorithms strictly not in Rust yet
# For now, we keep raising error to ensure we know what's missing
def TLBO_with_Elitism_algorithm(*args, **kwargs): raise NotImplementedError("Not ported to Rust yet")
def QOJAYA_algorithm(*args, **kwargs): raise NotImplementedError("Not ported to Rust yet")
def JCRO_algorithm(*args, **kwargs): raise NotImplementedError("Not ported to Rust yet")
def GOTLBO_algorithm(*args, **kwargs): raise NotImplementedError("Not ported to Rust yet")
def ITLBO_algorithm(*args, **kwargs): raise NotImplementedError("Not ported to Rust yet")
def MultiObjective_TLBO_algorithm(*args, **kwargs): raise NotImplementedError("Not ported to Rust yet")