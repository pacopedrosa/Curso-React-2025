import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskList = () => {
  const { tasks, toggleTasksCompletition, deleteTasks } = useContext(TaskContext);

  return (
    <div className="p-4 mt-10 bg-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Lista de tareas</h2>
      {tasks.length === 0 && (
        <p className="text-xl text-gray-800">No hay tareas</p>
      )}
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-2 mb-2 bg-white rounded shadow-md"
          >
            <span
              className={`flex-1 ${
                task.completed ? "line-through text-gray-600" : ""
              }`}
            >
              {task.title}
            </span>
            <button
              className="px-4 py-1 bg-blue-500 text-white rounded mr-2"
              onClick={() => toggleTasksCompletition(task.id)} 
            >
              Completar
            </button>
            <button
              className="px-4 py-1 bg-red-500 text-white rounded"
              onClick={() => deleteTasks(task.id)} 
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
