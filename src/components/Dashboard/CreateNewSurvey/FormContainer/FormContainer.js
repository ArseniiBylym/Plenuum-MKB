import React, { Component, Fragment } from 'react'
import QuestionItem from './QuestionItem/QuestionItem'
import {Input} from 'react-materialize'
import './FormContainer.css';
import Calendar from 'react-calendar'
import moment from 'moment'

class FormContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCalendarVisible: false
        }
      }

    calendarHandler = (value) => {
        this.setState({
            isCalendarVisible: false
        })
        this.props.onChangeDateHandler(value)
    }

    changeCalendarVisibility = () => {
        this.setState((prevState) => {
            return{
                isCalendarVisible: !prevState.isCalendarVisible
            }
        })
    }

    keyPressHandler = (e) => {
        let key = e.which || e.keyCode
        if(key == 13) {
            e.preventDefault()
        }
    }

    render() {
        const { title, description, open_until, questions } = this.props.config;
        const open_until_view = open_until ? `Lejárati dátum: ${open_until}` : ''

        let questionsArr = questions.map((item, i) => {
            return <QuestionItem key={item.id} config={item} index={i} id={item.id}
                    deleteCurrentQuestion={this.props.deleteCurrentQuestion}
                    goToPrev={this.props.goToPrev}
                    goToNext={this.props.goToNext}
                    length={this.props.length}
                    onChangeValue={this.props.onChangeValue}
                    keyPressHandler={this.keyPressHandler}
                    />
        })
        return (
            <div className='FormContainer'>
                <h1>Kérdőív információ</h1>
                <Input name='title' placeholder="Kérdőív címe" s={12} 
                    maxLength="80" 
                    onBlur={this.props.onChangeValue}
                    onChange={this.props.onChangeValue}
                    value={title}
                    type='textarea'
                    onKeyPress={this.keyPressHandler}
                />
                <div className='Error_notification_wrapper'>{fieldIsRequired(title)}</div>
                <Input name='description' 
                    placeholder="Leírás (opcionális)" s={12} 
                    maxLength="200"
                    onBlur={this.props.onChangeValue}
                    onChange={this.props.onChangeValue}
                    value={description}
                    type='textarea'
                    onKeyPress={this.keyPressHandler}
                />
                <div className={this.state.isCalendarVisible ? 
                    'Calendar__wrapper Calendar__wrapper--visible' : 
                    'Calendar__wrapper Calendar__wraper--hidden'}
                >
                <div className='Calendar__backdrop' onClick={this.changeCalendarVisibility} />
                <Calendar 
                    className='Calendar' 
                    minDate={new Date()}
                    onChange={this.calendarHandler}
                    value={new Date(moment().add(1, 'month').add(1, 'day'))}
                    locale="hu-HU"
                />
                </div>
                <div className={open_until ? 'react_calendar_handler' : 'react_calendar_handler react_calendar_handler--passive'} onClick={this.changeCalendarVisibility}>{open_until ? open_until_view : 'Lejárat dátuma'}</div>
                <div className='Error_notification_wrapper'>{fieldIsRequired(open_until)}</div>
                <h1>Kérdések</h1>
                {questionsArr}
            </div>

        )
    }
}

export default FormContainer


function fieldIsRequired(arg) {
    return (
        <div className={arg ? 'FormContainer_field-required non-visible' : 'FormContainer_field-required'}>Kötelező mező</div>
    )
}