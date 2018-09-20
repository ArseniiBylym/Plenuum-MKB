import React from 'react';
import FeedbackCardContainer from '../FeedbackCard/index.js';

const createComponents = (feedbacks, feedbackClicked) => {
    return feedbacks.map((feedback) => {
      return <FeedbackCardContainer
          key={feedback._id}
          feedback={feedback}
          feedbackClicked={feedbackClicked.bind(this, feedback)}
      />;
  });
};

const FeedbackListContainer = (props) => {
  const { feedbacks, feedbackClicked } = props;
  const component = createComponents(feedbacks, feedbackClicked);
  return(
    <div className="feedback-incoming-list-container">
      {component}
    </div>
  );
};

export default FeedbackListContainer;
