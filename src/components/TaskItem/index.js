import "./styles.css";

export default function TaskItem({ task, onEdit, onDelete }) {

  async function handleDeleteClick() {
    if (window.confirm(`Tem certeza que deseja deletar ${task.name}?`)) {
      try {
        await onDelete(task.id);
      } catch (error) {
        console.error("Erro ao deletar tarefa", error);
      }
    }
  }

  return (
    <li className="task-item">
      <header>
        <div className="tasks-info">
          <div className="name-icons">
            <strong>{task.name}</strong>
            <span className="icon-buttons">
              <i className="fas fa-edit" onClick={() => onEdit(task)}></i>
              <i className="fas fa-trash-alt" onClick={handleDeleteClick}></i>
            </span>
          </div>
        </div>
      </header>
      <div>
        <p>Descrição: {task.description}</p>
        {/* <p>Remuneração: R$ {formattedSalary}</p> */}
        {/* <p>Data Contratação: {formattedHireDate}</p> */}
        <p>Categoria: {task.category_name}</p>
      </div>
    </li>
  );
}
