import React, { useState } from 'react';

const CreateTask: React.FC = () => {
  // State for task inputs and form visibility
  const [task_name, setTaskName] = useState<string>('');
  const [status, setStatus] = useState<string>('pending');
  const [due_date, setDueDate] = useState<string>('');
  const [formVisible, setFormVisible] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTask = { task_name, status, due_date };

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
      setStatus('pending');
      setDueDate('');
      setFormVisible(false); // Hide the form after submission
      console.log('Task created successfully');
    } else {
      console.error('Failed to create task');
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <button onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Cancel' : 'Create New Task'}
      </button>
      {formVisible && (
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
          <button type="submit">Create Task</button>
        </form>
      )}
    </div>
  );
};

export default CreateTask;