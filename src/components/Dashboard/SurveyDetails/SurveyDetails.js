
import React, { Component } from 'react';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import DownloadAnswersButton from './DownloadAnswersButton/DownloadAnswersButton';
import DetailsContainer from './DetailsContainer/DetailsContainer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
// import BackButton from '../Commons/BackButton/BackButton'

import './SurveyDetails.css';

class SurveyDetails extends Component {
    state = {

    }

    componentDidMount = () => {
        console.log(this.props)
    }

    renderPage() {

        if(!this.props.mySyrveys) return null

        let currentSyrvey = this.props.mySyrveys[this.props.match.params.id]
        console.log(currentSyrvey)

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
                <DetailsContainer config={currentSyrvey}/>
                
            </div>

        )
    }

    render() {
        return(
            <div>
                {this.renderPage()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        mySyrveys: state.createSurvey.my_surveys
    }
}
export default connect(mapStateToProps, null)(withRouter(SurveyDetails))