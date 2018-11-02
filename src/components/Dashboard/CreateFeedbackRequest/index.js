import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserListContainer from '../Commons/UserList/index.js';
import Api from '../../../lib/api.js';
import {EnvVariable} from '../../../config';
import CreateFeedbackRequest, {userComponent, messageComponent} from './CreateFeedbackRequest.js';
import SelectedUserContainer from './SelectedUser/index.js';
import {Utils} from '../../../lib/utils';
import {createBackButton} from '../Commons/DefaultNavigationBar/index.js';
import {spinner} from "../../Commons/Spinner/spinner";
import LocalizedStrings from 'react-localization';
const myLocalization = require('../../../resources/Strings.json');
const strings = new LocalizedStrings(myLocalization);

const ReactGA = require('react-ga');

ReactGA.initialize(EnvVariable.googleAnalyticsId);

class CreateFeedbackRequestContainer extends Component {

    constructor(props, context){
        super(props);
        ReactGA.event({
            category: 'UI',
            action: 'Click',
            label: 'Create new request button'
        });
        this.store = context.store;
        const { currentUser } = this.store.getState();
        this.currentUser = currentUser;
        this.userId = currentUser._id;
        this.utils = Utils();
        this.state = {
            page: 0,
            search: "",
            // users: undefined,
            selectedUsers: [],
            message: "",
            title: "New Request",
            searchQuery:"",
            buttonDisabled:false
        };

        this.handleUserClick = this.handleUserClick.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.createComponents = this.createComponents.bind(this);
        this.cancelButton = this.cancelButton.bind(this);
        this.nextButton = this.nextButton.bind(this);
        this.createPost = this.createPost.bind(this);
        this.handleRequestMessage = this.handleRequestMessage.bind(this);
        this.searchFor = this.searchFor.bind(this);
    }

    handleRequestMessage(e){
        this.setState({ message: e.target.value });
    }

    handleUserClick(user){
        
        if(this.props.showOnlyOneUser) { // This case is for My Team flow only
            this.props.returnSelectedUserProfile(user); //method from MyTeam component
            return;
        }

        var selectedUsers = this.state.selectedUsers;
        var newUsers = this.state.users;
        selectedUsers.push(user);
        this.utils.sortUsers(newUsers);
        this.utils.sortUsers(selectedUsers);
        var result = this.removeSelectedUsers(newUsers, selectedUsers);
        this.setState({ users: result, selectedUsers: selectedUsers })
    }

    removeUser(user){
        var selectedUsers = this.state.selectedUsers;
        var newUsers = this.state.users;
        var index = selectedUsers.indexOf(user);
        if (index > -1) {
            selectedUsers.splice(index, 1);
        }
        newUsers.push(user);
        this.utils.sortUsers(newUsers);
        this.utils.sortUsers(selectedUsers);
        this.setState({ users: newUsers, selectedUsers: selectedUsers})
    }

