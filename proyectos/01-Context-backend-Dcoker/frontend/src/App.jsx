import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

const App = () => {
  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-4xl font-bold text-center mb-8">Gestor de tareas con contextos</h1>
      <TaskForm />
      <TaskList />
    </div>
  )
}

export default App