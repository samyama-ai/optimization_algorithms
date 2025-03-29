import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Tabs, Tab, Form, Alert } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import algorithmData from '../utils/algorithmData';
import objectiveFunctions from '../utils/objectiveFunctions';
import VisualizationComponent from '../components/VisualizationComponent';
import AlgorithmSimulator from '../components/AlgorithmSimulator';

// Register Chart.js components
Chart.register(...registerables);

const AlgorithmPage = () => {
  const { id } = useParams();
  const [algorithm, setAlgorithm] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState('sphere');
  const [numIterations, setNumIterations] = useState(100);
  const [populationSize, setPopulationSize] = useState(30);
  const [numVariables, setNumVariables] = useState(2);
  const [simulationResults, setSimulationResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const foundAlgorithm = algorithmData.find(algo => algo.id === id);
    setAlgorithm(foundAlgorithm);
    
    // Reset simulation results when algorithm changes
    setSimulationResults(null);
  }, [id]);

  const handleFunctionChange = (e) => {
    setSelectedFunction(e.target.value);
    setSimulationResults(null);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    
    // Simulate algorithm execution (in a real app, this would call the actual algorithm)
    setTimeout(() => {
      // Generate mock simulation results
      const iterations = Array.from({ length: numIterations }, (_, i) => i + 1);
      const bestScores = iterations.map(i => 10 / (i * 0.1 + 1) + Math.random() * 0.5);
      
      setSimulationResults({
        iterations,
        bestScores,
        bestSolution: Array(numVariables).fill(0).map(() => Math.random() * 0.1 - 0.05),
        executionTime: Math.random() * 1000 + 500
      });
      
      setIsSimulating(false);
    }, 1500);
  };

  if (!algorithm) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Algorithm not found</Alert>
        <Button as={Link} to="/" variant="primary">Back to Home</Button>
      </Container>
    );
  }

  const chartData = simulationResults ? {
    labels: simulationResults.iterations,
    datasets: [
      {
        label: 'Best Score',
        data: simulationResults.bestScores,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Convergence Curve'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Iteration'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Objective Function Value'
        },
        min: 0
      }
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="mb-4">
        <Col>
          <h1>{algorithm.name}</h1>
          <div className="paper-citation mb-3">
            "{algorithm.paperTitle}" - {algorithm.authors} ({algorithm.year})
          </div>
          <p>{algorithm.description}</p>
          <Button as={Link} to="/" variant="outline-primary" className="me-2">
            Back to Home
          </Button>
          <Button as="a" href={algorithm.link} target="_blank" variant="outline-secondary">
            View Research Paper
          </Button>
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="overview" title="Overview">
          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>Algorithm Details</Card.Header>
                <Card.Body>
                  <p><strong>Category:</strong> {algorithm.category}</p>
                  <p><strong>Parameters:</strong> {algorithm.parameters}</p>
                  <p><strong>Year Published:</strong> {algorithm.year}</p>
                  <p><strong>Journal/Conference:</strong> {algorithm.journal}</p>
                  <p><strong>Applications:</strong></p>
                  <ul>
                    {algorithm.applications.map((app, index) => (
                      <li key={index}>{app}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>Pseudocode</Card.Header>
                <Card.Body>
                  <SyntaxHighlighter language="python" style={docco} className="rounded">
                    {algorithm.pseudocode}
                  </SyntaxHighlighter>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Header>Paper Abstract & Citation</Card.Header>
                <Card.Body>
                  <div className="paper-info">
                    <p className="author-info">{algorithm.authors}</p>
                    <p className="paper-title">"{algorithm.paperTitle}"</p>
                    <p className="journal-info">{algorithm.journal}</p>
                    <p>
                      This paper introduces the {algorithm.name}, a novel optimization algorithm 
                      designed to solve complex optimization problems efficiently. The algorithm 
                      {algorithm.category === "Metaphor-free" 
                        ? " does not rely on any nature-inspired metaphors and " 
                        : " "} 
                      {algorithm.parameters === "No algorithm-specific parameters" 
                        ? "does not require any algorithm-specific control parameters to be tuned." 
                        : "requires minimal parameter tuning."}
                    </p>
                    <div className="mt-3">
                      <strong>Citation:</strong>
                      <div className="mt-2 p-3 bg-light rounded">
                        {algorithm.authors} ({algorithm.year}). {algorithm.paperTitle}. <em>{algorithm.journal}</em>.
                        {algorithm.link && <div className="mt-2">DOI: <a href={algorithm.link} target="_blank" rel="noopener noreferrer">{algorithm.link}</a></div>}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="visualization" title="Visualization">
          <Row>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Header>Visualization Settings</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Objective Function</Form.Label>
                      <Form.Select value={selectedFunction} onChange={handleFunctionChange}>
                        {objectiveFunctions.map(func => (
                          <option key={func.id} value={func.id}>{func.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Number of Iterations: {numIterations}</Form.Label>
                      <Form.Range 
                        min={10} 
                        max={500} 
                        step={10} 
                        value={numIterations} 
                        onChange={(e) => setNumIterations(parseInt(e.target.value))}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Population Size: {populationSize}</Form.Label>
                      <Form.Range 
                        min={10} 
                        max={100} 
                        step={5} 
                        value={populationSize} 
                        onChange={(e) => setPopulationSize(parseInt(e.target.value))}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Number of Variables: {numVariables}</Form.Label>
                      <Form.Range 
                        min={2} 
                        max={10} 
                        value={numVariables} 
                        onChange={(e) => setNumVariables(parseInt(e.target.value))}
                        disabled={selectedFunction === 'beale' || selectedFunction === 'himmelblau' || selectedFunction === 'constrained'}
                      />
                      {(selectedFunction === 'beale' || selectedFunction === 'himmelblau' || selectedFunction === 'constrained') && (
                        <Form.Text className="text-muted">
                          This function is fixed at 2 dimensions.
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Button 
                      variant="primary" 
                      onClick={handleRunSimulation} 
                      disabled={isSimulating}
                      className="w-100"
                    >
                      {isSimulating ? 'Simulating...' : 'Run Simulation'}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>Function Details</Card.Header>
                <Card.Body>
                  {objectiveFunctions.find(func => func.id === selectedFunction) && (
                    <>
                      <h5>{objectiveFunctions.find(func => func.id === selectedFunction).name}</h5>
                      <div className="math-formula">
                        <BlockMath>{objectiveFunctions.find(func => func.id === selectedFunction).formula}</BlockMath>
                      </div>
                      <p>{objectiveFunctions.find(func => func.id === selectedFunction).description}</p>
                      <p><strong>Global Minimum:</strong> {objectiveFunctions.find(func => func.id === selectedFunction).globalMinimum.value} at {objectiveFunctions.find(func => func.id === selectedFunction).globalMinimum.position}</p>
                      <p><strong>Bounds:</strong> [{objectiveFunctions.find(func => func.id === selectedFunction).bounds[0]}, {objectiveFunctions.find(func => func.id === selectedFunction).bounds[1]}]</p>
                      {objectiveFunctions.find(func => func.id === selectedFunction).constraints && (
                        <>
                          <p><strong>Constraints:</strong></p>
                          <ul>
                            {objectiveFunctions.find(func => func.id === selectedFunction).constraints.map((constraint, index) => (
                              <li key={index}><InlineMath>{constraint}</InlineMath></li>
                            ))}
                          </ul>
                        </>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col md={8}>
              <Card className="mb-4">
                <Card.Header>Visualization</Card.Header>
                <Card.Body>
                  <VisualizationComponent 
                    functionId={selectedFunction} 
                    algorithmId={algorithm.id}
                    simulationResults={simulationResults}
                  />
                </Card.Body>
              </Card>

              {simulationResults && (
                <>
                  <Card className="mb-4">
                    <Card.Header>Convergence Curve</Card.Header>
                    <Card.Body>
                      <Line data={chartData} options={chartOptions} />
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Header>Simulation Results</Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <h5>Best Solution Found:</h5>
                          <div className="solution-display">
                            {simulationResults.bestSolution.map((val, idx) => (
                              <div key={idx}>x<sub>{idx+1}</sub> = {val.toFixed(6)}</div>
                            ))}
                          </div>
                        </Col>
                        <Col md={6}>
                          <h5>Performance Metrics:</h5>
                          <p><strong>Final Objective Value:</strong> {simulationResults.bestScores[simulationResults.bestScores.length - 1].toFixed(6)}</p>
                          <p><strong>Execution Time:</strong> {simulationResults.executionTime.toFixed(2)} ms</p>
                          <p><strong>Iterations:</strong> {numIterations}</p>
                          <p><strong>Population Size:</strong> {populationSize}</p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </>
              )}
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="simulation" title="Algorithm Simulation">
          <AlgorithmSimulator 
            algorithm={algorithm} 
            objectiveFunction={objectiveFunctions.find(func => func.id === selectedFunction)}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AlgorithmPage;
