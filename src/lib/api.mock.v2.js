import Networking from './networking';
import loginResponse from '../resources/mock-responses-v2/login';
import userResponse from '../resources/mock-responses-v2/userMe';
import usersResponse from '../resources/mock-responses-v2/users';
import resetPasswordResponse from '../resources/mock-responses-v2/resetPassword.json';
import feedbacksSentResponse from '../resources/mock-responses-v2/feedbacksSent';
import feedbacksReceivedResponse from '../resources/mock-responses-v2/feedbacksReceived';
import postFeedbackResponse from '../resources/mock-responses-v2/postFeedback';
import postFeedbackRequestResponse from '../resources/mock-responses-v2/postFeedbackRequest';
import requestResponse from '../resources/mock-responses-v2/request';
import changePasswordResponse from '../resources/mock-responses-v2/changePassword.json';
import sentRequestsResponse from '../resources/mock-responses-v2/sentRequests';
import tagsResponse from '../resources/mock-responses-v2/tags';
import compassStatisticsResponse from '../resources/mock-responses-v2/compassStatistics';
import createCardResponse from '../resources/mock-responses-v2/createCard';
import interactsResponse from '../resources/mock-responses-v2/interacts';
import groupsResponse from '../resources/mock-responses-v2/groups';
import setPictureResponse from '../resources/mock-responses-v2/setPicture.json';
import groupUserResponse from '../resources/mock-responses-v2/groupUsers';
import logoutResponse from '../resources/mock-responses-v2/logout.json';
import validTokenResponse from '../resources/mock-responses-v2/validToken.json';
import setPasswordResponse from '../resources/mock-responses-v2/setPassword.json';
import groupResponse from '../resources/mock-responses-v2/group.json';
import postCompassAnswersResponse from '../resources/mock-responses-v2/postComassAnswes.json';

export default class ApiMock_v2 extends Networking {

    async createCompassTodo(recipientId, orgId){
        return createCardResponse;
    }

    async compassstatistics(orgId){
        return compassStatisticsResponse;
    }

    async postCompassAnswers(body, orgId){
        return postCompassAnswersResponse;
    }

    async todosAndRequests(orgId){
        return interactsResponse;
    }

    //FEEDBACK
    async feedbacks(incoming = true, orgId) {
        return incoming ? feedbacksReceivedResponse : feedbacksSentResponse;
    }

    async postFeedback(feedback, orgId){
        return postFeedbackResponse;
    }

    //GROUP
//not tested
    async groupById(orgId, groupId){
        return groupResponse;
    }
//not tested
    async groups(orgId){
        return groupsResponse
    }

    async groupUsers(orgId) {
        return groupUserResponse;
    }

    //REQUEST

    async request(requestId, orgId){
        return requestResponse;
    }

    async sentRequests(orgId){
        return sentRequestsResponse;
    }

    async postFeedbackRequest(feedbackRequest, orgId){
        return postFeedbackRequestResponse;
    }

    //SESSION
    async changePassword(body){
        return changePasswordResponse;
    }

    async login(email, password) {
        return loginResponse;
    }

    async logout(){
        return logoutResponse;
    }

    async setPassword(token, password) {
        return setPasswordResponse;
    }

    async resetPassword(email, isNew = false){
        return resetPasswordResponse;
    }

    async validateToken(token){
        return validTokenResponse;
    }

    //TAG
    async tags(orgId){
        return tagsResponse;
    }

    //USER

    async user(id, orgId){
        return this.fetchFromAPI(this.urlWithOrgCookie(id, orgId));
    }

    async userMySelf(){
        return userResponse;
    }

    async users(orgId) {
        return usersResponse;
    }

    async setPicture(data){
        return setPictureResponse;
    }

}
