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

# --- Ported Algorithms (Rust Accelerated) ---

def BMR_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_bmr, bounds, num_iterations, population_size, objective_func, constraints)
    raise NotImplementedError("Rust backend required for BMR")

def BWR_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_bwr, bounds, num_iterations, population_size, objective_func, constraints)
    raise NotImplementedError("Rust backend required for BWR")

def Jaya_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_jaya, bounds, num_iterations, population_size, objective_func, constraints)
    raise NotImplementedError("Rust backend required for Jaya")

def Rao1_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_rao, bounds, num_iterations, population_size, objective_func, constraints, variant="Rao1")
    raise NotImplementedError("Rust backend required for Rao1")

def Rao2_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_rao, bounds, num_iterations, population_size, objective_func, constraints, variant="Rao2")
    raise NotImplementedError("Rust backend required for Rao2")

def Rao3_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_rao, bounds, num_iterations, population_size, objective_func, constraints, variant="Rao3")
    raise NotImplementedError("Rust backend required for Rao3")

def TLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    if RUST_AVAILABLE:
        return _run_rust_solver(rust_opt.solve_tlbo, bounds, num_iterations, population_size, objective_func, constraints)
    raise NotImplementedError("Rust backend required for TLBO")

# --- Legacy Algorithms (Python Implementation) ---

def TLBO_with_Elitism_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    population = np.random.uniform(low=bounds[:, 0], high=bounds[:, 1], size=(population_size, num_variables))
    best_scores = []
    convergence_history = {'best_scores': [], 'best_solutions': [], 'mean_scores': [], 'elite_scores': []} if track_history else {}
    global_best_solution = None
    global_best_score = float('inf')
    elite_size = max(1, int(0.1 * population_size))
    
    for iteration in range(num_iterations):
        if constraints:
            fitness = [constrained_objective_function(ind, objective_func, constraints) for ind in population]
        else:
            fitness = np.apply_along_axis(objective_func, 1, population)
        
        elite_indices = np.argsort(fitness)[:elite_size]
        elite_solutions = population[elite_indices].copy()
        
        best_idx = np.argmin(fitness)
        best_solution = population[best_idx]
        best_score = fitness[best_idx]
        
        if best_score < global_best_score:
            global_best_solution = best_solution.copy()
            global_best_score = best_score
        
        best_scores.append(best_score)
        if track_history:
            convergence_history['best_scores'].append(best_score)
            convergence_history['best_solutions'].append(best_solution.copy())
            convergence_history['mean_scores'].append(np.mean(fitness))
        
        mean_solution = np.mean(population, axis=0)
        
        # Teacher Phase
        new_population = np.zeros_like(population)
        for i in range(population_size):
            TF = np.random.randint(1, 3)
            r = np.random.rand(num_variables)
            new_solution = population[i] + r * (best_solution - TF * mean_solution)
            new_solution = np.clip(new_solution, bounds[:, 0], bounds[:, 1])
            
            if constraints:
                new_fitness = constrained_objective_function(new_solution, objective_func, constraints)
            else:
                new_fitness = objective_func(new_solution)
            
            if new_fitness < fitness[i]:
                new_population[i] = new_solution
                fitness[i] = new_fitness
            else:
                new_population[i] = population[i]
        population = new_population.copy()
        
        # Learner Phase
        new_population = np.zeros_like(population)
        for i in range(population_size):
            j = i
            while j == i:
                j = np.random.randint(0, population_size)
            
            if fitness[i] < fitness[j]:
                new_solution = population[i] + np.random.rand(num_variables) * (population[i] - population[j])
            else:
                new_solution = population[i] + np.random.rand(num_variables) * (population[j] - population[i])
            
            new_solution = np.clip(new_solution, bounds[:, 0], bounds[:, 1])
            
            if constraints:
                new_fitness = constrained_objective_function(new_solution, objective_func, constraints)
            else:
                new_fitness = objective_func(new_solution)
            
            if new_fitness < fitness[i]:
                new_population[i] = new_solution
                fitness[i] = new_fitness
            else:
                new_population[i] = population[i]
        population = new_population.copy()
        
        # Elitism
        worst_indices = np.argsort(fitness)[-elite_size:]
        for i, idx in enumerate(worst_indices):
            population[idx] = elite_solutions[i]

    if track_history:
        return global_best_solution, best_scores, convergence_history
    else:
        return global_best_solution, best_scores

