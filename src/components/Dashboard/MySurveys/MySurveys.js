// import Api from '../../../lib/api';
// import { Utils } from '../../../lib/utils';
// import { createBackButton } from '../Commons/DefaultNavigationBar/index.js';
// import SurveyFormContainer from './SurveyContainer.jsx';
// import { searchUsersComponent } from '../MyFeedbacks/MyContent.js';
// import { spinner } from "../../Commons/Spinner/spinner";
// import SearchContainer from '../Commons/Search/index.js';

import React, { Component, Fragment } from 'react';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import EmptySurveysList from './EmptySurveysList/EmptySurveysList'
import FullSurveysList from './FullSurveysList/FullSurveysList'
import CreateNewButton from './CreateNewButton/CreateNewButton'
import { connect } from 'react-redux';
import Api from '../../../lib/api';


import './MySurveys.css';

class MySurveys extends Component {
    state = {
        list: [
            // {
            //     id:  Date.now() + Math.random(),
            //     title: 'Survey title in one line Survey title in one lineSurvey title in one line Survey title in one lineSurvey title in one line',
            //     totalAnswers: 21,
            //     doneAnswers: 10,
            //     startDate: `2018.06.01`,
            //     finishDate: `2018.09.01`,
            //     members: [

            //     ],
            //     questions: [

            //     ]
            // },
            // {
            //     id:  Date.now() + Math.random(),
            //     title: 'Survey title in one line',
            //     totalAnswers: 10,
            //     doneAnswers: 4,
            //     startDate: '2018.04.21',
            //     finishDate: '2018.11.05',
            //     members: [

            //     ],
            //     questions: [

            //     ]
            // },
            // {
            //     id:  Date.now() + Math.random(),
            //     title: 'Survey title in one line',
            //     totalAnswers: 15,
            //     doneAnswers: 0,
            //     startDate: '2018.10.01',
            //     finishDate: '2018.11.13',
            //     members: [

            //     ],
            //     questions: [

            //     ]
            // }
        ]
    }
    componentDidMount = () => {
        const token = window.localStorage.getItem('token')
        Api.getMySurveys(token)
            .then((response) => {
                console.log(response)
                this.props.putSurveysToRedux(response);
            })
        // 1. sent GET request to back
        // 2. put response to the state
        // 3. put response to redux store //maybe
    }

    componentWillUnmount = () => {
        this.props.clearSurveySendState()
    }


    renderPage() {
        

        if (!this.props.mySurveys) return null

        let cardList = <EmptySurveysList />
        
        // let cardList = null
        // if (this.props.mySurveys.my_surveys || this.props.mySurveys.my_surveys.length == 0) {
        //     cardList = <EmptySurveysList />
        // } else {
        //     cardList = <FullSurveysList list={this.props.mySurveys.my_surveys}
        //         isShowSendNotification={this.props.mySurveys.survey_has_sended} />
        // }
        let createButton = <CreateNewButton text='New survey' />
        return (
            <div className="request-pre-container request-pre-container--my-surveys">
                <DefaultNavigationBarContainer
                    title='My surveys'
                    className="interact"
                    right={createButton}
                />
                {cardList}
                
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.renderPage()}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        mySurveys: state.createSurvey,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        putSurveysToRedux: (surveys) => {dispatch({type: "PUT_SURVEYS_TO_REDUX", surveys: surveys})},
        clearSurveySendState: () => { dispatch({ type: "CLEAR_SURVEY_HAS_SENDED" }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MySurveys)

