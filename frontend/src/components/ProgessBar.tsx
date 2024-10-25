// src/components/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  progress: number; // Progress as a percentage (0 to 100)
  height?: string; // Optional height for the progress bar
  backgroundColor?: string; // Optional background color for the progress bar
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = '20px',
  backgroundColor = '#76c7c0',
}) => {
  return (
    <div style={{
      height,
      width: '100%',
      backgroundColor: '#e0e0e0',
      borderRadius: '5px',
      marginBottom: '10px',
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        backgroundColor,
        borderRadius: '5px',
      }} />
    </div>
  );
};

export default ProgressBar;
