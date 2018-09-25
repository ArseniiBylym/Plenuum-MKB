import React, { Component } from 'react';
import { Input } from 'react-materialize';
import './QuestionItem.css';

class QuestionItem extends Component {
    state = {
        typeSelectValue: 'free_text',
        isRequiredSelectValue: 'optional',

    }
    componentDidMount = () => {
        console.log(this.props)
    }

    changeTypeSelectValue = (e) => {
        this.setState({
            typeSelectValue: e.target.value
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
                    id={this.props.id} />


                {this.props.index == 0 && answerIsRequired()}

                <Input name='question' placeholder="Enter question"  maxLength="200" s={12} onBlur={(event)=>this.props.onChangeValue(event, this.props.index)}/>
                <div className='QuestionItem__select-wrapper'>
                    <div className='input__question-type-select-wrapper'>
                        <Input name='question_type' s={12} type='select' label="" defaultValue='free_text' onChange={this.changeTypeSelectValue}>
                            <option value='free_text'>Free text answer</option>
                            <option value='yes_no'>Yes-no choice</option>
                            <option value='1_to_6'>1 to 6 choice</option>
                        </Input>
                        <div className='triangle-for-question-type-select'>&#9662;</div>
                    </div>
                    <div className='input__question-type-select-wrapper'>
                        <Input name='question_required' s={12} type='select' label="" defaultValue='optional' onChange={this.changeIsRequiredSelectValue}>
                            <option value='optional'>Optional answer</option>
                            <option value='required'>Required answer</option>
                        </Input>
                        <div className='triangle-for-question-type-select'>&#9662;</div>
                    </div>
                </div>
                <div className={classForPreviewContainer}>
                    <div className='QuestionItem__preview-header'>Answer preview</div>
                    <div className={classNameForImg}></div>
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

function answerIsRequired() {
    return (
        <div className='QuestionItem__answer-required'>Answer required</div>
    )
}