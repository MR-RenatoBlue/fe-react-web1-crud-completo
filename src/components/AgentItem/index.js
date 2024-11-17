import "./styles.css";

export default function AgentItem({ agent, onEdit, onDelete }) {

  async function handleDeleteClick() {
    if (window.confirm(`Tem certeza que deseja deletar ${agent.name}?`)) {
      try {
        await onDelete(agent.id);
      } catch (error) {
        console.error("Erro ao deletar Agente", error);
      }
    }
  }

  return (
    <li className="task-item">
      <header>
        <div className="tasks-info">
          <div className="name-icons">
            <strong>{agent.name}</strong>
            <span className="icon-buttons">
              <i className="fas fa-edit" onClick={() => onEdit(agent)}></i>
              <i className="fas fa-trash-alt" onClick={handleDeleteClick}></i>
            </span>
          </div>
        </div>
      </header>
      <div>
        <p>CPF: {agent.cpf}</p>
        <p>Email: {agent.email}</p>
      </div>
    </li>
  );
}
