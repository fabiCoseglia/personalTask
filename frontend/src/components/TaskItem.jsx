import React, { useContext, useState } from 'react';
import { Toast, Button, Modal, Form, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TaskContext from '../context/TaskContext';
import { updateTask } from '../services/taskService';
import Swal from 'sweetalert2';

export const TaskItem = ({ task }) => {
  const { deleteTask, fetchTasks } = useContext(TaskContext);
  const { title, description } = task;

  const [showModal, setShowModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la tarea permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(task.id);
        Swal.fire({
          icon: 'success',
          title: 'Tarea eliminada',
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          color: 'green'
        });
      }
    });
  };

  const handleUpdate = async () => {
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
    if (!editedTitle.trim() || !editedDescription.trim()) return;

    await updateTask(task.id, {
      title: editedTitle,
      description: editedDescription,
    });
    setShowModal(false);
    fetchTasks();
    Toast.fire({
      icon: 'success',
      title: 'Tarea actualizada con éxito',
      color:'green'
    });
  };

  const handleToggleCompleted = () => {
    Swal.fire({
      title: '¿Deseas cambiar el estado de la tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateTask(task.id, {
          ...task,
          completed: !task.completed,
        });
        fetchTasks(); 
        Swal.fire({
          icon: 'success',
          title: 'Estado de la tarea actualizado',
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          color: 'green'
        });
      }
    });
  };

  return (
    <>
      <Toast className="d-inline-block m-2">
        <Toast.Header closeButton={false}>
          <div className="d-flex align-items-center justify-content-between w-100">
            <div>
              <strong className="me-2 text-dark">{title}</strong>
              <Badge
                bg={task.completed ? "success" : "secondary"}
                style={{ cursor: "pointer" }}
                onClick={handleToggleCompleted}
              >
                {task.completed ? "Finalizada" : "En Proceso"}
              </Badge>
            </div>
            <div>
              <Button
                variant="light"
                size="md"
                className="ms-2"
                onClick={() => setShowModal(true)}
              >
                <FaEdit />
              </Button>
              <Button
                variant="light"
                size="md"
                className="ms-2"
                onClick={handleDelete}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        </Toast.Header>
        <Toast.Body style={{ color: "GrayText" }}>{description}</Toast.Body>
      </Toast>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Editar <span className="text-warning">Tarea</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTitle" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Inserte nuevo título"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editDescription" className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserte nueva descripción"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="warning" onClick={handleUpdate}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
