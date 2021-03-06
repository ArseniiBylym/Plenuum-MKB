import _ from 'lodash';

import {combineReducers} from 'redux';
import Constants from "../lib/constants";

/*
  This file might have change to manage states in a local store
*/

//Used in MyContent
const filterByUser = (state = {selectedUser: undefined}, action) => {
    switch (action.type) {
        case Constants.ReducersActionType.ADD_SELECTED_USER:
            return {
                selectedUser: action.selectedUser
            };
        case Constants.ReducersActionType.REMOVE_SELECTED_USER:
            return {
                selectedUser: undefined
            };
        default:
            return state;
    }
};

//For Survey
const surveysState = (state = { Items: [] }, action) => {
    let surveys;
    switch(action.type) {
        case Constants.ReducersActionType.POPULATE_SURVEYS:
            surveys = _.unionBy(state.Items, action.surveys, item => item._id)

            return {
                ...state,
                Items: action.surveys
            }
        default:
            return state
    }
}
// Notigication State
const notificationState = (state = { showMessage:false, message:"", color:"" }, action) => {
    switch( action.type ) {
        case "SHOW_MESSAGE":
            return {
                showMessage:true,
                message:action.message
            }
        case "HIDE_MESSAGE":
            return {
                showMessage:false,
            }
        default:
            return state
    }
}

//Used in Dashboard
const currentUser = (state = {}, action) => {
    switch (action.type) {
        case Constants.ReducersActionType.ADD_CURRENT_USER:
            return {
                ...action.currentUser
            };
        case Constants.ReducersActionType.REMOVE_CURRENT_USER:
            return {};
        case Constants.ReducersActionType.SET_USER_PICTURE:
            return {
                ...state,
                pictureUrl: action.pictureUrl
            };
        default:
            return state;
    }
};

const rememberMe = (state, action) => {
    switch (action.type) {
        case Constants.ReducersActionType.FORGET_ME:
            return {
                rememberMe: false
            };
        default:
            return {
                rememberMe: true
            };
    }
};

const composeCompass = (state = {}, action) => {
    switch (action.type) {
        case Constants.ReducersActionType.ADD_BASIC_COMPASS_STRUCTURE:
            return {
                compassTodoId: action.compassTodoId,
                senderId: action.senderId,
                recipientId: action.recipientId,
                sentencesAnswer: [],
                compass: action.compass
            };
        case Constants.ReducersActionType.NO_CONNECTION_COMPASS:
            return {
                ...state
            };
        case Constants.ReducersActionType.ADD_SENTENCE_COMPASS:
            //This is wrong, refer to: http://redux.js.org/docs/Troubleshooting.html
            state.sentencesAnswer.push(action.senteceAnswer);
            return {
                ...state,
                sentencesAnswer: state.sentencesAnswer
            };
        case Constants.ReducersActionType.SET_ANSWER_COMPASS:
            const answer = action.sentencesAnswer;
            state.sentencesAnswer.map((element) => {
                if (answer === element) {
                    element.answer = action.answer;
                }
                return element;
            });
            return {
                ...state
            };
        case Constants.ReducersActionType.RESTART_COMPASS:
            return {
                ...state,
                sentencesAnswer: []
            };
        case Constants.ReducersActionType.SAVE_FRESH_COMPASS:
            return {
                compass: action.compass
            };
        default:
            return state;
    }
};

//I don't need the name since ES6 allows it if the object and the value of object have the same name
const reducers = combineReducers({
    filterByUser,
    currentUser,
    rememberMe,
    composeCompass,
    surveysState,
    notificationState
});

export default reducers;
