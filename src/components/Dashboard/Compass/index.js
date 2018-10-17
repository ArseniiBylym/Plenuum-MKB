import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Compass, {createCard, lastCard} from './Compass.js';
import Api from '../../../lib/api';
import {EnvVariable} from '../../../config';
import UserListContainer from '../Commons/UserList/index.js';
import SearchContainer from '../Commons/Search/index.js';
import NoNewTasks from '../../../resources/smile-face.svg';
import WinkFace from '../../../resources/wink-face.svg';
import DefaultNavigationBarContainer, {
    createBackButton,
    createNavRightButtons
} from '../Commons/DefaultNavigationBar/index.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Utils} from '../../../lib/utils';
import {spinner} from "../../Commons/Spinner/spinner";
import Constants from "../../../lib/constants";
import LocalizedStrings from 'react-localization';
const myLocalization = require('../../../resources/Strings.json');
const strings = new LocalizedStrings(myLocalization);

const ReactGA = require('react-ga');

const CompassAnswer = {
    AGREE:"AGREE",
    DISAGREE:"DISAGREE",
    SKIP:"SKIP"
};

ReactGA.initialize(EnvVariable.googleAnalyticsId);

const createCardsComponent = (questions, action, total, indexA, animation, wink) => {
    let aditiveY = 0;
    let aditiveScale = 1.0;
    let cards = questions.map((item, index) => {
        let zIndex = total - index + 1;
        let transform;
        if (index === 0) {
            transform = "";
        } else {
            aditiveY += 10;
            aditiveScale -= 0.02;
            transform = "scale(" + aditiveScale + ", " + aditiveScale + ") translateY(" + aditiveY +"px)";
        }

        return (
            <div className="compass" key={item.sentence._id}
                 style={{
                     zIndex: zIndex,
                     position: "absolute",
                     transform: transform
                 }}
            >
                {createCard(item, total, indexA + 1, action)}
            </div>
        );
    });
    cards.unshift(lastCard(wink ? WinkFace : NoNewTasks, indexA, "0"));
    return (
        <div className="compass-component">
          <ReactCSSTransitionGroup className="compass-transition-container"
                                   transitionName={animation ? animation.toLowerCase() : ""}
                                   transitionEnter={false}
                                   transitionEnterTimeout={150}
                                   transitionLeaveTimeout={200}
          >
              {cards}
          </ReactCSSTransitionGroup>
        </div>
    );
};

const createUserList = (users, allusers, click, searchFor, title, cancelButton) => {
    const userList = (<UserListContainer
        users={users}
        handleUserClick={click}
        accessory={false}
    />);

    let groupTitle;
    if (users.length === allusers.length && users.length > 0) {
        groupTitle = "Mindenki";
    }else if (users.length > 0 && users.length < allusers.length) {
        groupTitle = "Találatok";
    }else{
        groupTitle = "Nincs találat";
    }

    return (
        <div >
          <DefaultNavigationBarContainer
              title={title}
              right={
                  createBackButton(
                      cancelButton, undefined
                  )
              }/>
          <div className="compass-users-list-components">
            <div className='col-sm-8 col-sm-offset-2 compass-component-container'>
              <div className="select-users">
                <div className="search-field">
                  <SearchContainer searchFor={searchFor} />
                </div>
                <div className="users-new-feedback">
                  <div className="search-result-title">
                      {groupTitle}
                  </div>
                    {userList}
                </div>
              </div>
            </div>
        </div>
        </div>
    );
};

class CompassContainer extends Component {
    constructor(props, context) {
        super(props);
        this.addNotification = this.props.addNotification;
        this.store = context.store;
        this.state = {
            sentencesAnswer: [],
            ready: false,
            buttonDisabled:false
        };
        this.cancelButton = this.cancelButton.bind(this);
        this.handleUserClick = this.handleUserClick.bind(this);
        this.searchFor = this.searchFor.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.mountCompass = this.mountCompass.bind(this);
        this.postCompass = this.postCompass.bind(this);
        this.handleReplay = this.handleReplay.bind(this);
    }

    getQuestions(user){
        const {currentUser} = this.store.getState();
        const orgId = currentUser.orgId;
        Api.createCompassTodo(user._id, orgId)
            .then((response) => {
                this.store.dispatch({
                    type: Constants.ReducersActionType.ADD_BASIC_COMPASS_STRUCTURE,
                    compassTodoId: response._id,
                    recipientId: this.state.user._id
                });
                this.setState({ questions: response.questions, allQuestions: response });
            })
            .catch((error) => { console.error(error) });
    }

    postCompass(){
        this.setState({buttonDisabled:true});
        const { currentUser, composeCompass } = this.store.getState();
        const orgId = currentUser.orgId;
        let { compassTodoId, sentencesAnswer } = composeCompass;
        let body = JSON.stringify({
            compassTodo: compassTodoId,
            sentencesAnswer: sentencesAnswer
        });

        Api.postCompassAnswers(body, orgId)
            .then((response) => {
                let { history } = this.context.router;
                const notification = {
                    isActive: true,
                    message: strings['uiMessage_compassSentSuccess_title'],
                    userId: 'AnswerCardsOK'
                };
                this.addNotification(notification);
                history.goBack();
                this.setState({buttonDisabled:false});
            })
            .catch((error) => {
                console.error(error);
                this.setState({buttonDisabled:false});
            });
    }

