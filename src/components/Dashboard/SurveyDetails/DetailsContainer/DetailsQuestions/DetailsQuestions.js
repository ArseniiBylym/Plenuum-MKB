import React from 'react';
import './DetailsQuestions.css';

function DetailsQuestions(props) {

    const {text, type, isRequired} = props.config

    let answerType = 'Free text answer';
    if( type == 'yes_no'){
        answerType = 'Yes-no choice'
    } else if(type == '1_to_6') {
        answerType = '1 to 6 choice'
    }

    let starClassName = 'DetailQuestion__question-start'
    if(isRequired == 'required') {
        starClassName += ' asterics--show'
    }
    
    return (
        <div className='DetailsQuestions'>
            <div className="DetailQuestion__question"><span>{text}</span><span className={starClassName}>&#10033;</span></div>
            <div className="DetailQuestion__answer">{answerType}</div>
        </div>
    )
}

export default DetailsQuestions