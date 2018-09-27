import React, { Component } from 'react';
import './SurveyForm.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import QuestionSurveyItem from './QuestionSurveyItem/QuestionSurveyItem';
import DefaultNavigationBarContainer from '../../Dashboard/Commons/DefaultNavigationBar/index';
import QuestionBlock from '../../Dashboard/SurveyConteiner/components/QuestionBlock/QuestionBlock';
import Yes_no_checkbox from './Yes_no_checkbox/Yes_no_checkbox';
import From_1_to_6_checkbox from './From_1_to_6_checkbox/From_1_to_6_checkbox';
import CompleteSurveyButton from './CompleteSurveyButton/CompleteSurveyButton';

class SurveyForm extends Component {
    state = {
        questions: null,
        answers: [],
        answerText: '',
        answersMatching: [],
        ifAllAnswersTrue:false,
        submitError:false,
    }

    componentDidMount = () => {
        const questionsFromProps = this.props.incoming_surveys[this.props.match.params.id]
        console.log(questionsFromProps)
        this.setState({
            ...this.state,
            ...questionsFromProps,
        })
    }

    componentDidUpdate = () => {
        console.log(this.state)
    }

    //Methods from index.QuestionBlock
    onInvalid(){
        this.setState({ showMessage:{ show:true, message:"Please correct the errors", color:"#f5d141" } }, this.scrollToTop )
    }

    answersArr(answerObj){
        const answers = this.state.answers.slice();
        answers.push( answerObj );
        this.setState({ answers: answers })
    }


    answerTextHandling( answerText ){
        this.setState({ answerText })
    }

    updateAnswerArr( updated, index ){
        const { answers } = this.state
        answers[index].answerText = updated
        this.setState({ answers })
    }
    answersStatusArr( answerStatus ){
        const answers = this.state.answersMatching;
        answers.push( answerStatus )
        this.setState({ answersMatching: answers })
    }
    updateAnswersStatusArr( status, index ){
        const { answersMatching } = this.state;
        answersMatching[index] = status;
        this.setState({ answersMatching }, this.checkAllAnswers)
    }
    checkAllAnswers(){
        this.setState({ ifAllAnswersTrue: this.state.answersMatching.every((answerStatus) => (answerStatus === true)) })
        return this.state.ifAllAnswersTrue
    }
    scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    //

    render() {
        console.log(this.state.questions)

        if (!this.state.questions) return null

        const questionsList = this.state.questions.map((item, index) => {
            console.log(item)
            if (item.type == 'free_text') {

                let labelForInput = item.isRequired == 'required' ? 'Answer' : item.isRequired == 'optional' ? 'Answer(optional)' : null;
                // let required = item.isRequired == 'required' ? true : false;
                // const required = false;
                // let text = item.text;
                // if(item.isRequired == 'required') {
                //     text += ' *'
                // }
                let isRequiredQuestion = item.isRequired == 'required' ? 'required' : item.isRequired == 'optional' ? 'optional' : null;
                // let text = item.isRequired == 'required' ? `${item.text}*` : item.isRequired == 'optional' ? item.text : null;

                return <div className={isRequiredQuestion}>
                    <QuestionBlock
                    labelForInput={labelForInput}
                    question={item.text}
                    maxLengthOfText='500'
                    minLengthOfText={null}
                    fieldDescription=''
                    itemsIndex={index}
                    required={false}
                    key={item.id}
                    id={item.id}
                    onInvalid={this.onInvalid.bind(this)}
                    answersArr={this.answersArr.bind(this)}
                    answerText={this.state.answerText}
                    answerTextHandling={this.answerTextHandling.bind(this)}
                    updateAnswerArr={this.updateAnswerArr.bind(this)}
                    answersStatusArr={this.answersStatusArr.bind(this)}
                    updateAnswersStatusArr={this.updateAnswersStatusArr.bind(this)}
                    submitError={this.state.submitError}
                />
                </div>
            }
            if (item.type == 'yes_no') {
                return <Yes_no_checkbox 
                    question={item.text}
                    required={item.isRequired == 'required' ? true : false}
                    index={index}
                />
            }
            if (item.type == '1_to_6') {
                return <From_1_to_6_checkbox 
                    question={item.text}
                    required={item.isRequired == 'required' ? true : false}
                    index={index}
                />
            }
        })
        let closeButton = <a href="javascript:history.back()" className="close-button-title--create-new-header"></a>
        return (
            <div className='SurveyForm-wrapper'>
                <DefaultNavigationBarContainer
                    title='Survey'
                    className="interact"
                    right={closeButton}
                />
                <div className="SurveyForm-container">
                    <div className="SurveyForm">
                        <div className="SurveyForm__header">{this.state.title}</div>
                        <div className="SurveyForm__description">{this.state.description}</div>
                        <div className="SurveyForm__required-notification">*Required</div>
                        <hr/>
                        {questionsList}
                        <CompleteSurveyButton />
                    </div>
                </div>
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