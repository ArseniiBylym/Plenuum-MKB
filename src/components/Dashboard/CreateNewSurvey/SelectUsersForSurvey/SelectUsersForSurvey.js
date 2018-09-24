import React, { Component } from 'react';
import { UserComponent } from '../../CreateFeedbackRequest/CreateFeedbackRequest';
import CreateFeedbackRequestContainer from '../../CreateFeedbackRequest/index';
import './SelectUsersForSurvey.css';

class SelectUsersForSurvey extends Component {
    state ={

    }

    render() {
        return(
            <div className='SelectUsersForSurvey'> 
                <CreateFeedbackRequestContainer />
            </div>
        )
    }
}

export default SelectUsersForSurvey