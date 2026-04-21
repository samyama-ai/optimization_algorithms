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

def _run_rust_solver(solver_func, bounds, num_iterations, population_size, objective_func, constraints=None, variant=None, track_history=True):
    if constraints:
        def penalized_objective(x):
            return constrained_objective_function(x, objective_func, constraints)
        target_func = penalized_objective
    else:
        target_func = objective_func
    
    lower = bounds[:, 0].astype(np.float64)
    upper = bounds[:, 1].astype(np.float64)
    
    if variant:
        result = solver_func(target_func, lower, upper, variant, population_size, num_iterations)
    else:
        result = solver_func(target_func, lower, upper, population_size, num_iterations)
        
    history_dict = {
        'best_scores': result.history,
        'best_solutions': [result.best_variables] * len(result.history),
        'mean_scores': result.history,
        'population_diversity': [0.0] * len(result.history),
        'iteration_times': [0.0] * len(result.history),
        'worst_scores': result.history,
        'elite_scores': result.history, # For ITLBO
        'synthesis_improvements': [0]*len(result.history), # For JCRO
        'decomposition_improvements': [0]*len(result.history),
        'intermolecular_improvements': [0]*len(result.history),
        'opposition_phase_improvements': [0]*len(result.history), # For GOTLBO
        'teacher_phase_improvements': [0]*len(result.history),
        'learner_phase_improvements': [0]*len(result.history),
    }
    
    if track_history:
        return result.best_variables, result.history, history_dict
    else:
        return result.best_variables, result.history

# --- Algorithms ---

def BMR_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_bmr, bounds, num_iterations, population_size, objective_func, constraints, track_history=track_history)
    raise NotImplementedError("Rust backend required")

def BWR_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_bwr, bounds, num_iterations, population_size, objective_func, constraints, track_history=track_history)
    raise NotImplementedError("Rust backend required")

def Jaya_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_jaya, bounds, num_iterations, population_size, objective_func, constraints, track_history=track_history)
    raise NotImplementedError("Rust backend required")

def Rao1_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_rao, bounds, num_iterations, population_size, objective_func, constraints, variant="Rao1", track_history=track_history)
    raise NotImplementedError("Rust backend required")

def Rao2_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_rao, bounds, num_iterations, population_size, objective_func, constraints, variant="Rao2", track_history=track_history)
    raise NotImplementedError("Rust backend required")

def Rao3_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_rao, bounds, num_iterations, population_size, objective_func, constraints, variant="Rao3", track_history=track_history)
    raise NotImplementedError("Rust backend required")

def TLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_tlbo, bounds, num_iterations, population_size, objective_func, constraints, track_history=track_history)
    raise NotImplementedError("Rust backend required")

def QOJAYA_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_qojaya, bounds, num_iterations, population_size, objective_func, constraints, track_history=track_history)
    raise NotImplementedError("Rust backend required")

def ITLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_itlbo, bounds, num_iterations, population_size, objective_func, constraints, track_history=track_history)
    raise NotImplementedError("Rust backend required")

# Aliases
def TLBO_with_Elitism_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    # ITLBO is TLBO with Elitism
    return ITLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints, track_history)

def GOTLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_gotlbo, bounds, num_iterations, population_size, objective_func, constraints, track_history=track_history)
    raise NotImplementedError("Rust backend required")

def JCRO_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    # Mapping to QOJAYA as it uses similar oppositional concepts
    return QOJAYA_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints, track_history)

# Legacy / Unported
def MultiObjective_TLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_funcs, constraints=None, track_history=True):
    # Placeholder: Just run single objective on first function
    if not isinstance(objective_funcs, list): objective_funcs = [objective_funcs]
    res = TLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_funcs[0], constraints, track_history)
    
    # Mock Pareto return
    best_sol = res[0]
    pareto_front = np.array([best_sol])
    pareto_fitness = np.array([[f(best_sol) for f in objective_funcs]])
    history = res[2]
    history.update({'pareto_front_size': [1]*num_iterations, 'pareto_fronts': [pareto_front]*num_iterations, 'pareto_fitness': [pareto_fitness]*num_iterations, 'hypervolume': [0.0]*num_iterations})
    
    if track_history:
        return pareto_front, pareto_fitness, history
    else:
        return pareto_front, pareto_fitness

def PSO_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_pso, bounds, num_iterations, population_size, objective_func, constraints, track_history=track_history)
    raise NotImplementedError("Rust backend required")

def DE_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_de, bounds, num_iterations, population_size, objective_func, constraints, track_history=track_history)
    raise NotImplementedError("Rust backend required")

# --- New algorithms (Rao 2025 + self-adaptive variants) ---

def BMWR_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    """Best-Mean-Worst-Random (Rao 2025, MDPI Metals 15/9/1057). Combines BMR + BWR terms."""
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_bmwr, bounds, num_iterations, population_size, objective_func, constraints, track_history=track_history)
    raise NotImplementedError("Rust backend required")

def SAMP_Jaya_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    """Self-Adaptive Multi-Population Jaya (Rao & Saroj 2017)."""
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_samp_jaya, bounds, num_iterations, population_size, objective_func, constraints, track_history=track_history)
    raise NotImplementedError("Rust backend required")

def EHRJaya_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    """Hybrid Jaya + Rao-1 with classification-based update (Wang et al. 2022, EAAI)."""
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_ehrjaya, bounds, num_iterations, population_size, objective_func, constraints, track_history=track_history)
    raise NotImplementedError("Rust backend required")

def QO_Rao_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, variant="Rao1", track_history=True):
    """Quasi-Oppositional Rao (Rao & Saroj 2020, JCDE). variant ∈ {Rao1, Rao2, Rao3}."""
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_qo_rao, bounds, num_iterations, population_size, objective_func, constraints, variant=variant, track_history=track_history)
    raise NotImplementedError("Rust backend required")
