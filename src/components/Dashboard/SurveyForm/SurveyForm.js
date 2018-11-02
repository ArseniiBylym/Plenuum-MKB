import React, { Component } from 'react';
import './SurveyForm.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DefaultNavigationBarContainer from '../../Dashboard/Commons/DefaultNavigationBar/index';
import Free_text_input from './Free_text_input/Free_text_input';
import Yes_no_checkbox from './Yes_no_checkbox/Yes_no_checkbox';
import From_1_to_6_checkbox from './From_1_to_6_checkbox/From_1_to_6_checkbox';
import CompleteSurveyButton from './CompleteSurveyButton/CompleteSurveyButton';
import Api from '../../../lib/api';
import { NavLink } from 'react-router-dom';

class SurveyForm extends Component {
    state = {
        // questions: null,
        isShowErrorMessages: false,

        // surveyTodo: {
        //     _id: "5ba10cceeaf04068261ff4a5",
        //     updatedAt: "2018-09-18T14:33:50.591Z",
        //     createdAt: "2018-09-18T14:33:50.591Z",
        //     survey: {
        //         _id: "5b531d15617b0c1fb0c73658",
        //         title: "Survey 1"
        //     },
        //     respondent: "5984342227cd340363dc84a9",
        //     isCompleted: false
        // },
        // questions: [
        //     {
        //         _id: "5b5081c3aa357227f44fa504",
        //         text: "Survey 1 Question 2",
        //         max: 75,
        //         min: null,
        //         required: true
        //     },
        //     {
        //         _id: "5b5081c3aa357227f44fa503",
        //         text: "Survey 1 Question 1",
        //         max: 250,
        //         min: 10,
        //         required: true
        //     },
        //     {
        //         _id: "5b5081c3aa357227f44fa505",
        //         text: "Survey 1 Question 3",
        //         max: null,
        //         min: 5,
        //         required: false
        //     }
        // ]
    }

    componentDidMount = () => {
    //    console.log(this.props)
        const token = window.localStorage.getItem('token')
        Api.getSurveyById(token, this.props.orgId, this.props.match.params.id)
            .then(response => {
                // console.log(response);
                this.setState({
                    ...this.state,
                    ...response
                })
            }
        )
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
        // console.log(this.state)
        let isAllRequiredFieldsFill = this.state.questions.some((item, i) => {
            // console.log(item)
            if (item.required == true && !item.value) return true
            else return false
        })
        if (isAllRequiredFieldsFill) {
            e.preventDefault();
            this.setState({
                isShowErrorMessages: true
            })
            return
        } else {
            const token = window.localStorage.getItem('token');

            let answersForSend = this.state.questions.map((item, i) => {
                // console.log(item)
                let value = item.value
                if(item.type == 'yes-no'){
                    value = item.value == 'yes' ? 1 : 0
                }

                return{
                    question: item._id,
                    questionText: item.text,
                    questionType: item.type,
                    // answerText: item.value,
                    answerText: value,
                    required: item.required,
                }
            })
            let completeSurveyForSend = {
                isCompleted: true,
                answers: answersForSend
            }

            // console.log(completeSurveyForSend)
            Api.sendCompletedSurvey(token, this.props.orgId, this.state.surveyTodo._id, completeSurveyForSend)
                .then(response => {
                    // console.log(response)
                    this.props.completeSurvey(this.props.match.params.id)
                    this.setState({
                        isShowErrorMessages: false
                    })
                    this.props.history.push('/interact')
                })
                .catch(e => {
                    console.log(e.message)
                })
            
                // this.props.completeSurvey(this.props.match.params.id)
                // this.setState({
                //     isShowErrorMessages: false
                // })
                // this.props.history.push('/interact')

        }

    }

    render() {

        if (!this.state.questions) return null

        const questionsList = this.state.questions.map((item, index) => {
            if (item.type == 'text' || !item.type) {

                let label = item.required == true ? 'Válasz' : item.required == false ? 'Válasz(opcionális)' : null;
                let isRequiredQuestion = item.required == true ? 'required' : item.required == false ? 'optional' : null;

                return (
                    <div className={isRequiredQuestion} key={item.id} >
                        <Free_text_input
                            question={item}
                            label={label}
                            required={item.required == true ? true : false}
                            index={index}
                            onChangeHandler={this.onChangeInputHandler}
                            onInvalid={true}
                            value={item.value}
                        />
                    </div>
                )
            }
            if (item.type == 'yes-no') {
                return <Yes_no_checkbox
                    answerValues={item.answerValues}
                    key={item.id}
                    question={item.text}
                    required={item.required == true ? true : false}
                    index={index}
                    onChangeHandler={this.onChangeRadiobuttonHandler}
                    value={item.value}

                />
            }
            if (item.type == '1-6') {
                return <From_1_to_6_checkbox
                    answerValues={item.answerValues}
                    key={item.id}
                    question={item.text}
                    required={item.required == true ? true : false}
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
                    title='Válaszok'
                    className="interact"
                    right={closeButton}
                />
                <div className={this.state.isShowErrorMessages ? "SurveyForm-container show-error-message" : "SurveyForm-container"} >
                    <div className="SurveyForm">
                        <div className="SurveyForm__header">{this.state.surveyTodo.survey.title}</div>
                        <div className="SurveyForm__description">{this.state.surveyTodo.survey.description && this.state.surveyTodo.survey.description}</div>
                        <div className="SurveyForm__required-notification">*Kötelező</div>
                        <hr />
                        {questionsList}
                        <div id='completeSurveyButton' className='' onClick={this.sendSurveyHandler}>
                            <CompleteSurveyButton />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // incoming_surveys: state.incomingSurveys.list,
        // tempCurrentSurvey: state.incomingSurveys[0],
        orgId: state.currentUser.orgId,
        // manager: state.currentUser.managerId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        completeSurvey: (id) => { dispatch({ type: "COMPLETE_SURVEY", id: id }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SurveyForm))


