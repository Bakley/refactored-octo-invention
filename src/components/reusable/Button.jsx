import React from 'react';

function Button({ onClick, children, type = 'button', variant = 'primary', className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button--${variant} ${className || ''}`}
    >
      {children}
    </button>
  );
}

export default Button;
