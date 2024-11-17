import { useState, useEffect } from "react";
import api from "./services/api";

import "./css/global.css";
import "./css/app.css";
import "./css/sidebar.css";
import "./css/main.css";

import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasksList, setTasksList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get("/tasks");
        setTasksList(response.data);
      } catch (error) {
        console.log("Erro ao buscar tarefas", error);
      }
    }
    fetchTasks();
  }, [tasks]);

  async function handleAddTask(data) {
    if (selectedTask) {
      const response = await api.put(`/tasks/${selectedTask.id}`, data);
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id ? response.data : task
        )
      );
      setSelectedTask(null);
    } else {
      const response = await api.post("/tasks", data);
      setTasks([...tasks, response.data]);
    }
  }

  function handleEditTask(task) {
    setSelectedTask(task);
  }

  async function handleDeleteTask(taskId) {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasksList(
        tasksList.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      console.error("Erro ao deletar tarefa", error);
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastro de Tarefas</strong>
        <TaskForm
          onSubmit={handleAddTask}
          initialData={selectedTask}
        />
      </aside>
      <main>
        <ul>
          {tasksList.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
