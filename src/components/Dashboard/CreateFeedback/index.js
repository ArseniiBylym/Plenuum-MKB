import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CreateFeedback, {userList, bottomContainer, createFeedbackUI, requestMessageComponent, feedbackTypeComponent} from './CreateFeedback.js';
import UserListContainer from '../Commons/UserList/index.js';
import MessageContainer from '../Commons/Message/index.js';
import Api from '../../../lib/api.js';
import {EnvVariable} from '../../../config';
import {Utils} from '../../../lib/utils';
import UserCellContainer from '../Commons/UserCell/index.js';
import {createBackButton} from '../Commons/DefaultNavigationBar/index.js';
import Constants from '../../../lib/constants';
import {spinner} from "../../Commons/Spinner/spinner";
import LocalizedStrings from 'react-localization';
const myLocalization = require('../../../resources/Strings.json');
const strings = new LocalizedStrings(myLocalization);

const ReactGA = require('react-ga');

ReactGA.initialize(EnvVariable.googleAnalyticsId);


class CreateFeedbackContainer extends Component {

    constructor(props, context){
        super(props);
        this.utils = Utils();
        this.store = context.store;
        const { currentUser } = this.store.getState();
        this.addNotification = this.props.addNotification;
        this.userId = currentUser._id;
        this.state = {
            fromRequest: undefined,
            page: 0,
            anonimity: false,
            message: "",
            type: undefined,
            context: "",
            title: "Új visszajelzés",
            ready: false,
            tags: undefined,
            selectedTags: [],
            buttonDisabled:false
        };

        this.handleUserClick = this.handleUserClick.bind(this);
        this.handleFeedbackType = this.handleFeedbackType.bind(this);
        this.handleFeedbackMessage = this.handleFeedbackMessage.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleFeedbackContext = this.handleFeedbackContext.bind(this);
        this.createPost = this.createPost.bind(this);
        this.searchFor = this.searchFor.bind(this);
        this.handleFeedbackTags = this.handleFeedbackTags.bind(this);

        this.nextButton = this.nextButton.bind(this);
        this.cancelButton = this.cancelButton.bind(this);
    }

    handleUserClick(user){
        this.components = (
            <div>
              <MessageContainer
                  name="feedbackMessage"
                  placeholder="Type here your feedback"
                  maxLength={200}
                  handleText={this.handleFeedbackMessage}
                  value={this.state.message}
              />
              <div className="button-next" onClick={this.nextButton}>Következő</div>
            </div>
        );
        ReactGA.event({
            category: 'UI',
            action: 'Click',
            label: 'Select recipient from list'
        });
        this.setState({user: user._id, page: this.state.page + 1,title: "Új visszajelzés"});
    }

    handleCheckBox(e){
        if (e.target.name === "anonimity") {
            this.setState({anonimity: e.target.value  === "user" ? false : true})
        }
    }

    handleFeedbackMessage(e){
        const message = e.target.value;
        this.setState({
            message: message,
            ready: (this.state.message.length > 4 && this.state.type) || this.state.ready
        });
    }

    handleFeedbackType(number){
        let type;
        switch (number) {
            case 1: type = Constants.FeedbackType.CONSIDER; break;
            case 2: type = Constants.FeedbackType.CONTINUE; break;
            default:type = undefined; break;
        }
        this.setState({type: type, ready: this.state.message.length > 4 || this.state.ready});
    }

    handleFeedbackContext(context){
        this.setState({context: context});
    }

    handleFeedbackTags(tag){
        const tags = this.state.selectedTags;
        //Check if the tag is already selected
        const isSelected = tags.includes(tag);
        if (isSelected) {
            this.setState({selectedTags: tags.filter((element) => {
                return element !== tag;
            })});
        }else{
            if (tags.length < 5) {
                tags.push(tag);
                this.setState({selectedTags: tags});
            }
        }
    }

    nextButton(){
        if (this.state.page === 1 && this.state.message.length > 4 && this.state.type) {
            ReactGA.event({
                category: 'UI',
                action: 'Click',
                label: 'Send Feedback button'
            });
            this.createPost();
        }else{
            this.setState({page: 1, title: "Új visszajelzés"});
        }
    }

    cancelButton(){
        let { history } = this.context.router;
        history.goBack();
        ReactGA.event({ category: 'UI', action: 'Click', label: 'Cancel feedback button click' });
    }

    searchFor(event){
        const string = event.target.value;
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

        searchedUsers = this.utils.sortUsers(searchedUsers);


        this.userList = (<UserListContainer users={searchedUsers} handleUserClick={this.handleUserClick}/>);
        this.setState({users: searchedUsers});
    }

