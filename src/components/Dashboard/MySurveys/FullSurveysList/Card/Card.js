import React from 'react';
import moment from 'moment';
import './Card.css';
import { NavLink } from 'react-router-dom';

export default function Card(props) {
    console.log(props)
    const {title, description, start_date, finish_date, total_answers, done_answers} = props.config;
    const index = props.index;

    let isOpen = <div className='Card__statistic--open'><span>Open </span><span>till</span></div>
    if(new Date(finish_date).getTime() < new Date().getTime()){
        isOpen = <div className='Card__statistic--closed'><span>Closed </span><span>on</span></div>
    }
    let dateToShow = moment(finish_date).format("YYYY.MM.DD")
    return (
        <div className='Card'>
            <div className='Card__title'>{title}</div>
            <div className='Card__statistic'>
                <div className='Card__statistic--icon'></div>
                <div className='Card__statistic--numbers'>{done_answers} / {total_answers} válasz</div>
            </div>
            <div className='Card__date'>
                <div className='Card__date--status'>{isOpen}</div>
                <div className='Card__date--date'>{dateToShow}</div> 
            </div>
            <div className='Card__download-buttons'>
                <NavLink to='#' className="downloadButton">
                    <div className='downloadButton--arrow'></div>
                    Válasz
                </NavLink>
                <NavLink to={`/my_surveys/${index}`} className="detailsButton">Részletek</NavLink>
            </div>
        </div>
    )
}
