import React from 'react';
import './QuestionSurveyItem.css';

function QuestionSurveyItem(props) {
    return (
        <div className="QuestionSurveyItem">
            {props.config.text}
        </div>
    )
}

export default QuestionSurveyItem