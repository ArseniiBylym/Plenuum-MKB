import React from 'react';
import './DetailsQuestions.css';

function DetailsQuestions(props) {

    const {text, type, isRequired} = props.config
    return (
        <div className='DetailsQuestions'>
            <div className="DetailQuestion__question">{text}</div>
            <div className="DetailQuestion__answer">{type}</div>
        </div>
    )
}

export default DetailsQuestions