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

function App() {
  const [tasksList, setTasksList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [agentsList, setAgentsList] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
