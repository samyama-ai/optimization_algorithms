import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} <a href="https://Samyama.ai" target="_blank" rel="noopener noreferrer">Samyama.ai</a>
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0">
              Based on the research work of <a href="https://scholar.google.co.in/citations?user=4NoqGCEAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Prof. R.V. Rao</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
