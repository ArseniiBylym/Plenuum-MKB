import Privacy from './Privacy.js';

const PrivacyContainer = (props) => {
    return Privacy({
        handleChange:props.handleCheckBox,
        user:props.user});
};

export default PrivacyContainer;
