import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import algorithmData from '../utils/algorithmData';
import objectiveFunctions from '../utils/objectiveFunctions';

// Register Chart.js components
Chart.register(...registerables);

const ComparisonPage = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState('sphere');
  const [numIterations, setNumIterations] = useState(100);
  const [populationSize, setPopulationSize] = useState(30);
  const [numVariables, setNumVariables] = useState(2);
  const [comparisonResults, setComparisonResults] = useState(null);
  const [isComparing, setIsComparing] = useState(false);

  const handleAlgorithmChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedAlgorithms([...selectedAlgorithms, value]);
    } else {
      setSelectedAlgorithms(selectedAlgorithms.filter(algo => algo !== value));
    }
  };

  const handleFunctionChange = (e) => {
    setSelectedFunction(e.target.value);
    setComparisonResults(null);
  };

  const handleRunComparison = () => {
    if (selectedAlgorithms.length === 0) {
      alert('Please select at least one algorithm to compare');
      return;
    }

    setIsComparing(true);
    
    // Simulate algorithm comparison (in a real app, this would call the actual algorithms)
    setTimeout(() => {
      const iterations = Array.from({ length: numIterations }, (_, i) => i + 1);
      
      // Generate mock comparison results
      const results = selectedAlgorithms.map(algoId => {
        const algorithm = algorithmData.find(a => a.id === algoId);
        
        // Generate different convergence patterns for different algorithm types
        let bestScores;
        if (algorithm.category === 'Metaphor-free') {
          bestScores = iterations.map(i => 10 / (i * 0.15 + 1) + Math.random() * 0.3);
        } else if (algorithm.category === 'Teaching-Learning') {
          bestScores = iterations.map(i => 10 / (i * 0.12 + 1) + Math.random() * 0.4);
        } else if (algorithm.category === 'Opposition-based') {
          bestScores = iterations.map(i => 10 / (i * 0.18 + 1) + Math.random() * 0.2);
        } else {
          bestScores = iterations.map(i => 10 / (i * 0.1 + 1) + Math.random() * 0.5);
        }
        
        return {
          algorithmId: algoId,
          algorithmName: algorithm.shortName,
          bestScores,
          finalBestScore: bestScores[bestScores.length - 1],
          bestSolution: Array(numVariables).fill(0).map(() => Math.random() * 0.2 - 0.1),
          executionTime: Math.random() * 1000 + 500
        };
      });
      
      setComparisonResults({
        iterations,
        results
      });
      
      setIsComparing(false);
    }, 2000);
  };

  const chartData = comparisonResults ? {
    labels: comparisonResults.iterations,
    datasets: comparisonResults.results.map((result, index) => {
      // Generate a color based on index
      const hue = (index * 137) % 360;
      const color = `hsl(${hue}, 70%, 50%)`;
      
      return {
        label: result.algorithmName,
        data: result.bestScores,
        fill: false,
        backgroundColor: color,
        borderColor: color,
        tension: 0.1
      };
    })
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Convergence Comparison'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        position: 'top',
      }
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
      <h1 className="mb-4">Algorithm Comparison</h1>
      
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Comparison Settings</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Select Algorithms to Compare</Form.Label>
                  <div className="algorithm-checkboxes" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {algorithmData.map(algorithm => (
                      <Form.Check 
                        key={algorithm.id}
                        type="checkbox"
                        id={`algorithm-${algorithm.id}`}
                        label={algorithm.shortName}
                        value={algorithm.id}
                        onChange={handleAlgorithmChange}
                      />
                    ))}
                  </div>
                </Form.Group>

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
                  onClick={handleRunComparison} 
                  disabled={isComparing || selectedAlgorithms.length === 0}
                  className="w-100"
                >
                  {isComparing ? 'Comparing...' : 'Run Comparison'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          {comparisonResults ? (
            <>
              <Card className="mb-4">
                <Card.Header>Convergence Comparison</Card.Header>
                <Card.Body>
                  <Line data={chartData} options={chartOptions} height={300} />
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>Comparison Results</Card.Header>
                <Card.Body>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Algorithm</th>
                        <th>Final Best Value</th>
                        <th>Execution Time (ms)</th>
                        <th>Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonResults.results
                        .sort((a, b) => a.finalBestScore - b.finalBestScore)
                        .map((result, index) => (
                          <tr key={result.algorithmId} className={index === 0 ? 'table-success' : ''}>
                            <td>{result.algorithmName}</td>
                            <td>{result.finalBestScore.toFixed(6)}</td>
                            <td>{result.executionTime.toFixed(2)}</td>
                            <td>{index + 1}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                  
                  <div className="mt-4">
                    <h5>Analysis</h5>
                    <p>
                      Based on the comparison results, {comparisonResults.results.sort((a, b) => a.finalBestScore - b.finalBestScore)[0].algorithmName} 
                      performed the best on the {objectiveFunctions.find(f => f.id === selectedFunction).name} with a final objective value 
                      of {comparisonResults.results.sort((a, b) => a.finalBestScore - b.finalBestScore)[0].finalBestScore.toFixed(6)}.
                    </p>
                    <p>
                      The convergence curve shows how each algorithm's performance improved over iterations. Steeper curves indicate 
                      faster convergence to the optimal solution.
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </>
          ) : (
            <Card>
              <Card.Body className="text-center p-5">
                <h4>Select algorithms and run comparison to see results</h4>
                <p className="text-muted">
                  The comparison will show convergence curves and performance metrics for each selected algorithm.
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ComparisonPage;
