
import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar.js';
import OptionsListContainer from './OptionsList/index.js';
import {EnvVariable} from '../../../config';

const ReactGA = require('react-ga');

ReactGA.initialize(EnvVariable.googleAnalyticsId);

const createButtons = () => {
  const newFeedbackButton = {
    pathname: '/newfeedback',
    fromRequest: undefined
  };
    const newRequestButton={ pathname: '/newrequest' };
    const answerCardsButton={pathname: '/compass'};
  return {newFeedbackButton, newRequestButton, answerCardsButton}
};

const navItemClicked = (e) => {
    const name = e.target.text + ' nav item';
  ReactGA.event({
    category: 'UI',
    action: 'Click',
    label: name
  });
};

const SidebarContainer = (props, context) => {
    const { route } = context.router;
    let replace = false;
    if (['/newrequest', '/newfeedback', '/compass'].includes(route.location.pathname)) {
        replace = true;
    }
    const {newFeedbackButton, newRequestButton, answerCardsButton} = createButtons();
    const {version, buildNumber } = EnvVariable;
    return Sidebar({
        ...props,
        replace,
        options:<OptionsListContainer onClick={navItemClicked}/>,
        createNewFeedback:newFeedbackButton,
        createRequest:newRequestButton,
        answerCards:answerCardsButton,
        version:"Plenuum " + version + " (" + buildNumber + ")",
        hamburgerClick:props.hamburgerClick});
};

SidebarContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SidebarContainer;
