import React from 'react';
import './QuestionSurveyItem.css';
import QuestionBlock from '../../../Dashboard/SurveyConteiner/components/QuestionBlock/QuestionBlock';

function QuestionSurveyItem(props) {

    let configForQuestionBlock = {
        fieldDescription: 'Field description',
        id: props.id,
        question: props.text,
        answerText: 'Answer text',
        required: props.isRequired,
        minLengthOfText: 10,
        maxLengthOfText: 80,
    }

    labelForInput = { labelForInput }
    // question = { question.text }
    // maxLengthOfText = { question.max }
    // minLengthOfText = { question.min }
    // fieldDescription = { fieldDescription }
    itemsIndex = { index }
    // required = { question.required }
    key = { question._id }
    id = { question._id }
    onInvalid = { this.onInvalid.bind(this) }
    answersArr = { this.answersArr.bind(this) }
    answerText = { this.state.answerText }
    answerTextHandling = { this.answerTextHandling.bind(this) }
    updateAnswerArr = { this.updateAnswerArr.bind(this) }
    answersStatusArr = { this.answersStatusArr.bind(this) }
    updateAnswersStatusArr = { this.updateAnswersStatusArr.bind(this) }
    submitError = { this.state.submitError }

    // fieldDescription: this.props.fieldDescription,
    // answer: {
    //     "question":this.props.id,
    //     "questionText":this.props.question,
    //     "answerText":this.props.answerText,
    //     "required":this.props.required,
    //     "min":this.props.minLengthOfText,
    //     "max":this.props.maxLengthOfText
    // },
    // answerIsMatched:!this.props.required,
    // inputValue:"",
    // errorState:false

    let questionType = null;
    switch (props.config.type) {
        case 'free_text':
            questionType = <QuestionBlock {...configForQuestionBlock} />
            break;
        case 'yes_no':
            questionType = <div>yes_no question</div>
            break;
        case '1_to_6':
            questionType = <div>1_to_6 question</div>
            break;
        default:
            break;
    }

    return (
        <div className="QuestionSurveyItem">
            {props.config.text}
            {questionType}
        </div>
    )
}

export default QuestionSurveyItem