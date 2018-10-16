import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OptionsList from './OptionsList.js';
import OptionCellContainer from '../OptionsCell/index.js';
import LocalizedStrings from 'react-localization';
const myLocalization = require('../../../../resources/Strings.json');
const strings = new LocalizedStrings(myLocalization);

class OptionsListContainer extends Component {
    constructor(props, context) {
        super(props);

        this.store = context.store;
        this.onClick = this.props.onClick.bind(this);
    }

  createComponents(options) {
    return options.map((option, index) => {
      return <OptionCellContainer
        key={index}
        item={option}
        onClick={this.onClick}
      />;
    });
  }

    onClick() {

    }

    getItems(strings) {
        return [
            { title: "Feladatok", path: '/interact', class: 'interact-option' },
            { title: "Visszajelzéseid", path: '/feedback', class: 'myfeedbacks-option' },
            { title: "Készségeid", path: '/skills', class: 'skills-option' },
            { title: "Kérdőíveim", path: '/my_surveys', class: 'survey-option' },
            { title: "Közvetlen beosztottak", path: '/my_team', class: 'my_team-option' },
        ];
    }

    render() {
        let items = this.getItems(strings);
        const optionsList = this.createComponents(items);
        return OptionsList({options:optionsList});
    }
}

OptionsListContainer.contextTypes = {
    store: PropTypes.object
};

export default OptionsListContainer;
