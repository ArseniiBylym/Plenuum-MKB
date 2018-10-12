import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from '../../../lib/api.js';
import { Utils } from '../../../lib/utils';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import ButtonNext from './ButtonNext/ButtonNext';
import AddAnoterButton from './AddAnotherButton/AddAnotherButton';
import FormContainer from './FormContainer/FormContainer';
import SelectUsersForSurvey from './SelectUsersForSurvey/SelectUsersForSurvey'
import SwitchContainer from './SwitchContainer/SwitchContainer'
import SendToEveryone from './SendToEveryone/SendToEveryone';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './CreateNewSurvey.css';
import moment from 'moment';
import {withRouter} from 'react-router-dom'

class CreateNewSurvey extends Component {

    constructor(props, context) {
        super(props);
        this.store = context.store;
        const { currentUser } = this.store.getState();
        this.currentUser = currentUser;
        this.userId = currentUser._id;
        this.currentUser.status = this.currentUser.roles && this.currentUser.roles.includes('HR') ? true : false// the identifier for user for HR rights

        this.state = {
            screenSide: 'left',
            isFormCorrect: true,
            isSwitchOn: false,
            title: '',
            description: '',
            open_until: '',
            questions: [
                {
                    id: Date.now() + Math.random(),
                    text: '',
                    type: 'free_text',
                    isRequired: 'optional'
                }
            ],
            users: '',
            selectedUsers: [],
            selectedUsersBuffer: [],
            selectedUsersMaxLength: 20,
            isSelectedUsersArrFull: false,
        }
    }

    componentDidMount = () => {
        console.log(this.props)
        const orgId = this.currentUser.orgId;
        Api.users(orgId)
            .then((response) => {
                const searchedUsers = Utils().sortUsers(response).filter((element) => {
                    return element._id !== this.userId;
                });
                this.users = searchedUsers;
                this.setState({ users: searchedUsers });
            })
            .catch((error) => { console.log(error.message) });
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log(this.state)
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
        console.log('click back')
        this.setState({
            screenSide: 'left'
        })
    }

    showNextScreen = (event) => {
        this.setState({
            screenSide: 'right'
        })
    }

