import ManagerVisibility from './ManagerVisibility.js';

const ManagerVisibilityContainer = (props) => {
    return ManagerVisibility({
        handleChange:props.handleCheckBox,
        user:props.user,
        isChecked:props.isChecked
    });
};

export default ManagerVisibilityContainer;
