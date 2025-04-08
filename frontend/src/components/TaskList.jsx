import React, { useContext } from 'react'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { TaskItem } from './TaskItem';
import TaskContext from '../context/TaskContext';


export const TaskList = () => {
  const { tasks } = useContext(TaskContext);


  return (
    <Container>
      <Row className="justify-content-center mt-3">
        {!tasks ? (
          <Spinner animation="border" variant="warning" className="mt-4" />
        ) : tasks.length === 0 ? (
          <Alert variant="info" className="mt-4 w-25">No hay tareas disponibles</Alert>
        ) : (
          tasks.map((task) => (
            <Col key={task.id} xs={12} sm={8} md={6} lg={4}>
              <TaskItem task={task} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  )
}
