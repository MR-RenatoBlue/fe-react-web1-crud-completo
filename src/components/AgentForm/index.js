import { useState, useEffect } from "react";

export default function AgentForm({ onSubmit, initialData }) {
  const [agentName, setAgentName] = useState("");
  const [agentCpf, setAgentCpf] = useState("");
  const [agentEmail, setAgentEmail] = useState("");

  useEffect(() => {
    if (initialData) {
      setAgentName(initialData.name);
      setAgentCpf(initialData.cpf);
      setAgentEmail(initialData.email);
    }
  }, [initialData]);

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit({
      name: agentName,
      cpf: agentCpf,
      email: agentEmail,
    });

    setAgentName("");
    setAgentCpf("");
    setAgentEmail("");
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
          required="true"
          title="Nome é de preenchimento obrigatório"
          onChange={(e) => setAgentName(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="task_description">CPF</label>
        <input
          name="task_description"
          id="task_description"
          required="true"
          title="CPF é de preenchimento obrigatório"
          value={agentCpf}
          onChange={(e) => setAgentCpf(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="task_description">E-mail</label>
        <input
          type="email"
          name="task_description"
          id="task_description"
          required="true"
          title="e-mail é de preenchimento obrigatório"
          value={agentEmail}
          onChange={(e) => setAgentEmail(e.target.value)}
        />
      </div>
      <button type="submit">
        SALVAR
      </button>
    </form>
  );
}
