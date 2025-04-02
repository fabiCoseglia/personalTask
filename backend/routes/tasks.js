const express = require('express');
const router = express.Router();

let tasks = [];

router.get('/',(req,res)=>{
    res.json(tasks);
});

router.post('/',(req,res)=>{
    const {title,description} = req.body;
    
    if(!title || !description){
        return res.status(400).json({error: 'Campo obligatorio'});
    };

    const newTask = {
        id: tasks.length +1,
        title,
        description: description,
        completed: false,
        createdAt: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {title,description,completed} = req.body;

    const taskIndex = tasks.findIndex(task => task.id == id);

    if(taskIndex === -1){
        return res.status(404).json({error:'Tarea no encontrada'});
    };

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title || tasks[taskIndex].title,
        description: description || tasks[taskIndex].description,
        completed: completed || tasks[taskIndex].completed
    };

    res.json(tasks[taskIndex]);
})





module.exports = router;