import React from 'react';
import './SkillsTop.css';

const SkillsTop = (props) => {
  return (

    <div className="top-full-container">
      {props.navigationBar}
      <div className="skills-top-header">Top strength</div>
      <div className="skills-top-main-container" onClick={props.onClick}>
        {props.topCards}
      </div>
      <div className="skills-top-header2">Top opportunities</div>
      <div className="skills-top-main-container" onClick={props.onClick}>
        {props.bottomCards}
      </div>
    </div>
  )
}

export default SkillsTop;
