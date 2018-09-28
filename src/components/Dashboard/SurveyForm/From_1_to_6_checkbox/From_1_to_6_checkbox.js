import React from 'react';
import './From_1_to_6_checkbox.css';

function From_1_to_6_checkbox(props) {

    function radioButtonClick (e, type) {
      
        let radioButtonsList = [...document.querySelectorAll(`.From_1_to_6_checkbox.item__${props.index} input`)];
        let currentRadioButton = document.querySelector(`.From_1_to_6_checkbox.item__${props.index} input[value="${type}"]`)
        let currentValue = currentRadioButton.checked;
        for(let input of radioButtonsList) {
            input.checked = false;
        }
        currentRadioButton.checked = !currentValue

        props.onChangeHandler(props.index, type, !currentValue)
       
    }

    let asterics = props.required ? <span> *</span> : null;
    return (
        <div className={`From_1_to_6_checkbox item__${props.index}`}>
            <div className="From_1_to_6_checkbox__title">{props.question}{asterics}</div>
            <div className="From_1_to_6_checkbox__input-container">
                <div className='From_1_to_6_checkbox__radio-wrapper'>

                    <div className='From_1_to_6_checkbox__radio-item' onClick={(e) => radioButtonClick(e, '1')}>
                        <input type="radio" id={`1_to_6_radio__${props.index}-1`}
                            name={`1_to_6_radio__${props.index}`} value="1" />
                        <label for={`1_to_6_radio__${props.index}-1`}>1 (Disagree strongly)</label>
                    </div>

                    <div className='From_1_to_6_checkbox__radio-item' onClick={(e) => radioButtonClick(e, '2')}>
                        <input type="radio" id={`1_to_6_radio__${props.index}-2`}
                            name={`1_to_6_radio__${props.index}-2`} value="2" />
                        <label for={`1_to_6_radio__${props.index}-2`}>2</label>
                    </div>

                    <div className='From_1_to_6_checkbox__radio-item' onClick={(e) => radioButtonClick(e, '3')}>
                        <input type="radio" id={`1_to_6_radio__${props.index}-3`}
                            name={`1_to_6_radio__${props.index}`} value="3" />
                        <label for={`1_to_6_radio__${props.index}-3`}>3</label>
                    </div>

                    <div className='From_1_to_6_checkbox__radio-item' onClick={(e) => radioButtonClick(e, '4')}>
                        <input type="radio" id={`1_to_6_radio__${props.index}-4`}
                            name={`1_to_6_radio__${props.index}`} value="4" />
                        <label for={`1_to_6_radio__${props.index}-4`}>4</label>
                    </div>

                    <div className='From_1_to_6_checkbox__radio-item' onClick={(e) => radioButtonClick(e, '5')}>
                        <input type="radio" id={`1_to_6_radio__${props.index}-5`}
                            name={`1_to_6_radio__${props.index}`} value="5" />
                        <label for={`1_to_6_radio__${props.index}-5`}>5</label>
                    </div>

                    <div className='From_1_to_6_checkbox__radio-item' onClick={(e) => radioButtonClick(e, '6')}>
                        <input type="radio" id={`1_to_6_radio__${props.index}-6`}
                            name={`1_to_6_radio__${props.index}`} value="6" />
                        <label for={`1_to_6_radio__${props.index}-6`}>6 (Agree strongly)</label>
                    </div>
                </div>

            </div>
            <hr />
        </div>
    )
}

export default From_1_to_6_checkbox

