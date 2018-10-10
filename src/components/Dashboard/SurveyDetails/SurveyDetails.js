
import React, { Component } from 'react';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import DownloadAnswersButton from './DownloadAnswersButton/DownloadAnswersButton';
import DetailsContainer from './DetailsContainer/DetailsContainer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import Api from '../../../lib/api';
// import BackButton from '../Commons/BackButton/BackButton'

import './SurveyDetails.css';

class SurveyDetails extends Component {
    state = {
    //     _id: '5ba4a721f3722f1f9fc84347',
    //   updatedAt: '2018-09-21T08:09:05.266Z',
    //   createdAt: '2018-09-21T08:09:05.266Z',
    //   title: 'Survey 2',
    //   description: 'This is description of survey',
    //   expiritDate: '2018-08-22T15:51:41.696Z',
    //   type: 2,
    //   respondents: [
    //       {
    //           name: 'christina',
    //           imgUrl: 'https://randomuser.me/api/portraits/women/74.jpg'
    //       },
    //       {
    //           name: 'bill',
    //           imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
    //       },
    //       {
    //           name: 'samantha',
    //           imgUrl: 'https://randomuser.me/api/portraits/women/15.jpg'
    //       },
    //       {
    //           name: 'liam',
    //           imgUrl: 'https://randomuser.me/api/portraits/men/17.jpg'
    //       }
    //   ],
    //   questions: [
    //       {
    //           _id: '5ba4a721f3722f1f9fc84348',
    //           updatedAt: '2018-09-21T08:09:05.285Z',
    //           createdAt: '2018-09-21T08:09:05.285Z',
    //           type: 'text',
    //           text: '2+2',
    //           survey: '5ba4a721f3722f1f9fc84347',
    //           max: '500',
    //           min: '10',
    //           required: true,
    //           answerValues: []
    //       }
    //   ],
    //   complitedSurveyTodos: 0,
    //   allSurveyTodos: 3

    }

    componentDidMount = () => {
        console.log(this.props)
        const token = window.localStorage.getItem('token');
        const surveyId = this.props.mySyrveys[this.props.match.params.id]._id
        Api.getSurveyDetails(token, surveyId, this.props.orgId)
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

        if(!this.props.mySyrveys) return null
        if(!this.state.title) return null

        // let currentSyrvey = this.props.mySyrveys[this.props.match.params.id]
        // console.log(currentSyrvey)

        let downloadButton = <DownloadAnswersButton text='Download answers' click={this.downloadAnswers}/>
        let backButton = <a href="javascript:history.back()" className="back-button-title--survey-header"></a>
        
        return(
            <div className="request-pre-container request-pre-container--my-surveys">
                <DefaultNavigationBarContainer
                    title='Survey details'
                    className="interact"
                    backButton={backButton}
                    right={downloadButton}
                />
                {/* <DetailsContainer config={currentSyrvey}/> */}
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
        mySyrveys: state.createSurvey.surveys,
        orgId: state.currentUser.orgId
    }
}
export default connect(mapStateToProps, null)(withRouter(SurveyDetails))