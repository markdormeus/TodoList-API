import React, { useState, useEffect } from 'react';
import '../stylesheets/CreateTask.css';

const CreateTask: React.FC = () => {
  // State for task inputs
  const [task_name, setTaskName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [due_date, setDueDate] = useState<string>('');

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTask = { task_name, status, description, due_date };

    const response = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      // Clear the form fields
      setTaskName('');
      setDescription('');
      setStatus(false);
      setDueDate('');
      console.log('Task created successfully');
    } else {
      console.error('Failed to create task');
    }
  };

  // Automatically create a task when the component mounts
  useEffect(() => {
    const initialTaskName = 'New Task'; // You can set a default task name if needed
    setTaskName(initialTaskName);
  }, []);

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="taskName">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
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
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
