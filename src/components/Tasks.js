import React from 'react';
import Task from './Task.js';

const Tasks = ({ tasks, onDelete, onDoubleClick }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onDoubleClick={onDoubleClick}/>
      ))}
    </>
  );
};

export default Tasks;