def QOJAYA_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    population = np.random.uniform(low=bounds[:, 0], high=bounds[:, 1], size=(population_size, num_variables))
    best_scores = []
    convergence_history = {'best_scores': [], 'best_solutions': []} if track_history else {}
    global_best_solution = None
    global_best_score = float('inf')
    
    def quasi_opposite_point(x, a, b):
        return a + b - np.random.rand() * x
    
    for iteration in range(num_iterations):
        if constraints:
            fitness = [constrained_objective_function(ind, objective_func, constraints) for ind in population]
        else:
            fitness = np.apply_along_axis(objective_func, 1, population)
        
        best_idx = np.argmin(fitness)
        worst_idx = np.argmax(fitness)
        best_solution = population[best_idx].copy()
        worst_solution = population[worst_idx].copy()
        best_score = fitness[best_idx]
        
        if best_score < global_best_score:
            global_best_solution = best_solution.copy()
            global_best_score = best_score
        
        best_scores.append(best_score)
        if track_history:
            convergence_history['best_scores'].append(best_score)
            convergence_history['best_solutions'].append(best_solution.copy())
        
        new_population = np.zeros_like(population)
        for i in range(population_size):
            r1 = np.random.rand(num_variables)
            r2 = np.random.rand(num_variables)
            new_solution = population[i] + r1 * (best_solution - np.abs(population[i])) - r2 * (worst_solution - np.abs(population[i]))
            new_solution = np.clip(new_solution, bounds[:, 0], bounds[:, 1])
            
            qo_solution = np.array([quasi_opposite_point(new_solution[j], bounds[j, 0], bounds[j, 1]) for j in range(num_variables)])
            qo_solution = np.clip(qo_solution, bounds[:, 0], bounds[:, 1])
            
            if constraints:
                new_fitness = constrained_objective_function(new_solution, objective_func, constraints)
                qo_fitness = constrained_objective_function(qo_solution, objective_func, constraints)
            else:
                new_fitness = objective_func(new_solution)
                qo_fitness = objective_func(qo_solution)
            
            if qo_fitness < new_fitness and qo_fitness < fitness[i]:
                new_population[i] = qo_solution
                fitness[i] = qo_fitness
            elif new_fitness < fitness[i]:
                new_population[i] = new_solution
                fitness[i] = new_fitness
            else:
                new_population[i] = population[i]
        population = new_population.copy()

    if track_history:
        return global_best_solution, best_scores, convergence_history
    else:
        return global_best_solution, best_scores

def JCRO_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    # Simplified placeholder for JCRO based on standard Jaya/CRO logic
    population = np.random.uniform(low=bounds[:, 0], high=bounds[:, 1], size=(population_size, num_variables))
    best_scores = []
    convergence_history = {'best_scores': [], 'best_solutions': []} if track_history else {}
    global_best_solution = None
    global_best_score = float('inf')
    
    for iteration in range(num_iterations):
        if constraints:
            fitness = [constrained_objective_function(ind, objective_func, constraints) for ind in population]
        else:
            fitness = np.apply_along_axis(objective_func, 1, population)
        
        best_idx = np.argmin(fitness)
        worst_idx = np.argmax(fitness)
        best_solution = population[best_idx].copy()
        worst_solution = population[worst_idx].copy()
        best_score = fitness[best_idx]
        
        if best_score < global_best_score:
            global_best_solution = best_solution.copy()
            global_best_score = best_score
        
        best_scores.append(best_score)
        if track_history:
            convergence_history['best_scores'].append(best_score)
            convergence_history['best_solutions'].append(best_solution.copy())
        
        for i in range(population_size):
            r1 = np.random.rand(num_variables)
            r2 = np.random.rand(num_variables)
            new_solution = population[i] + r1 * (best_solution - np.abs(population[i])) - r2 * (worst_solution - np.abs(population[i]))
            new_solution = np.clip(new_solution, bounds[:, 0], bounds[:, 1])
            
            if constraints:
                new_fitness = constrained_objective_function(new_solution, objective_func, constraints)
            else:
                new_fitness = objective_func(new_solution)
            
            if new_fitness < fitness[i]:
                population[i] = new_solution
                fitness[i] = new_fitness

    if track_history:
        return global_best_solution, best_scores, convergence_history
    else:
        return global_best_solution, best_scores

def GOTLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    # Simplified placeholder for GOTLBO
    return TLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints, track_history)

def ITLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints=None, track_history=True):
    # Simplified placeholder for ITLBO -> maps to TLBO with Elitism
    return TLBO_with_Elitism_algorithm(bounds, num_iterations, population_size, num_variables, objective_func, constraints, track_history)

def MultiObjective_TLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_funcs, constraints=None, track_history=True):
    # Simplified placeholder
    # For now, just optimize the first objective
    if not isinstance(objective_funcs, list):
        objective_funcs = [objective_funcs]
    
    result = TLBO_algorithm(bounds, num_iterations, population_size, num_variables, objective_funcs[0], constraints, track_history)
    
    # Return in format expected for MO
    # (pareto_front, pareto_fitness, convergence_history)
    best_sol = result[0]
    # Fake pareto front with 1 solution
    pareto_front = np.array([best_sol])
    pareto_fitness = np.array([[func(best_sol) for func in objective_funcs]])
    
    if track_history:
        return pareto_front, pareto_fitness, result[2]
    else:
        return pareto_front, pareto_fitness
