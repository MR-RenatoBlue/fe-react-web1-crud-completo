import { useState, useEffect } from "react";
import api from "../../services/api";

export default function TaskForm({ onSubmit, initialData }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!taskName.trim()) {
      newErrors.taskName = 'Título é um campo obrigatório';
    }

    if (!taskDescription.trim()) {
      newErrors.taskDescription = 'Descrição é um campo obrigatório';
    }

    if (!agentId.trim()) {
      newErrors.agentId = 'Agente é um campo obrigatório';
    }

    if (!categoryId.trim()) {
      newErrors.categoryId = 'Categoria é um campo obrigatório';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

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
    if (validate()) {


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
      setErrors({});
    }
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
          title="Título é de preenchimento obrigatório"
          className={errors.taskName ? 'input-error' : ''}
          onChange={(e) => setTaskName(e.target.value)}
        />
        {errors.taskName && <span className="error">{errors.taskName}</span>}
      </div>

      <div className="input-block">
        <label htmlFor="task_description">Descrição</label>
        <textarea
          name="task_description"
          id="task_description"
          rows="4"
          cols="50"
          title="Descrição é de preenchimento obrigatório"
          value={taskDescription}
          className={errors.taskDescription ? 'input-error' : ''}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        {errors.taskDescription && <span className="error">{errors.taskDescription}</span>}
      </div>

      <div className="input-block">
        <label htmlFor="task_agent">Agente</label>
        <select
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          name="task_agent"
          id="task_agent"
          className={errors.agentId ? 'input-error' : ''}
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
        {errors.agentId && <span className="error">{errors.agentId}</span>}
      </div>

      <div className="input-block">
        <label htmlFor="task_category">Categoria</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          name="task_category"
          id="task_category"
          className={errors.categoryId ? 'input-error' : ''}
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
        {errors.categoryId && <span className="error">{errors.categoryId}</span>}
      </div>

      <button type="submit">
        SALVAR
      </button>
    </form>
  );
}
