import React from 'react';
import './Button.css';

function Button (props) {
    return(
        <div className='Button__create-new-action' onClick={props.onClickAction}>{props.text}</div>
    )
}

export default Button;