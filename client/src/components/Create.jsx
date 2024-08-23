import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    console.log('Task to be added:', task); // Debugging line to check task value
    axios.post('https://lofer-server-todo.vercel.app/add', { task: task })
      .then(result => console.log('Server response:', result))
      .catch(err => console.log('Error:', err));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        className="bg-neutral-400 w-60 p-2 rounded"
        type="text"
        placeholder="Enter Task"
        onChange={(e) => {
          setTask(e.target.value);
          console.log('Input value:', e.target.value); // Debugging line to check input value
        }}
        value={task}
      />
      <button
        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
        type="button"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default Create;
