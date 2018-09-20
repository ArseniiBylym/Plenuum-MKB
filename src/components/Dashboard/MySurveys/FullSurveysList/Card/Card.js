import React from 'react';
import './Card.css';
import { NavLink } from 'react-router-dom';

export default function Card(props) {
    const {id, title, totalAnswers, doneAnswers, startDate, finishDate} = props.config;
    const index = props.index;

    let isOpen = <div className='Card__statistic--open'><span>Open </span><span>till</span></div>
    if(new Date(finishDate).getTime() < new Date().getTime()){
        isOpen = <div className='Card__statistic--closed'><span>Closed </span><span>on</span></div>
    }
    return (
        <div className='Card'>
            <div className='Card__title'>{title}</div>
            <div className='Card__statistic'>
                <div className='Card__statistic--icon'></div>
                <div className='Card__statistic--numbers'>{doneAnswers} / {totalAnswers} answers</div>
            </div>
            <div className='Card__date'>
                <div className='Card__date--status'>{isOpen}</div>
                <div className='Card__date--date'>{finishDate}</div> 
            </div>
            <div className='Card__download-buttons'>
                <NavLink to='#' className="downloadButton">
                    <div className='downloadButton--arrow'></div>
                    Answers
                </NavLink>
                <NavLink to={`/my_surveys/${index}`} className="detailsButton">Details</NavLink>
            </div>
        </div>
    )
}
