import React from 'react';
import UserCell from './UserCell.js';
import PlusIcon from '../../../../resources/ic_add_black_24dp_1x.png';

const GetAccessory = () => {
  return (
    <div className="plus-icon" >
      <img alt="" src={PlusIcon} />
    </div>
  );
};

const UserCellContainer = (props) => {
  const accessory = props.accessory ? GetAccessory() : undefined;
  return(
    <UserCell
      user={props.user}
      onClick={props.onClick}
      accessory={accessory}
      customClass={props.customClass || "userCell-container"}
    />
  );
};

export default UserCellContainer;
