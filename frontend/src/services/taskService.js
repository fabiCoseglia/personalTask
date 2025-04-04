import axios from "axios";

const API_URL = 'http://localhost:3000/api/tasks';

export const getTasks = async()=>{
    try {
        const {data} = await axios.get(API_URL)
        return data.data
    } catch (error) {
       return  console.error('Error al obtener las Tareas',error);
    }
};

export const addTask = async (task) =>{
    try {
        const {data} = await axios.post(API_URL,task);
        return data.newTask;
    } catch (error) {
        console.error('Erorr al obterner la nueva tarea:',error);
    }
};

export const updateTask = async (id,task)=>{
    try {
        const {data} = await axios.put(`${API_URL}/${id}`, task);
        return data.taskUpdated;
    } catch (error) {
        console.error('error al actualizar la tarea:',error);
        
    }
};

export const deleteTask = async (id,task) =>{
    try {
        await axios.delete(`${API_URL}/${id}`, task);
    } catch (error) {
     console.error('no se pudo eliminar la tarea:',error);
        
    }
};


