import React, { Component } from 'react';
import './SurveyForm.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import QuestionSurveyItem from './QuestionSurveyItem/QuestionSurveyItem';

class SurveyForm extends Component {
    state = {
        questions: null
    }

    componentDidMount = () => {
        const questionsFromProps = this.props.incoming_surveys[this.props.match.params.id]
        console.log(questionsFromProps)
        this.setState({
            ...questionsFromProps,
        })
    }

    componentDidUpdate = () => {
        console.log(this.state)
    }

    render() {

        if (!this.state.questions) return null

        const questionsList = this.state.questions.map((item, i) => {
            return <QuestionSurveyItem key={item.id} config={item} />
        })
        return (
            <div className='SurveyForm'>
                <div className="SurveyForm__header"></div>
                <div className="SurveyForm__description"></div>
                <div className="SurveyForm__required-notification"></div>
                {questionsList}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        incoming_surveys: state.incomingSurveys.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        completeSurvey: (index) => { dispatch({ type: "COMPLETE_SURVEY", index: index }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SurveyForm))