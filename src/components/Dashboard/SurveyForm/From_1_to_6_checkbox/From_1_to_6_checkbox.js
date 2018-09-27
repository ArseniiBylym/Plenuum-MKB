import React from 'react';
import './From_1_to_6_checkbox.css';
import { Row, Input } from 'react-materialize';

function From_1_to_6_checkbox(props) {


    let asterics = props.required ? <span> *</span> : null;
    return (
        <div className="From_1_to_6_checkbox">
            <div className="From_1_to_6_checkbox__title">{props.question}{asterics}</div>
            <div className="From_1_to_6_checkbox__input-container">

                <Input name={props.index} type='radio' value='yes' label='1 (Disagree strongly)' className='with-gap' />
                <Input name={props.index} type='radio' value='no' label='2' className='with-gap' />
                <Input name={props.index} type='radio' value='no' label='3' className='with-gap' />
                <Input name={props.index} type='radio' value='no' label='4' className='with-gap' />
                <Input name={props.index} type='radio' value='no' label='5' className='with-gap' />
                <Input name={props.index} type='radio' value='no' label='6 (Agree strongly)' className='with-gap' />

            </div>
            <hr />
        </div>
    )
}

export default From_1_to_6_checkbox

