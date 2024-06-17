import { format } from "date-fns";
import "./styles.css";

const formatSalary = (salary) => {
  return salary.replace(".", ",");
};
export default function EmployeeItem({ employee, onEdit, onDelete }) {
  const formattedSalary = formatSalary(employee.salary);
  const formattedHireDate = format(new Date(employee.hireDate), "dd/MM/yyyy");

  async function handleDeleteClick() {
    if (window.confirm(`Tem certeza que deseja deletar ${employee.name}?`)) {
      try {
        await onDelete(employee.id);
      } catch (error) {
        console.error("Erro ao deletar funcionário", error);
      }
    }
  }

  return (
    <li className="employee-item">
      <header>
        <div className="employees-info">
          <div className="name-icons">
            <strong>{employee.name}</strong>
            <span className="icon-buttons">
              <i className="fas fa-edit" onClick={() => onEdit(employee)}></i>
              <i className="fas fa-trash-alt" onClick={handleDeleteClick}></i>
            </span>
          </div>
          <span className="title">{employee.position}</span>
        </div>
      </header>
      <div>
        <p>E-mail: {employee.email}</p>
        <p>Remuneração: R$ {formattedSalary}</p>
        <p>Data Contratação: {formattedHireDate}</p>
        <p>Departamento: {employee.department_name}</p>
      </div>
    </li>
  );
}
