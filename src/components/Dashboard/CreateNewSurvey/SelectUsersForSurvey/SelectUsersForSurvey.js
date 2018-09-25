import React, { Component } from 'react';
import { UserComponent } from '../../CreateFeedbackRequest/CreateFeedbackRequest';
import CreateFeedbackRequestContainer from '../../CreateFeedbackRequest/index';
import './SelectUsersForSurvey.css';

class SelectUsersForSurvey extends Component {
    state ={

    }

    render() {
        return(
            <div className={this.props.className}> 
                <CreateFeedbackRequestContainer addUsersToCurrentList={this.props.addUsersToCurrentList}/>
            </div>
        )
    }
}

export default SelectUsersForSurvey