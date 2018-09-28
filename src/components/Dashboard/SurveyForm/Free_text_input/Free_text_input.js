import React from 'react'
import './Free_text_input.css';
import { Row, Input } from 'react-materialize'

function Free_text_input(props) {
    console.log(props)

    let classForCounter = (props.question.isContainValue == true) ? 'Free_text_input-counter visibleCounter' : 'Free_text_input-counter hiddenCounter'
    let symbolsLength = ''
    if (props.question.value) {
        symbolsLength = 500 - parseInt(props.value.length)
    }
    return (
        <div className=''>
            <div>
                <span className="question">{props.question.text}</span>
                <div className={"survey-input-conteiner question-" + props.index} tabIndex="5">
                    <Input
                        onChange={(event) => { console.log('click'); props.onChangeHandler(event, props.index) }}
                        minLength='0'
                        maxLength='500'
                        type='textarea'
                        label={props.label}
                        s={12}
                        className="survey-input"
                        style={{ height: "180px", padding: "0", border: "none" }}
                        value={props.value}
                        autoComplete="off"

                    />
                </div>
                <div className={classForCounter}>{symbolsLength} characters left</div>
                <hr />
            </div>
            <div className='Free_text_input-error-container'>Answer required</div>
        </div>
    )
}

export default Free_text_input
