import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskContext } from "../context/TaskContext";

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [taskNameInput, setTaskNameInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskNameInput.trim() !== "") {
      addTask({
        id: uuidv4(),
        title: taskNameInput,
        completed: false,
      });
      setTaskNameInput(""); // limpiamos en input
    }
  };
  return (
    <form
      className="p-4 bg-gray-300 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Agregar Tarea</h2>
      <input
        type="text"
        value={taskNameInput}
        onChange={(e) => setTaskNameInput(e.target.value)}
        placeholder="Nombre de la tarea"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 hover:bg-blue-900 text-white rounded-md"
      >
        Agregar
      </button>
    </form>
  );
};

export default TaskForm;