
import React from 'react';
import FeedbackCard from './FeedbackCard.js';
import ConsiderIcon from '../../../../../resources/consider-38.svg';
import ContinueIcon from '../../../../../resources/continue-38.svg';
import RequestIcon from '../../../../../resources/request_icon.svg';
import PrivateIcon from '../../../../../resources/lock.png';
import TagList from '../../../Commons/TagList/index.js';
import Constants from '../../../../../lib/constants';

const createIcon = (icon) => {
  return (
    <div className="feedback-separate-icon">
      <img alt="" src={icon} />
    </div>);
};

const setupIcons = (request, privacy) => {
  return (
    <div className="feedback-icons">
      {request}
      {privacy}
    </div>);
};

const setupTags = (tags) => {
  return (
    <TagList tags={tags}
      customStyle="tag-custom"
      tagClicked={undefined}
      tagsStyle="feedback-card-tags"
    />
  )
};

const createComponent = (feedback) => {
  let type, request_icon, priv_icon;
  if (feedback.type === Constants.FeedbackType.CONSIDER) {
    type={
      color: "#f4d141",
      image: ConsiderIcon
    }
  }else{
    type={
      color: "#00d6a5",
      image: ContinueIcon
    }
  }

  if (feedback.requestId && feedback.requestId.length > 0 ) {
    request_icon = createIcon(RequestIcon);
  }
  if (feedback.privacy && feedback.privacy.includes(Constants.FeedbackPrivacy.PRIVATE)) {
    priv_icon = createIcon(PrivateIcon);
  }

  const cardIcons = setupIcons(request_icon, priv_icon);

  const tags = feedback.tags && feedback.tags.length > 0 ?
    setupTags(feedback.tags) : undefined;

  return { cardIcons, type, tags };
};

const FeedbackCardContainer = (props) => {
  const { feedback, feedbackClicked } = props;
    const {cardIcons, type, tags } = createComponent(feedback);
    return FeedbackCard({
        feedback,
        type,
        cardIcons,
        onClick:feedbackClicked,
        tags});
};

export default FeedbackCardContainer;
