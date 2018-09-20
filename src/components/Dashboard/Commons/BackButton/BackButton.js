import React from 'react';
import css from './BackButton.css';

const BackButton=(props) => {
  const {title}=props;
  return (
    <a href="javascript:history.back()" className="back-button-title">{title}</a>
  );
};

export default BackButton;
