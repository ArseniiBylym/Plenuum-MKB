import React from 'react';
import './Yes_no_checkbox.css';
import { Row, Input } from 'react-materialize';

function Yes_no_checkbox(props) {


    let asterics = props.required ? <span> *</span> : null;
    return (
        <div className="Yes_no_checkbox">
            <div className="Yes_no_checkbox__title">{props.question}{asterics}</div>
            <div className="Yes_no_checkbox__input-container">

                <Input name={props.index} type='radio' value='yes' label='Yes' className='with-gap' />
                <Input name={props.index} type='radio' value='no' label='No' className='with-gap' />

            </div>
            <hr />
        </div>
    )
}

export default Yes_no_checkbox

