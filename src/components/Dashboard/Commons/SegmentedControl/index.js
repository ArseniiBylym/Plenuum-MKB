import React, {Component} from 'react';
import Segmented from '../SegmentedItem/SegmentedItem.js';
import SegmentedControl from './SegmentedControl.js';
import {EnvVariable} from '../../../../config';

const ReactGA = require('react-ga');

ReactGA.initialize(EnvVariable.googleAnalyticsId);

class SegmentedContainer extends Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
  }

  createOption(options, customComponent) {
    if (customComponent) {
      return options.map((option, index) => {
        return <customComponent key={option.id || index} title={option} />
      });
    }else{
      const optionCells = options.map((option, index) => {
        return <Segmented key={index} option={option} onClick={this.selectItem}/>
      });
      return optionCells;
    }
  }

  selectItem(e) {
    ReactGA.event({
      category: 'UI',
      action: 'Click',
      label: e.target.text + ' tab click'
    });
  }

  render() {
    const segmented = this.createOption(this.props.options, this.props.customComponent);
    return(
      <SegmentedControl cells={segmented}/>
    );
  }
}

export default SegmentedContainer;
