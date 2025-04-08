import React from 'react'
import { Container } from 'react-bootstrap'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'

export const Home = () => {
  return (
    <Container className='mt-4 text-center ' >
        <TaskForm/>
        <TaskList/>
    </Container>
  )
}
