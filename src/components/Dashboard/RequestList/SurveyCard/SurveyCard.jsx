import React from 'react';
import './SurveyCard.css';
import { NavLink } from 'react-router-dom';
import PlenuumBot from '../../../../resources/plenuum-bot-face.svg';

const SurveyCard = (props) => {
  return (
    <div className="survey-container" key={props.key}>
      <div className="survey-user">
        <img alt="" src={PlenuumBot} />
        <p>Plenuumbot</p>
      </div>
      <div className="survey-message">
        <p>{ props.title }</p>
      </div>
      <NavLink
        className="survey-link"
        to={{
          pathname: props.linkProperties.pathname,
          state: props.linkProperties.state
        }}
      >
        Start Survey
      </NavLink>
    </div>
  );
};

export default SurveyCard;
