import {Component} from 'react';
import PropTypes from 'prop-types';
import ResetPassword from './ResetPassword.js';
import Api from '../../../lib/api.js';
import {EnvVariable} from '../../../config.js';
import {Utils} from '../../../lib/utils';

const ReactGA = require('react-ga');

ReactGA.initialize(EnvVariable.googleAnalyticsId);

class ResetPasswordContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: undefined
        };

        this.resetPassword = this.resetPassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.keyboardEvents = this.keyboardEvents.bind(this);
        this.getRefEmail = this.getRefEmail.bind(this);
    }

    resetPassword(){
        const { email } = this.state;
        ReactGA.event({ category: 'UI', action: 'Click', label: 'Reset PW button' });
        if (Utils().validateEmail(email)) {
            const { history } = this.context.router;
            Api.resetPassword(email)
                .then((response) => {
                    ReactGA.event({ category: 'Status', action: 'Success', label: 'Reset PW' });
                    history.replace({ pathname: 'reset_confirmation', state: {email} })
                })
                .catch((error) => {
                    ReactGA.event({ category: 'Status', action: 'Failure', label: 'Reset PW' });
                    history.replace({ pathname: 'reset_confirmation', state: {email} })
                });
        }else{
            alert("Érvénytelen email cím");
        }
    }

    handleChangeEmail(event){
        const email = event.target.value.toLowerCase();
        this.setState({ email });
    }

    keyboardEvents(e){
        if (e.keyCode === 13) { //Enter have the 13 keycode
            this.resetPassword();
        }
    }

    getRefEmail(input){
        this.email = input;
    }

    render(){
        return ResetPassword({
            resetPassword: this.resetPassword,
            handleChangeEmail: this.handleChangeEmail,
            getRefEmail: this.getRefEmail,
        });
    }

    componentDidMount(){
        window.addEventListener("keypress", this.keyboardEvents, false);
    }

    componentWillUnmount(){
        window.removeEventListener('keypress', this.keyboardEvents, false);
    }
}

ResetPasswordContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

export default ResetPasswordContainer;
