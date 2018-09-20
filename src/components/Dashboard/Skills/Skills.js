import React from 'react';
import './Skills.css';

const Skills = (props) => {
  return (

    <div className="full-container">
      {props.navigationBar}
      <div className="skills-main-container">
        {props.competenceCards}
      </div>
    </div>
  )
};

export default Skills;
