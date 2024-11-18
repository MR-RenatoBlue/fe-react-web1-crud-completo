import { useState, useEffect } from "react";

export default function CategoryForm({ onSubmit, initialData }) {
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!categoryName.trim()) {
      newErrors.categoryName = 'Descrição é um campo obrigatório';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  useEffect(() => {
    if (initialData) {
      setCategoryName(initialData.name);
    }
  }, [initialData]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {


      await onSubmit({
        name: categoryName,
      });
      setCategoryName("");
      setErrors({})
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="task_title">Nome da Categoria</label>
        <input
          type="text"
          name="task_title"
          id="task_title"
          value={categoryName}
          title="Nome é de preenchimento obrigatório"
          className={errors.categoryName ? 'input-error' :  ''}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {errors.categoryName && <span className="error">{errors.categoryName}</span>}
      </div>
      <button type="submit">
        SALVAR
      </button>
    </form>
  );
}
