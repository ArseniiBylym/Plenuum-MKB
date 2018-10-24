import React from 'react';
import moment from 'moment';
import './Card.css';
import { NavLink } from 'react-router-dom';
// import Api from '../../../../../lib/api';
import {EnvVariable} from '../../../../../config.js';

export default function Card(props) {
    console.log(props)
    const baseURL = EnvVariable.host + "/api/";

    const {title, expiritDate, allSurveyTodos, complitedSurveyTodos, _id} = props.config;
    const index = props.index;

    let isOpen = <div className='Card__statistic--open'><span>Lejárat </span><span>dátuma</span></div>
    if(moment(expiritDate).unix() < moment().unix()) {
        isOpen = <div className='Card__statistic--closed'><span>Lezárva </span></div>
    }
    
    let dateToShow = moment(expiritDate).format("YYYY.MM.DD")
    return (
        <div className='Card'>
            <div className='Card__title'>{title}</div>
            <div className='Card__statistic'>
                <div className='Card__statistic--icon'></div>
                <div className='Card__statistic--numbers'>{complitedSurveyTodos} / {allSurveyTodos} válasz</div>
            </div>
            <div className='Card__date'>
                <div className='Card__date--status'>{isOpen}</div>
                <div className='Card__date--date'>{dateToShow}</div> 
            </div>
            <div className='Card__download-buttons'>
                <a href={`${baseURL}organizations/${props.orgId}/survey/2/${props.config._id}/excel`} className="downloadButton" download>
                    <div className='downloadButton--arrow'></div>
                    Válasz
                </a>
                <NavLink to={`/my_surveys/${props.config._id}`} className="detailsButton">Részletek</NavLink>
            </div>
        </div>
    )
}
