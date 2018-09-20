
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Login.css';
import LogoNavigationBar from '../../Dashboard/Commons/DefaultNavigationBar/LogoNavigationBar.js'

const checkForError=(style) => {
    switch (style) {
        case "login-no-email":
            return {
                loginLableStyle:"login-label-error",
                passwordLableStyle:"login-label",
                emailInputStyle:"login-email-input-error",
                passwordInputStyle:"login-password-input",
                emailErrorMessage:"login-no-input",
                passwordErrorMessage:"login-no-password-error-message"
            };
        case "login-no-password":
            return {
                loginLableStyle:"login-label",
                passwordLableStyle:"login-label-error",
                emailInputStyle:"login-email-input",
                passwordInputStyle:"login-password-input",
                emailErrorMessage:"login-no-email-error-message",
                passwordErrorMessage:"login-no-input"
            };
        case "login-no-input":
            return {
                loginLableStyle:"login-label-error",
                passwordLableStyle:"login-label-error",
                emailInputStyle:"login-email-input-error",
                passwordInputStyle:"login-password-input-error",
                emailErrorMessage:"login-no-input",
                passwordErrorMessage:"login-no-input"
            };
        default:
            return {
                loginLableStyle:"login-label",
                passwordLableStyle:"login-label",
                emailInputStyle:"login-email-input",
                passwordInputStyle:"login-password-input",
                emailErrorMessage:"login-no-email-error-message",
                passwordErrorMessage:"login-no-password-error-message"
            };
    }
};

const Login=(props) => {
    const {
        loginLableStyle,
        passwordLableStyle,
        emailInputStyle,
        passwordInputStyle,
        emailErrorMessage,
        passwordErrorMessage
    } = checkForError(props.validationStyle);
    return (
        <div className="parentcontainer">
            <LogoNavigationBar />
            <div className="login-main-container">
                <div className="login-form-container">
                    <div className="login-form-container-div">
                        <div className="login-title-container">
                            <p className="login-title">{props.texts.title}</p>
                        </div>
                        <div className="login-email-labels">
                            <p className={loginLableStyle}>
                                {props.texts.email}
                            </p>
                            <p className={emailErrorMessage}>
                                {props.texts.emailVError}
                            </p>
                        </div>
                        <input
                            className={emailInputStyle}
                            type="text"
                            name="email"
                            onChange={props.handleChangeEmail}
                            ref={props.getRefEmail}
                            autoComplete="on"
                        />
                        <div className="login-email-labels">
                            <p className={passwordLableStyle}>
                                {props.texts.password}
                            </p>
                            <p className={passwordErrorMessage}>
                                {props.texts.passwordVError}
                            </p>
                        </div>
                        <input
                            className={passwordInputStyle}
                            type="password"
                            name="password"
                            onChange={props.handleChangePassword}
                            ref={props.getRefPassword}
                            autoComplete="on"
                        />
                        <div className="login-checkbox">
                            <NavLink to="/reset_password" className="login-forgot-password-link">{props.texts.forgot}</NavLink>
                        </div>
                        <div className="login-button-div">
                            <div className="login-button" onClick={props.createRequest}>
                                <p>{props.texts.login}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
