
import React, { Component } from 'react';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import DownloadAnswersButton from './DownloadAnswersButton/DownloadAnswersButton';
import BackButton from '../Commons/BackButton/BackButton'

import './SurveyDetails.css';

class SurveyDetails extends Component {
    state = {

    }

    render() {

        let downloadButton = <DownloadAnswersButton text='Download answers' />
        let backButton = <a href="javascript:history.back()" className="back-button-title--survey-header"></a>
        
        return(
            <div className="request-pre-container request-pre-container--my-surveys">
                <DefaultNavigationBarContainer
                    title='Survey details'
                    className="interact"
                    backButton={backButton}
                    right={downloadButton}
                />
                
            </div>

        )
    }
}

export default SurveyDetails