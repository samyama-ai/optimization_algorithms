use pyo3::prelude::*;
use pyo3::types::PyFunction;
use ndarray::Array1;
use numpy::{IntoPyArray, PyArray1, PyArrayMethods, PyReadonlyArray1};
use ::samyama_optimization::algorithms::{JayaSolver, RaoSolver, RaoVariant, TLBOSolver, BMRSolver, BWRSolver, QOJayaSolver, ITLBOSolver, PSOSolver, DESolver, GOTLBOSolver, BMWRSolver, SAMPJayaSolver, EHRJayaSolver, QORaoSolver, MOBMWRSolver, MOBMWRVariant, MORaoDESolver, SAPHRSolver};
use ::samyama_optimization::common::{MultiObjectiveProblem, Problem, SolverConfig};
use pyo3::types::PyList;

/// Wrapper to use a Python function as a Rust Problem
struct PyProblem {
    objective: Py<PyFunction>,
    dim: usize,
    lower: Array1<f64>,
    upper: Array1<f64>,
}

impl Problem for PyProblem {
    fn objective(&self, variables: &Array1<f64>) -> f64 {
        Python::with_gil(|py| {
            let py_vars = variables.to_owned().into_pyarray(py);
            let args = (py_vars,);
            let result = self.objective.call1(py, args).expect("Python objective function failed");
            result.extract::<f64>(py).expect("Objective must return a float")
        })
    }

    fn dim(&self) -> usize { self.dim }

    fn bounds(&self) -> (Array1<f64>, Array1<f64>) {
        (self.lower.clone(), self.upper.clone())
    }
}

