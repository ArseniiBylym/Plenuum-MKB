import SelectedUser from './SelectedUser.js';

const SelectedUserContainer = (props) => {
  return SelectedUser({user:props.user,onClick:props.onClick});
};

export default SelectedUserContainer;