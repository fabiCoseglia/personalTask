import { useContext, useState } from 'react'
import {Form,Button, Container, Row, Col} from 'react-bootstrap'
import {addTask} from '../services/taskService'
import TaskContext from '../context/TaskContext'
import Swal from 'sweetalert2'

export const TaskForm = () => {

  const [title,setTitle] = useState('');
  const [description, setDescription] = useState('');

  const {fetchTasks} = useContext(TaskContext);
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1700,
    timerProgressBar: true,
  })

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!title.trim() || !description.trim()){
      Toast.fire({
        icon: 'warning',
        title: 'Todos los campos son obligatorios',
        color:'orange'
      });
      return;
    }

    try {
      await addTask({title,description});
      setTitle('');
      setDescription('');
      fetchTasks();
      Toast.fire({
        icon: 'success',
        title: 'Tarea creada con éxito',
        color:'green'
      });
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  }

  return (
    <Container className='mt-4'>
      <Row className='justify-content-center'>
        <Col xs={12} sm={10} md={8} lg={6}>
          <Form onSubmit={handleSubmit} className="border border-1 rounded p-4 shadow-sm bg-light ">
             <h2 className='mt-1 mb-4' >AGENDA DE <span className='text-warning' >TAREAS</span> </h2>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Control
                type="text"
                placeholder="Título de la tarea"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Descripción breve"
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}

              />
            </Form.Group>
            
            <Button variant="warning" type="submit">
              Agregar
            </Button>
            
          </Form>
        
        </Col>
      </Row>
    </Container>
  )
}
