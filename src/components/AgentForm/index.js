import { useState, useEffect } from "react";

export default function AgentForm({ onSubmit, initialData }) {
  const [agentName, setAgentName] = useState("");
  const [agentCpf, setAgentCpf] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!agentName.trim()) {
      newErrors.agentName = 'Nome do agente é um campo obrigatório';
    }

    if (!agentCpf.trim()) {
      newErrors.agentCpf = 'CPF é um campo obrigatório';
    }

    if (!agentEmail.trim()) {
      newErrors.agentEmail = 'E-mail é um campo obrigatório';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  useEffect(() => {
    if (initialData) {
      setAgentName(initialData.name);
      setAgentCpf(initialData.cpf);
      setAgentEmail(initialData.email);
    }
  }, [initialData]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {


      await onSubmit({
        name: agentName,
        cpf: agentCpf,
        email: agentEmail,
      });

      setAgentName("");
      setAgentCpf("");
      setAgentEmail("");
      setErrors({})
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="task_title">Nome do Agente</label>
        <input
          type="text"
          name="task_title"
          id="task_title"
          value={agentName}
          title="Nome é de preenchimento obrigatório"
          className={errors.agentName ? 'input-error' : ''}
          onChange={(e) => setAgentName(e.target.value)}
        />
        {errors.agentName && <span className="error">{errors.agentName}</span>}
      </div>

      <div className="input-block">
        <label htmlFor="task_description">CPF</label>
        <input
          name="task_description"
          id="task_description"
          title="CPF é de preenchimento obrigatório"
          value={agentCpf}
          className={errors.agentCpf ? 'input-error' : ''}
          onChange={(e) => setAgentCpf(e.target.value)}
        />
        {errors.agentCpf && <span className="error">{errors.agentCpf}</span>}
      </div>

      <div className="input-block">
        <label htmlFor="task_description">E-mail</label>
        <input
          type="email"
          name="task_description"
          id="task_description"
          title="e-mail é de preenchimento obrigatório"
          value={agentEmail}
          className={errors.agentEmail ? 'input-error' : ''}
          onChange={(e) => setAgentEmail(e.target.value)}
        />
        {errors.agentEmail && <span className="error">{errors.agentEmail}</span>}
      </div>
      <button type="submit">
        SALVAR
      </button>
    </form>
  );
}
