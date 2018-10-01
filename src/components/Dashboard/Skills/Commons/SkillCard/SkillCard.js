
import React from 'react';
import './Skill.css';
import '../../Sentences/Sentences.css';

const CompetenceCard = (props) => {
  const compName=props.competenceName ? "(" + props.competenceName + ") " : "";
  return (
    <div key={props.element._id} className={ props.type + "-competence-card" + (props.numberOfAnswers > 0 ? "" : " inactive")} onClick={props.skillClicked}>
      <div className={ props.type + "-competence-title"}>
        <p className="title">{props.name}</p>
        <p className="answers">{props.numberOfAnswers ? compName + props.numberOfAnswers + " válasz" : "Még nem érkezett válasz."}</p>
      </div>
      <div className={ props.type + "-competence-scores"}>
        <div className="score-progressbar">
          <div className={ props.type + "-score-negative"}>
            <div className={ props.type + "-score-positive"} style={{width: props.score + '%'}}></div>
          </div>
      </div>
        <div className={props.type + "-progress"}>{props.numberOfAnswers ? Math.round(props.score) + "%" : ""}</div>
      </div>
    </div>
  );
};

export default CompetenceCard;
