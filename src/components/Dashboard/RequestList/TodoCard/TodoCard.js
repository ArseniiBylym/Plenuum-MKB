import React from 'react';
import './TodoCard.css';
import { NavLink } from 'react-router-dom';
import PlenuumBot from '../../../../resources/plenuum-bot-face.svg';
// import moment from 'moment';

const TodoCard = (props) => {
  return (
    <div className="todo-container" key={props.key}>
      <div className="todo-user">
        <img alt="" src={PlenuumBot} />
        <p>Plenuumbot</p>
      </div>
      <div className="todo-message">
        <p><span className="todo-user-name">
            {props.aboutUser.firstName + " " + props.aboutUser.lastName}
            </span> számára fontos a véleményed. Mondd el, hogy mit gondolsz a munkájáról!</p>
      </div>
      {/* <div className='feedback-content-date interact-card'>
						{moment(props.survey.createdAt).utc().format('YYYY.MM.DD • HH.mm')}
      </div> */}
      <NavLink
        className="todo-link-feedback"
        to={{
          pathname: props.linkProperties.pathname,
          state: props.linkProperties.state
        }}
        >
        Oké, kezdjük!
      </NavLink>
    </div>
  );
};

export default TodoCard;
