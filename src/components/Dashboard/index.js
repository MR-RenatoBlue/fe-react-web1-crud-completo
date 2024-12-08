import React, { useEffect, useState } from 'react';
import BarChart from '../../components/BarChart';
import api from '../../services/api';

const Dashboard = () => {
  const [taskData, setTaskData] = useState({ labels: [], values: [] });

  useEffect(() => {
    async function fetchTaskData() {
      try {
        const response = await api.get('/tasks');
        const tasks = response.data;

        const categories = tasks.reduce((acc, task) => {
          const category = task.category_name || 'Sem categoria';
          if (!acc[category]) acc[category] = 0;
          acc[category]++;
          return acc;
        }, {});

        setTaskData({
          labels: Object.keys(categories),
          values: Object.values(categories),
        });
      } catch (error) {
        console.error('Erro ao buscar dados das tarefas', error);
      }
    }

    fetchTaskData();
  }, []);

  return (
    <>
      <main className='dash'>
        <div>
          <BarChart data={taskData} />
        </div>
      </main>

    </>
  );
};

export default Dashboard;
