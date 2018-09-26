// import React from 'react';
// import './SurveyCard.css';
// import { NavLink } from 'react-router-dom';
// import PlenuumBot from '../../../../resources/plenuum-bot-face.svg';

// const SurveyCard = (props) => {
//   return (
//     <div className="survey-container" key={props.key}>
//       <div className="survey-user">
//         <img alt="" src={PlenuumBot} />
//         <p>Plenuumbot</p>
//       </div>
//       <div className="survey-message">
//         <p>{ props.title }</p>
//       </div>
//       <NavLink
//         className="survey-link"
//         to={{
//           pathname: props.linkProperties.pathname,
//           state: props.linkProperties.state
//         }}
//       >
//         Start Survey
//       </NavLink>
//     </div>
//   );
// };

// export default SurveyCard;

import React from 'react';
import './SurveyCard.css';
import { NavLink } from 'react-router-dom';
import PlenuumBot from '../../../../resources/plenuum-bot-face.svg';

const SurveyCard = (props) => {
  console.log(props)
  return (
    <div className="survey-container" key={props.survey._id}>
      <div className="survey-user">
        <img alt="" src={props.survey.sender.pictureUrl} />
        <p>{props.survey.sender.firstName} {props.survey.sender.lastName}</p>
      </div>
      <div className="survey-message">
        <p>{ props.survey.title }</p>
      </div>
      <NavLink
        className="survey-link"
        to={{
          pathname: props.linkProperties.pathname,
         
        }}
      >
        Start Survey
      </NavLink>
    </div>
  );
};

export default SurveyCard;

