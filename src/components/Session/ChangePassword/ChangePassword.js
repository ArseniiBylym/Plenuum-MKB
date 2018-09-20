import React from 'react';
import './ChangePassword.css';
import ValidatingTextInputContainer from '../Commons/ValidatingTextInput/index.js';

const textInputs = (functions) => {
    return [<ValidatingTextInputContainer name="currentPassword"
                                          label="CURRENT PASSWORD"
                                          showErrors={functions.showErrors}
                                          onFocusChange={functions.onFocusChange("currentPassword")}
                                          onChange={functions.onTextChange("currentPassword")}
                                          errorMessage={functions.errorFor("currentPassword")}
                                          type="password"
                                          key="currentPassword"/>,
        <ValidatingTextInputContainer name="newPassword"
                                      key="newPassword"
                                      label="NEW PASSWORD"
                                      showErrors={functions.showErrors}
                                      onFocusChange={functions.onFocusChange("newPassword")}
                                      onChange={functions.onTextChange("newPassword")}
                                      errorMessage={functions.errorFor("newPassword")}
                                      type="password"/>,
        <ValidatingTextInputContainer name="confirmPassword"
                                      key="confirmPassword"
                                      label="CONFIRM PASSWORD"
                                      showErrors={functions.showErrors}
                                      onFocusChange={functions.onFocusChange("confirmPassword")}
                                      onChange={functions.onTextChange("confirmPassword")}
                                      errorMessage={functions.errorFor("confirmPassword")}
                                      type="password"/>];
};

const ChangePassword = (props) => {
    const inputs = textInputs(props.functions);
  return(
    <div className="change-password-container">
      <div className="overlay" onClick={ props.handleCloseAlert.bind(this, false)}>
      </div>
      <div className="change-password-alert">
        <div className="change-password-header">Set your new password</div>
        {inputs}
        <div className="change-password-button">
          <button type="submit" onClick={ props.functions.changePassword}>Set my password</button>
        </div>
      </div>
    </div>
  );

};


export default ChangePassword;
