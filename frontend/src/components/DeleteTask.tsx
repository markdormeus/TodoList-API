// src/components/DeleteTask.tsx
import React from 'react';

interface DeleteTaskProps {
  id: number;
  onDelete: (id: number) => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ id, onDelete }) => {
  const handleDelete = async () => {
    const response = await fetch(`/tasks/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      onDelete(id); // Call the onDelete prop to remove the task from the list
    } else {
      console.error('Failed to delete task');
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete
    </button>
  );
};

export default DeleteTask;
