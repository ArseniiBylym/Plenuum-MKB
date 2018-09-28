import React from 'react';
import './CompleteSurveyButton.css';

function CompleteSurveyButton(props) {
    return(
        <div className="CompleteSurveyButton" onClick={props.click}>COMPLETE SURVEY</div>
    )
}

export default CompleteSurveyButton