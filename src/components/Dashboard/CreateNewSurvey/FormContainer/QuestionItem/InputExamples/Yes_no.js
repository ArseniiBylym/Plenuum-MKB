import React from 'react';

function Yes_no(props) {

        return(
            <div className='Yes_no_example' >
                <div className='Yes_no_example--frontdrop' /> 
                 <div className='Yes_no_checkbox__radio-wrapper'>
                    <div className='Yes_no_checkbox__radio-item' >
                        <input type="radio" id={`yes_no_radio__1-yes`} 
                            name={`yes_no_radio__1`} value="yes"  />
                        <label for={`yes_no_radio__1-yes`}>Igen</label>
                    </div>
                    <div className='Yes_no_checkbox__radio-item' >
                        <input type="radio" id={`yes_no_radio__1-no`}
                            name={`yes_no_radio__1-no`} value="no" />
                        <label for={`yes_no_radio__1-no`}>Nem</label>
                    </div>
                </div>
            </div>
        )
}

export default Yes_no