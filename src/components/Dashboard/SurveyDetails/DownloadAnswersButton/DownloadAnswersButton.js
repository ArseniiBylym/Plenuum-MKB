import React from 'react';
import { NavLink } from 'react-router-dom';
import './DownloadAnswersButton.css';

function DownloadAnswersButton (props) {
    let url = props.url || '#'
    return (
        <NavLink to={url} className='DownloadAnswersButton' onClick={props.click}>
            <div className='DownloadAnswersButton__icon'></div>
            <div className='DownloadAnswersButton__text'>{props.text}</div>
        </NavLink>
    )
}

export default DownloadAnswersButton