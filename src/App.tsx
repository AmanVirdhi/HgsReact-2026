import { HashRouter  as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Home } from './components/Home/Home';
import { HgsTypes } from './components/HgsTypes/HgsTypes';
import { GrievanceList } from './components/GrievanceList/GrievanceList';
import { Edit } from './components/Edit/Edit';
import { ProtectedRoute } from './guards/ProtectedRoute';
import './App.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/types" 
          element={
            <ProtectedRoute>
              <HgsTypes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/grievanceList" 
          element={
            <ProtectedRoute>
              <GrievanceList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/updateList/:id" 
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          } 
        />
        {/* Catch-all route for unmatched URLs */}
        <Route path="*" element={
          <ProtectedRoute>
            <Navigate to="/home" replace />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
