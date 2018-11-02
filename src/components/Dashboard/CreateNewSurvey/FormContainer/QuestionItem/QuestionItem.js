import React, {Component, PureComponent } from 'react';
import { Input } from 'react-materialize';
import './QuestionItem.css';
import Text from './InputExamples/Text'
import Yes_no from './InputExamples/Yes_no'
import One_six from './InputExamples/One_six'
import BasketContainer from './questionElements/BasketContainer/BasketContainer'
import RequiredQuestionSelect from './questionElements/RequiredQuestionSelect/RequiredQuestionSelect';
import TypeQuestionSelect from './questionElements/TypeQuestionSelect/TypeQuestionSelect';

class QuestionItem extends PureComponent {
    state = {
        typeSelectValue: '',
        isRequiredSelectValue: '',
        exampleElem: null
    }

    componentDidMount = () => {
        // console.log(this.props)
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
        // console.log(this.props)
        let classNameForImg = 'QuestionItem__preview-img'
        if (this.state.typeSelectValue == 'free_text') {
            classNameForImg += ' freeText-img';
        } else if (this.state.typeSelectValue == 'yes_no') {
            classNameForImg += ' yesNo-img';
        } else if (this.state.typeSelectValue == '1_to_6') {
            classNameForImg += ' oneToSix-img'
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
                    onKeyPress={this.props.keyPressHandler}
                />
                <div className='Error_notification_wrapper'>{answerIsRequired(this.props.config.text)}</div>
                <div className='QuestionItem__select-wrapper'>
                    <TypeQuestionSelect 
                        type={this.props.config.type}
                        onChange={this.changeTypeSelectValue}
                    />
                    <RequiredQuestionSelect
                        isRequired={this.props.config.isRequired}
                        onChange={this.changeIsRequiredSelectValue}
                    />
                </div>
                <div className={classForPreviewContainer}>
                    <div className='QuestionItem__preview-header'>Válasz előnézete</div>
                    {this.state.exampleElem}
                </div>
            </div>
        )
    }
}

export default QuestionItem


function answerIsRequired(arg) {
    return (
        <div className={arg ? 'FormContainer_field-required non-visible' : 'FormContainer_field-required'}>Kötelező mező</div>    )
}