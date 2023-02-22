import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom' 
import Button from './Button'

const TaskDetails = ({ }) => {
  const [error, setError] = useState(null)

  const params = useParams()
  const navigate = useNavigate()
  const task = {}
  useEffect( () => {
    const fetchTask = async () => {
      const res = await fetch(`http://localhost:5000/tasks/${params.id}`)
      const data = await res.json()

      if(res.status === 404){
        navigate("/")
      }
    }
    fetchTask()
  })

  return (
    <>
      <p>Task id: {params.id}</p>
      <Button onClick={ () => navigate(-1)} text="Go back"></Button>
    </>
  );
};

export default TaskDetails