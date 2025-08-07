import React, { useState, useCallback } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = useCallback(
    (taskText, editId) => {
      if (editId !== null) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editId ? { ...task, text: taskText } : task
          )
        );
        setEditId(null);
      } else {
        setTasks((prevTasks) => [
          ...prevTasks,
          { id: Date.now(), text: taskText, completed: false },
        ]);
      }
    },
    [editId]
  );

  const handleDelete = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const handleEdit = useCallback((task) => {
    setEditId(task.id);
  }, []);

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
      <TaskForm
        onSubmit={handleSubmit}
        initialTask={editId !== null ? tasks.find((task) => task.id === editId)?.text || '' : ''}
        editId={editId}
      />
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

