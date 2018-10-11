import React from 'react';
import moment from 'moment';
import './Card.css';
import { NavLink } from 'react-router-dom';
import Api from '../../../../../lib/api';

export default function Card(props) {
    console.log(props)

    const downloadExcelFile = () => {
        const token = window.localStorage.getItem('token');
        Api.downloadAnswers(token, props.config._id, props.orgId)
        .then((response) => {
            console.log(response);
        })
    }

    const {title, expiritDate, allSurveyTodos, complitedSurveyTodos, _id} = props.config;
    const index = props.index;

    let isOpen = <div className='Card__statistic--open'><span>Open </span><span>till</span></div>
    if(new Date(expiritDate).getTime() < new Date().getTime()){
        isOpen = <div className='Card__statistic--closed'><span>Closed </span><span>on</span></div>
    }
    let dateToShow = moment(expiritDate).format("YYYY.MM.DD")
    return (
        <div className='Card'>
            <div className='Card__title'>{title}</div>
            <div className='Card__statistic'>
                <div className='Card__statistic--icon'></div>
                <div className='Card__statistic--numbers'>{complitedSurveyTodos} / {allSurveyTodos} answers</div>
            </div>
            <div className='Card__date'>
                <div className='Card__date--status'>{isOpen}</div>
                <div className='Card__date--date'>{dateToShow}</div> 
            </div>
            <div className='Card__download-buttons'>
                <div className="downloadButton" onClick={downloadExcelFile}>
                    <div className='downloadButton--arrow'></div>
                    Answers
                </div>
                <NavLink to={`/my_surveys/${index}`} className="detailsButton">Details</NavLink>
            </div>
        </div>
    )
}
