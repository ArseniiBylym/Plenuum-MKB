import React from 'react';
import { NavLink } from 'react-router-dom';
import './DownloadAnswersButton.css';
import {EnvVariable} from '../../../../config.js';

function DownloadAnswersButton (props) {
    // console.log(props)

const baseURL = EnvVariable.host + "/api/";
    return (
        <a href={props.isAnyCompleted ? `${baseURL}organizations/${props.orgId}/survey/2/${props.surveyId}/excel` : `#`} 
            className={props.isAnyCompleted ? 'DownloadAnswersButton' : 'DownloadAnswersButton download-disabled'}  
            download={props.isAnyCompleted ? true : false} 
        >
            <div className='DownloadAnswersButton__icon'></div>
            <div className='DownloadAnswersButton__text'>{props.text}</div>
        </a>
    )
}

export default DownloadAnswersButton