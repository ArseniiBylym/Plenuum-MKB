import SurveyCard from './SurveyCard.jsx';

const SurveyCardContainer = (props) => {
  return SurveyCard({...props,
      key:props.key,
      title: props.title,
      linkProperties: {
      	pathname: '/survey',
      	state: { fromRequest: props.survey },
      }});
};

export default SurveyCardContainer;
