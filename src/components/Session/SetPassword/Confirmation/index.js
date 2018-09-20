import {Component} from 'react';
import PropTypes from 'prop-types';
import SetPasswordConfirmation from './SetPasswordConfirmation.js';
import {createComponent} from './SetPasswordConfirmation.js';

class SetPasswordConfirmationContainer extends Component {

  render(){
    const { route } = this.context.router;
    const { message, title, image, button, buttonMessage } = createComponent(route.location);

    return SetPasswordConfirmation({
        message,
        image,
        title,
        button,
        buttonMessage});
  }
}

SetPasswordConfirmationContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SetPasswordConfirmationContainer;
