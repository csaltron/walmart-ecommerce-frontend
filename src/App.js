import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import ErrorBoundary from './components/ErrorBoundary';

// Code splitting - lazy loading de componentes
const HomePage = lazy(() => import('./components/HomePage'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));

// Componente de carga
const Loading = () => (
  <div className="loading" style={{ 
    minHeight: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }}>
    Cargando...
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
