import {Component} from 'react';
import PropTypes from 'prop-types';
import SetPassword from './SetPassword.js';
import {createComponent} from './SetPassword.js';
import {TokenHasExpired} from './Confirmation/SetPasswordConfirmation.js';
import Api from '../../../lib/api.js';
import {spinner} from "../../Commons/Spinner/spinner";

const minLength = 6;

class SetPasswordContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            token: undefined,
            password: undefined,
            passwordagain: undefined,
            email: undefined,
            tokenvalid: undefined,
            welcome: undefined, //use to detect new users
            reseted: undefined,
            userName: undefined,
            error:undefined
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitNewPassword = this.submitNewPassword.bind(this);
        this.resendLink = this.resendLink.bind(this);
        this.isMobile = this.isMobile.bind(this);
    }


    handleChange(e){
        if (e.target.name === 'newpassword') {
            this.setState({password: e.target.value});
        }else if (e.target.name === 'passwordagain') {
            this.setState({passwordagain: e.target.value});
        }
    }

    isMobile(){
        console.log("Checking device");
        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ){
            return true;
        }
        else {
            return false;
        }
    }

    resendLink(){
        const { email } = this.state;
        Api.resetPassword(email, true)
            .then((response) => {
                let { history } = this.context.router;
                history.replace({
                    pathname: '/set_password_confirmation/success',
                    state: { message: 'Link resent. Check your email!' }
                });
            })
            .catch((error) => { console.log(error) });
    }

    submitNewPassword(){

        const { password, passwordagain, token } = this.state;

        if ( !password || !passwordagain || password.length < 1 || passwordagain.length < 1){
            alert('Passwords can not be empty.')
        }else if ( password.length < minLength || passwordagain.length < minLength ) {
            alert('Legalább 6 betű.')
        } else {
            if (password === passwordagain && token ) {
                Api.setPassword(token, password)
                    .then((response) => {
                        let { history } = this.context.router;
                        if (response.hasOwnProperty('error')) {
                            history.replace({
                                pathname: '/set_password_confirmation/error',
                                state: { error: response.error }
                            })
                        }else{
                            const { email, password, welcome } = this.state;
                            if (welcome && !this.isMobile()) { //Not mobile and welcoming email
                                setTimeout(() => {
                                    Api.login(email, password)
                                        .then((result) => {
                                            history.push({ pathname: '/' });
                                        })
                                        .catch((err) => console.log(err.message));
                                }, 5000);
                                history.replace({
                                    pathname: '/set_password_confirmation/success',
                                    state: { message: "We're setting up your account. Should take a few seconds."}
                                });
                            }else if(welcome){ //Welcoming email and mobile
                                history.replace({
                                    pathname: '/set_password_confirmation/success',
                                    state: { message: 'NOTDESKTOP'}
                                });
                            }else{
                                history.replace({ pathname: '/set_password_confirmation/success' });
                            }
                        }
                    })
                    .catch(() => {
                        let { history } = this.context.router;
                        history.replace({ pathname: '/set_password_confirmation/error' });
                    });
            }else{
                alert('The two passwords do not match.');
            }
        }
    }

    componentWillMount(){
        const { route } = this.context.router;
        const search = route.location.search;
        const params = new URLSearchParams(search);
        this.setState({
            token: params.get('token'),
            email:params.get('email'),
            welcome: params.get('welcome'),
            userName: params.get('name')
        });
        Api.validateToken(params.get('token'))
            .then((response) => {
                this.setState({tokenvalid: response.validToken, reseted: response.reseted});
            })
            .catch((error) => {
                console.log(error.message);
                this.setState({tokenvalid: false, error:error.message});
            });
    }

    render(){
        const {tokenvalid, reseted, error} = this.state;
        const { title, message, buttonTitle } = createComponent(this.state);
        if (tokenvalid === undefined) {
            return spinner();
        }else{
            if (!tokenvalid) {
                return TokenHasExpired({image:undefined,
                    message:reseted ? "You already set your first password!" : error !== undefined ? error : "Sorry, the link has expired!",
                    resendLink:this.resendLink,
                    reseted});
            }
            return SetPassword({
                    setPassword:this.submitNewPassword,
                    handleChange:this.handleChange,
                    title,
                    message,
                    buttonTitle,
                    email:this.state.email});
        }
    }
}

SetPasswordContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SetPasswordContainer;
