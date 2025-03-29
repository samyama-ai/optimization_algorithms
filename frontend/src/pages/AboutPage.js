import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container className="mt-4 mb-5">
      <h1 className="mb-4">About This Project</h1>
      
      <Row className="mb-5">
        <Col>
          <Card>
            <Card.Body>
              <h3>Optimization Algorithms Visualizer</h3>
              <p>
                This interactive platform is designed to visualize and demonstrate the optimization algorithms 
                developed by Prof. R.V. Rao and his colleagues. The goal is to provide a comprehensive, 
                educational resource for understanding these powerful optimization techniques and their 
                applications in solving real-world problems.
              </p>
              <p>
                The visualizer allows users to:
              </p>
              <ul>
                <li>Explore individual algorithms and their characteristics</li>
                <li>Visualize how algorithms converge on different test functions</li>
                <li>Compare the performance of multiple algorithms</li>
                <li>Access the original research papers and citations</li>
                <li>Understand the mathematical foundations of each algorithm</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <h2 className="mb-4">About Prof. R.V. Rao</h2>
      <Row className="mb-5">
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <div className="mb-3">
                {/* Placeholder for profile image */}
                <div style={{ 
                  width: '150px', 
                  height: '150px', 
                  background: '#e9ecef', 
                  borderRadius: '50%', 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  color: '#6c757d'
                }}>
                  Prof. R.V. Rao
                </div>
              </div>
              <h4>Prof. Ravipudi Venkata Rao</h4>
              <p className="text-muted">Professor and Researcher</p>
              <p>Sardar Vallabhbhai National Institute of Technology, Surat, India</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <h4>Biography</h4>
              <p>
                Prof. Ravipudi Venkata Rao is a distinguished researcher and professor known for his 
                significant contributions to the field of optimization algorithms. He has developed 
                several innovative optimization techniques, including the Jaya Algorithm, Teaching-Learning-Based 
                Optimization (TLBO), and the Rao Algorithms.
              </p>
              <p>
                His research focuses on developing simple, efficient, and parameter-free optimization 
                algorithms that can be applied to a wide range of engineering and scientific problems. 
                Prof. Rao's algorithms are particularly notable for their effectiveness in solving both 
                constrained and unconstrained optimization problems without requiring algorithm-specific 
                parameter tuning.
              </p>
              <p>
                Prof. Rao has published numerous research papers in prestigious international journals 
                and has authored several books on optimization techniques. His work has been widely cited 
                and has influenced research in various fields, including mechanical engineering, electrical 
                engineering, and computer science.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <h2 className="mb-4">Key Innovations</h2>
      <Row xs={1} md={2} className="g-4 mb-5">
        <Col>
          <Card className="h-100">
            <Card.Body>
              <h4>Metaphor-Free Algorithms</h4>
              <p>
                Unlike many nature-inspired optimization algorithms, Prof. Rao's algorithms (such as Jaya and 
                Rao Algorithms) do not rely on metaphors from natural processes. This approach simplifies the 
                algorithms and makes them more accessible and easier to implement.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body>
              <h4>Parameter-Less Optimization</h4>
              <p>
                Many of Prof. Rao's algorithms do not require algorithm-specific parameters to be tuned, 
                which is a significant advantage over other optimization techniques. This eliminates the 
                need for parameter sensitivity analysis and makes the algorithms more robust across different 
                problem domains.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body>
              <h4>Teaching-Learning Paradigm</h4>
              <p>
                The Teaching-Learning-Based Optimization (TLBO) algorithm introduced a novel paradigm based on 
                the teaching-learning process in a classroom. This approach has proven highly effective for 
                solving complex optimization problems and has inspired numerous variants and applications.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body>
              <h4>Practical Applications</h4>
              <p>
                Prof. Rao's algorithms have been successfully applied to a wide range of real-world problems, 
                including mechanical design optimization, manufacturing process optimization, thermal system 
                design, and many others. Their simplicity and effectiveness make them valuable tools for 
                engineers and researchers across disciplines.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <h2 className="mb-4">About This Visualizer</h2>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <p>
                This visualizer was created to provide an interactive platform for exploring and understanding 
                the optimization algorithms developed by Prof. R.V. Rao. It is designed to be educational and 
                informative, allowing users to:
              </p>
              <ul>
                <li>Visualize how different algorithms converge on various test functions</li>
                <li>Compare the performance of multiple algorithms side by side</li>
                <li>Understand the mathematical foundations and pseudocode of each algorithm</li>
                <li>Access the original research papers and proper citations</li>
                <li>Learn about the practical applications of these optimization techniques</li>
              </ul>
              <p>
                The visualizer includes implementations of several key algorithms, including BMR, BWR, Jaya, 
                Rao Algorithms (Rao-1, Rao-2, Rao-3), TLBO, QOJAYA, GOTLBO, ITLBO, and Multi-objective TLBO.
              </p>
              <p>
                We hope this platform serves as a valuable resource for students, researchers, and practitioners 
                interested in optimization algorithms and their applications.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <h2 className="mb-4">Contact Information</h2>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h4>For More Information</h4>
              <p>
                For more information about Prof. R.V. Rao's research and publications, please visit his 
                academic profile or refer to his published works in the Research Papers section of this 
                application.
              </p>
              <p>
                If you have questions or feedback about this visualization platform, please contact us 
                at the email address below.
              </p>
              <p className="mb-0">
                <strong>Email:</strong> contact@raoalgorithms-visualizer.org
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h4>References</h4>
              <p>
                This visualizer is based on the research published in various journals and conference 
                proceedings. For a complete list of references, please visit the Research Papers section.
              </p>
              <p>
                The test functions used for algorithm evaluation are standard benchmark functions widely 
                used in the optimization literature.
              </p>
              <p>
                All visualizations and simulations are for educational purposes and may not fully represent 
                the performance of the algorithms in complex real-world scenarios.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