    handleReplay () {
        ReactGA.event({
            category: 'UI',
            action: 'Click',
            label: 'Restart button click'
        });
        this.store.dispatch({type: 'RESTART_COMPASS'});
        this.setState ({
            questions: this.state.allQuestions.questions
        });
    }

    handleUserClick(user){
        ReactGA.event({
            category: 'UI',
            action: 'Click',
            label: 'Select user compass'
        });
        this.setState({user: user});
        this.getQuestions(user);
    }

    searchFor(e){
        let string = e.target.value;
        let searchedUsers = this.users.filter((element) => {
            return element._id !== this.userId;
        }).filter((element) => {
          let strings = string.replace(/\s/g, '');


          let firstName = element.firstName.split(' ').join('')
          let lastName = element.lastName.split(' ').join('')

          let fullName = firstName + '' + lastName;
          let nameFull = lastName + '' + firstName;
          
          return fullName.toLowerCase().includes(strings.toLowerCase())
          || nameFull.toLowerCase().includes(strings.toLowerCase());
        });

        searchedUsers = Utils().sortUsers(searchedUsers);
        this.userList = (
            <UserListContainer
                users={searchedUsers}
                handleUserClick={this.handleUserClick}/>);
        this.setState({users: searchedUsers});
    }

    mountCompass(action){
        const cardAction = action.toUpperCase();
        if (cardAction !== "DONE") {
            let { questions } = this.state;
            let question = questions[0];
            let sentenceAnswer = { ...question, answer: cardAction };

            ReactGA.event({
                category: 'UI',
                action: 'Click',
                label: action.toLowerCase() + ' button click'
            });
            questions = questions.filter((e) => {
                return e.sentence._id !== question.sentence._id;
            });
            this.store.dispatch({
                type: "ADD_SENTENCE_COMPASS",
                senteceAnswer: sentenceAnswer
            });
            this.setState({questions: questions, action: action});
            if (questions.length === 0) {
                setTimeout(() => {
                    this.setState({
                        wink: true
                    });
                    setTimeout(() => {
                        this.setState({
                            wink: false
                        })
                    }, 300);
                }, 400);
            }

        }else{
            this.setState({ ready: true });
            this.postCompass();
        }
    }

    componentWillMount(){
        const { route } = this.context.router;
        let fromTodo;
        if (route.location.state){
            fromTodo = route.location.state.fromTodo;
        }
        ReactGA.event({
            category: 'UI',
            action: 'Click',
            label: fromTodo ? 'Oké, kezdjük!' : 'Answer cards button'
        });
        const {currentUser} = this.store.getState();
        const orgId = currentUser.orgId;
        if (fromTodo) {
            this.store.dispatch({
                type: Constants.ReducersActionType.ADD_BASIC_COMPASS_STRUCTURE,
                compassTodoId: fromTodo._id,
                recipientId: fromTodo.about
            });
            this.setState({
                questions: fromTodo.questions,
                allQuestions: fromTodo
            });
            Api.users(orgId)
                .then((response) => {
                    const user = response.find((element) => {
                        return element._id === fromTodo.about;
                    });
                    this.setState({ user: user});
                })
                .catch((error) => { console.error(error) });

        }else{
            const {currentUser} = this.store.getState();
            const orgId = currentUser.orgId;
            Api.groupUsers(orgId)
                .then((response) => {
                    this.users = Utils().sortUsers(response);
                    this.setState({ users: Utils().sortUsers(response)});
                })
                .catch((error) => { console.error(error) });

        }
    }

    cancelButton() {
        let { history } = this.context.router;
        history.goBack();
        ReactGA.event({
            category: 'UI',
            action: 'Click',
            label: 'Cancel compass button click'
        });
    }

    render(){
        const { users, user, allQuestions, questions, action, wink } = this.state;
        let { history } = this.context.router;
        if (users && !user){
            return (createUserList(
                users,
                this.users,
                this.handleUserClick,
                this.searchFor,
                strings['answerCards_title'],
                this.cancelButton ) );
        }else if (user && questions){
            const total = allQuestions.questions.length;
            const index = allQuestions.questions.findIndex((e) => {
                return this.state.questions.length > 0 && e.sentence._id === this.state.questions[0].sentence._id;
            });
            const cards = createCardsComponent(
                questions, this.mountCompass, total, index, action, wink
            );
            return ( //This is necessary because the wrapper
                <div className="compass-and-navigation">
                  <DefaultNavigationBarContainer
                      title={user.firstName + " " + user.lastName}
                      right={
                          createNavRightButtons(
                              this.handleReplay, history.goBack, undefined, undefined
                          )
                      }/>
                  <Compass
                        disabled={this.state.buttonDisabled}
                      cards={cards}
                      agree={this.mountCompass.bind(this, CompassAnswer.AGREE, {})}
                      disagree={this.mountCompass.bind(this, CompassAnswer.DISAGREE, {})}
                      post={{
                          ready: this.state.questions.length === 0,
                          action: this.mountCompass.bind(this, "DONE", {})
                      }}
                  />
                </div>
            );
        }else{
            return spinner();
        }
    }
}

CompassContainer.propTypes = {
    addNotification: PropTypes.func
};

CompassContainer.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object.isRequired
};

export default CompassContainer;
