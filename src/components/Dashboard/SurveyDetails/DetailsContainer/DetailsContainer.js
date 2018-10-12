import React, { Component } from 'react';
import DetailsQuestions from './DetailsQuestions/DetailsQuestions'
import SelectedUserContainer from '../../../Dashboard/CreateFeedbackRequest/SelectedUser/index';
import moment from 'moment';
import './DetailsContainer.css';

class DetailsContainer extends Component {
    state = {

    }

    render() {
        const {title, description, createdAt, expiritDate, allSurveyTodos, complitedSurveyTodos, respondents, questions} = this.props.config;

        const questionsArr = questions.map((item, i) => {
            return <DetailsQuestions key={item.id} config={item} />
        })

        let dateContainer = null;
        if(new Date().getTime() > new Date(expiritDate).getTime()) {
            dateContainer = <div className="DetailsContainer__date-container closed">
                                <span>Closed</span> on {moment(expiritDate).format("YYYY.MM.DD")} &#9679; Elküldött {moment(createdAt).format("YYYY.MM.DD")}
                            </div>
        } else {
            dateContainer = <div className="DetailsContainer__date-container open">
                                <span>Open</span> till {moment(expiritDate).format("YYYY.MM.DD")} &#9679; Elküldött {moment(createdAt).format("YYYY.MM.DD")}
                            </div>
        }

        const users = respondents.map((user, i) => {
            let tempUser = {
                firstName: user.name,
                pictureUrl: user.imgUrl,
            }
            return <SelectedUserContainer  key={user.id} user={tempUser} />
        })

        return(
            <div className='DetailsContainer-wrapper'>
            <div className='DetailsContainer'>
                <div className="DetailsContainer__title">{title}</div>
                <div className="DetailsContainer__description">{description}</div>
                <div className="DetailsContainer__statistic">
                    <div className='Card__statistic--icon'></div>
                    {complitedSurveyTodos} / {allSurveyTodos} válasz
                </div>
                {dateContainer}
                <div className="DetailsContainer__users-container">{users}</div>
                <div className="DetailsContainer__questions-container">
                    {questionsArr}
                </div>
            </div>   
            </div>
        )
    }
}

export default DetailsContainer