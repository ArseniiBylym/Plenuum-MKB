import React, { Component } from 'react';
import { Input } from 'react-materialize';
import './QuestionItem.css';

class QuestionItem extends Component {
    state = {
        typeSelectValue: 1,
        isRequiredSelectValue: 1,

    }
    componentDidMount = () => {
        console.log(this.props)
    }

    changeTypeSelectValue = (e) => {
        this.setState({
            typeSelectValue: e.target.value
        })
    }
    changeIsRequiredSelectValue = (e) => {
        this.setState({
            isRequiredSelectValue: e.target.value
        })
    }
    render() {
        let classNameForImg = 'QuestionItem__preview-img'
        if (this.state.typeSelectValue == 1) {
            classNameForImg += ' freeText-img';
        } else if (this.state.typeSelectValue == 2) {
            classNameForImg += ' yesNo-img';
        } else if (this.state.typeSelectValue == 3) {
            classNameForImg += ' oneToSix-img'
        }

        let classNameForBasket = 'BasketContainer__item basket'
        if (this.props.length > 1) {
            classNameForBasket += ' active'
        }

        let classForPreviewContainer = 'QuestionItem__preview-container'
        if (this.state.typeSelectValue == 1) {
            classForPreviewContainer += ' freeText-answer'
        } else if (this.state.typeSelectValue == 2) {
            classForPreviewContainer += ' yesNo-answer'
        } else if (this.state.typeSelectValue == 3) {
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

                <Input placeholder="Enter question" s={12} />
                <div className='QuestionItem__select-wrapper'>
                    <div className='input__question-type-select-wrapper'>
                        <Input s={12} type='select' label="" defaultValue='1' onChange={this.changeTypeSelectValue}>
                            <option value='1'>Free text answer</option>
                            <option value='2'>Yes-no choice</option>
                            <option value='3'>1 to 6 choice</option>
                        </Input>
                        <div className='triangle-for-question-type-select'>&#9662;</div>
                    </div>
                    <div className='input__question-type-select-wrapper'>
                        <Input s={12} type='select' label="" defaultValue='1' onChange={this.changeIsRequiredSelectValue}>
                            <option value='1'>Optional answer</option>
                            <option value='2'>Required answer</option>
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