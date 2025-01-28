// import
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

// crear el contexto
export const TaskContext = createContext();

// crear el provider del contexto
export const TaskProvider = (props) => {
    const { children } = props;


    //hooks
     const [tasks, setTasks] = useState(()=>{
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks? JSON.parse(savedTasks) : [];
     })

     useEffect(() => {
       //guardar en el localStorage
       localStorage.setItem('tasks', JSON.stringify(tasks));
     }, [tasks])
     

     //Acciones que puedo realizar con las tareas
     //-crear tarea
     const addTask = (task) =>{
        setTasks((prevTasks)=>[...prevTasks, task])
     }
     //-eliminar tarea
     const deleteTasks = (tasksId) =>{
        setTasks((prevTasks)=>prevTasks.filter((task)=>task.id!== tasksId))
     }

     //-Completar tarea
     const toggleTasksCompletition = (tasksId) => {
        setTasks((prevTasks) => {
            return prevTasks.map((task) =>
                task.id === tasksId? {...task, completado:!task.completado } : task
            )
        })
     }
     //-editar tarea
     const editTask = (taskId, task) => {
        setTasks((prevTasks) => {
            prevTasks.map((tasks) => {
                if (tasks.id === taskId) {
                    return {...tasks,...task };
                }
                return tasks;
            })
        })
     }

    return (
        <TaskContext.Provider value={{tasks, addTask, deleteTasks, toggleTasksCompletition, editTask}}>
            {children}
        </TaskContext.Provider>
    )
}
