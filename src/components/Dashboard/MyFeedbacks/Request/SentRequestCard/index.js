import SentRequestCard from './SentRequestCard.js';
import RequestIcon from '../../../../../resources/request.png';

const SentRequestCardContainer = (props) => {
  const type = { image: RequestIcon };

  const users = [];
  for (let index in props.users) {
    users.push(props.users[index].firstName + " " + props.users[index].lastName);
  }
  const userNamesString = "Sent to: " + users.join(", ");

  return SentRequestCard({
      request:props.request,
      onClick:props.requestClicked,
      type,
      userNames:userNamesString});
};

export default SentRequestCardContainer;
