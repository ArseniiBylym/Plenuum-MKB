import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MyContent, {filterComponent, overlayComponent, searchUsersComponent, searchButtonComponent, selectedSearchButtonComponent} from './MyContent.js';
import SegmentedContainer from '../Commons/SegmentedControl/index.js';
import SearchContainer from '../Commons/Search/index.js';
import Api from '../../../lib/api.js';
import {EnvVariable} from '../../../config';
import {Utils} from '../../../lib/utils';
import UserListContainer from '../Commons/UserList/index.js';
import FeedbackDetailContainer from '../FeedbackDetail/index.js';
import {Redirect, Route, Switch} from 'react-router-dom';
import MyFeedbacksContainer from "./Sent/index";
import Constants from "../../../lib/constants";

const UsersIcon = require('../../../resources/profile.svg');
// const SearchIcon = require('../../../resources/ic-search-blue.svg');
const SearchIcon = require('../../../resources/search-active-mkb.svg');
const ReactGA = require('react-ga');

ReactGA.initialize(EnvVariable.googleAnalyticsId);

const passProps = (feedbackClicked, selectedUser, handleLogout, searchQuery, isLoading, addNotification) => {
    return (
        <MyFeedbacksContainer
            feedbackClicked={feedbackClicked}
            selectedUser={selectedUser}
            handleLogout={handleLogout}
            searchQuery={searchQuery}
            isLoading={isLoading}
            addNotification={addNotification}
        />
    )
};


class MyContentContainer extends Component {

    constructor(props, context) {
        super(props);

        this.utils = Utils();
        this.store = context.store;
        this.state = {
            searchPage: false,
            users: undefined,
            searchedUsers: undefined,
            selectedUser: undefined,
            searchButtonClicked: false,
            query: undefined,
            feedbackDetail: undefined,
            isLoading: undefined
        };

        this.openSearch = this.openSearch.bind(this);
        this.showSearchInput = this.showSearchInput.bind(this);
        this.handleUserClick = this.handleUserClick.bind(this);
        this.searchFor = this.searchFor.bind(this);
        this.searchWithText = this.searchWithText.bind(this);
        this.cancelQuery = this.cancelQuery.bind(this);
        this.feedbackClicked = this.feedbackClicked.bind(this);
        this.store = context.store;
    }

    handleUserClick(user) {
        this.store.dispatch({
            type: Constants.ReducersActionType.ADD_SELECTED_USER,
            selectedUser: user
        });
        this.setState({
            searchPage: !this.state.searchPage,
            selectedUser: this.state.searchPage ? undefined : this.state.searchPage,
            isLoading:false
        });
        this.searchFor(this.state.searchPage ? undefined : undefined);
    }

    openSearch() {
        if (!this.state.searchPage) {
            ReactGA.event({
                category: 'UI',
                action: 'Click',
                label: 'Filter button'
            });
        }
        this.setState({
            searchPage: !this.state.searchPage,
            selectedUser: this.state.searchPage ? undefined : this.state.searchPage
        });
        this.searchFor(this.state.searchPage ? undefined : undefined);
    }

    showSearchInput(){
        if (!this.state.searchButtonClicked) {
            ReactGA.event({
                category: 'UI',
                action: 'Click',
                label: 'Search button'
            });
        }
        this.setState({
            searchButtonClicked: !this.state.searchButtonClicked,
            query: this.state.searchButtonClicked ? undefined : this.state.query,
            isLoading:this.state.searchButtonClicked ? !this.state.searchPage : false
        })
    }

    cancelQuery() {
        this.store.dispatch({type: Constants.ReducersActionType.REMOVE_SELECTED_USER});
        this.setState({selectedUser: undefined});
    }

    searchWithText(e){
        this.setState({
            query: e.target.value
        });
    }

    searchFor(event) {
        const { currentUser } = this.store.getState();
        const string = event ? event.target.value : "";
        const {users} = this.state;
        let resultUsers = users.filter((element) => {
            return element._id !== currentUser._id;
        }).filter((element) => {
          let strings = string.replace(/\s/g, '');

          let fullName = element.firstName.replace(/\s/g, '') + '' + element.lastName.replace(/\s/g, '');
          let nameFull = element.lastName.replace(/\s/g, '') + '' + element.firstName.replace(/\s/g, '');
          
          return fullName.toLowerCase().includes(strings.toLowerCase())
          || nameFull.toLowerCase().includes(strings.toLowerCase());
        });

        resultUsers = this.utils.sortUsers(resultUsers);
        this.setState({searchedUsers: resultUsers});
    }

    feedbackClicked(feedback, feedbacks, users){
        const { route } = this.context.router;
        if (!feedback) {
            this.setState({feedbackDetail: undefined})
        }else{
            let type = 0;
            if (route.location.pathname === Constants.Route.FEEDBACK_SENT) {
                type = 1;
            }else if (route.location.pathname === Constants.Route.SENT_REQUESTS) {
                type = 2;
            }

            this.setState({
                feedbackDetail: {
                    feedbacks: feedbacks,
                    feedback: feedback,
                    users: users,
                    type: type
                }
            })
        }
    }

