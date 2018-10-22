import React, { Component, Fragment } from 'react';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import EmptySurveysList from './EmptySurveysList/EmptySurveysList'
import FullSurveysList from './FullSurveysList/FullSurveysList'
import CreateNewButton from './CreateNewButton/CreateNewButton'
import { connect } from 'react-redux';
import Api from '../../../lib/api';
import {spinner} from '../../Commons/Spinner/spinner'


import './MySurveys.css';

class MySurveys extends Component {
    state = {
        list: [
           
        ],
        surveys: null,
        isRequestSended: false
    }
    componentDidMount = () => {
        const token = window.localStorage.getItem('token')
        Api.getMySurveys(token, this.props.orgId)
            .then((response) => {
                this.setState({
                    surveys: response,
                    isRequestSended: true
                })
            })
            .catch(error => {
                console.log(error.message)

            })
    }

    componentWillUnmount = () => {
        this.props.clearSurveySendState()
    }


    renderPage() {
        // if(!this.state.surveys) return null
        
        let cardList = null

        if(this.props.surveys == null && this.state.isRequestSended == false) {
            cardList = spinner()
        } else if (this.props.mySurveys.surveys.length == 0) {
            cardList = <EmptySurveysList />
        } else if (this.props.mySurveys.surveys.length > 0){
            cardList = <FullSurveysList list={this.state.surveys}
                isShowSendNotification={this.props.mySurveys.survey_has_sended} orgId={this.props.orgId}/>
        }

        let createButton = <CreateNewButton text='Új kérdőív' />

        return (
            <div className="request-pre-container request-pre-container--my-surveys">
                <DefaultNavigationBarContainer
                    title='Kérdőíveim'
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
        orgId: state.currentUser.orgId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // putSurveysToRedux: (surveys) => {dispatch({type: "PUT_SURVEYS_TO_REDUX", surveys: surveys})},
        clearSurveySendState: () => { dispatch({ type: "CLEAR_SURVEY_HAS_SENDED" }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MySurveys)

