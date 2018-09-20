import React, {Component} from 'react';
import BackButton from './BackButton.js';

class BackButtonContainer extends Component {

  render() {
    const {title}=this.props;
    return (
      <BackButton title={title}/>
    );
  }

}

export default BackButtonContainer;
