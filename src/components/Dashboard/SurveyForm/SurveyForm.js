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

        _id: "5b5587187825ac2a047657b2",
        updatedAt: "2018-07-23T07:43:20.853Z",
        createdAt: "2018-07-23T07:43:20.853Z",
        title: "Some survey",
        owner: "5a84007831fdc409bc598202",
        questions: [
            {
                _id: "5b5587187825ac2a047657b3",
                updatedAt: "2018-07-23T07:43:20.972Z",
                createdAt: "2018-07-23T07:43:20.972Z",
                text: "some question 1",
                required: false,
                min: 0,
                max: 125,
                survey: "5b5587187825ac2a047657b2",
                type: "text"
            },
            {
                _id: "5b5587187825ac2a047657b4",
                updatedAt: "2018-07-23T07:43:20.973Z",
                createdAt: "2018-07-23T07:43:20.973Z",
                text: "some question 2",
                required: true,
                min: 0,
                max: 150,
                survey: "5b5587187825ac2a047657b2",
                type: "1-6"
            },
            {
                _id: "5b5587187825ac2a047657b5",
                updatedAt: "2018-07-23T07:43:20.973Z",
                createdAt: "2018-07-23T07:43:20.973Z",
                text: "some question 3",
                required: true,
                min: 0,
                max: 150,
                survey: "5b5587187825ac2a047657b2",
                type: "yes-no"
            },
        ]
    }

    componentDidMount = () => {
       
        // const token = window.localStorage.getItem('token')
        // Api.getSurveyById(token, this.props.orgId, this.props.match.params.id)
        //     .then(response => {
        //         console.log(response);
        //         this.setState({
        //             ...this.state,
        //             ...response
        //         })
        //     }
        // )
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
            console.log(item)
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
                return{
                    question: item._id,
                    questionText: item.text,
                    answerText: item.value,
                    required: item.required,
                }
            })
            let completeSurveyForSend = {
                isCompleted: true,
                answers: answersForSend
            }

            console.log(completeSurveyForSend)
            // Api.sendCompletedSurvey(token, this.props.orgId, this.state._id, completeSurveyForSend)
            //     .then(response => {
            //         console.log(response)
            //         this.props.completeSurvey(this.props.match.params.id)
            //         this.setState({
            //             isShowErrorMessages: false
            //         })
            //     })
            //     .catch(e => {
            //         console.log(e.message)
            //     })

            this.props.completeSurvey(this.props.match.params.id)
            this.setState({
                isShowErrorMessages: false
            })
        }

    }

    render() {

        if (!this.state.questions) return null

        const questionsList = this.state.questions.map((item, index) => {
            if (item.type == 'text') {

                let label = item.required == true ? 'Answer' : item.required == false ? 'Answer(optional)' : null;
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
                    title='Survey'
                    className="interact"
                    right={closeButton}
                />
                <div className={this.state.isShowErrorMessages ? "SurveyForm-container show-error-message" : "SurveyForm-container"} >
                    <div className="SurveyForm">
                        <div className="SurveyForm__header">{this.state.title}</div>
                        <div className="SurveyForm__description">{this.state.description && this.state.description}</div>
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