    addAnoterQuestion = () => {

        this.setState((prevState) => {
            return {
                questions: prevState.questions.concat([
                    {
                        id: Date.now() + Math.random(),
                        text: '',
                        type: 'free_text',
                        isRequired: 'optional'
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
      
        if (index == 0) return

        let newQuestionsList = this.state.questions.slice();
        moveTo.call(newQuestionsList, index, index - 1) // helper function in the bootom of the document
        this.setState({
            questions: newQuestionsList
        })

    }

    goToNext = (index) => {
        if (index == this.state.questions.length - 1 || this.state.questions.length == 1) return

        let newQuestionsList = this.state.questions.slice();
        moveTo.call(newQuestionsList, index, index + 1) // helper function in the bootom of the document
        this.setState({
            questions: newQuestionsList
        })
    }

    switchSwitcher = () => {
        if (!this.state.isSwitchOn) {
            let usersArr = this.state.users.slice();
            this.setState((prevState) => ({
                isSwitchOn: true,
                selectedUsers: usersArr
            }))
        } else {
            this.setState((prevState) => ({
                isSwitchOn: false,
                selectedUsers: []
            }))
        }
    }
    onChangeQuestionItemValue = (index) => {
        // console.log(index)
    }

    onChangeValue = (event, index) => {
        const target = event.target;

        switch (target.name) {
            case "title":
                this.setState({
                    title: target.value
                })
                break
            case "description":
                this.setState({
                    description: target.value
                })
                break
            case "date":
                this.setState({
                    open_until: target.value
                })
                break
            case "question":
                let questionTextArr = this.state.questions.map((item, i) => {
                    if (index == i) {
                        return {
                            ...item,
                            text: target.value
                        }
                    } else {
                        return item;
                    }
                })

                this.setState({
                    questions: questionTextArr
                })

                break
            case "question_type":
                let questionTypeArr = this.state.questions.map((item, i) => {
                    if (index == i) {
                        return {
                            ...item,
                            type: target.value
                        }
                    } else {
                        return item;
                    }
                })

                this.setState({
                    questions: questionTypeArr
                })
                break
            case "question_required":
                let questionIsRequiredArr = this.state.questions.map((item, i) => {
                    if (index == i) {
                        return {
                            ...item,
                            isRequired: target.value
                        }
                    } else {
                        return item;
                    }
                })

                this.setState({
                    questions: questionIsRequiredArr
                })
                break
            default:
                break
        }
    }

    addUsersToCurrentList = (usersArr) => {

        if (usersArr.length != this.state.selectedUsers.length) {

            if (this.state.selectedUsers.length == this.state.selectedUsersMaxLength
                && usersArr.length > this.state.selectedUsersMaxLength
                && this.currentUser.status == false) {
                    return
                }
            if (this.state.selectedUsers.length == this.state.selectedUsersMaxLength - 1
                && usersArr.length > this.state.selectedUsersMaxLength - 1
                && this.currentUser.status == false) {
                this.setState({
                    selectedUsers: usersArr,
                    isSelectedUsersArrFull: true
                })
                return
            }
            if (this.state.selectedUsers.length == this.state.selectedUsersMaxLength
                && usersArr.length < this.state.selectedUsersMaxLength
                && this.currentUser.status == false) {
                this.setState({
                    selectedUsers: usersArr,
                    isSelectedUsersArrFull: false
                })
                return
            } else {
                this.setState({
                    selectedUsers: usersArr
                })
            }
        }
    }

    createSurveyHandler = (e) => {
        console.log('into handler')
        if(this.state.title.trim().length == 0) {
            console.log('Please, fill the title of the survey to continue');
            return
        }
        if(this.state.open_until.trim().length == 0) {
            console.log(`Please, chose the date of the survey's end to continue`)
            return
        }
        for (let item of this.state.questions) {
            if(item.text.trim().length == 0) {
                console.log('Please, fill the all questions fields to continue')
                return
            }
        }
        if(this.state.selectedUsers.length == 0) {
            console.log('Plese, chose at least one user to continue')
            return
        }


        const questionsForPost = this.state.questions.map((item,i) => {
            let type = item.type == 'free_text' ? 'text' : item.type == 'yes_no' ? 'yes-no' : item.type == '1_to_6' ? '1-6' : null
            let required = item.isRequired == 'required' ? true : false
            return {
                type: type,
                text: item.text,
                required: required
            }
        })
      
        let respondentsForPost = this.state.selectedUsers.map((item, i) => {
            return item._id
        })
      
        const objForPost = {
            title: this.state.title,
            description: this.state.description,
            respondents: respondentsForPost,
            expiritDate: moment(this.state.open_until).format('YYYY-MM-DD hh:mm:ss.SSS'),
            questions: questionsForPost
        }
        const token = window.localStorage.getItem('token');
        console.log(objForPost)
       
        Api.createNewSurvey(token, this.currentUser.orgId, objForPost)
            .then((response) => {
                console.log(response)

                this.props.history.push('/my_surveys')

                this.props.createNewSurvey(this.state)
                console.log('New survey was successful created!')
                console.log(this.state)
            })
            .catch((error) => {
                // e.preventDefault();
                // return
                console.log(error.massage)
            })
    }

    render() {
        let classNameForUsersContainer = 'SelectUsersForSurvey'
        if (this.state.isSelectedUsersArrFull) {
            classNameForUsersContainer += ' usersListFull'
        }

        let backSwitchButton = <div className='back-button-title--survey-header' onClick={this.switchBack}></div>
        let closeButton = <a href="javascript:history.back()" className="close-button-title--create-new-header"></a>

        return (
            <div className='request-pre-container request-pre-container--create-new-main-wrapper'>
                <div className={this.state.screenSide == 'left' ?
                    'request-pre-container request-pre-container--create-new-part1 create-new--center' :
                    'request-pre-container request-pre-container--create-new-part1 create-new--left'}>
                    <DefaultNavigationBarContainer
                        title='Új kérdőív (1/2)'
                        className="interact"
                        right={closeButton}
                    />
                    <div className='CreateNew__left-screen-wrapper'>
                        <FormContainer config={this.state}
                            deleteCurrentQuestion={this.deleteCurrentQuestion}
                            goToNext={this.goToNext}
                            goToPrev={this.goToPrev}
                            length={this.state.questions.length}
                            onChangeValue={this.onChangeValue}
                            onChangeQuestionItemValue={this.onChangeQuestionItemValue} />

                        <div className='CreateNew__footer-wrapper'>
                            <AddAnoterButton text='ADD ANOTHER QUESTION' onClickAction={this.addAnoterQuestion} />
                            <ButtonNext text='Következő' onClickAction={this.showNextScreen} />
                        </div>
                    </div>
                </div>
                <div className={this.state.screenSide == 'right' ?
                    'request-pre-container request-pre-container--create-new-part1 create-new--center' :
                    'request-pre-container request-pre-container--create-new-part1 create-new--right'}>
                    <DefaultNavigationBarContainer
                        title='Új kérdőív (2/2)'
                        className="interact"
                        backButton={backSwitchButton}
                        right={closeButton}
                    />
                    {this.currentUser.status && <SwitchContainer isOn={this.state.isSwitchOn} click={this.switchSwitcher} />}
                    <div className='CreateNew__right-screen-wrapper'>
                        {this.state.isSwitchOn ?
                            <SendToEveryone /> :
                            <SelectUsersForSurvey addUsersToCurrentList={this.addUsersToCurrentList}
                                className={classNameForUsersContainer} />
                        }
                        <div id='link' className='CreateNew__footer-wrapper' onClick={this.createSurveyHandler}>
                            <ButtonNext text='SEND SURVEY' />
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

const mapDispatchToProps = dispatch => {
    return {
        createNewSurvey: (survey) => dispatch({type: "CREATE_NEW_SURVEY", newSurvey: survey})
    }
};

export default connect(null, mapDispatchToProps)(withRouter(CreateNewSurvey));

//Helper function for move questions in list up or down. Use in goToNext and goToPrev methods
function moveTo (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };