import { useState } from 'react';
import api from '../services/api.js';

export default function TaskForm({ task, onSave }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await api.put(`/tasks/${task._id}`, { title, description });
      } else {
        await api.post('/tasks', { title, description });
      }
      onSave(); // Call the callback to handle redirection/state update in the parent
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border"
          ></textarea>
        </div>
        <button type="submit" className="p-2 bg-green-500 text-white">
          Save Task
        </button>
      </form>
    </div>
  );
}