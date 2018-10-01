import React, { Component, Fragment } from 'react'
import QuestionItem from './QuestionItem/QuestionItem'
import {Input} from 'react-materialize'
import './FormContainer.css';

class FormContainer extends Component {
    state = {

    }

    changeDate = (event) => {
        let target = event.target;
        let date = new Date(target.value);

        this.props.onChangeValue(event)

        let tarnsformedDate = transformDate(date)
        
        target.value = 'Open until ' + tarnsformedDate;
    }

    render() {
        const { title, description, open_until, questions } = this.props.config;

        let questionsArr = questions.map((item, i) => {
            return <QuestionItem key={item.id} config={item} index={i} id={item.id}
                    deleteCurrentQuestion={this.props.deleteCurrentQuestion}
                    goToPrev={this.props.goToPrev}
                    goToNext={this.props.goToNext}
                    length={this.props.length}
                    onChangeValue={this.props.onChangeValue}/>
        })
        return (
            <div className='FormContainer'>
                <h1>Survey information</h1>
                <Input name='title' placeholder="Survey title" s={12} 
                    maxLength="80" 
                    onBlur={this.props.onChangeValue}
                />
                <Input name='description' type='textarea' 
                    placeholder="Description (opcionális)" s={12} 
                    maxLength="200"
                    onBlur={this.props.onChangeValue}
                />
                <div className='input__date-select-wrapper'>
                    <Input name='date' type='date' placeholder='Open till' onChange={this.changeDate} />
                    <div className='triangle-for-select'>&#9662;</div>
                </div>
                <h1>Questions</h1>
                {questionsArr}
            </div>

        )
    }
}

export default FormContainer

function transformDate(date) {
    let year = date.getFullYear();
    let month = +date.getMonth() + 1;
    if(month < 10) {
        month = '0' + month;
    }
    let day = +date.getDate() 
    if (day < 10) {
        day = '0' + day;
    }
    return(year + '.' + month + '.' + day)
}