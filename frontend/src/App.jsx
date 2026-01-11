import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import { roadmapApi } from './api/roadmaps';

function App() {
  const [roadmaps, setRoadmaps] = useState([]);

  const generateRoadmap = async (userData) => {
    const data = await roadmapApi.generate(userData);
    setRoadmaps(prev => [...prev, data]);
    return data.id;
  };

  return (
    <Router>
      <Routes>

        {/* 🌟 PUBLIC LANDING PAGE */}
        <Route path="/" element={<Home />} />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED APP */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Form onGenerate={generateRoadmap} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/:id"
          element={
            <ProtectedRoute>
              <Dashboard
                roadmaps={roadmaps}
                setRoadmaps={setRoadmaps}
              />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
