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
        
        target.value = 'Lejár ' + tarnsformedDate;
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
                <h1>Kérdőív információ</h1>
                <Input name='title' placeholder="Kérdőív címe" s={12} 
                    maxLength="80" 
                    onBlur={this.props.onChangeValue}
                    onChange={this.props.onChangeValue}
                    value={title}
                />
                <div className='Error_notification_wrapper'>{fieldIsRequired(title)}</div>
                <Input name='description' 
                    placeholder="Leírás (opcionális)" s={12} 
                    maxLength="200"
                    onBlur={this.props.onChangeValue}
                    onChange={this.props.onChangeValue}
                    value={description}
                />
                <div className='input__date-select-wrapper'>
                    <Input name='date' type='date' 
                        placeholder='Lejárat dátuma' 
                        onChange={this.changeDate} 
                        onChange={this.props.onChangeValue}
                        value={open_until}
                    />
                    <div className='triangle-for-select'>&#9662;</div>
                </div>
                <div className='Error_notification_wrapper'>{fieldIsRequired(open_until)}</div>
                <h1>Kérdések</h1>
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


function fieldIsRequired(arg) {
    return (
        <div className={arg ? 'FormContainer_field-required non-visible' : 'FormContainer_field-required'}>Kötelező mező</div>
    )
}