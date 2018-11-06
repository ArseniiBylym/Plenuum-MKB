import {Component} from 'react';
import PropTypes from 'prop-types';
import Login from './Login.js';
import Api from '../../../lib/api.js';
import {EnvVariable} from '../../../config.js';
import {Utils} from '../../../lib/utils';
import LocalizedStrings from 'react-localization';
const myLocalization = require('../../../resources/Strings.json');
const strings = new LocalizedStrings(myLocalization);

const ReactGA = require('react-ga');

ReactGA.initialize(EnvVariable.googleAnalyticsId);

const ErrorStatus = {
    noInput: 'login-no-input',
    noEmail: 'login-no-email',
    noPassword: 'login-no-password',
    noError: undefined
};

class LoginContainer extends Component {

    constructor(props, context) {
        super(props);
        this.store = context.store;
        this.state = {
            email: undefined,
            password: undefined,
            validationError: ErrorStatus.noError
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.keyboardEvents = this.keyboardEvents.bind(this);
        this.getRefEmail = this.getRefEmail.bind(this);
        this.getRefPassword = this.getRefPassword.bind(this);
        this.handleForgotPass = this.handleForgotPass.bind(this);
    }

    handleForgotPass() {
        ReactGA.event({ category: 'UI', action: 'Click', label: 'Elfelejtetted a jelszavad?' });
    }

    handleChangeEmail(event){
        this.setState({ email: event.target.value, validationError: ErrorStatus.noError });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value, validationError: ErrorStatus.noError });
    }

    createRequest(){
        const email = this.email.value.toLowerCase();
        const password = this.password.value;

        if (navigator.onLine) {
            ReactGA.event({ category: 'UI', action: 'Click', label: 'Login button' });
            if (email.length === 0 && password.length === 0) {
                this.setState({validationError: ErrorStatus.noInput});
            }else if (email.length !== 0 && password.length === 0) {
                this.setState({validationError: ErrorStatus.noPassword});
            }else if (password.length !== 0 && email.length === 0
                || !Utils().validateEmail(email)) {
                this.setState({validationError: ErrorStatus.noEmail});
            }else {
                ReactGA.event({ category: 'Server', action: 'Post', label: 'Do login' });
                Api.login(email, password)
                    .then((response) => {
                        window.localStorage.setItem('token', response.token + '');
                        window.localStorage.setItem('refreshToken', response.refreshToken + '');
                        ReactGA.event({category: 'Status', action: 'Success', label: 'Do login'});
                        this.context.router.history.push({ pathname: '/' })
                    })
                    .catch(() => {
                        ReactGA.event({ category: 'Status', action: 'Failure', label: 'Do login'});
                        alert(strings["login-wrong-credentials-alert"]);
                    });
            }
        }else{
            alert(strings["no-internet-connection"]);
        }
    }

    getRefEmail(input){
        this.email = input;
    }

    getRefPassword(input){
        this.password = input;
    }

    keyboardEvents(e){
        if (e.type === 'keyup' && e.keyCode === 13) { //Enter have the 13 keycode
            this.createRequest();
        }
    }

    componentWillMount(){
        this.setState({email: undefined, password: undefined});
    }

    render(){
        const { validationError } = this.state;

        const texts = {
            title: strings['login-title'],
            email: strings['login-email-address'],
            password: strings['login-password'],
            forgot: strings['login-forgot-password'],
            login: strings['login-button'],
            emailVError: strings['login-email-validation-error'],
            passwordVError: strings['login-password-validation-error']
        };

        return Login({
            validationStyle: validationError ? validationError : "login-error-message",
            createRequest: this.createRequest,
            handleChangeEmail: this.handleChangeEmail,
            handleChangePassword: this.handleChangePassword,
            getRefEmail: this.getRefEmail,
            getRefPassword: this.getRefPassword,
            texts,
            handleForgotPass: this.handleForgotPass
        });
    }

    componentDidMount(){
        window.addEventListener("keyup", this.keyboardEvents, false);
    }

    componentWillUnmount(){
        window.removeEventListener('keyup', this.keyboardEvents, false);
    }
}

LoginContainer.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object.isRequired
};

export default LoginContainer;
