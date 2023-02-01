import React from 'react';
import { useState } from 'react';
import './style.css';
import Header from './components/Header.js';
import Tasks from './components/Tasks.js';
import AddTask from './components/AddTask.js';

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'task1',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'task2',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    },
    {
      id: 3,
      text: 'task3',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 4,
      text: 'task4',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
  ]);

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  };
  const onAdd = (newTask) => {
    newTask.id = tasks.length + 1;
    console.log('Creating new task:', newTask);
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    console.log('delete ' + id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
    console.log(
      'reminder',
      id,
      tasks.filter((task) => task.id === id)[0].reminder
    );
  };

  return (
    <div className="container">
      <Header
        onClick={toggleAddTask}
        showAdd={showAddTask}
        title="Task Tracker"
      />
      {showAddTask && <AddTask onAdd={onAdd} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onDoubleClick={toggleReminder}
        />
      ) : (
        'There are no Tasks, please add one.'
      )}
    </div>
  );
}