    createComponents() {
        const segmentedControl = (
            <SegmentedContainer
                options={
                    [{path: Constants.Route.FEEDBACK_INCOMING, title: 'Beérkező'},
                        {path: Constants.Route.FEEDBACK_SENT, title: 'Elküldött'},
                        {path: Constants.Route.SENT_REQUESTS, title: 'Visszaj. kéréseid'}]
                }
            />);

        const {
            searchPage,
            users,
            searchedUsers,
            searchButtonClicked
        } = this.state;
        let searchButton, groupTitle, searchUsers = undefined, overlay = undefined;
        if (searchButtonClicked){
            const search = (<SearchContainer
                searchFor={this.searchWithText.bind(this)}
                customClass='filter-by-content'
                image={SearchIcon}
            />);
            searchButton = selectedSearchButtonComponent({search,
            showSearchInput:this.showSearchInput,
            });
        }else{
            searchButton = searchButtonComponent({showSearchInput:this.showSearchInput});
        }

        if (searchPage && users) {
            if (searchedUsers.length - 1 === users.length - 1) {
                groupTitle = "Mindenki";
            } else if (searchedUsers.length > 0 && searchedUsers.length < users.length - 1) {
                groupTitle = "Találatok";
            } else {
                groupTitle = "Nincs találat";
            }

            const userList = (<UserListContainer
                users={searchedUsers}
                handleUserClick={this.handleUserClick}/>);
            const search = (<SearchContainer
                searchFor={this.searchFor}
                customClass='filter-users-myfeedbacks'
            />);
            searchUsers = searchUsersComponent({openSearch:this.openSearch,
                search,
                groupTitle,
                userList
            });
            overlay = overlayComponent();
        }
        const selectedUser = this.store.getState().filterByUser.selectedUser;
        let filter = undefined;
        if (selectedUser) {
            filter = filterComponent({ name:"" + selectedUser.firstName + " " + selectedUser.lastName,
            cancelQuery:this.cancelQuery});
        }

        return { segmentedControl, searchButton, searchUsers, filter, overlay };
    }

    componentDidMount() {
        const { currentUser } = this.store.getState();
        if ( currentUser ) {
            const orgId = currentUser.orgId;
            Api.users(orgId)
                .then((response) => {
                    const usersExceptMe = response.filter((element) => {
                        return element._id !== currentUser._id;
                    });
                    this.setState({
                        users: this.utils.sortUsers(usersExceptMe),
                        searchedUsers: this.utils.sortUsers(usersExceptMe)
                    });
                })
                .catch((error) => { console.log(error.message) });
        }
    }

    render() {
        const {
            segmentedControl,
            searchButton,
            searchUsers,
            filter,
            overlay
        } = this.createComponents();
        const searchUsersObject = {
            openSearch: this.openSearch,
            icon: UsersIcon,
            cancelQuery: this.cancelQuery
        };

        if (this.state.feedbackDetail) {
            return (<FeedbackDetailContainer
                detail={this.state.feedbackDetail}
                feedbackClicked={this.feedbackClicked}
            />)
        }

        //TODO: //Refactor this
        const routes = (
            <Switch>
              <Route exact path={Constants.Route.FEEDBACK_SENT} render={ (props) => (passProps(
                  this.feedbackClicked,
                  this.store.getState().filterByUser.selectedUser,
                  this.props.handleLogout,
                  this.state.query,
                  this.state.isLoading,
                  this.props.addNotification
              ))} />
              <Route exact path={Constants.Route.SENT_REQUESTS} render={ (props) => (passProps(
                  this.feedbackClicked,
                  this.store.getState().filterByUser.selectedUser,
                  this.props.handleLogout,
                  this.state.query,
                  this.state.isLoading,
                  this.props.addNotification
              ))} />
              <Route exact path={Constants.Route.FEEDBACK_INCOMING} render={ (props) => (passProps(
                  this.feedbackClicked,
                  this.store.getState().filterByUser.selectedUser,
                  this.props.handleLogout,
                  this.state.query,
                  this.state.isLoading,
                  this.props.addNotification
              ))} />
              <Redirect exact from={Constants.Route.FEEDBACK} to={Constants.Route.FEEDBACK_INCOMING}/>
              <Redirect from='*' to={Constants.Route.NOT_FOUND} />
            </Switch>

        );

        return MyContent({
            segmentedControl,
            searchButton,
            children:routes,
            searchPage:{
                overlay:overlay,
                searchUsers: searchUsers
            },
            filter,
            searchUsers:searchUsersObject});
    }
}

MyContentContainer.contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

MyContentContainer.propTypes = {
    addNotification: PropTypes.func.isRequired
};

export default MyContentContainer;