    createPost(){
        this.setState({buttonDisabled:true});
        const { route } = this.context.router;
        if (this.state.message  && this.state.user) {
            const flags = [];
            if (this.state.anonimity === true) {
                flags.push(Constants.FeedbackPrivacy.ANONYMOUS);
            }

            const feedback = JSON.stringify({
                'senderId': this.userId,
                'recipientId': this.state.user,
                'message': this.state.message,
                'type': this.state.type,
                'privacy': flags,
                //temp fix
                'requestId': route.location.state && route.location.state.fromRequest ? route.location.state.fromRequest._id : "",
                'tags': this.state.selectedTags
            });
            ReactGA.event({ category: 'Server', action: 'Post', label: 'Upload Feedback' });
            const {currentUser} = this.store.getState();
            const orgId = currentUser.orgId;
            Api.postFeedback(feedback, orgId)
                .then(() => {
                    const { history } = this.context.router;
                    const notification = {
                        isActive: true,
                        message: strings['uiMessage_feedbackSentSuccess_title'],
                        userId: 'CreateFeedbackOK'
                    };
                    ReactGA.event({ category: 'Status', action: 'Success', label: 'Upload Feedback' });
                    console.log("testing file");
                    this.addNotification(notification);
                    history.goBack();
                    this.setState({buttonDisabled:false});
                })
                .catch(() => {
                    const { history } = this.context.router;
                    const notification = {
                        isActive: true,
                        message: strings['uiMessage_feedbackErrorAlert_description'],
                        userId: 'NoCreateFeedback'
                    };
                    ReactGA.event({ category: 'Status', action: 'Failure', label: 'Upload Feedback' });
                    this.addNotification(notification);
                    history.goBack();
                    this.setState({buttonDisabled:false});
                });
        }
    }

    createComponent(){
        if (this.state.page === 0) {
            let groupTitle = "Nincs találat";
            if (this.state.users.length === this.users.length) {
                groupTitle = "Mindenki";
            }else if (this.state.users.length > 0 && this.state.users.length < this.users.length){
                groupTitle = "Találatok";
            }

            this.userList = (<UserListContainer users={this.state.users} handleUserClick={this.handleUserClick}/>);

            return userList({userList:this.userList, searchFor:this.searchFor, groupTitle});
        }else{
            let recipient, feedbackUser, requestMessage;
            if (this.state.fromRequest) {
                requestMessage = requestMessageComponent({requestMessage:this.state.fromRequest.requestMessage});
                recipient = this.users.find((element) => {
                    return element._id === this.state.fromRequest.senderId;
                });
                feedbackUser = (
                    <UserCellContainer
                        user={recipient}
                        customClass="userCell-container-no-hover"
                    />);
            }else{
                recipient = this.users.find((element) => {
                    return element._id === this.state.user;
                });

                feedbackUser = (<UserCellContainer user={recipient}/>);
            }

            const feedbackType = feedbackTypeComponent({recipient,
                type:this.state.type,
                handleFeedbackType:this.handleFeedbackType
            });
            let bottomPart;
            if ((this.state.message.length > 4 && this.state.type) || this.state.ready) {
                bottomPart = bottomContainer({tags:this.state.tags,
                    selectedTags:this.state.selectedTags,
                    handleFeedbackTags:this.handleFeedbackTags,
                    handleCheckBox:this.handleCheckBox,
                    message:this.state.message,
                    type:this.state.type,
                    nextButton:this.nextButton,
                    disabled:this.state.buttonDisabled,
                    recipient});
            }else{
                bottomPart = undefined;
            }
            return createFeedbackUI({feedbackUser, requestMessage, feedbackType, bottomPart,
                message:this.state.message,
                handleFeedbackMessage:this.handleFeedbackMessage});
        }
    }

    componentWillMount(){
        const { route } = this.context.router;
        let request;
        if (route.location.hasOwnProperty('state')) {
            let{ fromRequest } = route.location.state;
            request = fromRequest;
        }else{
            request = undefined;
        }
        this.setState({user: request ? request.senderId : undefined, page: request ? 1 : 0, fromRequest: request});
        ReactGA.event({
            category: 'UI',
            action: 'Click',
            label: request ? 'Create new feedback: Request card' : 'Create new feedback button'
        });
    }

    componentDidMount(){
        const {currentUser} = this.store.getState();
        const orgId = currentUser.orgId;
        Api.users(orgId)
            .then((response) => {
                const searchedUsers = Utils().sortUsers(response).filter((element) => {
                    return element._id !== this.userId;
                });
                this.users = searchedUsers;
                this.setState({users: searchedUsers});
            })
            .catch((error) => { console.log(error.message)});
        Api.tags(orgId)
            .then((response) => { this.setState({tags: response}) })
            .catch((error) => { console.log(error.message) });
    }

    componentWillUpdate(nextProps, nextState){
        if (!this.userId) {
            alert('You were disconnected from your account due to multiple users connected at the same time in the browser!');
            this.props.handleLogout();
        }
    }

    render() {
        if (this.users && this.users.length > 0) {
            const components = this.createComponent();
            return CreateFeedback({
                createPost:this.createPost,
                components,
                title:this.state.title,
                backButton:createBackButton(this.cancelButton, undefined),
                cancelButton:this.cancelButton});
        } else {
            return spinner();
        }
    }

}

CreateFeedbackContainer.propTypes = {
    addNotification: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired
};

CreateFeedbackContainer.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object.isRequired
};

export default CreateFeedbackContainer;
