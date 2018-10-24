
import React, { Component } from 'react';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import DownloadAnswersButton from './DownloadAnswersButton/DownloadAnswersButton';
import DetailsContainer from './DetailsContainer/DetailsContainer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import Api from '../../../lib/api';
import {NavLink} from 'react-router-dom'
// import BackButton from '../Commons/BackButton/BackButton'

import './SurveyDetails.css';

class SurveyDetails extends Component {
    state = {

    }

    componentDidMount = () => {
        console.log(this.props)
        const token = window.localStorage.getItem('token');
        // const surveyId = this.props.mySyrveys[this.props.match.params.id]._id
        Api.getSurveyDetails(token, this.props.match.params.id, this.props.orgId)
            .then((response) => {
                console.log(response)
                this.setState({
                        ...response
                    })
                })
        }

    componentDidUpdate = () => {
        console.log(this.state)
    }
            
    downloadAnswers = () => {
        const token = window.localStorage.getItem('token');
        console.log(this.props.orgId)
        Api.downloadAnswers(token, this.state._id, this.props.orgId)
            .then((response) => {
                console.log(response);
            })
    }

    renderPage() {
        if(!this.state.title) return null

        let downloadButton = <DownloadAnswersButton text='Válaszok letöltése' 
                                click={this.downloadAnswers}
                                surveyId={this.state._id}
                                orgId={this.props.orgId}
                                isAnyCompleted={true}
                            />
        let backButton = <NavLink to="/my_surveys" className="back-button-title--survey-header" ></NavLink>
        
        return(
            <div className="request-pre-container request-pre-container--my-surveys">
                <DefaultNavigationBarContainer
                    title='Kérdőív részletek'
                    className="interact"
                    backButton={backButton}
                    right={downloadButton}
                />
                <DetailsContainer config={this.state}/>
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
        orgId: state.currentUser.orgId
    }
}
export default connect(mapStateToProps, null)(withRouter(SurveyDetails))