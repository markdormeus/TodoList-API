// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GetTasks from './components/GetTasks';
import CreateTask from './components/CreateTask';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Task Manager</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/tasks">View Tasks</Link>
          <Link to="/create">Create Task</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h2>Welcome to the Task Manager!</h2>} />
          <Route path="/tasks" element={<GetTasks />} />
          <Route path="/create" element={<CreateTask />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
