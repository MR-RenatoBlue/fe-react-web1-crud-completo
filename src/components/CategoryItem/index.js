import "./styles.css";

export default function CategoryItem({ category, onEdit, onDelete }) {

  async function handleDeleteClick() {
    if (window.confirm(`Tem certeza que deseja deletar ${category.name}?`)) {
      try {
        await onDelete(category.id);
      } catch (error) {
        console.error("Erro ao deletar categoria", error);
      }
    }
  }

  return (
    <li className="task-item">
      <header>
        <div className="tasks-info">
          <div className="name-icons">
            <strong>{category.id}</strong>
            <span className="icon-buttons">
              <i className="fas fa-edit" onClick={() => onEdit(category)}></i>
              <i className="fas fa-trash-alt" onClick={handleDeleteClick}></i>
            </span>
          </div>
        </div>
      </header>
      <div>
        <p>Nome: {category.name}</p>
      </div>
    </li>
  );
}
