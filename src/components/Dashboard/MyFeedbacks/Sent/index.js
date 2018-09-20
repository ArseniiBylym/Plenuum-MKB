import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Utils} from '../../../../lib/utils'
import MyFeedbacks from './MyFeedbacks.js';
import SentRequestListContainer from '../Request/index.js';
import FeedbackListContainer from '../Commons/FeedbackList/index.js';
import FeedbackDetailContainer from '../../FeedbackDetail/index.js';
import Api from '../../../../lib/api.js';
import {EnvVariable} from '../../../../config';
import EmptyStateContainer from '../../../EmptyState/index.js';
import Constants from '../../../../lib/constants';
import {spinner} from "../../../Commons/Spinner/spinner";

const ReactGA = require('react-ga');

ReactGA.initialize(EnvVariable.googleAnalyticsId);

class MyFeedbacksContainer extends Component {
    constructor(props, context){
        super(props);
        this.store = context.store;
        this.utils = Utils();
        this.getInitialState = this.getInitialState.bind(this);
        this.state = this.getInitialState();
        this.feedbackClicked = this.feedbackClicked.bind(this);
        this.createComponents = this.createComponents.bind(this);
        this.requestClicked = this.requestClicked.bind(this);
        this.handleFeedbacksResponse = this.handleFeedbacksResponse.bind(this);
        this.getSource = this.getSource.bind(this);
    }

    getInitialState(){
        return {
            page: 0,
            feedbacks: undefined,
            type: undefined,
            feedback: undefined,
            request: undefined,
            users: undefined,
            selectedUser: undefined,
            searchQuery: undefined,
            feedbackDetail: undefined
        }
    }

    getSource(option){
        const { currentUser } = this.store.getState();
        const orgId = currentUser.orgId;
        switch (option) {
            case 1:
                Api.feedbacks(false, orgId)
                    .then((response) => { this.handleFeedbacksResponse(response) })
                    .catch((error) => { console.log(error.message) });
                break;
            case 2:
                Api.sentRequests(orgId)
                    .then((response) => {
                        let sortedResponse = this.utils.sortArray(response);
                        if (this.state.selectedUser){
                            sortedResponse = sortedResponse.filter((request) => {
                                return request.recipientId.includes(this.state.selectedUser._id);
                            });
                        }

                        if (this.state.searchQuery){
                            sortedResponse = sortedResponse.filter((request) => {
                                return request.requestMessage.toLowerCase().includes(
                                    this.state.searchQuery.toLowerCase()
                                );
                            });
                        }

                        this.setState({feedbacks: sortedResponse, isLoading:false});
                    })
                    .catch((error) => { console.log(error.message) });
                break;
            default:
                Api.feedbacks(true, orgId)
                    .then((response) => { this.handleFeedbacksResponse(response) })
                    .catch((error) => { console.log(error.message) });
        }
    }

    handleFeedbacksResponse(response){
        const { route } = this.context.router;
        let sortedResponse = this.utils.sortArray(response);
        if (this.resolve !== undefined) {
            const myResolve = this.resolve;
            myResolve(response);
        }else{
            let pathname = route.location.pathname;
            if (this.state.selectedUser) {
                sortedResponse = sortedResponse.filter((element) => {
                    return element[
                        pathname === Constants.Route.FEEDBACK_INCOMING ? 'senderId' : 'recipientId'
                        ] === this.state.selectedUser._id && !element.privacy.includes(Constants.FeedbackPrivacy.ANONYMOUS);
                });
                sortedResponse = sortedResponse.filter((request) => {
                    return request.privacy.includes(Constants.FeedbackPrivacy.ANONYMOUS) === false;
                });
            }

            if (this.state.searchQuery){
                sortedResponse = sortedResponse.filter((element) => {
                    return element.message.toLowerCase().includes(
                        this.state.searchQuery.toLowerCase()
                    );
                });
            }

            this.setState({feedbacks: sortedResponse,
                isLoading:false});
        }
    }

    //Handlers
    feedbackClicked(feedback){
        ReactGA.event({
            category: 'UI',
            action: 'Click',
            label: 'Feedback card click'
        });
        const { feedbacks, users } = this.state;
        this.superFeedbackClick(feedback, feedbacks, users);
    }

