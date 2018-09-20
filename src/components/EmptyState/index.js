import PropTypes from 'prop-types';
import EmptyState from './EmptyState.js';
import NoSent from '../../resources/no-feedbacks-yet.svg';
import NoNewTasks from '../../resources/no-new-tasks.svg';
import NothigFound from '../../resources/nothingfound.svg';
import LocalizedStrings from 'react-localization';
const myLocalization = require('../../resources/Strings.json');
const strings = new LocalizedStrings(myLocalization);

const GetMessage = (container, isSearch = false, strings) => {
  if (container === '/interact' && !isSearch){
    return {
      message: strings['es-no-tasks'],
      image: NoNewTasks
    };
  }else if(container === '/feedback/incoming' && !isSearch){
    return {
      message:strings['es-no-feedbacks-yet'],
      image: NoSent
    };
  }else if(container === '/feedback/sent' && !isSearch){
    return {
      message: strings['es-no-sent-feedbacks-yet'],
      image: NoSent
    };
  }else if (container === '/feedback/sentrequests' && !isSearch) {
    return {
      message: strings['es-no-sent-feedbacks-request'],
      image: NoSent
    };
  }else if (isSearch){
    return {
      message: strings['es-nothing-found'],
      image: NothigFound
    };
  } else if(container === '/skills'){
    return {
      message: strings['es-no-answers-yet'],
      image: NoSent
    };
  } else if(container === '/top'){
    return {
      message: strings['es-notenough-answers'],
      image: NoSent
    };
  }else{
    return {
      message: strings['es-page-not-found'],
      image: NothigFound
    };
  }
};

const EmptyStateContainer = (props) => {
    const { container, isSearch } = props;
    const { message, image } = GetMessage(container, isSearch, strings);
    return EmptyState({message,image});
};

EmptyStateContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

export default EmptyStateContainer;
