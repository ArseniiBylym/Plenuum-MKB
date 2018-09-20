import React, { Component, Fragment } from 'react'
import QuestionItem from './QuestionItem/QuestionItem'
import {Input} from 'react-materialize'
import './FormContainer.css';

class FormContainer extends Component {
    state = {

    }

    render() {
        const { title, description, open_until, questions } = this.props.config;

        let questionsArr = questions.map((item, i) => {
            return <QuestionItem key={item.id} config={item} index={i} 
                    deleteLastQuestion={this.props.deleteLastQuestion}
                    length={this.props.length}/>
        })
        return (
            <div className='FormContainer'>
                <h1>Survey information</h1>
                <Input placeholder="Survey title" s={12} />
                <Input type='textarea' placeholder="Description (optional)" s={12} />
                <Input name='on' type='date' placeholder='Open till' onChange={function(e, value) {}} />
                <h1>Questions</h1>
                {questionsArr}
            </div>

        )
    }
}

export default FormContainer