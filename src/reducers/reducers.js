import _ from 'lodash';

import {combineReducers} from 'redux';
import Constants from "../lib/constants";
import {mySurveysDefaultStore, incoming_surv} from './statesForTesting';

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
        case Constants.ReducersActionType.ADD_USERS_MANAGER:
            return{
                ...state,
                managerId: action.manager
            }
        default:
            return state;
    }
};

let myTempSurveysContainer = {
    surveys: [
        {
            _id: "5ba38c9700818d34af369411",
            createdAt: "2018-09-20T12:03:35.152Z",
            title: "Survey title1",
            expiritDate: "2018-10-22T15:51:41.696Z",
            complitedSurveyTodos: 2,
            allSurveyTodos: 3
        },
        {
            _id: "5ba38c9700818d34af369411",
            createdAt: "2018-09-20T12:03:35.152Z",
            title: "Survey title2",
            expiritDate: "2018-08-22T15:51:41.696Z",
            complitedSurveyTodos: 2,
            allSurveyTodos: 3
        }
    ]
}

// const createSurvey = (state = mySurveysDefaultStore, action) => {
const createSurvey = (state = myTempSurveysContainer, action) => {
    switch (action.type) {
        case Constants.ReducersActionType.PUT_SURVEYS_TO_REDUX:
            console.log(action.surveys)
            return {
                surveys: [
                    ...action.surveys,
                ],
                survey_has_sended: false
            }
        case Constants.ReducersActionType.CREATE_NEW_SURVEY:

            // const survey = {
            //     title: action.newSurvey.title,
            //     description: action.newSurvey.description,
            //     start_date: Date.now(),
            //     finish_date: new Date(action.newSurvey.open_until).getTime(),
            //     questions: action.newSurvey.questions,
            //     selected_users: action.newSurvey.selectedUsers,
            //     total_answers: action.newSurvey.selectedUsers.length,
            //     done_answers: 0,
            // }
            return {
                ...state,
                // my_surveys: state.my_surveys.concat(survey),
                survey_has_sended: true
            }

        case Constants.ReducersActionType.CLEAR_SURVEY_HAS_SENDED: 
            return {
                ...state,
                survey_has_sended: false
            }
            
        default: 
            return state;
    }
}

const incomingSurveys = (state = incoming_surv, action) => {
    switch (action.type) {
        case Constants.ReducersActionType.COMPLETE_SURVEY:
            const survey_list = state.list.map((item, i) => {
                if(action.index == i) {
                    return {
                        ...item, 
                        completed: true,
                       
                    }
                } else return item
            })

            return {
                ...state,
                list: survey_list,
                just_completed: true,
                completedSurveyId: action.id
                
            }
        case Constants.ReducersActionType.CLEAR_ANSWER_SENT_MESSAGE: 
            return{
                ...state, 
                just_completed: false
            }
        default: 
            return state;
    }
}

const sidebarState = (state = {isOpen: false}, action) => {
    switch (action.type) {
        case 'OPEN':
            return {
                isOpen: true
            }
        case 'CLOSE':
            return {
                isOpen: false
            }
        default: 
            return {
                ...state
            }
    }
}

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

const templatesArray = {
    templates: [
        // {
        //     "_id": "5ba8cc23a54c2a2a18f36bdb",
        //     "updatedAt": "2018-09-24T11:36:03.222Z",
        //     "createdAt": "2018-09-24T11:36:03.222Z",
        //     "templateTitle": "This is the template title",
        //     "title": "Survey tilte",
        //     "description": "This is description of survey",
        //     "expiritDate": "2019-10-22T15:51:41.696Z",
        //     "owner": "5984342227cd340363dc84c7",
        //     "questions": [
        //         {
        //             "max": 0,
        //             "min": 10,
        //             "required": true,
        //            "text": "2+2",
        //             "type": "text"
        //         },
        //         {
        //             "max": 0,
        //             "min": 10,
        //             "required": true,
        //            "text": "4+4",
        //             "type": "yes-no"
        //         },
        //         {
        //             "max": 0,
        //             "min": 10,
        //             "required": true,
        //            "text": "6+6=12",
        //             "type": "1-6"
        //         },
        //     ],
        //     "respondents": [],
        //     "visible": [
        //         "all"
        //     ]
        // },
    ]
}

const syrveyTemplates = (state = templatesArray, action) => {
    switch (action.type) {
        case Constants.ReducersActionType.PUT_TEMPLATES_TO_REDUX:
            return {
                templates: [
                    ...action.templates,
                ]
            }
       
        default: 
            return state;
    }
}

//I don't need the name since ES6 allows it if the object and the value of object have the same name
const reducers = combineReducers({
    filterByUser,
    currentUser,
    rememberMe,
    composeCompass,
    surveysState,
    notificationState,
    createSurvey,
    incomingSurveys,
    syrveyTemplates,
    sidebarState
});

export default reducers;
