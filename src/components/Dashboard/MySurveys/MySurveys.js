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
           
        ],
        surveys: null
    }
    componentDidMount = () => {
        const token = window.localStorage.getItem('token')
        Api.getMySurveys(token, this.props.orgId)
            .then((response) => {
                // console.log(response)
                this.setState({
                    surveys: response
                })
                // this.props.putSurveysToRedux(response);
            })

      
        // 1. sent GET request to back
        // 2. put response to the state
        // 3. put response to redux store //maybe
    }

    componentWillUnmount = () => {
        this.props.clearSurveySendState()
    }


    renderPage() {
        

        // if (!this.props.mySurveys) return null
        // if(!this.props.mySurveys.surveys) return null
        if(!this.state.surveys) return null
        
        let cardList = null
        if (this.props.mySurveys.surveys.length == 0) {
            cardList = <EmptySurveysList />
        } else {
            cardList = <FullSurveysList list={this.state.surveys}
                isShowSendNotification={this.props.mySurveys.survey_has_sended} orgId={this.props.orgId}/>
        }
        let createButton = <CreateNewButton text='Új kérdőív' />
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

