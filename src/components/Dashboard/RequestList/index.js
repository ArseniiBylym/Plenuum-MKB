import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Api from '../../../lib/api';
// import { ReducersActionType } from '../../../lib/constants.js'
import RequestCardContainer from './RequestCard/index.js';
import TodoCardContainer from './TodoCard/index.js';
import SurveyCardContainer from './SurveyCard/index.js'
import RequestList from './RequestList.js';
import EmptyStateContainer from '../../EmptyState/index.js';
import {spinner} from "../../Commons/Spinner/spinner";
import { connect } from 'react-redux';

import { NotificationStack } from 'react-notification';

class RequestListContainer extends Component {

    constructor(props, context){
        super(props);
        this.store = context.store;

        this.state = {
            requestsAndTodos:undefined,
            users:undefined
        };
    }


    componentDidMount(){
        const { currentUser } = this.store.getState();
        if (currentUser) {
            const orgId = currentUser.orgId;

            Api.users(orgId)
                .then((response) => { this.setState({users: response}) })
                .catch((error) => { console.log(error) });
            Api.todosAndRequests(orgId)
                .then((response) => {
                    let all = response.requests.concat( response.compassTodo );
                    if ( all.length > 0 || response.surveysTodo.length > 0 ) {
                        const sorted = all.sort(function(a, b) {
                            return new Date(b.updatedAt) - new Date(a.updatedAt)
                        });
                        const interactCards = response.surveysTodo.concat( sorted );
                        this.setState({ requestsAndTodos: interactCards });
                    }else{
                        this.setState({requestsAndTodos: []});
                    }
                })
                .catch((error) => { console.log(error) });
        }
        this.setState({spinner:false})
    }

    creareSurveyComponents(surveys){
        return surveys.map((survey) => {
            return SurveyCardContainer({
                key: survey._id,
                title: survey.survey.title,
                survey,
            })
        })
    }

    createRequestAndTodosComponents( incoming_surveys, users ){
        return incoming_surveys.map((object, index) => {
            if ( object ) {
                if( object.questions ){
                    return SurveyCardContainer({
                        key:object._id,
                        title:object.title,
                        survey:object,
                        index: index
                    })
                }

                else if ( object.about !== undefined && users ) {
                    const aboutUser = users.find((element) => {
                        return element._id === object.about;
                    });

                    return TodoCardContainer({
                        key:object._id,
                        todo:object,
                        aboutUser});
                }

                else if ( object.senderId && users ) {

                    const user = users.find((element) => {
                        return element._id === object.senderId
                    });

                    if ( user ) {
                        return RequestCardContainer({
                            key:object._id,
                            request:object,
                            user});
                    }
                }
            }
        });
    }

    // createRequestAndTodosComponents( requestsAndTodos, users ){
    //     return requestsAndTodos.map((object) => {
    //         if ( object ) {
    //             if( object.survey ){
    //                 return SurveyCardContainer({
    //                     key:object._id,
    //                     title:object.survey.title,
    //                     survey:object
    //                 })
    //             }

    //             else if ( object.about !== undefined && users ) {
    //                 const aboutUser = users.find((element) => {
    //                     return element._id === object.about;
    //                 });

    //                 return TodoCardContainer({
    //                     key:object._id,
    //                     todo:object,
    //                     aboutUser});
    //             }

    //             else if ( object.senderId && users ) {

    //                 const user = users.find((element) => {
    //                     return element._id === object.senderId
    //                 });

    //                 if ( user ) {
    //                     return RequestCardContainer({
    //                         key:object._id,
    //                         request:object,
    //                         user});
    //                 }
    //             }
    //         }
    //     });
    // }

    notification = ( mes, col ) => (
        <NotificationStack
            barStyleFactory={ (index, style) => Object.assign(
                {},
                style,
                {
                    bottom: `${2 + (index * 5)}rem`,
                    left: 'auto',
                    right: '-100%',
                    backgroundColor: "#06d6a0",
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
                    backgroundColor: "#06d6a0"
                }
            )}
            notifications={ [{
                message:mes,
                className: "notification-style",
                style: true,
                backgroundColor: "#555",
                dismissAfter: 3000,
                onClick: () => { this.store.dispatch({ type:"HIDE_MESSAGE", message:"", color:"" }) }
            }] }
            onDismiss={ () => { this.store.dispatch({ type:"HIDE_MESSAGE", message:"", color:"" }) } }
            key={ col }
        />
    );

    render(){
        const { notificationState } = this.store.getState();

        const { requestsAndTodos, users } = this.state;
        
        const {incoming_surveys} = this.props;
        if(!incoming_surveys) return null;
        
        const { location } = this.context.router.route;

        // if ( requestsAndTodos.length && users !== undefined ) {  !!!!!!!!!!!!! It was already comited

        if ( incoming_surveys ) {

            if (incoming_surveys.length === 0 ) {
                return (
                    <EmptyStateContainer
                        {...this.props}
                        {...this.context}
                        container={location.pathname}
                    />
                );
            }

            const requestsCards = this.createRequestAndTodosComponents( incoming_surveys, users );

            return RequestList({
                requestsAndTodos:requestsCards,
                title:"Interact",
                showMessage:notificationState.showMessage,
                notification:this.notification.bind(this),
                mes:notificationState.message,
                col:notificationState.color
            });

        }else{
            return spinner();
        }
        // if ( requestsAndTodos ) {

        //     if (requestsAndTodos.length === 0 ) {
        //         return (
        //             <EmptyStateContainer
        //                 {...this.props}
        //                 {...this.context}
        //                 container={location.pathname}
        //             />
        //         );
        //     }

        //     const requestsCards = this.createRequestAndTodosComponents( requestsAndTodos, users );

        //     return RequestList({
        //         requestsAndTodos:requestsCards,
        //         title:"Interact",
        //         showMessage:notificationState.showMessage,
        //         notification:this.notification.bind(this),
        //         mes:notificationState.message,
        //         col:notificationState.color
        //     });

        // }else{
        //     return spinner();
        // }
    }
}

RequestListContainer.contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
};

const mapStateToProps = state => {
    return {
        incoming_surveys: state.incomingSurveys.list
    }
}

export default connect(mapStateToProps, null)(RequestListContainer);
