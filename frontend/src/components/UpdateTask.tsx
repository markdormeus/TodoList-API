// src/components/UpdateTask.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task_name, setTaskName] = useState<string>('');
  const [status, setStatus] = useState<string>('pending');
  const [due_date, setDueDate] = useState<string>('');

  // Fetch the task details from the backend
  const fetchTask = async () => {
    const response = await fetch(`/tasks/${id}`);
    if (response.ok) {
      const task = await response.json();
      setTaskName(task.task_name);
      setStatus(task.status);
      setDueDate(task.due_date);
    } else {
      console.error('Failed to fetch task');
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  // Handle task update
  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    const updatedTask = { task_name, status, due_date };

    const response = await fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      console.log('Task updated successfully');
      navigate('/tasks'); // Navigate back to tasks after updating
    } else {
      console.error('Failed to update task');
    }
  };

  // Handle task deletion
  const handleDelete = async () => {
    const response = await fetch(`/tasks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Task deleted successfully');
      navigate('/tasks'); // Navigate back to tasks after deleting
    } else {
      console.error('Failed to delete task');
    }
  };

  return (
    <div>
      <h2>Update Task</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            value={task_name}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={due_date}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
      <button onClick={handleDelete} style={{ marginTop: '10px', color: 'red' }}>
        Delete Task
      </button>
    </div>
  );
};

export default UpdateTask;
