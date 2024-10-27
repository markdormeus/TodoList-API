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
  status: boolean;
  description: string;
  due_date: string;
}

interface User {
  id: number;
  username: string;
  password: string;
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

  const updateTaskStatus = async (id: number, status: boolean) => {
    const response = await fetch(`/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      console.error('Failed to update task status');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const changeWeek = (delta: number) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + delta * 7);
    setCurrentWeek(newDate);
  };

  const events = tasks.map(task => ({
    title: task.task_name,
    date: task.due_date,
  }));

  const calculateProgress = () => {
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const endOfWeek = new Date(currentWeek);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

    const tasksThisWeek = tasks.filter(task => {
      const taskDate = new Date(task.due_date);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });

    const completedTasks = tasksThisWeek.filter(task => task.status);
    return tasksThisWeek.length > 0 
      ? (completedTasks.length / tasksThisWeek.length) * 100 
      : 0;
  };

  const progress = calculateProgress();

  const getCurrentWeekDisplay = () => {
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(currentWeek);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

    return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
  };

  const handleCheckboxChange = async (task: Task) => {
    const newStatus = !task.status; //toggle
    await updateTaskStatus(task.id, newStatus);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
    );
  };

  const tasksThisWeek = tasks.filter((task) => {
    const taskDate = new Date(task.due_date);
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(currentWeek);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
    return taskDate >= startOfWeek && taskDate <= endOfWeek;
  });

  return (
    <Router>
      <div className="app-container">
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

        <aside className="task-list">
          <h2>Task Completion Progress</h2>
          <p>Current Week: {getCurrentWeekDisplay()}</p>
          <ProgressBar progress={progress} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => changeWeek(-1)}>Previous Week</button>
            <button onClick={() => changeWeek(1)}>Next Week</button>
          </div>
          <p style={{ marginTop: '10px' }}>Progress: {progress.toFixed(2)}%</p>

          <div className="weekly-tasks">
            <h3>This Week's Tasks</h3>
            <ul>
              {tasksThisWeek.map((task) => (
                <li key={task.id}>
                  <label className={task.status ? 'completed' : ''}>
                    <input
                      type="checkbox"
                      checked={task.status}
                      onChange={() => handleCheckboxChange(task)}
                    />
                    {task.task_name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Router>
  );
};

export default App;
