import React from 'react';
import Button from './Button.js';

const Header = ({ title, onClick, showAdd }) => {
  return (
    <header className="header">
      <h1 style={{ color: 'black', backgroungColor: 'black' }}>{title}</h1>
      {showAdd ? (
        <Button text="Close" color="red" onClick={onClick} />
      ) : (
        <Button text="Add" color="green" onClick={onClick} />
      )}
    </header>
  );
};

export default Header;
