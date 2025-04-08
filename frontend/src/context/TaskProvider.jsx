import { useState, useEffect } from 'react';
import TaskContext from './TaskContext';
import { getTasks } from '../services/taskService';
import { deleteTask as deleteTaskService } from '../services/taskService';
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const deleteTask = async (taskId) =>{
    try {
      await deleteTaskService(taskId);
      setTasks((prevTask) =>prevTask.filter((task)=> task.id !== taskId));
    } catch (error) {
      console.error('no se pudo eliminar la tarea:',error);
      
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, setTasks, fetchTasks,deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
