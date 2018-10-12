import React from 'react';
import './DetailsQuestions.css';

function DetailsQuestions(props) {

    const {text, type, required} = props.config

    let answerType = 'Free text answer';
    if( type == 'yes-no'){
        answerType = 'Yes-no choice'
    } else if(type == '1-6') {
        answerType = '1 to 6 choice'
    }

    let starClassName = 'DetailQuestion__question-start'
    if(required == 'true') {
        starClassName += ' asterics--show'
    }
    
    return (
        <div className='DetailsQuestions'>
            <div className="DetailQuestion__question"><span>{text}</span><sup className={starClassName}> &#10033;</sup></div>
            <div className="DetailQuestion__answer">{answerType}</div>
        </div>
    )
}

export default DetailsQuestions