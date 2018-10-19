import React from 'react';
import './ButtonNext.css';

function Button (props) {
    console.log(props)
    return(
        <div className={props.isActive ? 'Button__create-new-action' : 'Button__create-new-action disabled'} onClick={props.onClickAction}>{props.text}</div>
    )
}

export default Button;