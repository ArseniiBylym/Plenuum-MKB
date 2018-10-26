import React from 'react';
import SurveyCard from './SurveyCard.jsx';

const SurveyCardContainer = (props) => {
  return <SurveyCard 
          {...props}
          survey={props.survey} 
          key={props.key}
          title={props.title}
        />
};
      // return SurveyCard({...props,
      //     key:props.key,
      //     title: props.title,
      //     linkProperties: {
      //     	pathname: `/${props.survey._id}`,
      //     	state: { fromRequest: props.survey },
      //     }});

export default SurveyCardContainer;

// import SurveyCard from './SurveyCard.jsx';

// const SurveyCardContainer = (props) => {
//   return SurveyCard({...props,
//       linkProperties: {
//       	pathname: `/survey/${props.index}`,
//       	state: { fromRequest: props.survey },
//       }});
// };

// export default SurveyCardContainer;
