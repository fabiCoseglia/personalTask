import React, { useContext, useState } from 'react';
import { Toast, Button, Modal, Form } from 'react-bootstrap';
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
    deleteTask(task.id);
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

  return (
    <>
      <Toast className="d-inline-block m-2">
        <Toast.Header closeButton={false}>
          <strong className="me-auto text-dark">{title}</strong>
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
        </Toast.Header>
        <Toast.Body style={{ color: 'GrayText' }}>{description}</Toast.Body>
      </Toast>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar <span className='text-warning'>Tarea</span></Modal.Title>
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
