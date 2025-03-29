import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AlgorithmPage from './pages/AlgorithmPage';
import ComparisonPage from './pages/ComparisonPage';
import AboutPage from './pages/AboutPage';
import PapersPage from './pages/PapersPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/algorithm/:id" element={<AlgorithmPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/papers" element={<PapersPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
