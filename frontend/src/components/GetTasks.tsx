import React, { useEffect, useState } from 'react';

//struct needs to match the backend one
interface Task {
  id: number;
  task_name: string;
  status: string;
  due_date: string;
}

const GetTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/tasks'); // calls the backend API
      if (response.ok) {
        const data = await response.json();
        setTasks(data); // gets array of tasks
      } else {
        console.error('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.task_name} - {task.status} (Due: {task.due_date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetTasks;
