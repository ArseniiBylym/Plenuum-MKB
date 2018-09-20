import {EnvVariable} from '../config.js';
import loginResponse from '../resources/mock-responses-v1/login';
import userResponse from '../resources/mock-responses-v1/user';
import usersResponse from '../resources/mock-responses-v1/users';
import feedbackResponse from '../resources/mock-responses-v1/feedback';
import feedbacksResponse from '../resources/mock-responses-v1/feedbacks';
import postFeedbackResponse from '../resources/mock-responses-v1/postFeedback';
import postFeedbackRequestResponse from '../resources/mock-responses-v1/postFeedbackRequest';
import requestResponse from '../resources/mock-responses-v1/request';
import requestsResponse from '../resources/mock-responses-v1/requests';
import sentRequestsResponse from '../resources/mock-responses-v1/sentRequests';
import tagsResponse from '../resources/mock-responses-v1/tags';
import compassStatisticsResponse from '../resources/mock-responses-v1/compassStatistics';

const defaultParameters = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

function sleep2(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const baseURL = EnvVariable.host + "/api/";
const loginURL = "user/login";
module.exports = {

    login(email, password, handlerResponse){
    sleep(4000);
        return handlerResponse(loginResponse, null)
    },

    user({handlerResponse}){
        sleep2(2000)
        return handlerResponse(userResponse, null)
    },

    users({handlerResponse}) {
            sleep2(5000);
            return handlerResponse(usersResponse, null)

    },

    request({handlerResponse, requestId}){
        return handlerResponse(requestResponse, null)
    },

    requests({handlerResponse, showReplied}) {
        sleep2(2000);
        return handlerResponse(requestsResponse, null)
    },

    sentRequests({handlerResponse}){
        return handlerResponse(sentRequestsResponse, null)
    },

    postFeedbackRequest({handlerResponse, feedbackRequest}){
        return handlerResponse(postFeedbackRequestResponse, null)
    },

    feedback({handlerResponse, userId, path}) {
        return handlerResponse(feedbackResponse, "error")
    },

    feedbacks({handlerResponse, incoming = true}) {
        return handlerResponse(feedbacksResponse, null)
    },

    postFeedback({handlerResponse, feedback}){
        return handlerResponse(postFeedbackResponse, null)
    },

    tags({handlerResponse}) {
        return handlerResponse(tagsResponse, null);
    },

    compassstatistics({handlerResponse}){
        return handlerResponse(compassStatisticsResponse, null);
    },

    createCompassTodo({handlerResponse, recipientId}){
        return handlerResponse("", null);
    },

    postCompassAnswers({handlerResponse, body}){
        return handlerResponse("", null);
    },

    setPicture({handlerResponse, data}){
        return handlerResponse("", null);
    },

    changePassword({handlerResponse, body}){
        return handlerResponse("", null);

    },

    setPassword({email, password, handlerResponse}){
        return handlerResponse("", null)
    },

    resetPassword({token, password, handlerResponse}) {
        return handlerResponse("", null)
    },

    resendLink({handlerResponse, email, isNew = false}){
        return handlerResponse("", null)
    },

    validateToken({token, handlerResponse}){
        return handlerResponse("", null);

    },


};
