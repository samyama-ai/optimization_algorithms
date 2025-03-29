const objectiveFunctions = [
  {
    id: "sphere",
    name: "Sphere Function",
    formula: "f(x) = \\sum_{i=1}^{n} x_i^2",
    description: "The Sphere function is one of the simplest unimodal test functions. It is continuous, convex, and differentiable. The global minimum is at the origin with a function value of 0.",
    bounds: [-5.12, 5.12],
    globalMinimum: {
      position: "Origin (all zeros)",
      value: 0
    },
    code: `function sphere(x) {
  return x.reduce((sum, xi) => sum + xi * xi, 0);
}`,
    visualization: "3D surface and contour plot for 2D version",
    difficulty: "Easy",
    properties: ["Unimodal", "Separable", "Convex", "Differentiable"]
  },
  {
    id: "rastrigin",
    name: "Rastrigin Function",
    formula: "f(x) = 10n + \\sum_{i=1}^{n} [x_i^2 - 10\\cos(2\\pi x_i)]",
    description: "The Rastrigin function is a non-convex, multimodal function with many local minima arranged in a regular pattern. It is a challenging test function due to its large search space and numerous local minima.",
    bounds: [-5.12, 5.12],
    globalMinimum: {
      position: "Origin (all zeros)",
      value: 0
    },
    code: `function rastrigin(x) {
  const n = x.length;
  return 10 * n + x.reduce((sum, xi) => sum + (xi * xi - 10 * Math.cos(2 * Math.PI * xi)), 0);
}`,
    visualization: "3D surface and contour plot for 2D version",
    difficulty: "Hard",
    properties: ["Multimodal", "Separable", "Non-convex", "Differentiable"]
  },
  {
    id: "ackley",
    name: "Ackley Function",
    formula: "f(x) = -20\\exp\\left(-0.2\\sqrt{\\frac{1}{n}\\sum_{i=1}^{n}x_i^2}\\right) - \\exp\\left(\\frac{1}{n}\\sum_{i=1}^{n}\\cos(2\\pi x_i)\\right) + 20 + e",
    description: "The Ackley function is a widely used multimodal test function. It has a global minimum at the origin surrounded by many local minima. The function has an almost flat outer region and a large hole at the center.",
    bounds: [-32.768, 32.768],
    globalMinimum: {
      position: "Origin (all zeros)",
      value: 0
    },
    code: `function ackley(x) {
  const n = x.length;
  const sum1 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sum2 = x.reduce((sum, xi) => sum + Math.cos(2 * Math.PI * xi), 0);
  
  const term1 = -20 * Math.exp(-0.2 * Math.sqrt(sum1 / n));
  const term2 = -Math.exp(sum2 / n);
  
  return term1 + term2 + 20 + Math.E;
}`,
    visualization: "3D surface and contour plot for 2D version",
    difficulty: "Medium",
    properties: ["Multimodal", "Non-separable", "Non-convex", "Differentiable"]
  },
  {
    id: "rosenbrock",
    name: "Rosenbrock Function",
    formula: "f(x) = \\sum_{i=1}^{n-1} [100(x_{i+1} - x_i^2)^2 + (x_i - 1)^2]",
    description: "The Rosenbrock function, also known as the Valley or Banana function, is a non-convex function used as a performance test problem for optimization algorithms. The global minimum is inside a long, narrow, parabolic shaped flat valley.",
    bounds: [-2.048, 2.048],
    globalMinimum: {
      position: "All ones",
      value: 0
    },
    code: `function rosenbrock(x) {
  let sum = 0;
  for (let i = 0; i < x.length - 1; i++) {
    sum += 100 * Math.pow(x[i+1] - x[i] * x[i], 2) + Math.pow(x[i] - 1, 2);
  }
  return sum;
}`,
    visualization: "3D surface and contour plot for 2D version",
    difficulty: "Hard",
    properties: ["Unimodal", "Non-separable", "Non-convex", "Differentiable"]
  },
  {
    id: "beale",
    name: "Beale Function",
    formula: "f(x) = (1.5 - x_1 + x_1 x_2)^2 + (2.25 - x_1 + x_1 x_2^2)^2 + (2.625 - x_1 + x_1 x_2^3)^2",
    description: "The Beale function is a multimodal test function with sharp peaks at the corners of the input domain. It has a global minimum in a relatively flat valley.",
    bounds: [-4.5, 4.5],
    globalMinimum: {
      position: "(3, 0.5)",
      value: 0
    },
    code: `function beale(x) {
  const x1 = x[0];
  const x2 = x[1];
  
  const term1 = Math.pow(1.5 - x1 + x1 * x2, 2);
  const term2 = Math.pow(2.25 - x1 + x1 * x2 * x2, 2);
  const term3 = Math.pow(2.625 - x1 + x1 * x2 * x2 * x2, 2);
  
  return term1 + term2 + term3;
}`,
    visualization: "3D surface and contour plot",
    difficulty: "Medium",
    properties: ["Multimodal", "Non-separable", "Non-convex", "Differentiable"],
    dimensions: 2
  },
  {
    id: "himmelblau",
    name: "Himmelblau's Function",
    formula: "f(x) = (x_1^2 + x_2 - 11)^2 + (x_1 + x_2^2 - 7)^2",
    description: "Himmelblau's function is a multi-modal function used to test the performance of optimization algorithms. It has four identical local minima.",
    bounds: [-5, 5],
    globalMinimum: {
      position: "Multiple: (3, 2), (-2.805118, 3.131312), (-3.779310, -3.283186), (3.584428, -1.848126)",
      value: 0
    },
    code: `function himmelblau(x) {
  const x1 = x[0];
  const x2 = x[1];
  
  const term1 = Math.pow(x1 * x1 + x2 - 11, 2);
  const term2 = Math.pow(x1 + x2 * x2 - 7, 2);
  
  return term1 + term2;
}`,
    visualization: "3D surface and contour plot",
    difficulty: "Medium",
    properties: ["Multimodal", "Non-separable", "Non-convex", "Differentiable"],
    dimensions: 2
  },
  {
    id: "griewank",
    name: "Griewank Function",
    formula: "f(x) = 1 + \\frac{1}{4000}\\sum_{i=1}^{n}x_i^2 - \\prod_{i=1}^{n}\\cos\\left(\\frac{x_i}{\\sqrt{i}}\\right)",
    description: "The Griewank function has many widespread local minima, which are regularly distributed. The complexity is due to the product term that creates numerous local minima.",
    bounds: [-600, 600],
    globalMinimum: {
      position: "Origin (all zeros)",
      value: 0
    },
    code: `function griewank(x) {
  let sum = 0;
  let product = 1;
  
  for (let i = 0; i < x.length; i++) {
    sum += (x[i] * x[i]) / 4000;
    product *= Math.cos(x[i] / Math.sqrt(i + 1));
  }
  
  return 1 + sum - product;
}`,
    visualization: "3D surface and contour plot for 2D version",
    difficulty: "Hard",
    properties: ["Multimodal", "Non-separable", "Non-convex", "Differentiable"]
  },
  {
    id: "levy",
    name: "Lévy Function",
    formula: "f(x) = \\sin^2(\\pi w_1) + \\sum_{i=1}^{n-1}(w_i-1)^2[1+10\\sin^2(\\pi w_i+1)] + (w_n-1)^2[1+\\sin^2(2\\pi w_n)] \\quad \\text{where } w_i = 1 + \\frac{x_i - 1}{4}",
    description: "The Lévy function is a multimodal, non-separable test function with many local minima. It is challenging for optimization algorithms due to its oscillatory behavior.",
    bounds: [-10, 10],
    globalMinimum: {
      position: "All ones",
      value: 0
    },
    code: `function levy(x) {
  const n = x.length;
  let result = 0;
  
  // Transform variables
  const w = x.map(xi => 1 + (xi - 1) / 4);
  
  // First term
  result += Math.pow(Math.sin(Math.PI * w[0]), 2);
  
  // Middle terms
  for (let i = 0; i < n - 1; i++) {
    result += Math.pow(w[i] - 1, 2) * (1 + 10 * Math.pow(Math.sin(Math.PI * w[i] + 1), 2));
  }
  
  // Last term
  result += Math.pow(w[n-1] - 1, 2) * (1 + Math.pow(Math.sin(2 * Math.PI * w[n-1]), 2));
  
  return result;
}`,
    visualization: "3D surface and contour plot for 2D version",
    difficulty: "Hard",
    properties: ["Multimodal", "Non-separable", "Non-convex", "Differentiable"]
  },
  {
    id: "constrained",
    name: "Constrained Optimization Problem",
    formula: "f(x) = x_1^2 + x_2^2 + x_1 x_2 - 10x_1 - 15x_2",
    description: "This is a constrained optimization problem with a nonlinear objective function and several constraints, including a circular constraint and bounds on variables.",
    bounds: [-10, 10],
    constraints: [
      "x_1^2 + x_2^2 ≤ 25",
      "x_1 ≤ 5",
      "x_2 ≤ 5"
    ],
    globalMinimum: {
      position: "Depends on constraints",
      value: "Depends on constraints"
    },
    code: `function constrained(x) {
  const x1 = x[0];
  const x2 = x[1];
  
  return x1 * x1 + x2 * x2 + x1 * x2 - 10 * x1 - 15 * x2;
}

function constraint1(x) {
  const x1 = x[0];
  const x2 = x[1];
  
  return 25 - (x1 * x1 + x2 * x2); // Must be >= 0
}

function constraint2(x) {
  return 5 - x[0]; // Must be >= 0
}

function constraint3(x) {
  return 5 - x[1]; // Must be >= 0
}`,
    visualization: "3D surface with constraint boundaries",
    difficulty: "Hard",
    properties: ["Constrained", "Non-separable", "Convex", "Differentiable"],
    dimensions: 2
  }
];

export default objectiveFunctions;
