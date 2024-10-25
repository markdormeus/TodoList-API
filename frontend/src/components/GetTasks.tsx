// src/components/GetTasks.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Task {
  id: number;
  task_name: string;
  status: string;
  due_date: string;
}

const GetTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const response = await fetch('/tasks');
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    } else {
      console.error('Failed to fetch tasks');
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`/tasks/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Remove the deleted task from the state
      setTasks(tasks.filter(task => task.id !== id));
    } else {
      console.error('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>View Tasks</h2>
      <div className="task-grid">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.task_name}</h3>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.due_date}</p>
            <Link to={`/update/${task.id}`}>Edit</Link>
            <button onClick={() => handleDelete(task.id)} className="delete-button">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetTasks;
