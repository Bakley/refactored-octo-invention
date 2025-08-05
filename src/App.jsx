import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  // Handle input change for task input
  const handleInputChange = useCallback((event) => {
    setTaskInput(event.target.value);
    setError(''); // Clear error on input change
  }, []);

  // Handle form submission for adding or updating tasks
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!taskInput.trim()) {
        setError('Task cannot be empty');
        return;
      }

      if (editId !== null) {
        // Update existing task
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editId ? { ...task, text: taskInput } : task
          )
        );
        setEditId(null);
      } else {
        // Add new task
        setTasks((prevTasks) => [
          ...prevTasks,
          { id: Date.now(), text: taskInput, completed: false },
        ]);
      }
      setTaskInput(''); // Clear input
    },
    [taskInput, editId]
  );

  // Handle task deletion
  const handleDelete = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  // Handle task editing
  const handleEdit = useCallback((task) => {
    setTaskInput(task.text);
    setEditId(task.id);
  }, []);

  // Handle task completion toggle
  const handleToggleComplete = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Enter a task"
          className="task-input"
        />
        <button type="submit" className="submit-button">
          {editId !== null ? 'Update Task' : 'Add Task'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span>{task.text}</span>
            <div className="task-actions">
              <button onClick={() => handleEdit(task)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(task.id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
