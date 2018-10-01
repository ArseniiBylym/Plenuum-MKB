import React, {Component} from 'react';
// import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import Api from '../../../lib/api';
import { Utils } from '../../../lib/utils';
import QuestionBlock from './components/QuestionBlock/QuestionBlock.jsx';
import { createBackButton } from '../Commons/DefaultNavigationBar/index.js';
import UserListContainer from '../Commons/UserList/index.js';

import { NotificationStack } from 'react-notification';

import SurveyFormContainer from './SurveyContainer.jsx';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';

import { searchUsersComponent } from '../MyFeedbacks/MyContent.js';
import { spinner } from "../../Commons/Spinner/spinner";

import SearchContainer from '../Commons/Search/index.js';

import './SurveyConteiner.css';

export default class SurveyConteiner extends Component {

    constructor(props, context) {
        super(props);

        this.store = context.store;
        this.router = context.router;

        this.utils = Utils();

        this.state = {
            recivedSurvey:{
                questions:[]
            },
            searchPage:false,
            allManagers:[],
            searchedManager:[],
            searchButtonClicked:false,
            query:undefined,
            isLoading:undefined,

            answers:[],
            answerText:"",
            selectedManager:{
                managerProfilePicture:'/profile.1623f812.svg',
                fullName:'Válaszd ki a vezetőd',
                _id:''
            },
            answersMatching:[],
            ifAllAnswersTrue:false,
            showMessage:{
                show:false,
                message:"",
                color:""
            },
            submitError:false,
            selectLineManager:false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.questionList = this.questionList.bind(this)
        this.getRequestById = this.getRequestById.bind(this)
        this.close = this.close.bind(this)
        this.getManagers = this.getManagers.bind(this)

        this.openSearch = this.openSearch.bind(this)
        this.searchFor = this.searchFor.bind(this)
        this.handleUserClick = this.handleUserClick.bind(this)

        this.checkAllAnswers = this.checkAllAnswers.bind(this)

    }

//Method for Sumbitting Survey Data
    handleSubmit(e) {
        e.preventDefault();

        if( this.state.ifAllAnswersTrue && this.state.selectedManager.fullName !== 'Válaszd ki a vezetőd' ){
            const { answers } = this.state
            const subminSurvey = {
                "manager":this.state.selectedManager._id,
                "isCompleted":true,
                "answers":answers
            }

            const { currentUser } = this.store.getState();

            const { _id } = this.router.route.location.state.fromRequest;

            Api.saveCompleteSurveyToDo( subminSurvey, _id, currentUser.orgId )
              .then( respons => {
                this.close();
              } )

            this.store.dispatch({ type:"SHOW_MESSAGE", message:"Survey sent", color:"#06d6a0" })
        } else {

            if ( this.state.selectedManager.fullName === 'Válaszd ki a vezetőd' ){
                this.setState({ showMessage:{ show:true, message:"Please correct the errors", color:"#f5d141" }, submitError:true, selectLineManager:true })
                this.scrollToTop();
            }
            else {
                this.setState({ showMessage:{ show:true, message:"Please correct the errors", color:"#f5d141" }, submitError:true, selectLineManager:false })
                window.scrollTo({ top: 165, behavior: "smooth" })
            // this.onInvalid()
            }
        }
    }

// Methods for handling All input
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

    answerTextHandling( answerText ){
        this.setState({ answerText })
    }

    answersArr(answerObj){
        const answers = this.state["answers"];
        answers.push( answerObj );
        this.setState({ "answers": answers })
    }

    updateAnswerArr( updated, index ){
        const { answers } = this.state
        answers[index].answerText = updated
        this.setState({ answers })
    }

    searchWithText(e){
        this.setState({
            query: e.target.value
        });
    }

    handleUserClick(clickedManager){
        const { firstName, lastName, pictureUrl = '/profile.1623f812.svg', _id } = clickedManager;
        const fullName = firstName + ' ' + lastName;
        this.setState({selectedManager: {
            managerProfilePicture: pictureUrl,
            fullName,
            _id}})
        this.setState( (prev) => ({searchPage: !prev.searchPage, selectLineManager:false }))
    }

//Method for Closing Survey Page
    close() {
        this.router.history.replace({ pathname: '/interact' })
    }

//Open Modal Window for Selecting a Manager
    openSearch() {
        this.setState({
            searchPage: !this.state.searchPage,
        });
    }

//Get Survey by ID
    getRequestById() {
        const { fromRequest } = this.router.route.location.state
        const { currentUser } = this.store.getState();

        Api.getSurveyToDoById( fromRequest._id, currentUser.orgId )
                .then(( recivedSurvey ) => {
                    this.setState({ recivedSurvey })
                })
                .catch(( error ) => { console.error( error ) })
    }


//Get All Managers from Server
    getManagers() {
        const { currentUser } = this.store.getState();
        if ( currentUser ) {
            const orgId = currentUser.orgId;
            Api.users( orgId )
                .then(( allManagers ) => {
                    const managersWithoutMe = allManagers.filter((element) => {
                        return element._id !== currentUser._id;
                    });
                    managersWithoutMe.sort( (a, b) => {
                        var nameA = a.firstName.toLowerCase();
                        var nameB = b.firstName.toLowerCase();
                        var secondNameA = a.lastName.toLowerCase();
                        var secondNameB = b.lastName.toLowerCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        if (secondNameA < secondNameB) {
                            return -1;
                        }
                        if (secondNameA > secondNameB) {
                            return 1;
                        }
                        return 0;
                    } );
                    this.setState({ allManagers: managersWithoutMe, searchedManager: managersWithoutMe });
                })
                .catch((error) => { console.log(error.message) });
        }
    }


    componentWillMount() {
    }

    componentDidMount() {
        this.getRequestById()
        this.getManagers()
    }

//Method for making Questions
    questionList(){
        return this.state.recivedSurvey.questions.map( (question, index) => {

            let labelForInput = 'Válasz (opcionális)';
            let fieldDescription = '';

            question.required ? labelForInput = "Válasz*" : labelForInput;
            question.required ? fieldDescription = "*Kötelező" : fieldDescription;

            return (
                <QuestionBlock
                    labelForInput={ labelForInput }
                    question={ question.text }
                    maxLengthOfText={ question.max }
                    minLengthOfText={ question.min }
                    fieldDescription={ fieldDescription }
                    itemsIndex={ index }
                    required={ question.required }
                    key={ question._id }
                    id={ question._id }
                    onInvalid={ this.onInvalid.bind(this) }
                    answersArr={ this.answersArr.bind(this) }
                    answerText={ this.state.answerText }
                    answerTextHandling={ this.answerTextHandling.bind(this) }
                    updateAnswerArr={ this.updateAnswerArr.bind(this) }
                    answersStatusArr={ this.answersStatusArr.bind(this) }
                    updateAnswersStatusArr={ this.updateAnswersStatusArr.bind(this) }
                    submitError={ this.state.submitError }
                />
            )
        })
    }

    showSearchInput(){
        this.setState({
            searchButtonClicked: !this.state.searchButtonClicked,
            query: this.state.searchButtonClicked ? undefined : this.state.query,
            isLoading:this.state.searchButtonClicked ? !this.state.searchPage : false
        })
    }

// Open Dialog Window for Manager selection
    searchFor(event) {
        const { currentUser } = this.store.getState();
        const string = event ? event.target.value : "";
        const { allManagers } = this.state;
        let resultManager = allManagers.filter((element) => {
          let strings = string.replace(/\s/g, '');

          let fullName = element.firstName.replace(/\s/g, '') + '' + element.lastName.replace(/\s/g, '');
          let nameFull = element.lastName.replace(/\s/g, '') + '' + element.firstName.replace(/\s/g, '');

          return fullName.toLowerCase().includes(strings.toLowerCase())
          || nameFull.toLowerCase().includes(strings.toLowerCase());
        });

        resultManager = this.utils.sortUsers( resultManager );
        this.setState( {searchedManager: resultManager} );
    }


    deleteSelectedManager(e){
        e.stopPropagation
        this.setState({selectedManager: {
                managerProfilePicture:'/profile.1623f812.svg',
                fullName:'Válaszd ki a vezetőd',
                _id:''
            }, selectLineManager:true })
    }
    onInvalid(){
        this.setState({ showMessage:{ show:true, message:"Please correct the errors", color:"#f5d141" } }, this.scrollToTop )
    }
    scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    notification = ( messageText, messageColor ) => (
        <NotificationStack
            barStyleFactory={ (index, style) => Object.assign(
                {},
                style,
                {
                    bottom: `${2 + (index * 5)}rem`,
                    left: 'auto',
                    right: '-100%',
                    backgroundColor: messageColor,
                    textSize: "12",
                    color: "#ffffff",
                    font: 'Nunito Sans, sans-serif'
                })}
            activeBarStyleFactory={(index, style) => Object.assign(
                {},
                style,
                {
                    bottom: `${2 + (index * 5)}rem`,
                    left: 'auto',
                    right: '2rem',
                    backgroundColor: "#f5d141"
                }
            )}
            notifications={ [{
                message: messageText,
                className: "notification-style",
                style: true,
                backgroundColor: "#555",
                dismissAfter: 3000,
                onClick:""
            }] }
            onDismiss={ () => { this.setState({ showMessage:{ show:false } }) } }
        />
    );

    selectLineManager(){
        this.setState( (prev) => ({ selectLineManager: !prev.selectLineManager }) )
    }


    render() {
        const { title } = this.router.route.location.state.fromRequest.survey;
        const { searchPage, searchedManager, allManagers } = this.state;

        let groupTitle;

        if (searchedManager.length - 1 === allManagers.length - 1) {
            groupTitle = "Mindenki";
        } else if (searchedManager.length > 0 && searchedManager.length < allManagers.length - 1) {
            groupTitle = "Találatok";
        } else {
            groupTitle = "Nincs találat";
        }

        const search = (<SearchContainer
                searchFor={ this.searchFor }
                customClass='filter-manager'
            />);

        const managersList = searchUsersComponent({
            userList: <UserListContainer
                    users={ searchedManager }
                    handleUserClick={this.handleUserClick}
                />,
                openSearch:this.openSearch,
                searchTitle:'Válaszd ki a vezetőd',
                search,
                groupTitle,
                className:"select-manager"
            })

        return (
            <div className="request-pre-container">
                <DefaultNavigationBarContainer
                    title={ title }
                    className="interact"
                    right={ createBackButton( this.close, undefined ) }
                />
                { this.state.searchPage && <div className="overlay" /> }

                { this.questionList().length ?
                    (<div className="request-list-container survey">

                        { this.state.showMessage.show &&
                            <div className="dashboard-notification">
                                { this.notification( this.state.showMessage.message, this.state.showMessage.color ) }
                            </div>
                        }

                        <SurveyFormContainer
                            onSubmit={ this.handleSubmit }
                            selectManager={ this.openSearch }
                            managerProfilePicture={ this.state.selectedManager.managerProfilePicture }
                            managerFullName={ this.state.selectedManager.fullName }
                            deleteSelectedManager={ this.deleteSelectedManager.bind(this) }
                            selectLineManager = { this.selectLineManager.bind(this) }
                            managerSelected = { this.state.selectLineManager }
                        >
                            { this.questionList() }
                        </SurveyFormContainer>
                    </div>)
                : ( <div className="request-list-container">{ spinner() }</div> ) }

                { searchPage ? managersList : null }

            </div>
        )

    }
}

SurveyConteiner.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object,
};

SurveyConteiner.propTypes = {
    addNotification: PropTypes.func.isRequired
};
