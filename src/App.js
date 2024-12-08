import { useState, useEffect } from "react";
import api from "./services/api";

import "./css/global.css";
import "./css/app.css";
import "./css/sidebar.css";
import "./css/main.css";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import AgentForm from "./components/AgentForm";
import AgentItem from "./components/AgentItem";
import CategoryForm from "./components/CategoryForm";
import CategoryItem from "./components/CategoryItem";
import Dashboard from "./components/Dashboard";

function App() {
  const [tasksList, setTasksList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [agentsList, setAgentsList] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get("/categories");
        setCategoriesList(response.data);
      } catch (error) {
        console.log("Erro ao buscar Categorias", error);
      }
    }
    fetchCategories();
  }, [categories]);

  async function handleAddCategory(data) {
    if (selectedCategory) {
      const response = await api.put(`/categories/${selectedCategory.id}`, data);
      setCategories(
        categories.map((category) =>
          category.id === selectedCategory.id ? response.data : category
        )
      );
      setSelectedCategory(null);
    } else {
      const response = await api.post("/categories", data);
      setCategories([...categories, response.data]);
    }
  }

  function handleEditCategory(category) {
    setSelectedCategory(category);
  }

  async function handleDeleteCategory(categoryId) {
    try {
      await api.delete(`/categories/${categoryId}`);
      setCategoriesList(
        categoriesList.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error("Erro ao deletar categoria", error);
    }
  }

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await api.get("/agents");
        setAgentsList(response.data);
      } catch (error) {
        console.log("Erro ao buscar agentes", error);
      }
    }
    fetchAgents();
  }, [agents]);

  async function handleAddAgent(data) {
    if (selectedAgent) {
      const response = await api.put(`/agents/${selectedAgent.id}`, data);
      setAgents(
        agents.map((agent) =>
          agent.id === selectedAgent.id ? response.data : agent
        )
      );
      setSelectedAgent(null);
    } else {
      const response = await api.post("/agents", data);
      setAgents([...agents, response.data]);
    }
  }

  function handleEditAgent(agent) {
    setSelectedAgent(agent);
  }

  async function handleDeleteAgent(agentId) {
    try {
      await api.delete(`/agents/${agentId}`);
      setAgentsList(
        agentsList.filter((agent) => agent.id !== agentId)
      );
    } catch (error) {
      console.error("Erro ao deletar agente", error);
    }
  }

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
    <Router>
      <div id="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Dashboard />
              </>
            }
          />
          <Route
            path="/tasks"
            element={
              <>
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
              </>
            }
          />
          <Route
            path="/agents"
            element={
              <>
                <aside>
                  <strong>Cadastro de Agentes</strong>
                  <AgentForm
                    onSubmit={handleAddAgent}
                    initialData={selectedAgent}
                  />
                </aside>
                <main>
                  <ul>
                    {agentsList.map((agent) => (
                      <AgentItem
                        key={agent.id}
                        agent={agent}
                        onEdit={handleEditAgent}
                        onDelete={handleDeleteAgent}
                      />
                    ))}
                  </ul>
                </main>
              </>
            }
          />
          <Route
            path="/categories"
            element={
              <>
                <aside>
                  <strong>Cadastro de Categoria</strong>
                  <CategoryForm
                    onSubmit={handleAddCategory}
                    initialData={selectedCategory}
                  />
                </aside>
                <main>
                  <ul>
                    {categoriesList.map((category) => (
                      <CategoryItem
                        key={category.id}
                        category={category}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                      />
                    ))}
                  </ul>
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
