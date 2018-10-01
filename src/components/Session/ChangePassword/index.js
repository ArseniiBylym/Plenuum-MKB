import {Component} from 'react';
import ChangePassword from './ChangePassword.js';
import ChangePasswordSuccess from './ChangePasswordSuccess.js';
import Api from '../../../lib/api';
import {ruleRunner, run} from '../Commons/ValidatingTextInput/Utils/ruleRunner.js'
import {mustMatch, required} from '../Commons/ValidatingTextInput/Utils/rules.js';

const minLength = 6;

const fieldValidations = [
    ruleRunner("currentPassword", "Current password", required),
    ruleRunner("newPassword", "New password", required),
    ruleRunner("confirmPassword", "Confirm password", required),
    ruleRunner("confirmPassword", "Confirm password", mustMatch("newPassword", "newPassword"))
];


class ChangePasswordContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            validationErrors: {},
            showErrors:false,
            currentUser:undefined
        };

        this.changePassword = this.changePassword.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.errorFor = this.errorFor.bind(this);
    }

    componentDidMount() {
        Api.userMySelf()
            .then((response) => { this.setState({currentUser:response}) })
            .catch((error) => { console.log(error) });
    }

    changePassword(){

        if ( this.state.newPassword.length < minLength || this.state.confirmPassword.length < minLength ) {
            alert(`Passwords should be at least ${minLength} characters long.`)
        }else{
            this.state.validationErrors = run(this.state, fieldValidations);
            if (Object.getOwnPropertyNames(this.state.validationErrors).length !== 0) {
                this.setState({showErrors:true});
                return;
            }
            const {currentUser} = this.state;
            //Deal with more errors and validations, such as password follow some kind of default pattern, no */! and must contain letters and numbers or can't be equal to the currentPassword
            const body = JSON.stringify({
                email: currentUser.email,
                password: this.state.currentPassword,
                newPassword: this.state.newPassword
            });

            Api.changePassword(body)
                .then((response) => {
                    this.setState({passwordUpdated:true});
                    console.log(response);
                    setTimeout(function() {
                        this.setState({passwordUpdated: false});
                        this.props.handleCloseAlert(false);
                    }.bind(this), 2000);
                })
                .catch((error) => {
                    this.state.validationErrors["currentPassword"] = "Hibás jelszó";
                    this.setState({showErrors:true});
                    console.log(error.message);
                });
        }

    }

    errorFor(field) {
        return this.state.validationErrors[field] || "";
    }

    onTextChange(field) {
        return (e) => {
            this.state.validationErrors[field] = "";
            this.setState({[field]: e.target.value});
        }
    }

    onFocusChange(field) {
        return (e) => {
            this.state.validationErrors[field] = "";
            this.setState({showErrors:true});
        }
    }

    render(){
        if (this.state.passwordUpdated) {
            return ChangePasswordSuccess({handleCloseAlert:this.props.handleCloseAlert});
        } else {
            const functions = {
                changePassword: this.changePassword,
                handlePassword: this.handlePassword,
                handleCurrentPassword: this.handleCurrentPassword,
                onFocus: this.onFocus,
                showErrors: this.state.showErrors,
                onFocusChange:this.onFocusChange,
                onTextChange:this.onTextChange,
                errorFor:this.errorFor
            };

            return ChangePassword({functions, handleCloseAlert:this.props.handleCloseAlert});
        }
    }
}

export default ChangePasswordContainer;
