import React from 'react';
import SentRequestCardContainer from './SentRequestCard/index.js';

const createCells = (requests, users, requestClicked) => {
  return requests.map((element) => {
      const mappedUsers = [];
    for (let index in element.recipientId) {
      const user = users.find((user) => {
        return user._id === element.recipientId[index];
      });
      if (user) {
          mappedUsers.push(user);
      }
    }
    return <SentRequestCardContainer
      key={element._id}
      request={element}
      users={mappedUsers}
      requestClicked={requestClicked.bind(this, element)}
    />
  });
};

const createList = (requests, users, requestClicked) => {
    const cells = createCells(requests, users, requestClicked);
    return(
        <div className="sent-request-list-container">
            {cells}
        </div>
    );
};

const SentRequestListContainer = (props) => {
  const { requests, users, requestClicked } = props;
    return createList(requests, users, requestClicked);
};

export default SentRequestListContainer;
