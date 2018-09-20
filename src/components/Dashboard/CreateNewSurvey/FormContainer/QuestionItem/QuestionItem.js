import React, { Component } from 'react';
import { Input } from 'react-materialize';
import './QuestionItem.css';

class QuestionItem extends Component {
    state = {
        typeSelectValue: 1,
        isRequiredSelectValue: 1,

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
        if(this.state.typeSelectValue == 1) {
            classNameForImg += ' freeText-img';
        } else if(this.state.typeSelectValue == 2) {
            classNameForImg += ' yesNo-img';
        } else if(this.state.typeSelectValue == 3) {
            classNameForImg += ' oneToSix-img'
        }

        let classNameForBasket = 'BasketContainer__item basket' 
        if(this.props.length > 1) {
            classNameForBasket += ' active'
        }

        return (
            <div className='QuestionItem'>
                {this.props.index == 0 && basketContainer(this.props.deleteLastQuestion, classNameForBasket)}
                {this.props.index == 0 && answerIsRequired()}

                <Input placeholder="Enter question" s={12} />
                <div className='QuestionItem__select-wrapper'>
                    <Input s={12} type='select' label="" defaultValue='1' onChange={this.changeTypeSelectValue}>
                        <option value='1'>Free text answer</option>
                        <option value='2'>Yes-no choice</option>
                        <option value='3'>1 to 6 choice</option>
                    </Input>
                    <Input s={12} type='select' label="" defaultValue='1' onChange={this.changeIsRequiredSelectValue}>
                        <option value='1'>Optional answer</option>
                        <option value='2'>Required answer</option>
                    </Input>
                </div>
                <div className='QuestionItem__preview-container'>
                    <div className='QuestionItem__preview-header'>Answer preview</div>
                    <div className={classNameForImg}></div>
                </div>
            </div>
        )
    }
}

export default QuestionItem

function basketContainer(deleteLastQuestion, className) {
    return(
        <div className='BasketContainer'>
            <div className={className} onClick={deleteLastQuestion}></div>        
            <div className='BasketContainer__item arrow-up'></div>            
            <div className='BasketContainer__item arrow-down'></div>                    
        </div>
    )
}

function answerIsRequired() {
    return (
        <div className='QuestionItem__answer-required'>Answer required</div>
    )
}