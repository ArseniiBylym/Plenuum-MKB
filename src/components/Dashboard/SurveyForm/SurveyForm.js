import React, { Component } from 'react';
import './SurveyForm.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DefaultNavigationBarContainer from '../../Dashboard/Commons/DefaultNavigationBar/index';
import Free_text_input from './Free_text_input/Free_text_input';
import Yes_no_checkbox from './Yes_no_checkbox/Yes_no_checkbox';
import From_1_to_6_checkbox from './From_1_to_6_checkbox/From_1_to_6_checkbox';
import CompleteSurveyButton from './CompleteSurveyButton/CompleteSurveyButton';
import { NavLink } from 'react-router-dom';

class SurveyForm extends Component {
    state = {
        questions: null,
        isShowErrorMessages: false
    }

    componentDidMount = () => {
        const questionsFromProps = this.props.incoming_surveys[this.props.match.params.id]
        this.setState({
            ...this.state,
            ...questionsFromProps,
        })
    }

    onChangeInputHandler = (e, index) => {
        let newQuestionsArr = this.state.questions.map((item, i) => {
            if (index == i) {
                let isContainValue = e.target.value.length == 0 ? false : true;
                return {
                    ...item,
                    value: e.target.value,
                    isContainValue: isContainValue
                }
            } else return item
        });

        this.setState({
            questions: newQuestionsArr
        })

    }

    onChangeRadiobuttonHandler = (index, type, value) => {
        let newQuestionsArr = this.state.questions.map((item, i) => {
            if (index == i) {
                if (value == false) {
                    return {
                        ...item,
                        value: '',
                        isContainValue: false
                    }
                } else {
                    return {
                        ...item,
                        value: type,
                        isContainValue: true
                    }
                }
            } else return item
        })

        this.setState({
            questions: newQuestionsArr
        })
    }

    sendSurveyHandler = (e) => {
        console.log(this.state)
        let isAllRequiredFieldsFill = this.state.questions.some((item, i) => {
            if(item.isRequired == 'required' && !item.value) return true
            else return false 
        })
        if(isAllRequiredFieldsFill) {
            e.preventDefault();
            this.setState({
                isShowErrorMessages: true
            })
        } else {
            this.props.completeSurvey(this.props.match.params.id)
            this.setState({
                isShowErrorMessages: false
            })
        }

    }

    render() {

        if (!this.state.questions) return null

        const questionsList = this.state.questions.map((item, index) => {
            if (item.type == 'free_text') {

                let label = item.isRequired == 'required' ? 'Answer' : item.isRequired == 'optional' ? 'Answer(optional)' : null;
                let isRequiredQuestion = item.isRequired == 'required' ? 'required' : item.isRequired == 'optional' ? 'optional' : null;

                return (
                    <div className={isRequiredQuestion} key={item.id} >
                        <Free_text_input
                            question={item}
                            label={label}
                            required={item.isRequired == 'required' ? true : false}
                            index={index}
                            onChangeHandler={this.onChangeInputHandler}
                            onInvalid={true}
                            value={item.value}
                        />
                    </div>
                )
            }
            if (item.type == 'yes_no') {
                return <Yes_no_checkbox
                    key={item.id}
                    question={item.text}
                    required={item.isRequired == 'required' ? true : false}
                    index={index}
                    onChangeHandler={this.onChangeRadiobuttonHandler}
                    value={item.value}

                />
            }
            if (item.type == '1_to_6') {
                return <From_1_to_6_checkbox
                    key={item.id}
                    question={item.text}
                    required={item.isRequired == 'required' ? true : false}
                    index={index}
                    onChangeHandler={this.onChangeRadiobuttonHandler}
                    value={item.value}
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
                <div className={this.state.isShowErrorMessages ? "SurveyForm-container show-error-message" : "SurveyForm-container"} >
                    <div className="SurveyForm">
                        <div className="SurveyForm__header">{this.state.title}</div>
                        <div className="SurveyForm__description">{this.state.description}</div>
                        <div className="SurveyForm__required-notification">*Required</div>
                        <hr />
                        {questionsList}
                        <NavLink to='/interact' className='' onClick={this.sendSurveyHandler}>
                            <CompleteSurveyButton click={this.sendSurveyHandler} />
                        </NavLink>
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


