//import React from 'react';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import './style.css';
import Header from './components/Header.js';
import Tasks from './components/Tasks.js';
import AddTask from './components/AddTask.js';
import Footer from './components/Footer.js'
import About from './components/About.js'

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([
        {
            "id": 1,
            "text": "Cut lawn",
            "day": "Feb 5th at 2:30pm",
            "reminder": true
        },
        {
            "id": 2,
            "text": "task2",
            "day": "Feb 5th at 2:30pm",
            "reminder": false
        }
    ]);
    
    useEffect(() => {  
        setTasksFromServer();
    }, [])

    const setTasksFromServer = async () => {
        const tasksFromServer = await fetchTasks();
        setTasks(tasksFromServer);
    }
  const fetchTasks = async () => {
     const res = await fetch("http://localhost:5000/tasks");
     const data = await res.json();

     console.log(data);
     return data;
    }
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();

        console.log(data);
        return data;
    }
  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  };
  const onAdd = async (newTask) => {
    console.log('Creating new task:', newTask);
      await fetch(`http://localhost:5000/tasks/`, {
          method: 'POST',
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newTask)
      })
      setTasksFromServer();
  };

  const deleteTask = async (id) => {
      console.log('delete ' + id);
      await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'DELETE'
      })
      setTasksFromServer();
  };

  const toggleReminder =async (id) => {
      const taskToToggle = await fetchTask(id);
      taskToToggle.reminder = !taskToToggle.reminder;
      await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'PUT',
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(taskToToggle)
      })

      setTasksFromServer();
    console.log(
      'reminder',
        id,
        taskToToggle.reminder
    );
  };

    return (
        <Router>
            <Route path="/">
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

       <Footer /> 
            </div>
            </Route>
        </Router>
  );
}
