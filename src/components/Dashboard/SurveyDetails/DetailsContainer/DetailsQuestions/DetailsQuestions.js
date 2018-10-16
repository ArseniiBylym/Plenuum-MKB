import React from 'react';
import './DetailsQuestions.css';

function DetailsQuestions(props) {

    const {text, type, required} = props.config

    let answerType = 'Szabadszavas válasz';
    if( type == 'yes-no'){
        answerType = 'Igen/nem válasz'
    } else if(type == '1-6') {
        answerType = '1-től 6-ig válasz'
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