import React from 'react';

function One_six(props) {

    return (
        <div className='One_six_example'>
            <div className='One_six_example--frontdrop'/>
            <div className='From_1_to_6_checkbox__radio-wrapper'>

                <div className='From_1_to_6_checkbox__radio-item'>
                    <input type="radio" id={`1_to_6_radio__-1`}
                        name={`1_to_6_radio__`} value="1" />
                    <label htmlFor={`1_to_6_radio__-1`}>1 (Teljesen egyet értek)</label>
                </div>

                <div className='From_1_to_6_checkbox__radio-item' >
                    <input type="radio" id={`1_to_6_radio__-2`}
                        name={`1_to_6_radio__-2`} value="2" />
                    <label htmlFor={`1_to_6_radio__-2`}>2</label>
                </div>

                <div className='From_1_to_6_checkbox__radio-item' >
                    <input type="radio" id={`1_to_6_radio__-3`}
                        name={`1_to_6_radio__`} value="3" />
                    <label htmlFor={`1_to_6_radio__-3`}>3</label>
                </div>

                <div className='From_1_to_6_checkbox__radio-item' >
                    <input type="radio" id={`1_to_6_radio__-4`}
                        name={`1_to_6_radio__`} value="4" />
                    <label htmlFor={`1_to_6_radio__-4`}>4</label>
                </div>

                <div className='From_1_to_6_checkbox__radio-item' >
                    <input type="radio" id={`1_to_6_radio__-5`}
                        name={`1_to_6_radio__`} value="5" />
                    <label htmlFor={`1_to_6_radio__-5`}>5</label>
                </div>

                <div className='From_1_to_6_checkbox__radio-item' >
                    <input type="radio" id={`1_to_6_radio__-6`}
                        name={`1_to_6_radio__`} value="6" />
                    <label for={`1_to_6_radio__-6`}>6 (Egyáltalán nem értek egyet)</label>
                </div>
            </div>
        </div>
    )
}

export default One_six