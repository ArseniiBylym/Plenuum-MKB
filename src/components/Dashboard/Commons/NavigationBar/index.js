import React, {Component} from 'react';
import NavigationBar from './NavigationBar.js';

class NavigationBarContainer extends Component {

  render() {
    const {barContent, title} = this.props;
    return (
      <NavigationBar barContent={barContent} title={title}/>
    );
  }

}

export default NavigationBarContainer;
