import React from 'react';
import './AddAnotherButton.css'

function AddAnotherButton(props) {
    return(
        <div className='AddAnotherButton' onClick={props.onClickAction}>
            <div className='AddAnotherButton__icon'></div>
            <div className='AddAnotherButton__text'>{props.text}</div>
        </div>
    )
}

export default AddAnotherButton