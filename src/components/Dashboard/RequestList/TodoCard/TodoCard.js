import React from 'react';
import './TodoCard.css';
import { NavLink } from 'react-router-dom';
import PlenuumBot from '../../../../resources/plenuum-bot-face.svg';

const TodoCard = (props) => {
  return (
    <div className="todo-container" key={props.key}>
      <div className="todo-user">
        <img alt="" src={PlenuumBot} />
        <p>Plenuumbot</p>
      </div>
      <div className="todo-message">
        <p>Hi there, please help <span className="todo-user-name">
            {props.aboutUser.firstName + " " + props.aboutUser.lastName}
            </span> with answering a few questions!</p>
      </div>
      <NavLink
        className="todo-link-feedback"
        to={{
          pathname: props.linkProperties.pathname,
          state: props.linkProperties.state
        }}
        >
        Okay, let’s start!
      </NavLink>
    </div>
  );
};

export default TodoCard;
