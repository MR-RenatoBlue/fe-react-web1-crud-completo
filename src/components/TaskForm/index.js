import { useState, useEffect } from "react";
import api from "../../services/api";

export default function TaskForm({ onSubmit, initialData }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const isFormValid = categoryId;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await api.get("/agents");
        setAgents(response.data);
      } catch (error) {
        console.error("Erro ao buscar agentes:", error);
      }
    }

    fetchAgents();
  }, []);

  useEffect(() => {
    if (initialData) {
      setTaskName(initialData.name);
      setTaskDescription(initialData.description);
      setAgentId(initialData.agent_id);
      setCategoryId(initialData.category_id);
    }
  }, [initialData]);

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit({
      name: taskName,
      description: taskDescription,
      agent_id: agentId,
      category_id: categoryId,
    });

    setTaskName("");
    setTaskDescription("");
    setAgentId("");
    setCategoryId("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="task_title">Título</label>
        <input
          type="text"
          name="task_title"
          id="task_title"
          value={taskName}
          required="true"
          title="Título é de preenchimento obrigatório"
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="task_description">Descrição</label>
        <textarea
          name="task_description"
          id="task_description"
          rows="4"
          cols="50"
          required="true"
          title="Descrição é de preenchimento obrigatório"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="task_agent">Agente</label>
        <select
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          name="task_agent"
          id="task_agent"
        >
          <option disabled value="">
            Selecione...
          </option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-block">
        <label htmlFor="task_category">Categoria</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          name="task_category"
          id="task_category"
        >
          <option disabled value="">
            Selecione...
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button disabled={!isFormValid} type="submit">
        SALVAR
      </button>
    </form>
  );
}
