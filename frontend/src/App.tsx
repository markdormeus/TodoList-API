// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GetTasks from './components/GetTasks';
import CreateTask from './components/CreateTask';
import UpdateTask from './components/UpdateTask';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ProgressBar from './components/ProgessBar';
import './App.css';

interface Task {
  id: number;
  task_name: string;
  status: string;
  due_date: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());

  const fetchTasks = async () => {
    const response = await fetch('/tasks');
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    } else {
      console.error('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to change the current week
  const changeWeek = (delta: number) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + delta * 7);
    setCurrentWeek(newDate);
  };

  // Prepare events for the calendar based on the tasks
  const events = tasks.map(task => ({
    title: task.task_name,
    date: task.due_date,
  }));

  // Calculate progress percentage for the current week
  const calculateProgress = () => {
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const endOfWeek = new Date(currentWeek);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

    const tasksThisWeek = tasks.filter(task => {
      const taskDate = new Date(task.due_date);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });

    const completedTasks = tasksThisWeek.filter(task => task.status === 'completed');
    const progress = tasksThisWeek.length > 0 
      ? (completedTasks.length / tasksThisWeek.length) * 100 
      : 0;

    return progress;
  };

  const progress = calculateProgress();

  // Get the display string for the current week
  const getCurrentWeekDisplay = () => {
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(currentWeek);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

    return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
  };

  return (
    <Router>
      <div className="app-container">
        {/* Left Sidebar for Task Manager */}
        <nav className="sidebar">
          <h1>Task Manager</h1>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/tasks">View Tasks</Link>
            </li>
            <li>
              <Link to="/create">Create Task</Link>
            </li>
          </ul>
        </nav>
        
        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="dashboard">
                  <h2>Dashboard - Current Week's Tasks</h2>
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,dayGridWeek,dayGridDay',
                    }}
                  />
                </div>
              }
            />
            <Route path="/tasks" element={<GetTasks />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/update/:id" element={<UpdateTask />} />
          </Routes>
        </main>

        {/* Right Sidebar for Task Completion Progress */}
        <aside className="task-list">
          <h2>Task Completion Progress</h2>
          <p>Current Week: {getCurrentWeekDisplay()}</p>
          <ProgressBar progress={progress} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => changeWeek(-1)}>Previous Week</button>
            <button onClick={() => changeWeek(1)}>Next Week</button>
          </div>
          <p style={{ marginTop: '10px' }}>Progress: {progress.toFixed(2)}%</p>
        </aside>
      </div>
    </Router>
  );
};

export default App;
