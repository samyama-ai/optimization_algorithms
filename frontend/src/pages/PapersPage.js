import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import algorithmData from '../utils/algorithmData';

const PapersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Extract unique categories and years
  const categories = ['all', ...new Set(algorithmData.map(algo => algo.category))];
  const years = ['all', ...new Set(algorithmData.map(algo => algo.year))].sort((a, b) => b - a);

  // Filter papers based on search term and filters
  const filteredPapers = algorithmData.filter(paper => {
    const matchesSearch = searchTerm === '' || 
      paper.paperTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.journal.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || paper.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || paper.year === selectedYear;
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <Container className="mt-4 mb-5">
      <h1 className="mb-4">Research Papers</h1>
      
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search papers by title, author, or journal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year === 'all' ? 'All Years' : year}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      
      {filteredPapers.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredPapers.map(paper => (
            <Col key={paper.id}>
              <Card className="h-100 paper-card shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg="primary">{paper.year}</Badge>
                    <Badge bg="secondary">{paper.category}</Badge>
                  </div>
                  <Card.Title>{paper.shortName}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted paper-journal">
                    {paper.journal}
                  </Card.Subtitle>
                  <Card.Text className="paper-title">
                    "{paper.paperTitle}"
                  </Card.Text>
                  <Card.Text className="author-info">
                    {paper.authors}
                  </Card.Text>
                  <div className="d-flex justify-content-between mt-3">
                    <Button as={Link} to={`/algorithm/${paper.id}`} variant="outline-primary" size="sm">
                      View Algorithm
                    </Button>
                    <Button as="a" href={paper.link} target="_blank" variant="outline-secondary" size="sm">
                      View Paper
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center p-5">
          <h4>No papers found matching your criteria</h4>
          <p>Try adjusting your search terms or filters</p>
          <Button variant="primary" onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
            setSelectedYear('all');
          }}>
            Reset Filters
          </Button>
        </div>
      )}
      
      <div className="mt-5 p-4 bg-light rounded">
        <h3>About the Research</h3>
        <p>
          The optimization algorithms showcased in this application are based on the groundbreaking research 
          conducted by Prof. R.V. Rao and his colleagues. These algorithms represent significant advancements 
          in the field of optimization, offering efficient solutions for both constrained and unconstrained 
          optimization problems.
        </p>
        <p>
          Many of these algorithms are metaphor-free and parameter-less, making them particularly attractive 
          for real-world applications where parameter tuning can be challenging. The research spans over a 
          decade, with continuous improvements and innovations in optimization techniques.
        </p>
        <p>
          For comprehensive understanding of these algorithms, we recommend referring to the original research 
          papers linked above.
        </p>
      </div>
    </Container>
  );
};

export default PapersPage;
