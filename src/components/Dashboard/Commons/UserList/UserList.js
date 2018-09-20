import React from 'react';

const UserList = (props) => {
  return(
    <div className={props.myStyle}>
      {props.users}
    </div>
  );
};

export default UserList;
