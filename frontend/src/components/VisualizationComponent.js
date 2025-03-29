import React, { useState, useEffect } from 'react';
import { Spinner, Tabs, Tab } from 'react-bootstrap';
import Plot from 'react-plotly.js';
import objectiveFunctions from '../utils/objectiveFunctions';

const VisualizationComponent = ({ functionId, algorithmId, simulationResults }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contour');
  const [plotData, setPlotData] = useState([]);
  const [plotLayout, setPlotLayout] = useState({});
  const [plotConfig, setPlotConfig] = useState({});

  useEffect(() => {
    if (!functionId) return;
    
    setIsLoading(true);
    
    // Get the selected objective function
    const objectiveFunction = objectiveFunctions.find(func => func.id === functionId);
    if (!objectiveFunction) return;
    
    // Generate data for the selected visualization
    try {
      if (activeTab === 'contour') {
        generateContourPlot(objectiveFunction);
      } else if (activeTab === 'surface') {
        generate3DSurfacePlot(objectiveFunction);
      } else if (activeTab === 'optimization') {
        generateOptimizationVisualization(objectiveFunction, simulationResults);
      }
    } catch (error) {
      console.error('Error generating visualization:', error);
    }
    
  }, [functionId, algorithmId, simulationResults, activeTab]);

  // Function to generate a contour plot
  const generateContourPlot = (objectiveFunction) => {
    const { bounds } = objectiveFunction;
    const minX = bounds[0];
    const maxX = bounds[1];
    const minY = bounds[0];
    const maxY = bounds[1];
    
    // Create a grid of x and y values
    const resolution = 100;
    const step = (maxX - minX) / (resolution - 1);
    
    const x = Array.from({ length: resolution }, (_, i) => minX + i * step);
    const y = Array.from({ length: resolution }, (_, i) => minY + i * step);
    
    // Calculate z values for the grid
    const z = [];
    for (let i = 0; i < resolution; i++) {
      z[i] = [];
      for (let j = 0; j < resolution; j++) {
        const xVal = x[j];
        const yVal = y[i];
        z[i][j] = calculateFunctionValue(objectiveFunction, xVal, yVal);
      }
    }
    
    // Create the contour plot
    const data = [
      {
        type: 'contour',
        z: z,
        x: x,
        y: y,
        colorscale: 'Jet',
        contours: {
          coloring: 'heatmap',
          showlabels: true,
        },
        colorbar: {
          title: 'Function Value',
          titleside: 'right',
        },
      }
    ];
    
    // Add global minimum point if available
    if (objectiveFunction.globalMinimum) {
      let minX, minY;
      
      if (objectiveFunction.globalMinimum.position === "Origin (all zeros)") {
        minX = 0;
        minY = 0;
      } else if (objectiveFunction.globalMinimum.position === "All ones") {
        minX = 1;
        minY = 1;
      } else if (objectiveFunction.globalMinimum.position === "(3, 0.5)") {
        minX = 3;
        minY = 0.5;
      } else {
        // Default to origin
        minX = 0;
        minY = 0;
      }
      
      data.push({
        type: 'scatter',
        x: [minX],
        y: [minY],
        mode: 'markers',
        marker: {
          color: 'white',
          size: 10,
          line: {
            color: 'black',
            width: 2
          }
        },
        name: 'Global Minimum'
      });
    }
    
    // Add best solution point if available
    if (simulationResults && simulationResults.bestSolution && simulationResults.bestSolution.length >= 2) {
      data.push({
        type: 'scatter',
        x: [simulationResults.bestSolution[0]],
        y: [simulationResults.bestSolution[1]],
        mode: 'markers',
        marker: {
          color: 'yellow',
          size: 12,
          line: {
            color: 'black',
            width: 2
          }
        },
        name: 'Best Solution'
      });
    }
    
    const layout = {
      title: `${objectiveFunction.name} - Contour Plot`,
      xaxis: {
        title: 'x',
        range: [minX, maxX]
      },
      yaxis: {
        title: 'y',
        range: [minY, maxY]
      },
      autosize: true,
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 4
      },
      paper_bgcolor: '#f8f9fa',
      plot_bgcolor: '#f8f9fa'
    };
    
    const config = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
      modeBarButtonsToRemove: ['lasso2d', 'select2d']
    };
    
    setPlotData(data);
    setPlotLayout(layout);
    setPlotConfig(config);
    setIsLoading(false);
  };

  // Function to generate a 3D surface plot
  const generate3DSurfacePlot = (objectiveFunction) => {
    const { bounds } = objectiveFunction;
    const minX = bounds[0];
    const maxX = bounds[1];
    const minY = bounds[0];
    const maxY = bounds[1];
    
    // Create a grid of x and y values
    const resolution = 50;
    const step = (maxX - minX) / (resolution - 1);
    
    const x = Array.from({ length: resolution }, (_, i) => minX + i * step);
    const y = Array.from({ length: resolution }, (_, i) => minY + i * step);
    
    // Calculate z values for the grid
    const z = [];
    for (let i = 0; i < resolution; i++) {
      z[i] = [];
      for (let j = 0; j < resolution; j++) {
        const xVal = x[j];
        const yVal = y[i];
        z[i][j] = calculateFunctionValue(objectiveFunction, xVal, yVal);
      }
    }
    
    // Create the 3D surface plot
    const data = [
      {
        type: 'surface',
        z: z,
        x: x,
        y: y,
        colorscale: 'Jet',
        contours: {
          z: {
            show: true,
            usecolormap: true,
            highlightcolor: "#42f462",
            project: { z: true }
          }
        },
        colorbar: {
          title: 'Function Value',
          titleside: 'right',
        },
      }
    ];
    
    // Add global minimum point if available
    if (objectiveFunction.globalMinimum) {
      let minX, minY;
      
      if (objectiveFunction.globalMinimum.position === "Origin (all zeros)") {
        minX = 0;
        minY = 0;
      } else if (objectiveFunction.globalMinimum.position === "All ones") {
        minX = 1;
        minY = 1;
      } else if (objectiveFunction.globalMinimum.position === "(3, 0.5)") {
        minX = 3;
        minY = 0.5;
      } else {
        // Default to origin
        minX = 0;
        minY = 0;
      }
      
      const minZ = calculateFunctionValue(objectiveFunction, minX, minY);
      
      data.push({
        type: 'scatter3d',
        x: [minX],
        y: [minY],
        z: [minZ],
        mode: 'markers',
        marker: {
          color: 'white',
          size: 5,
          line: {
            color: 'black',
            width: 1
          }
        },
        name: 'Global Minimum'
      });
    }
    
    // Add best solution point if available
    if (simulationResults && simulationResults.bestSolution && simulationResults.bestSolution.length >= 2) {
      const bestX = simulationResults.bestSolution[0];
      const bestY = simulationResults.bestSolution[1];
      const bestZ = calculateFunctionValue(objectiveFunction, bestX, bestY);
      
      data.push({
        type: 'scatter3d',
        x: [bestX],
        y: [bestY],
        z: [bestZ],
        mode: 'markers',
        marker: {
          color: 'yellow',
          size: 6,
          line: {
            color: 'black',
            width: 1
          }
        },
        name: 'Best Solution'
      });
    }
    
    const layout = {
      title: `${objectiveFunction.name} - 3D Surface`,
      autosize: true,
      scene: {
        xaxis: {
          title: 'x',
          range: [minX, maxX]
        },
        yaxis: {
          title: 'y',
          range: [minY, maxY]
        },
        zaxis: {
          title: 'f(x,y)'
        },
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1 }
        }
      },
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 50,
        pad: 4
      },
      paper_bgcolor: '#f8f9fa',
      plot_bgcolor: '#f8f9fa'
    };
    
    const config = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false
    };
    
    setPlotData(data);
    setPlotLayout(layout);
    setPlotConfig(config);
    setIsLoading(false);
  };

  // Function to generate optimization visualization
  const generateOptimizationVisualization = (objectiveFunction, simulationResults) => {
    // If no simulation results, generate contour plot with a message
    if (!simulationResults) {
      generateContourPlot(objectiveFunction);
      return;
    }
    
    const { bounds } = objectiveFunction;
    const minX = bounds[0];
    const maxX = bounds[1];
    const minY = bounds[0];
    const maxY = bounds[1];
    
    // Create a grid of x and y values for the contour plot
    const resolution = 100;
    const step = (maxX - minX) / (resolution - 1);
    
    const x = Array.from({ length: resolution }, (_, i) => minX + i * step);
    const y = Array.from({ length: resolution }, (_, i) => minY + i * step);
    
    // Calculate z values for the grid
    const z = [];
    for (let i = 0; i < resolution; i++) {
      z[i] = [];
      for (let j = 0; j < resolution; j++) {
        const xVal = x[j];
        const yVal = y[i];
        z[i][j] = calculateFunctionValue(objectiveFunction, xVal, yVal);
      }
    }
    
    // Create the contour plot
    const data = [
      {
        type: 'contour',
        z: z,
        x: x,
        y: y,
        colorscale: 'Jet',
        contours: {
          coloring: 'heatmap',
          showlabels: true,
        },
        colorbar: {
          title: 'Function Value',
          titleside: 'right',
        },
      }
    ];
    
    // Simulate optimization path (since we don't have actual path data)
    // In a real implementation, this would use the actual path data from the algorithm
    const pathPoints = [];
    const numPoints = Math.min(20, simulationResults.iterations.length);
    
    for (let i = 0; i < numPoints; i++) {
      // Generate a path that converges to the best solution
      const t = i / (numPoints - 1);
      const randomOffset = (1 - t) * (Math.random() * 2 - 1);
      
      const pathX = simulationResults.bestSolution[0] + randomOffset * (bounds[1] - bounds[0]) * 0.2;
      const pathY = simulationResults.bestSolution[1] + randomOffset * (bounds[1] - bounds[0]) * 0.2;
      
      pathPoints.push({ x: pathX, y: pathY });
    }
    
    // Add path to the plot
    const pathX = pathPoints.map(p => p.x);
    const pathY = pathPoints.map(p => p.y);
    
    data.push({
      type: 'scatter',
      x: pathX,
      y: pathY,
      mode: 'lines+markers',
      line: {
        color: 'white',
        width: 2
      },
      marker: {
        color: pathX.map((_, i) => `rgba(255, 255, 255, ${0.3 + (i / (pathX.length - 1)) * 0.7})`),
        size: pathX.map((_, i) => 3 + (i / (pathX.length - 1)) * 4)
      },
      name: 'Optimization Path'
    });
    
    // Add best solution point
    data.push({
      type: 'scatter',
      x: [simulationResults.bestSolution[0]],
      y: [simulationResults.bestSolution[1]],
      mode: 'markers',
      marker: {
        color: 'yellow',
        size: 12,
        line: {
          color: 'black',
          width: 2
        }
      },
      name: 'Best Solution'
    });
    
    // Add global minimum if available
    if (objectiveFunction.globalMinimum) {
      let minX, minY;
      
      if (objectiveFunction.globalMinimum.position === "Origin (all zeros)") {
        minX = 0;
        minY = 0;
      } else if (objectiveFunction.globalMinimum.position === "All ones") {
        minX = 1;
        minY = 1;
      } else if (objectiveFunction.globalMinimum.position === "(3, 0.5)") {
        minX = 3;
        minY = 0.5;
      } else {
        // Default to origin
        minX = 0;
        minY = 0;
      }
      
      data.push({
        type: 'scatter',
        x: [minX],
        y: [minY],
        mode: 'markers',
        marker: {
          color: 'white',
          size: 10,
          line: {
            color: 'black',
            width: 2
          }
        },
        name: 'Global Minimum'
      });
    }
    
    const layout = {
      title: `${objectiveFunction.name} - Optimization Path`,
      xaxis: {
        title: 'x',
        range: [minX, maxX]
      },
      yaxis: {
        title: 'y',
        range: [minY, maxY]
      },
      autosize: true,
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 4
      },
      paper_bgcolor: '#f8f9fa',
      plot_bgcolor: '#f8f9fa'
    };
    
    const config = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
      modeBarButtonsToRemove: ['lasso2d', 'select2d']
    };
    
    setPlotData(data);
    setPlotLayout(layout);
    setPlotConfig(config);
    setIsLoading(false);
  };

  // Helper function to calculate function value for a given point
  const calculateFunctionValue = (objectiveFunction, x, y) => {
    switch (objectiveFunction.id) {
      case 'sphere':
        return x * x + y * y;
      case 'rastrigin':
        return 20 + x * x + y * y - 10 * (Math.cos(2 * Math.PI * x) + Math.cos(2 * Math.PI * y));
      case 'ackley':
        return -20 * Math.exp(-0.2 * Math.sqrt(0.5 * (x * x + y * y))) - 
                Math.exp(0.5 * (Math.cos(2 * Math.PI * x) + Math.cos(2 * Math.PI * y))) + 20 + Math.E;
      case 'rosenbrock':
        return 100 * Math.pow(y - x * x, 2) + Math.pow(x - 1, 2);
      case 'beale':
        return Math.pow(1.5 - x + x * y, 2) + 
                Math.pow(2.25 - x + x * y * y, 2) + 
                Math.pow(2.625 - x + x * y * y * y, 2);
      case 'himmelblau':
        return Math.pow(x * x + y - 11, 2) + Math.pow(x + y * y - 7, 2);
      case 'griewank':
        return 1 + (x * x + y * y) / 4000 - Math.cos(x) * Math.cos(y / Math.sqrt(2));
      case 'levy':
        const w1 = 1 + (x - 1) / 4;
        const w2 = 1 + (y - 1) / 4;
        return Math.pow(Math.sin(Math.PI * w1), 2) + 
                Math.pow(w1 - 1, 2) * (1 + 10 * Math.pow(Math.sin(Math.PI * w1 + 1), 2)) + 
                Math.pow(w2 - 1, 2) * (1 + Math.pow(Math.sin(2 * Math.PI * w2), 2));
      case 'constrained':
        return x * x + y * y + x * y - 10 * x - 15 * y;
      default:
        return x * x + y * y; // Default to sphere function
    }
  };

  return (
    <div className="visualization-container">
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="contour" title="Contour Plot">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div style={{ height: '400px', width: '100%' }}>
              <Plot
                data={plotData}
                layout={plotLayout}
                config={plotConfig}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          )}
        </Tab>
        <Tab eventKey="surface" title="3D Surface">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div style={{ height: '400px', width: '100%' }}>
              <Plot
                data={plotData}
                layout={plotLayout}
                config={plotConfig}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          )}
        </Tab>
        <Tab eventKey="optimization" title="Optimization Path">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div style={{ height: '400px', width: '100%' }}>
              <Plot
                data={plotData}
                layout={plotLayout}
                config={plotConfig}
                style={{ width: '100%', height: '100%' }}
              />
              {!simulationResults && (
                <div className="position-absolute top-50 start-50 translate-middle text-center bg-dark bg-opacity-75 text-white p-3 rounded">
                  <p>Run a simulation to see the optimization path</p>
                </div>
              )}
            </div>
          )}
        </Tab>
      </Tabs>
      
      <div className="mt-3 text-center">
        <small className="text-muted">
          Note: Visualizations are simplified representations for educational purposes.
          {!simulationResults && activeTab === 'optimization' && 
            " Run a simulation to see the optimization path."}
        </small>
      </div>
    </div>
  );
};

export default VisualizationComponent;
