import React, { Component } from 'react';
import { Input } from 'react-materialize';
import './QuestionItem.css';
import Text from './InputExamples/Text'
import Yes_no from './InputExamples/Yes_no'
import One_six from './InputExamples/One_six'

class QuestionItem extends Component {
    state = {
        // typeSelectValue: 'free_text',
        typeSelectValue: '',
        // isRequiredSelectValue: 'optional',
        isRequiredSelectValue: '',
        exampleElem: null

    }
    componentDidMount = () => {
        console.log(this.props)
        this.setState({
            typeSelectValue: this.props.config.type === 'yes_no' ? 'yes_no' : this.props.config.type === '1_to_6' ? '1_to_6' : 'free_text',
            isRequiredSelectValue: this.props.config.isRequired ? 'required' : 'optional',
            exampleElem: this.props.config.type === 'yes_no' ? <Yes_no/> : this.props.config.type === '1_to_6' ? <One_six/> : <Text />
        })
    }

    changeTypeSelectValue = (e) => {
        const value = e.target.value
        this.setState({
            typeSelectValue: value,
            exampleElem: value === 'yes_no' ? <Yes_no /> : value === '1_to_6' ? <One_six /> : <Text />
        })
        this.props.onChangeValue(e, this.props.index)
    }
    changeIsRequiredSelectValue = (e) => {
        this.setState({
            isRequiredSelectValue: e.target.value
        })
        this.props.onChangeValue(e, this.props.index)
    }
    render() {
        console.log(this.props)
        let classNameForImg = 'QuestionItem__preview-img'
        if (this.state.typeSelectValue == 'free_text') {
            classNameForImg += ' freeText-img';
        } else if (this.state.typeSelectValue == 'yes_no') {
            classNameForImg += ' yesNo-img';
        } else if (this.state.typeSelectValue == '1_to_6') {
            classNameForImg += ' oneToSix-img'
        }

        let classNameForBasket = 'BasketContainer__item basket'
        if (this.props.length > 1) {
            classNameForBasket += ' active'
        }

        let classForPreviewContainer = 'QuestionItem__preview-container'
        if (this.state.typeSelectValue == 'free_text') {
            classForPreviewContainer += ' freeText-answer'
        } else if (this.state.typeSelectValue == 'yes_no') {
            classForPreviewContainer += ' yesNo-answer'
        } else if (this.state.typeSelectValue == '1_to_6') {
            classForPreviewContainer += ' oneToSix-answer'
        }

        return (
            <div className='QuestionItem'>
                <BasketContainer length={this.props.length} index={this.props.index}
                    delFunc={this.props.deleteCurrentQuestion}
                    goToPrev={this.props.goToPrev}
                    goToNext={this.props.goToNext}
                    id={this.props.id} 
                />
                <Input name='question' placeholder="Írd be a kérdésed"  
                    maxLength="200" s={12}  
                    onBlur={(event)=>this.props.onChangeValue(event, this.props.index)}
                    onChange={(event)=>this.props.onChangeValue(event, this.props.index)}
                    value={this.props.config.text}
                    type='textarea'
                />
                <div className='Error_notification_wrapper'>{answerIsRequired(this.props.config.text)}</div>
                <div className='QuestionItem__select-wrapper'>
                    <div className='input__question-type-select-wrapper'>
                        <Input name='question_type' s={12} type='select' label="" 
                            defaultValue={this.props.config.type === 'yes_no' ? 'yes_no' : this.props.config.type === '1_to_6' ? '1_to_6' :'free_text'} 
                            onChange={this.changeTypeSelectValue}
                        >
                            <option value='free_text'>Szabadszavas válasz</option>
                            <option value='yes_no'>Igen/nem válasz</option>
                            <option value='1_to_6'>1-től 6-ig válasz</option>
                        </Input>
                        <div className='triangle-for-question-type-select'>&#9662;</div>
                    </div>
                    <div className='input__question-type-select-wrapper'>
                        <Input name='question_required' s={12} type='select' label="" 
                            defaultValue={this.props.config.isRequired === 'required' ? 'required' : 'optional'} 
                            onChange={this.changeIsRequiredSelectValue}
                        >
                            <option value='optional'>Opcionális mező</option>
                            <option value='required'>Kötelező mező</option>
                        </Input>
                        <div className='triangle-for-question-type-select'>&#9662;</div>
                    </div>
                </div>
                <div className={classForPreviewContainer}>
                    <div className='QuestionItem__preview-header'>Válasz előnézete</div>
                    {/* <div className={classNameForImg}></div> */}
                    {this.state.exampleElem}
                </div>
            </div>
        )
    }
}

export default QuestionItem


//relative elements
function BasketContainer(props) {

    let classForBasket = 'BasketContainer__item basket';

    if (props.length > 1) {
        classForBasket += ' active'
    }

    let classForDownArrow = 'BasketContainer__item arrow-down'
    if (props.length > 1 && props.index != props.length - 1) {
        classForDownArrow += ' active'
    }

    let classForUpArrow = 'BasketContainer__item arrow-up'
    if (props.length > 1 && props.index != 0) {
        classForUpArrow += ' active'
    }

    const index = props.index
    return (
        <div className='BasketContainer'>
            <div className={classForBasket} onClick={() => props.delFunc(index)}></div>
            <div className={classForUpArrow} onClick={()=> props.goToPrev(index)}></div>
            <div className={classForDownArrow} onClick={()=> props.goToNext(index)}></div>
        </div>
    )
}

function answerIsRequired(arg) {
    return (
        <div className={arg ? 'FormContainer_field-required non-visible' : 'FormContainer_field-required'}>Kötelező mező</div>    )
}