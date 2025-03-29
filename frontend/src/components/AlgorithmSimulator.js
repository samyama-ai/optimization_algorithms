import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col, Alert, ProgressBar } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const AlgorithmSimulator = ({ algorithm, objectiveFunction }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1000);
  const [simulationSteps, setSimulationSteps] = useState([]);
  const [populationSize, setPopulationSize] = useState(10);
  const [numIterations, setNumIterations] = useState(5);
  
  // Generate simulation steps based on the algorithm
  const generateSimulationSteps = () => {
    const steps = [];
    
    // Step 1: Initialization
    steps.push({
      title: 'Initialization',
      description: `Initialize a population of ${populationSize} solutions randomly within the bounds of the search space.`,
      code: `# Initialize population randomly within bounds
population = np.random.uniform(low=bounds[:, 0], high=bounds[:, 1], 
                              size=(${populationSize}, ${objectiveFunction ? 2 : 'num_variables'}))`,
      visualization: 'random_points'
    });
    
    // Generate algorithm-specific steps
    if (algorithm.id === 'jaya') {
      // Jaya algorithm steps
      steps.push({
        title: 'Evaluate Fitness',
        description: 'Calculate the fitness (objective function value) for each solution in the population.',
        code: `# Evaluate fitness of all solutions
fitness = np.apply_along_axis(objective_func, 1, population)`,
        visualization: 'fitness_evaluation'
      });
      
      steps.push({
        title: 'Identify Best and Worst Solutions',
        description: 'Find the best solution (with minimum fitness value) and worst solution (with maximum fitness value) in the population.',
        code: `# Identify best and worst solutions
best_idx = np.argmin(fitness)
worst_idx = np.argmax(fitness)
best_solution = population[best_idx]
worst_solution = population[worst_idx]`,
        visualization: 'best_worst'
      });
      
      steps.push({
        title: 'Update Solutions',
        description: 'Update each solution by moving toward the best solution and away from the worst solution.',
        code: `# Update each solution
for i in range(population_size):
    r1 = np.random.rand(num_variables)
    r2 = np.random.rand(num_variables)
    
    # Jaya update rule: move toward best and away from worst
    population[i] = population[i] + r1 * (best_solution - np.abs(population[i])) - 
                    r2 * (worst_solution - np.abs(population[i]))`,
        visualization: 'update_solutions'
      });
      
      steps.push({
        title: 'Boundary Handling',
        description: 'Ensure all solutions remain within the bounds of the search space.',
        code: `# Clip solutions to stay within bounds
population = np.clip(population, bounds[:, 0], bounds[:, 1])`,
        visualization: 'boundary_handling'
      });
      
    } else if (algorithm.id === 'bmr') {
      // BMR algorithm steps
      steps.push({
        title: 'Evaluate Fitness',
        description: 'Calculate the fitness (objective function value) for each solution in the population.',
        code: `# Evaluate fitness of all solutions
fitness = np.apply_along_axis(objective_func, 1, population)`,
        visualization: 'fitness_evaluation'
      });
      
      steps.push({
        title: 'Identify Best Solution and Calculate Mean',
        description: 'Find the best solution (with minimum fitness value) and calculate the mean solution across the population.',
        code: `# Identify best solution and calculate mean
best_solution = population[np.argmin(fitness)]
mean_solution = np.mean(population, axis=0)`,
        visualization: 'best_mean'
      });
      
      steps.push({
        title: 'Update Solutions',
        description: 'Update each solution using the BMR update rule, which involves the best solution, mean solution, and a random solution.',
        code: `# Update each solution
for i in range(population_size):
    r1, r2, r3, r4 = np.random.rand(4)
    T = np.random.choice([1, 2])
    random_solution = population[np.random.randint(population_size)]

    if r4 > 0.5:
        population[i] += r1 * (best_solution - T * mean_solution) + 
                         r2 * (best_solution - random_solution)
    else:
        population[i] = bounds[:, 1] - (bounds[:, 1] - bounds[:, 0]) * r3`,
        visualization: 'update_solutions'
      });
      
      steps.push({
        title: 'Boundary Handling',
        description: 'Ensure all solutions remain within the bounds of the search space.',
        code: `# Clip solutions to stay within bounds
population = np.clip(population, bounds[:, 0], bounds[:, 1])`,
        visualization: 'boundary_handling'
      });
      
    } else if (algorithm.id === 'tlbo') {
      // TLBO algorithm steps
      steps.push({
        title: 'Evaluate Fitness',
        description: 'Calculate the fitness (objective function value) for each solution in the population.',
        code: `# Evaluate fitness of all solutions
fitness = np.apply_along_axis(objective_func, 1, population)`,
        visualization: 'fitness_evaluation'
      });
      
      steps.push({
        title: 'Teacher Phase',
        description: 'Identify the best solution as the teacher and update solutions based on the difference between the mean and the teacher.',
        code: `# Teacher Phase
best_idx = np.argmin(fitness)
teacher = population[best_idx]
mean = np.mean(population, axis=0)

for i in range(population_size):
    # Teaching factor: either 1 or 2
    Tf = np.random.choice([1, 2])
    
    # Generate new solution
    new_solution = population[i] + np.random.rand(num_variables) * (teacher - Tf * mean)
    
    # Accept if better
    new_fitness = objective_func(new_solution)
    if new_fitness < fitness[i]:
        population[i] = new_solution
        fitness[i] = new_fitness`,
        visualization: 'teacher_phase'
      });
      
      steps.push({
        title: 'Learner Phase',
        description: 'Update solutions based on the interaction between learners (solutions).',
        code: `# Learner Phase
for i in range(population_size):
    # Randomly select another solution
    j = np.random.randint(population_size)
    while j == i:
        j = np.random.randint(population_size)
    
    # Generate new solution based on comparison
    if fitness[i] < fitness[j]:  # i is better than j
        new_solution = population[i] + np.random.rand(num_variables) * (population[i] - population[j])
    else:  # j is better than i
        new_solution = population[i] + np.random.rand(num_variables) * (population[j] - population[i])
    
    # Accept if better
    new_fitness = objective_func(new_solution)
    if new_fitness < fitness[i]:
        population[i] = new_solution
        fitness[i] = new_fitness`,
        visualization: 'learner_phase'
      });
      
      steps.push({
        title: 'Boundary Handling',
        description: 'Ensure all solutions remain within the bounds of the search space.',
        code: `# Clip solutions to stay within bounds
population = np.clip(population, bounds[:, 0], bounds[:, 1])`,
        visualization: 'boundary_handling'
      });
      
    } else {
      // Generic steps for other algorithms
      steps.push({
        title: 'Evaluate Fitness',
        description: 'Calculate the fitness (objective function value) for each solution in the population.',
        code: `# Evaluate fitness of all solutions
fitness = np.apply_along_axis(objective_func, 1, population)`,
        visualization: 'fitness_evaluation'
      });
      
      steps.push({
        title: 'Update Solutions',
        description: `Update each solution according to the ${algorithm.name} update rules.`,
        code: `# Update solutions according to algorithm-specific rules
# See algorithm pseudocode for details`,
        visualization: 'update_solutions'
      });
      
      steps.push({
        title: 'Boundary Handling',
        description: 'Ensure all solutions remain within the bounds of the search space.',
        code: `# Clip solutions to stay within bounds
population = np.clip(population, bounds[:, 0], bounds[:, 1])`,
        visualization: 'boundary_handling'
      });
    }
    
    // Final step: Return best solution
    steps.push({
      title: 'Return Best Solution',
      description: 'After all iterations, return the best solution found.',
      code: `# Find the best solution in the final population
final_fitness = np.apply_along_axis(objective_func, 1, population)
best_solution = population[np.argmin(final_fitness)]

return best_solution, best_scores`,
      visualization: 'final_solution'
    });
    
    return steps;
  };
  
  // Start simulation
  const startSimulation = () => {
    const steps = generateSimulationSteps();
    setSimulationSteps(steps);
    setCurrentStep(0);
    setIsSimulating(true);
    
    // Automatically advance through steps
    const interval = setInterval(() => {
      setCurrentStep(prevStep => {
        if (prevStep < steps.length - 1) {
          return prevStep + 1;
        } else {
          clearInterval(interval);
          setIsSimulating(false);
          return prevStep;
        }
      });
    }, simulationSpeed);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  };
  
  // Handle manual navigation
  const goToStep = (step) => {
    setCurrentStep(step);
  };
  
  // Handle speed change
  const handleSpeedChange = (e) => {
    setSimulationSpeed(parseInt(e.target.value));
  };
  
  return (
    <div className="algorithm-simulator">
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Header>Simulation Settings</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Population Size: {populationSize}</Form.Label>
                  <Form.Range 
                    min={5} 
                    max={50} 
                    step={5} 
                    value={populationSize} 
                    onChange={(e) => setPopulationSize(parseInt(e.target.value))}
                    disabled={isSimulating}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Number of Iterations: {numIterations}</Form.Label>
                  <Form.Range 
                    min={1} 
                    max={10} 
                    value={numIterations} 
                    onChange={(e) => setNumIterations(parseInt(e.target.value))}
                    disabled={isSimulating}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Simulation Speed</Form.Label>
                  <Form.Select 
                    value={simulationSpeed} 
                    onChange={handleSpeedChange}
                    disabled={isSimulating}
                  >
                    <option value="2000">Slow</option>
                    <option value="1000">Medium</option>
                    <option value="500">Fast</option>
                  </Form.Select>
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  onClick={startSimulation} 
                  disabled={isSimulating}
                  className="w-100"
                >
                  Start Simulation
                </Button>
              </Form>
            </Card.Body>
          </Card>
          
          {simulationSteps.length > 0 && (
            <Card className="mt-3">
              <Card.Header>Simulation Steps</Card.Header>
              <Card.Body>
                <div className="step-navigation">
                  {simulationSteps.map((step, index) => (
                    <Button 
                      key={index}
                      variant={currentStep === index ? "primary" : "outline-primary"}
                      size="sm"
                      className="me-2 mb-2"
                      onClick={() => goToStep(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                
                <ProgressBar 
                  now={(currentStep + 1) / simulationSteps.length * 100} 
                  className="mt-3"
                  label={`${currentStep + 1}/${simulationSteps.length}`}
                />
              </Card.Body>
            </Card>
          )}
        </Col>
        
        <Col md={8}>
          {simulationSteps.length > 0 ? (
            <Card>
              <Card.Header>
                <h5>{simulationSteps[currentStep].title}</h5>
              </Card.Header>
              <Card.Body>
                <p>{simulationSteps[currentStep].description}</p>
                
                <div className="code-block mb-4">
                  <h6>Code:</h6>
                  <SyntaxHighlighter language="python" style={docco} className="rounded">
                    {simulationSteps[currentStep].code}
                  </SyntaxHighlighter>
                </div>
                
                <div className="visualization-placeholder p-4 bg-light rounded text-center">
                  <h6>Visualization: {simulationSteps[currentStep].visualization}</h6>
                  <p className="text-muted">
                    This is a placeholder for the actual visualization of this step.
                    In a complete implementation, this would show an interactive visualization
                    of the {simulationSteps[currentStep].visualization} process.
                  </p>
                </div>
                
                <div className="mt-4">
                  <h6>Explanation:</h6>
                  <p>
                    {currentStep === 0 && `In this step, we initialize ${populationSize} solutions randomly within the bounds of the search space. Each solution is a vector of ${objectiveFunction ? 2 : 'num_variables'} variables.`}
                    
                    {currentStep === 1 && `We evaluate the fitness (objective function value) for each solution in the population. For the ${objectiveFunction?.name || 'selected objective function'}, lower values are better.`}
                    
                    {currentStep === 2 && algorithm.id === 'jaya' && `We identify the best solution (with minimum fitness value) and worst solution (with maximum fitness value) in the population. These will guide the search process.`}
                    
                    {currentStep === 2 && algorithm.id === 'bmr' && `We identify the best solution (with minimum fitness value) and calculate the mean solution across the population. These will guide the search process.`}
                    
                    {currentStep === 2 && algorithm.id === 'tlbo' && `In the Teacher Phase, we identify the best solution as the teacher and update solutions based on the difference between the mean and the teacher. The teaching factor (Tf) is randomly chosen as either 1 or 2.`}
                    
                    {currentStep === 3 && algorithm.id === 'jaya' && `We update each solution by moving toward the best solution and away from the worst solution. The random vectors r1 and r2 add stochasticity to the search process.`}
                    
                    {currentStep === 3 && algorithm.id === 'bmr' && `We update each solution using the BMR update rule. If r4 > 0.5, we move toward the best solution and away from the mean solution and a random solution. Otherwise, we perform random exploration.`}
                    
                    {currentStep === 3 && algorithm.id === 'tlbo' && `In the Learner Phase, solutions learn from each other. Each solution is compared with a randomly selected solution, and the update direction depends on which one is better.`}
                    
                    {(currentStep === 4 && (algorithm.id === 'jaya' || algorithm.id === 'bmr')) && `We ensure all solutions remain within the bounds of the search space by clipping any values that exceed the bounds.`}
                    
                    {(currentStep === 4 && algorithm.id === 'tlbo') && `We ensure all solutions remain within the bounds of the search space by clipping any values that exceed the bounds.`}
                    
                    {currentStep === simulationSteps.length - 1 && `After all iterations, we return the best solution found in the final population. This solution represents the optimum found by the ${algorithm.name}.`}
                  </p>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="outline-primary" 
                    disabled={currentStep === 0}
                    onClick={() => goToStep(currentStep - 1)}
                  >
                    Previous Step
                  </Button>
                  
                  <Button 
                    variant="outline-primary" 
                    disabled={currentStep === simulationSteps.length - 1}
                    onClick={() => goToStep(currentStep + 1)}
                  >
                    Next Step
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          ) : (
            <Card>
              <Card.Body className="text-center p-5">
                <h4>Algorithm Simulation</h4>
                <p className="text-muted">
                  This simulation will walk you through the steps of the {algorithm.name} algorithm.
                  Configure the settings and click "Start Simulation" to begin.
                </p>
                <Alert variant="info">
                  The simulation will demonstrate how {algorithm.name} works on the {objectiveFunction?.name || 'selected objective function'}.
                </Alert>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AlgorithmSimulator;