#[pyclass]
pub struct PyOptimizationResult {
    #[pyo3(get)]
    pub best_variables: Py<PyArray1<f64>>,
    #[pyo3(get)]
    pub best_fitness: f64,
    #[pyo3(get)]
    pub history: Vec<f64>,
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_jaya(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = JayaSolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, variant="Rao3", population_size=50, max_iterations=100))]
fn solve_rao(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    variant: &str,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    
    let rao_variant = match variant {
        "Rao1" => RaoVariant::Rao1,
        "Rao2" => RaoVariant::Rao2,
        "Rao3" => RaoVariant::Rao3,
        _ => return Err(PyErr::new::<pyo3::exceptions::PyValueError, _>("Invalid Rao variant. Use Rao1, Rao2, or Rao3")),
    };

    let solver = RaoSolver::new(SolverConfig { population_size, max_iterations }, rao_variant);
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_tlbo(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = TLBOSolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_bmr(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = BMRSolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_bwr(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = BWRSolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_qojaya(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = QOJayaSolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_itlbo(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = ITLBOSolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_gotlbo(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = GOTLBOSolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_pso(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = PSOSolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_de(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = DESolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_bmwr(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = BMWRSolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_samp_jaya(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = SAMPJayaSolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_ehrjaya(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = EHRJayaSolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, variant="Rao1", population_size=50, max_iterations=100))]
fn solve_qo_rao(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    variant: &str,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let rao_variant = match variant {
        "Rao1" => RaoVariant::Rao1,
        "Rao2" => RaoVariant::Rao2,
        "Rao3" => RaoVariant::Rao3,
        _ => return Err(PyErr::new::<pyo3::exceptions::PyValueError, _>("Invalid Rao variant")),
    };
    let solver = QORaoSolver::new(SolverConfig { population_size, max_iterations }, rao_variant);
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

// --- Multi-objective wrapper ---

struct PyMOProblem {
    objectives: Py<PyFunction>,
    num_objectives: usize,
    dim: usize,
    lower: Array1<f64>,
    upper: Array1<f64>,
}

impl MultiObjectiveProblem for PyMOProblem {
    fn objectives(&self, variables: &Array1<f64>) -> Vec<f64> {
        Python::with_gil(|py| {
            let py_vars = variables.to_owned().into_pyarray(py);
            let result = self
                .objectives
                .call1(py, (py_vars,))
                .expect("Python multi-objective function failed");
            // Accept list, tuple, or ndarray.
            if let Ok(arr) = result.extract::<Vec<f64>>(py) {
                arr
            } else {
                let arr = result.downcast_bound::<numpy::PyArray1<f64>>(py)
                    .expect("MO objective must return list, tuple, or ndarray");
                arr.readonly().as_array().to_vec()
            }
        })
    }
    fn dim(&self) -> usize { self.dim }
    fn num_objectives(&self) -> usize { self.num_objectives }
    fn bounds(&self) -> (Array1<f64>, Array1<f64>) {
        (self.lower.clone(), self.upper.clone())
    }
}

#[pyclass]
pub struct PyMultiObjectiveIndividual {
    #[pyo3(get)] pub variables: Py<PyArray1<f64>>,
    #[pyo3(get)] pub fitness: Vec<f64>,
    #[pyo3(get)] pub constraint_violation: f64,
    #[pyo3(get)] pub rank: usize,
    #[pyo3(get)] pub crowding_distance: f64,
}

#[pyclass]
pub struct PyMultiObjectiveResult {
    #[pyo3(get)] pub pareto_front: Py<PyList>,
    #[pyo3(get)] pub history: Vec<f64>,
}

fn build_mo_result(
    py: Python,
    front: Vec<::samyama_optimization::common::MultiObjectiveIndividual>,
    history: Vec<f64>,
) -> PyResult<PyMultiObjectiveResult> {
    let items: Vec<Py<PyMultiObjectiveIndividual>> = front
        .into_iter()
        .map(|ind| {
            Py::new(py, PyMultiObjectiveIndividual {
                variables: ind.variables.into_pyarray(py).to_owned().into(),
                fitness: ind.fitness,
                constraint_violation: ind.constraint_violation,
                rank: ind.rank,
                crowding_distance: ind.crowding_distance,
            }).unwrap()
        })
        .collect();
    let list = PyList::new(py, items)?;
    Ok(PyMultiObjectiveResult { pareto_front: list.into(), history })
}

fn run_mo<F>(
    py: Python,
    objectives: Py<PyFunction>,
    num_objectives: usize,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
    f: F,
) -> PyResult<PyMultiObjectiveResult>
where
    F: FnOnce(&PyMOProblem, SolverConfig) -> ::samyama_optimization::common::MultiObjectiveResult + Send,
{
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyMOProblem {
        objectives, num_objectives, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr,
    };
    let cfg = SolverConfig { population_size, max_iterations };
    let result = f(&problem, cfg);
    build_mo_result(py, result.pareto_front, result.history)
}

#[pyfunction]
#[pyo3(signature = (objectives, lower, upper, population_size=50, max_iterations=100, num_objectives=2))]
fn solve_mo_bmr(py: Python, objectives: Py<PyFunction>, lower: PyReadonlyArray1<f64>, upper: PyReadonlyArray1<f64>,
    population_size: usize, max_iterations: usize, num_objectives: usize) -> PyResult<PyMultiObjectiveResult> {
    run_mo(py, objectives, num_objectives, lower, upper, population_size, max_iterations,
        |p, cfg| MOBMWRSolver::new(cfg, MOBMWRVariant::MOBMR).solve(p))
}

#[pyfunction]
#[pyo3(signature = (objectives, lower, upper, population_size=50, max_iterations=100, num_objectives=2))]
fn solve_mo_bwr(py: Python, objectives: Py<PyFunction>, lower: PyReadonlyArray1<f64>, upper: PyReadonlyArray1<f64>,
    population_size: usize, max_iterations: usize, num_objectives: usize) -> PyResult<PyMultiObjectiveResult> {
    run_mo(py, objectives, num_objectives, lower, upper, population_size, max_iterations,
        |p, cfg| MOBMWRSolver::new(cfg, MOBMWRVariant::MOBWR).solve(p))
}

#[pyfunction]
#[pyo3(signature = (objectives, lower, upper, population_size=50, max_iterations=100, num_objectives=2))]
fn solve_mo_bmwr(py: Python, objectives: Py<PyFunction>, lower: PyReadonlyArray1<f64>, upper: PyReadonlyArray1<f64>,
    population_size: usize, max_iterations: usize, num_objectives: usize) -> PyResult<PyMultiObjectiveResult> {
    run_mo(py, objectives, num_objectives, lower, upper, population_size, max_iterations,
        |p, cfg| MOBMWRSolver::new(cfg, MOBMWRVariant::MOBMWR).solve(p))
}

#[pyfunction]
#[pyo3(signature = (objectives, lower, upper, population_size=50, max_iterations=100, num_objectives=2))]
fn solve_mo_rao_de(py: Python, objectives: Py<PyFunction>, lower: PyReadonlyArray1<f64>, upper: PyReadonlyArray1<f64>,
    population_size: usize, max_iterations: usize, num_objectives: usize) -> PyResult<PyMultiObjectiveResult> {
    run_mo(py, objectives, num_objectives, lower, upper, population_size, max_iterations,
        |p, cfg| MORaoDESolver::new(cfg).solve(p))
}

#[pyfunction]
#[pyo3(signature = (objective, lower, upper, population_size=50, max_iterations=100))]
fn solve_saphr(
    py: Python,
    objective: Py<PyFunction>,
    lower: PyReadonlyArray1<f64>,
    upper: PyReadonlyArray1<f64>,
    population_size: usize,
    max_iterations: usize,
) -> PyResult<PyOptimizationResult> {
    let lower_arr = lower.as_array().to_owned();
    let upper_arr = upper.as_array().to_owned();
    let problem = PyProblem { objective, dim: lower_arr.len(), lower: lower_arr, upper: upper_arr };
    let solver = SAPHRSolver::new(SolverConfig { population_size, max_iterations });
    let result = py.allow_threads(|| solver.solve(&problem));
    Ok(PyOptimizationResult {
        best_variables: result.best_variables.into_pyarray(py).to_owned().into(),
        best_fitness: result.best_fitness,
        history: result.history,
    })
}

#[pyfunction]
fn status() -> PyResult<String> {
    Ok("Samyama Optimization Engine (Rust) is active".to_string())
}

#[pymodule]
fn samyama_optimization(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_class::<PyOptimizationResult>()?;
    m.add_function(wrap_pyfunction!(solve_jaya, m)?)?;
    m.add_function(wrap_pyfunction!(solve_rao, m)?)?;
    m.add_function(wrap_pyfunction!(solve_tlbo, m)?)?;
    m.add_function(wrap_pyfunction!(solve_bmr, m)?)?;
    m.add_function(wrap_pyfunction!(solve_bwr, m)?)?;
    m.add_function(wrap_pyfunction!(solve_qojaya, m)?)?;
    m.add_function(wrap_pyfunction!(solve_itlbo, m)?)?;
    m.add_function(wrap_pyfunction!(solve_gotlbo, m)?)?;
    m.add_function(wrap_pyfunction!(solve_pso, m)?)?;
    m.add_function(wrap_pyfunction!(solve_de, m)?)?;
    m.add_function(wrap_pyfunction!(solve_bmwr, m)?)?;
    m.add_function(wrap_pyfunction!(solve_samp_jaya, m)?)?;
    m.add_function(wrap_pyfunction!(solve_ehrjaya, m)?)?;
    m.add_function(wrap_pyfunction!(solve_qo_rao, m)?)?;
    m.add_class::<PyMultiObjectiveIndividual>()?;
    m.add_class::<PyMultiObjectiveResult>()?;
    m.add_function(wrap_pyfunction!(solve_mo_bmr, m)?)?;
    m.add_function(wrap_pyfunction!(solve_mo_bwr, m)?)?;
    m.add_function(wrap_pyfunction!(solve_mo_bmwr, m)?)?;
    m.add_function(wrap_pyfunction!(solve_mo_rao_de, m)?)?;
    m.add_function(wrap_pyfunction!(solve_saphr, m)?)?;
    m.add_function(wrap_pyfunction!(status, m)?)?;
    Ok(())
}