import React from 'react';
import './Yes_no_checkbox.css';
import { Row, Input } from 'react-materialize';
// import { Button, Icon } from 'react-materialize'

function Yes_no_checkbox(props) {

    function radioButtonClick (e, type) {
        console.log(e)
        console.log(props.index)
        console.log(e.target.children)
        console.log(type)

        let radioButtonsList = [...document.querySelectorAll(`.Yes_no_checkbox.item__${props.index} input`)];
        let currentRadioButton = document.querySelector(`.Yes_no_checkbox.item__${props.index} input[value="${type}"]`)
        let currentValue = currentRadioButton.checked;
        for(let input of radioButtonsList) {
            input.checked = false;
        }
        currentRadioButton.checked = !currentValue
        // console.log(currentRadioButton);
        // console.log(currentValue)

        // let currentInput = e.target.firstElementChild
        // let isCheckedCurrentTarget = currentInput.getAttribute('checked')
        // console.log(currentInput)
    }
    let asterics = props.required ? <span className='asterics'> *</span> : null;
    return (
        <div className={`Yes_no_checkbox item__${props.index}`}>
            <div className="Yes_no_checkbox__title">{props.question}{asterics}</div>
            <div className="Yes_no_checkbox__input-container">
                <div className='Yes_no_checkbox__radio-wrapper'>
                    <div className='Yes_no_checkbox__radio-item' onClick={(e) => radioButtonClick(e, 'yes')}>
                        <input type="radio" id={`yes_no_radio__${props.index}-yes`} 
                            name={`yes_no_radio__${props.index}`} value="yes"  checked/>
                        <label for="huey">Yes</label>
                    </div>
                    <div className='Yes_no_checkbox__radio-item' onClick={(e) => radioButtonClick(e, 'no')}>
                        <input type="radio" id={`yes_no_radio__${props.index}-no`}
                            name={`yes_no_radio__${props.index}-no`} value="no" />
                        <label for="dewey">No</label>
                    </div>
                </div>


            </div>
            <hr />
        </div>
    )
}

export default Yes_no_checkbox

