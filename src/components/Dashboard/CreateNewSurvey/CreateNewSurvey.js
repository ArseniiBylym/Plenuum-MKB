
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from '../../../lib/api.js';
import {Utils} from '../../../lib/utils';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import Button from './Button/Button';
import AddAnoterButton from './AddAnotherButton/AddAnotherButton';
import FormContainer from './FormContainer/FormContainer';
import './CreateNewSurvey.css';

class CreateNewSurvey extends Component {

    constructor(props, context) {
        super(props);
        this.store = context.store;
        const { currentUser } = this.store.getState();
        this.currentUser = currentUser;
        this.userId = currentUser._id;
        
        this.state = {
            screenSide: 'left',
            isFormCorrect: true,
            title: '',
            description: '',
            open_until: '',
            questions: [
                {
                    id: Date.now() + Math.random(),
                    text: '',
                    type: '',
                    isRequired: ''
                }
            ],
            users: ''
        }
    }

    componentDidMount = () => {
        console.log(this.props)
        console.log(this.context)
        const orgId = this.currentUser.orgId;
        Api.users(orgId)
            .then((response) => {
                const searchedUsers = Utils().sortUsers(response).filter((element) => {
                    return element._id !== this.userId;
                });
                this.users = searchedUsers;
                this.setState({users: searchedUsers});
            })
            .catch((error) => { console.log(error.message) });
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.questions.length < this.state.questions.length) {

            let wrapper = document.querySelector('.CreateNew__left-screen-wrapper')
            const pixelsToScroll = wrapper.scrollHeight - wrapper.clientHeight;
            wrapper.scrollTo({
                top: pixelsToScroll,
                behavior: "smooth"
            })
        }
    }

    switchBack = () => {
        this.setState({
            screenSide: 'left'
        })
    }

    showNextScreen = (event) => {
        // if (this.state.isFormCorrect) {
        //     this.setState({
        //         screenSide: 'right'
        //     })
        // } else return;
    }

    addAnoterQuestion = (event) => {

        this.setState((prevState) => {
            return {
                questions: prevState.questions.concat([
                    {
                        id: Date.now() + Math.random(),
                        text: '',
                        type: '',
                        isRequired: ''
                    }
                ])
            }
        })
    }

    deleteCurrentQuestion = (index) => {
        console.log('delete last')
        console.log(index)
        if (this.state.questions.length <= 1) return
        this.setState((prevState) => {
            let arr = prevState.questions.slice();
            arr.splice(index, 1)
            return (
                {
                    ...prevState,
                    questions: arr
                }
            )
        })
    }

    goToPrev = (index) => {
        if(index == 0 ) return
        let questionsList = document.getElementsByClassName('QuestionItem');
        questionsList[index - 1].scrollIntoView({behavior: "smooth", block: "start"})
        console.log(questionsList)
        console.log('go to prev')
    }

    goToNext = (index) => {
        console.log(this.state.questions.length)
        if(index == this.state.questions.length - 1 || this.state.questions.length == 1) return 
        let questionsList = document.getElementsByClassName('QuestionItem');
        questionsList[index + 1].scrollIntoView({behavior: "smooth",  block: "start"})
        console.log('go to next')
    }

    render() {

        let backSwitchButton = <div className='back-button-title--survey-header' onClick={this.switchBack}></div>
        let closeButton = <a href="javascript:history.back()" className="close-button-title--create-new-header"></a>

        return (
            <div className='request-pre-container request-pre-container--create-new-main-wrapper'>
                <div className={this.state.screenSide == 'left' ?
                    'request-pre-container request-pre-container--create-new-part1 create-new--center' :
                    'request-pre-container request-pre-container--create-new-part1 create-new--left'}>
                    <DefaultNavigationBarContainer
                        title='New survey (1/2)'
                        className="interact"
                        right={closeButton}
                    />
                    <div className='CreateNew__left-screen-wrapper'>
                        <FormContainer config={this.state}
                            deleteCurrentQuestion={this.deleteCurrentQuestion}
                            goToNext={this.goToNext}
                            goToPrev={this.goToPrev}
                            length={this.state.questions.length} />

                        <div className='CreateNew__footer-wrapper'>
                            <AddAnoterButton text='ADD ANOTHER QUESTION' onClickAction={this.addAnoterQuestion} />
                            <Button text='NEXT' onClickAction={this.showNextScreen} />
                        </div>
                    </div>
                </div>
                <div className={this.state.screenSide == 'right' ?
                    'request-pre-container request-pre-container--create-new-part1 create-new--center' :
                    'request-pre-container request-pre-container--create-new-part1 create-new--right'}>
                    <DefaultNavigationBarContainer
                        title='New survey (2/2)'
                        className="interact"
                        backButton={backSwitchButton}
                        right={closeButton}
                    />
                    <div className='CreateNew__right-screen-wrapper'>
                        <div className='CreateNew__footer-wrapper'>
                            <Button text='SEND SURVEY' />
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}


CreateNewSurvey.propTypes = {
    addNotification: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired
};


CreateNewSurvey.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object.isRequired
};

export default CreateNewSurvey