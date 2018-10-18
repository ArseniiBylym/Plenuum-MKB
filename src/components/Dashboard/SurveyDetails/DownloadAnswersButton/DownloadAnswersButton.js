import React from 'react';
import { NavLink } from 'react-router-dom';
import './DownloadAnswersButton.css';
import {EnvVariable} from '../../../../config.js';

function DownloadAnswersButton (props) {
    console.log(props)
    let url = props.url || '#'

const baseURL = EnvVariable.host + "/api/";

    // return (
    //     <NavLink to={url} className='DownloadAnswersButton' onClick={props.click} download={true}>
    //         <div className='DownloadAnswersButton__icon'></div>
    //         <div className='DownloadAnswersButton__text'>{props.text}</div>
    //     </NavLink>
    // )
    return (
        // <a href="http://localhost:5000/api/organizations/hipteam/survey/2/5bc74b958401444bf3c8e334/excel" className='DownloadAnswersButton'  download >
        <a href={`${baseURL}organizations/${props.orgId}/survey/2/${props.surveyId}/excel`} className='DownloadAnswersButton'  download >
            <div className='DownloadAnswersButton__icon'></div>
            <div className='DownloadAnswersButton__text'>{props.text}</div>
        </a>
    )
}

export default DownloadAnswersButton