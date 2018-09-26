import React, { Component } from 'react';
import DetailsQuestions from './DetailsQuestions/DetailsQuestions'
import moment from 'moment';
import './DetailsContainer.css';

class DetailsContainer extends Component {
    state = {

    }

    render() {
        const {title, description, start_date, finish_date, total_answers, done_answers, selected_users, questions} = this.props.config;

        const questionsArr = questions.map((item, i) => {
            return <DetailsQuestions key={item.id} config={item} />
        })

        let dateContainer = null;
        if(new Date().getTime() > finish_date) {
            dateContainer = <div className="DetailsContainer__date-container closed">
                                <span>Closed</span> on {moment(finish_date).format("YYYY.MM.DD")} &#9679; Sent {moment(start_date).format("YYYY.MM.DD")}
                            </div>
        } else {
            dateContainer = <div className="DetailsContainer__date-container open">
                                <span>Open</span> till {moment(finish_date).format("YYYY.MM.DD")} &#9679; Sent {moment(start_date).format("YYYY.MM.DD")}
                            </div>
        }

        return(
            <div className='DetailsContainer-wrapper'>
            <div className='DetailsContainer'>
                <div className="DetailsContainer__title">{title}</div>
                <div className="DetailsContainer__description">{description}</div>
                <div className="DetailsContainer__statistic">
                    <div className='Card__statistic--icon'></div>
                    {done_answers} / {total_answers} answers
                </div>
                {dateContainer}
                <div className="DetailsContainer__users-container">Users</div>
                <div className="DetailsContainer__questions-container">
                    {questionsArr}
                </div>
            </div>   
            </div>
        )
    }
}

export default DetailsContainer