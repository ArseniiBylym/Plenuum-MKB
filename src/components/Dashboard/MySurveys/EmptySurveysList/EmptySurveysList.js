import React from 'react'; 
import './EmptySurveysList.css';

export default function EmptySurveysList(props) {
    return(
        <div className='EmptySurveysList'>
            <div className='EmptySurveysList__icon'>
            </div>
            <div className='EmptySurveysList__text'>No surveys yet</div>
        </div>
    )
}