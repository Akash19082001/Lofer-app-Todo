import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://lofer-server-todo.vercel.app/get')
      .then(result => setTodos(result.data))
      .catch(err => {
        console.error(err);
        setError('Failed to fetch tasks.');
      });
  }, []);

  const handleEdit = (id) => {
    const newTask = prompt('Enter new task:');
    if (newTask) {
      axios.put(`https://lofer-server-todo.vercel.app/update/${id}`, { task: newTask })
        .then(result => {
          setTodos(todos.map(todo => (todo._id === id ? result.data : todo)));
          console.log('Task updated:', result.data);
        })
        .catch(err => console.error('Failed to update task:', err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios.delete(`https://lofer-server-todo.vercel.app/delete/${id}`)
        .then(() => {
          setTodos(todos.filter(todo => todo._id !== id));
          console.log('Task deleted');
        })
        .catch(err => console.error('Failed to delete task:', err));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-center pt-10 text-3xl font-bold">Todo List</h2>
      <Create />
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {todos.length === 0 ? (
        <div className="text-center mt-4">
          <h2 className="text-xl font-medium">No Record</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 bg-white p-4 rounded-lg shadow-lg">
          {todos.map((todo) => (
            <div key={todo._id} className="flex flex-col items-center p-6 border border-gray-300 rounded bg-blue-50 shadow-md h-48 justify-between">
              <span className="text-center mb-2 flex-1 text-gray-800">{todo.task}</span>
              <div className="flex space-x-3">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleEdit(todo._id)}
                >
                  <FaEdit className='icon'/>
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(todo._id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
