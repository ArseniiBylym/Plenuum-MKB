import React from 'react';
import './Yes_no_checkbox.css';

function Yes_no_checkbox(props) {

    function radioButtonClick (e, type) {
      
        let radioButtonsList = [...document.querySelectorAll(`.Yes_no_checkbox.item__${props.index} input`)];
        let currentRadioButton = document.querySelector(`.Yes_no_checkbox.item__${props.index} input[value="${type}"]`)
        let currentValue = currentRadioButton.checked;
        for(let input of radioButtonsList) {
            input.checked = false;
        }
        currentRadioButton.checked = !currentValue
       
    }
    let asterics = props.required ? <span className='asterics'> *</span> : null;
    return (
        <div className={`Yes_no_checkbox item__${props.index}`}>
            <div className="Yes_no_checkbox__title">{props.question}{asterics}</div>
            <div className="Yes_no_checkbox__input-container">
                <div className='Yes_no_checkbox__radio-wrapper'>
                    <div className='Yes_no_checkbox__radio-item' onClick={(e) => radioButtonClick(e, 'yes')}>
                        <input type="radio" id={`yes_no_radio__${props.index}-yes`} 
                            name={`yes_no_radio__${props.index}`} value="yes"  />
                        <label for={`yes_no_radio__${props.index}-yes`}>Yes</label>
                    </div>
                    <div className='Yes_no_checkbox__radio-item' onClick={(e) => radioButtonClick(e, 'no')}>
                        <input type="radio" id={`yes_no_radio__${props.index}-no`}
                            name={`yes_no_radio__${props.index}-no`} value="no" />
                        <label for={`yes_no_radio__${props.index}-no`}>No</label>
                    </div>
                </div>


            </div>
            <hr />
        </div>
    )
}

export default Yes_no_checkbox

