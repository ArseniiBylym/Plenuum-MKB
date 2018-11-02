import React from 'react';
import './TodoCard.css';
import { NavLink } from 'react-router-dom';
import PlenuumBot from '../../../../resources/plenuum-bot-face.svg';
import DefaultPic from '../../../../resources/profile.svg';
import moment from 'moment';

const TodoCard = (props) => {
  console.log(props)
  return (
    <div className="todo-container" key={props.key}>
      <div className="todo-user">
        {/* <img alt="" src={PlenuumBot} />
        <p>Plenuumbot</p> */}
        <dis className='picture-wrapper'>
          <div className='picture-wrapper--img' style={{backgroundImage: `url(${props.aboutUser.pictureUrl && props.aboutUser.pictureUrl !== "" ? props.aboutUser.pictureUrl : DefaultPic})`}}></div>
          <img alt="" src={props.aboutUser.pictureUrl && props.aboutUser.pictureUrl !== "" ? props.aboutUser.pictureUrl : DefaultPic} />
        </dis>
        <p>{props.aboutUser.firstName + " " + props.aboutUser.lastName}</p>
      </div>
      <div className="todo-message">
        <p><span className="todo-user-name">
            {props.aboutUser.firstName + " " + props.aboutUser.lastName}
            </span> számára fontos a véleményed. Mondd el, hogy mit gondolsz a munkájáról!</p>
      </div>
      <div className='feedback-content-date interact-card'>
						{moment(props.todo.createdAt).format('YYYY.MM.DD • HH.mm')}
      </div>
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
