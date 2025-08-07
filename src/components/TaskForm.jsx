import React, { useState, useCallback } from 'react';
import Input from './reusable/input';
import Button from './reusable/Button';

function TaskForm({ onSubmit, initialTask = '', editId }) {
  const [taskInput, setTaskInput] = useState(initialTask);
  const [error, setError] = useState('');

  const handleInputChange = useCallback((event) => {
    setTaskInput(event.target.value);
    setError(''); // Clear error on input change, as in original
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!taskInput.trim()) {
        setError('Task cannot be empty');
        return;
      }
      onSubmit(taskInput, editId); // Pass taskInput and editId to parent
      setTaskInput(''); // Clear input after submission
      setError(''); // Clear error after submission
    },
    [taskInput, editId, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <Input
        value={taskInput}
        onChange={handleInputChange}
        placeholder="Enter a task"
        className="task-input"
      />
      <Button type="submit" variant={editId !== null ? 'secondary' : 'primary'}>
        {editId !== null ? 'Update Task' : 'Add Task'}
      </Button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskForm;
