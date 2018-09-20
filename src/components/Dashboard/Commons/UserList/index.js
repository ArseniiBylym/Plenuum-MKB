import React from 'react';
import PropTypes from 'prop-types';
import UserList from './UserList.js';
import UserCellContainer from '../UserCell/index.js';

const convertToCells=(array, features) => {
  const { ContainerCell, accessory, clickUser }=features;
  if (ContainerCell) {
    return array.map((user) => {
      return <ContainerCell
        key={user._id}
        user={user}
        onClick={clickUser.bind(this, user)}
      />;
    });
  }else{
    return array.map((element) => {
      return <UserCellContainer
        key={element._id}
        user={element}
        onClick={clickUser.bind(this, element)}
        accessory={accessory}
      />;
    });
  }
};

const UserListContainer=(props) => {
    const features = {
        ContainerCell: props.containerCell,
        accessory: props.accessory,
        clickUser: props.handleUserClick
    };

    const usersCell = convertToCells(props.users, features);
    return(
        <UserList
            users={usersCell}
            myStyle={props.myStyle}
        />
    );
};

UserListContainer.contextTypes={
  store: PropTypes.object,
};

export default UserListContainer;