    searchFor(e){
       
            var string = e.target.value;
            var searchedUsers = this.users.filter((element) => {
                return element._id !== this.userId
                    && !this.state.selectedUsers.find((e) =>{
                        return e._id === element._id
                    });
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
    
            this.userList = (<UserListContainer users={searchedUsers} handleUserClick={this.handleUserClick} />);
            this.setState({users: searchedUsers,
                searchQuery:string});
        
       

    }

    removeSelectedUsers(array, selected){
        return array.filter((element) => {
            for (var index in selected) {
                if (element._id === selected[index]._id) {
                    return false;
                }
            }
            return true;
        });
    }

    nextButton(){
        if (this.state.page === 0 && this.state.selectedUsers && this.state.selectedUsers.length > 0) {
            ReactGA.event({
                category: 'UI',
                action: 'Click',
                label: 'New Request: Next button'
            });
            this.setState({page: 1});
        }else{
            if (this.state.selectedUsers && this.state.selectedUsers.length > 0 && this.state.message.length > 4) {
                ReactGA.event({
                    category: 'UI',
                    action: 'Click',
                    label: 'Send Request button'
                });
                this.createPost();
            }
        }
    }

    cancelButton(){
        let { history } = this.context.router;
        history.goBack();
        ReactGA.event({
            category: 'UI',
            action: 'Click',
            label: 'Cancel request button click'
        });
    }

    createPost(){
        if (this.state.message && this.state.selectedUsers && this.state.selectedUsers !== []) {
            this.setState({buttonDisabled:true});
            const recipientIds = [];
            for (let index in this.state.selectedUsers) {
                recipientIds.push(this.state.selectedUsers[index]._id);
            }

            const feedbackRequest = JSON.stringify({
                'recipientId': recipientIds,
                'requestMessage': this.state.message
            });
            ReactGA.event({
                category: 'Server',
                action: 'Post',
                label: 'Upload Request'
            });
            const orgId = this.currentUser.orgId;
            Api.postFeedbackRequest(feedbackRequest, orgId)
                .then(() => {
                    const { history } = this.context.router;
                    ReactGA.event({ category: 'Status', action: 'Success', label: 'Upload Request'});
                    const notification = {
                        isActive: true,
                        message: strings['uiMessage_requestSentSuccess_title'],
                        userId: 'CreateRequestOK'
                    };
                    this.addNotification(notification);
                    history.goBack();
                    this.setState({buttonDisabled:false});
                })
                .catch((error) => {
                    ReactGA.event({category: 'Status', action: 'Failure', label: 'Upload Request'});
                    const notification = {
                        isActive: true,
                        message: strings['uiMessage_requestErrorAlert_description'],
                        userId: 'NoCreateRequest'
                    };
                    this.addNotification(notification);
                    history.goBack();
                    this.setState({buttonDisabled:false});
                });
        }
    }

    createComponents(create, users){
        if (this.state.selectedUsers && this.state.selectedUsers.length > 0) {
            this.selectedUsers = (
                <div className="selected-users-request-feedback">
                    <UserListContainer
                        users={this.state.selectedUsers}
                        containerCell={SelectedUserContainer}
                        handleUserClick={this.removeUser}
                        myStyle="selectedUsers-horizontal"
                        useHover={true}
                    />
                </div>
            );
        }else{
            this.selectedUsers = undefined;
        }

        if (this.state.page === 0) {
            let groupTitle = "Nincs találat";
            if ((this.state.searchQuery === "") || this.state.users.length === this.users.length) {
                groupTitle = "Mindenki";
            }else if (this.state.users.length > 0 && this.state.users.length < this.users.length){
                groupTitle = "Találatok";
            }
            this.userList = (<UserListContainer users={this.state.users} handleUserClick={this.handleUserClick} accessory={true}/>);
            this.components = userComponent({selectedUsers:this.selectedUsers,
                groupTitle,
                userList:this.userList,
                searchFor:this.searchFor,
                search:this.state.search});
        }else{
            this.components = messageComponent({message:this.state.message,
                selectedUsers:this.selectedUsers,
                handleRequestMessage:this.handleRequestMessage});
        }
    }

    componentWillMount(){
        this.addNotification = this.props.addNotification;
    }

    componentDidMount(){
        // console.log(this.props.usersList)
        if(this.props.usersList){
            // console.log('sdf')

            const searchedUsers = Utils().sortUsers(this.props.usersList).filter((element) => {
                return element._id !== this.userId;
            });
            this.users = searchedUsers;
            
            if(this.props.returnUsersToMyTeamFlow) {           // Only for MyTeam flow to select first user in array
                this.props.returnUsersToMyTeamFlow(this.props.usersList[0])    // 
            }  

            this.setState({
                users: searchedUsers
            })
            // this.setState({
            //     users: this.props.usersList
            // })

            return
            //create some another Api request to get user's direct reports
        } else {
            
            const orgId = this.currentUser.orgId;
            Api.users(orgId)
            .then((response) => {
                const searchedUsers = Utils().sortUsers(response).filter((element) => {
                    return element._id !== this.userId;
                });
                this.users = searchedUsers;
                
                if(this.props.returnUsersToMyTeamFlow) {           // Only for MyTeam flow to select first user in array
                    this.props.returnUsersToMyTeamFlow(searchedUsers[0])    // 
                }                                                //
                
                this.setState({users: searchedUsers});
            })
            .catch((error) => { console.log(error.message) });
        }
    }
    componentDidUpdate = () => {
        if(this.props.addUsersToCurrentList) {
            let selectedUsersArr = this.state.selectedUsers.slice()
            this.props.addUsersToCurrentList(selectedUsersArr)
        }
    }

    componentWillUpdate(nextProps, nextState){
        if (!this.userId) {
            alert('You were disconnected from your account due to multiple users connected at the same time in the browser!');
            this.props.handleLogout();
        }
    }

    render(){
        let button;
        if (this.state.page === 0) {
            button = {
                handler: this.nextButton,
                classSytle: this.state.selectedUsers.length > 0 ? "button-next-enable" : "button-next-disabled" ,
                title: "Következő"
            }
        }else{
            button = {
                handler: this.nextButton,
                classSytle: this.state.selectedUsers.length > 0 && this.state.message.length > 4 ? "button-create-feedback-enable margin-top-1" : "button-create-feedback-disabled margin-top-1" ,
                title: "Elküldés"
            }
        }
        // console.log(this.state)
        // if (this.state.users && this.state.users.length > 0) {
        if (this.state.users) {
            // console.log('sdfsdfdsfdsf')
            this.createComponents();
            return CreateFeedbackRequest({
                cancelButton:createBackButton(this.cancelButton, undefined),
                title:strings['requestFeedback_web_title'],
                button,
                components:this.components});
        }else{
            // console.log('spinner')
            return spinner();
        }
    }
}

CreateFeedbackRequestContainer.propTypes = {
    addNotification: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired
};

CreateFeedbackRequestContainer.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object.isRequired
};


export default CreateFeedbackRequestContainer;
