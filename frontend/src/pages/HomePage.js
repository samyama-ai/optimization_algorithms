import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import algorithmData from '../utils/algorithmData';

const HomePage = () => {
  // Group algorithms by category
  const categorizedAlgorithms = algorithmData.reduce((acc, algorithm) => {
    const category = algorithm.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(algorithm);
    return acc;
  }, {});

  return (
    <Container>
      <div className="text-center mb-5">
        <h1 className="display-4">Optimization Algorithms Visualizer</h1>
        <p className="lead">
          Interactive visualizations of optimization algorithms developed by Prof. R.V. Rao
        </p>
      </div>

      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h2>About This Project</h2>
              <p>
                This interactive platform allows you to explore and visualize various optimization algorithms 
                developed by Prof. R.V. Rao. These algorithms are designed to solve both constrained and 
                unconstrained optimization problems without relying on metaphors or algorithm-specific parameters.
              </p>
              <p>
                You can visualize how each algorithm works, compare their performance on different test functions,
                and learn about the research papers where they were introduced.
              </p>
              <div className="d-flex justify-content-center mt-3">
                <Button as={Link} to="/comparison" variant="primary" className="mx-2">
                  Compare Algorithms
                </Button>
                <Button as={Link} to="/papers" variant="outline-primary" className="mx-2">
                  Research Papers
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {Object.entries(categorizedAlgorithms).map(([category, algorithms]) => (
        <div key={category} className="mb-5">
          <h2 className="mb-4">{category} Algorithms</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {algorithms.map(algorithm => (
              <Col key={algorithm.id}>
                <Card className="h-100 algorithm-card shadow-sm">
                  <Card.Body>
                    <Card.Title>{algorithm.shortName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{algorithm.name}</Card.Subtitle>
                    <Card.Text>{algorithm.description.substring(0, 150)}...</Card.Text>
                    <div className="mb-3">
                      <Badge bg="info" className="me-1">{algorithm.year}</Badge>
                      <Badge bg="secondary">{algorithm.parameters === "No algorithm-specific parameters" ? "Parameter-free" : "Parameterized"}</Badge>
                    </div>
                    <div className="paper-citation">
                      "{algorithm.paperTitle}" - {algorithm.authors} ({algorithm.year})
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0">
                    <Button as={Link} to={`/algorithm/${algorithm.id}`} variant="primary" className="w-100">
                      Explore Algorithm
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default HomePage;
