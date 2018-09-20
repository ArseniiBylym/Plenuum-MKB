import {Component} from 'react';
import PropTypes from 'prop-types';
import ResetConfirmation from './ResetConfirmation.js';

class ResetConfirmationContainer extends Component {

  render(){
    const { route } = this.context.router;
    const email = route.location.state.email;
    return ResetConfirmation({email});
  }
}

ResetConfirmationContainer.contextTypes = {
  router: PropTypes.object.isRequired
};


export default ResetConfirmationContainer;
