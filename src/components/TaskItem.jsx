import React from 'react';
import Button from './reusable/Button';

function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <span>{task.text}</span>
      <div className="task-actions">
        <Button onClick={() => onEdit(task)} variant="secondary">
          Edit
        </Button>
        <Button onClick={() => onDelete(task.id)} variant="danger">
          Delete
        </Button>
      </div>
    </li>
  );
}

export default TaskItem;