    requestClicked(request){
        ReactGA.event({
            category: 'UI',
            action: 'Click',
            label: 'Request card click'
        });
        let requestPromise = new Promise((resolve) => {
            this.resolve = resolve;
            this.getSource(0);
        });

        requestPromise.then((response) => {
            let feedbacksOfRequest = response.filter((element) => {
                return element.requestId === request._id;
            });
            let sortedFeedbacks = this.utils.sortArray(feedbacksOfRequest);

            if (sortedFeedbacks.length > 0) {
                this.superFeedbackClick(sortedFeedbacks[0], sortedFeedbacks, this.state.users);
            }else{
                const notification =  {
                    isActive: true,
                    message: "There is no response for this request yet!",
                    userId: request._id
                }
                this.addNotification(notification);
            }
            this.resolve = undefined;
        });
    }

    //Create components
    createComponents(){
        const { feedbacks, users, page } = this.state;
        const { route } = this.context.router;
        if (feedbacks && users) {
            if (route.location.pathname === Constants.Route.SENT_REQUESTS
                && page !== 2) {
                this.component = (
                    <SentRequestListContainer
                        requests={feedbacks}
                        requestClicked={this.requestClicked}
                        users={users}
                    />);
                return;
            }
            this.component = (
                <FeedbackListContainer
                    feedbacks={feedbacks}
                    feedbackClicked={this.feedbackClicked}
                />);

        }
    }

    componentDidMount(){
        const { currentUser } = this.store.getState();
        const orgId = currentUser.orgId;
        Api.users(orgId)
            .then((response) => { this.setState({users: response}) })
            .catch((error) => { console.log(error.message) });
    }

    componentWillMount(){
        const { route } = this.context.router;
        this.addNotification = this.props.addNotification;
        this.superFeedbackClick = this.props.feedbackClicked
        this.setState({selectedUser: this.props.selectedUser});
        const { pathname } = route.location;
        switch (pathname) {
            case Constants.Route.FEEDBACK_INCOMING:
                this.getSource(0);
                break;
            case Constants.Route.FEEDBACK_SENT:
                this.getSource(1);
                break;
            default:
                this.getSource(2);
        }
    }

    componentWillReceiveProps(nextProps){
        const { route, history } = this.context.router;
        this.addNotification = this.props.addNotification;
        this.superFeedbackClick = this.props.feedbackClicked
        const oldPathname = route.location.pathname;
        let pathname = oldPathname;
        if (history.action === "PUSH") {
            pathname = history.location.pathname;
        }

        if (oldPathname !== pathname
            || nextProps.selectedUser !== this.props.selectedUser
            || this.state.searchQuery !== nextProps.searchQuery) {
            const selectedUser = nextProps.selectedUser ?
                nextProps.selectedUser : undefined;
            this.setState({
                selectedUser: selectedUser,
                searchQuery: nextProps.searchQuery,
                feedbacks: oldPathname !== pathname ? undefined : this.state.feedbacks,
                isLoading: nextProps.isLoading
            });
            switch (pathname) {
                case Constants.Route.FEEDBACK_INCOMING:
                    this.getSource(0);
                    break;
                case Constants.Route.FEEDBACK_SENT:
                    this.getSource(1);
                    break;
                default:
                    this.getSource(2);
            }
        }
    }

    render(){
        const { feedbacks, users, searchQuery, feedbackDetail, isLoading } = this.state;
        const { route } = this.context.router;
        if (isLoading) {
            return spinner();
        } else if (feedbacks && users) {
            if (feedbacks.length <= 0) {
                return (<EmptyStateContainer
                    {...this.props}
                    {...this.context}
                    container={route.location.pathname}
                    isSearch={searchQuery !== undefined}
                />);
            }
            if (feedbackDetail) {
                return (
                    <FeedbackDetailContainer detail={feedbackDetail}/>
                );
            }

            this.createComponents();
            return MyFeedbacks({component:this.component});
        }else{
            return spinner();
        }
    }
}

MyFeedbacksContainer.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object
};

MyFeedbacksContainer.propTypes = {
    addNotification: PropTypes.func.isRequired,
    selectedUser: PropTypes.object
};

export default MyFeedbacksContainer;
