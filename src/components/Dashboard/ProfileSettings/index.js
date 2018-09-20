import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProfileSettings, {editActions, editSaveActions} from './ProfileSettings.js';
import ChangePasswordContainer from '../../Session/ChangePassword/index.js';
import SetPictureContainer from './SetPicture/index.js';

class ProfileSettingsContainer extends Component {

    constructor(props, context){
        super(props);

        this.store = context.store;
        this.setUserData();

        this.handleTextField = this.handleTextField.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
    }

    setUserData() {
        const user = this.store.getState().currentUser;
        this.state = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: '',
            newPassword: '',
            passwordAgain : '',
            edit: false,
            setPic: false,
            uploadedImage: undefined,
            changePassword: undefined
        }
    }

    componentWillMount(){
        this.handleEdition();
    }

    handleChangePassword(shouldOpen) {
        let changePassword;
        if (!shouldOpen) {
            changePassword = undefined;
        } else {
            changePassword = (<ChangePasswordContainer handleCloseAlert={this.handleChangePassword}/>);
        }
        this.setState({changePassword:changePassword});
    }

    handleResponse(response, error){
        if (error) {
            console.log(error.message);
        }else{
            console.log(response);
        }
    }

    handleSave(){
        this.changePassword();
        this.handleEdition();
    }

    handlePictureChange()
    {
        if (this.state.setPic) {
            this.dropzone = (
                undefined
            );
            this.setState({setPic: false});
        } else {
            this.dropzone = <SetPictureContainer handlePictureChange={this.handlePictureChange}
                                                 updatePicture={this.props.setProfilePicture}/>
            this.setState({setPic: true, dropzone: this.dropzone});
        }
    }


    handleEdition(){
        if (this.state.edit) {
            this.actions = editSaveActions({handleEdition:this.handleEdition, handleSave:this.handleSave});
            this.setState({edit: false});
        }else {
            this.actions = editActions({handleEdition:this.handleEdition});
            this.setUserData();
            this.setState({edit: true, password: '', newPassword: '', passwordAgain: ''});
        }
    }

    handleTextField(e){
        switch (e.target.name) {
            case 'firstName':
                this.setState({firstName: e.target.value});
                break;
            case 'lastName':
                this.setState({lastName: e.target.value});
                break;
            case 'email':
                this.setState({email: e.target.value});
                break;
            case 'password':
                this.setState({password: e.target.value});
                break;
            case 'newPassword':
                this.setState({newPassword: e.target.value});
                break;
            case 'passwordAgain':
                this.setState({passwordAgain: e.target.value});
                break;
            default:
                return;
        }
    }

    render(){
        const user = this.store.getState().currentUser;
        return ProfileSettings({
            user,
            dropzone:this.dropzone,
            setPic:this.handlePictureChange,
            actions:this.actions,
            handleTextField:!this.state.edit ? this.handleTextField : undefined,
            handleChangePassword:this.handleChangePassword,
            readOnly:this.state.edit,
            userDescription:"",
            changePassword:this.state.changePassword ? this.state.changePassword : ""});
    }
}

ProfileSettingsContainer.contextTypes = {
    store: PropTypes.object
};

export default ProfileSettingsContainer;
