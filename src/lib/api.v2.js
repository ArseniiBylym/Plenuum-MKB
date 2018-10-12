import {EnvVariable} from '../config.js';
import Networking from './networking';
import {HTTPMethod} from './networking';

const URLPath = {
    organisations:"organizations/",
    userSelf: "users/me",
    user: "users/",
    users: "users",
    groupUsers:"users/me/groups/answer-card-users",
    request:"users/me/requests/",
    requests:"users/me/requests",
    postRequests:"requests",
    interacts:"interacts",
    sentRequests:"users/me/requests/sent",
    feedback:"feedbacks",
    feedbacks:"users/me/feedbacks/",
    tags:"tags",
    compassstatistics:"compass/statistics",
    createTodo:"compass/todos",
    postAnswers:"compass/answers",
    setPicture:"users/me/avatar",
    changePassword:"session/password",
    session:"session",
    setPassword:"session/set-password",
    resetPassword:"session/reset-password",
    validToken:"session/validtoken",
    group:"groups/",
    groups:"users/me/groups",
    surveys: "surveysTodo",
    searchManager: "surveys/search/manager",
};

const baseURL = EnvVariable.host + "/api/";

export default class Api_v2 extends Networking {

    //SURVEY
    async getAllSurveysToDoForCurrentUser( orgId ){
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.surveys, orgId));
    }
    async getSurveyToDoById( surveyId, orgId ){
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.surveys + '/' + surveyId, orgId));
    }
    async searchManager( orgId ){
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.searchManager, orgId))
    }
    async setManagerForSurveyToDo( manager, orgId ){
        let parameters = {
            method: HTTPMethod.PATCH,
            headers: {
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ manager }),
        };
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.surveys), parameters)
    }
    async saveCompleteSurveyToDo( completeSurveyObj, surveyId, orgId ){
        let parameters = {
            method: HTTPMethod.PATCH,
            headers: {
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( completeSurveyObj ),
        };
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.surveys + '/' + surveyId, orgId), parameters)
    }

    //COMPASS

    async createCompassTodo(recipientId, orgId){
        const parameters = this.basePostParams(JSON.stringify({'aboutUserId': recipientId,}));
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.createTodo, orgId), parameters);
    }

    async compassstatistics(orgId){
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.compassstatistics, orgId));
    }

    async postCompassAnswers(body, orgId){
        const parameters = this.basePostParams(body);
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.postAnswers, orgId), parameters);
    }

    async todosAndRequests(orgId){
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.interacts, orgId));
    }

    //FEEDBACK
    async feedbacks(incoming = true, orgId) {
        const feedbackType = incoming ? "received" : "sent";
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.feedbacks + feedbackType, orgId));
    }

    async postFeedback(feedback, orgId){
        const parameters = this.basePostParams(feedback);
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.feedback, orgId), parameters);
    }

    //GROUP
//not tested
    async groupById(orgId, groupId){
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.group + groupId, orgId));
    }
//not tested
    async groups(orgId){
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.groups, orgId));
    }

    async groupUsers(orgId) {
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.groupUsers, orgId));
    }

    //REQUEST

    async request(requestId, orgId){
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.request + requestId, orgId));
    }

    async sentRequests(orgId){
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.sentRequests, orgId));
    }

    async postFeedbackRequest(feedbackRequest, orgId){
        const parameters = this.basePostParams(feedbackRequest);
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.postRequests, orgId), parameters);
    }

    //SESSION
    async changePassword(body){
        const parameters = this.basePostParams(body);
        return this.fetchFromAPI(baseURL + URLPath.changePassword, parameters);
    }

    async login(email, password) {
        console.log(email)

        const parameters = {
            method: HTTPMethod.POST,
            headers: {
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // mode: 'no-cors',
            body: JSON.stringify({'email': email, 'password': password}),
            cache: "no-store"
        };
        console.log(parameters)
        return this.fetchFromAPI(baseURL + URLPath.session, parameters);
    }

    async logout(){
        const parameters = {
            method: HTTPMethod.DELETE,
            headers: {
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: "no-store"
        };
        return this.fetchFromAPI(baseURL + URLPath.session, parameters);
    }

    async setPassword(token, password) {
        const parameters = this.basePostParams(JSON.stringify({token: token, newPassword: password }));
        return this.fetchFromAPI(baseURL + URLPath.setPassword, parameters);
    }

    async resetPassword(email, isNew = false){
        const parameters = this.basePostParams(JSON.stringify({ email: email }));
        return this.fetchFromAPI(baseURL + URLPath.resetPassword + (isNew ? "?new=true" : ""), parameters);
    }

    async validateToken(token){
        const parameters = this.basePostParams(JSON.stringify({token: token}));
        return this.fetchFromAPI(baseURL + URLPath.validToken, parameters);
    }

    //TAG
    async tags(orgId){
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.tags, orgId));
    }

    //USER

    async user(id, orgId){
        return this.fetchFromAPI(this.urlWithOrgData(id, orgId));
    }

    async userMySelf(){
        return this.fetchFromAPI(baseURL + URLPath.userSelf);
    }

    async users(orgId) {
        return this.fetchFromAPI(this.urlWithOrgData(URLPath.users, orgId));
    }

    async setPicture(data){
        const parameters = { method: HTTPMethod.POST, headers: {}, body: data };
        return this.fetchFromAPI(baseURL + URLPath.setPicture, parameters);
    }

    urlWithOrgData(path, orgId){
        return baseURL + URLPath.organisations + orgId + (path !== undefined ? "/" + path : "")
    }

    basePostParams(body){
        return  {
            method: HTTPMethod.POST,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        };
    }


    //Sent abusive feedback
    async sentAbusiveFeedback(token, orgId, feedbackId) {
        const parameters = {
            method: HTTPMethod.GET,
            headers: {
                'Content-Type': `application/x-www-form-urlencoded`,
                'Authorization': `Bearer ${token}`
            },
        };
        return this.fetchFromAPI(baseURL + URLPath.organisations + `${orgId}/users/me/feedbacks/${feedbackId}/reportAbusive`, parameters);
    }

    async selectManager(token, managerId){
        let details = {
            'managerId': `${managerId}`
        }
        let formBody = [];
        for (let key in details) {
            let encodeKey = encodeURIComponent(key);
            let encodeValue = encodeURIComponent(details[key]);
            formBody.push(encodeKey + '=' + encodeValue);
        }
        formBody = formBody.join('&');

        const parameters = {
            method: HTTPMethod.PATCH,
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody,
            
        }

        return this.fetchFromAPI(baseURL + URLPath.user + 'updateUserManager', parameters)
    }

    // async deleteManager(token) {
    //     let details = {
    //         'managerId': ``
    //     }
    //     let formBody = [];
    //     for (let key in details) {
    //         let encodeKey = encodeURIComponent(key);
    //         let encodeValue = encodeURIComponent(details[key]);
    //         formBody.push(encodeKey + '=' + encodeValue);
    //     }
    //     formBody = formBody.join('&');

    //     const parameters = {
    //         method: HTTPMethod.PATCH,
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //         },
    //         body: formBody,
    //     }

    //     return this.fetchFromAPI(baseURL + URLPath.user + 'updateUserManager', parameters)
    // }

    async createNewSurvey (token, orgId, body) {
      
        const parameters = {
            method: HTTPMethod.POST,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        return this.fetchFromAPI(baseURL + URLPath.organisations + `${orgId}/surveys/2`, parameters)

    }

    async getMySurveys(token, orgId = 'hipteam') {
        const parameters = {
            method: HTTPMethod.GET,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return this.fetchFromAPI(baseURL + URLPath.organisations + `${orgId}/surveys/2`, parameters)
    }

    async getSurveyDetails(token, surveyId, orgId) {
        const parameters = {
            method: HTTPMethod.GET,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return this.fetchFromAPI(baseURL + URLPath.organisations + `${orgId}/survey/2/${surveyId}/detail`, parameters)
    }

    async downloadAnswers(token, surveyId, orgId) {
        console.log(arguments)
         const parameters = {
            method: HTTPMethod.GET,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return this.fetchFromAPI(baseURL + URLPath.organisations + `${orgId}/survey/2/${surveyId}/excel`, parameters)
    }

    async getSurveyTemplates(token, orgId) {
        const parameters = {
            method: HTTPMethod.GET,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return this.fetchFromAPI(baseURL + URLPath.organisations + `${orgId}/surveys/surveyTemplate/2`, parameters)
    }

    async getSpecificUser(token, orgId, ownerId) {
        console.log(arguments)
        const parameters = {
            method: HTTPMethod.GET,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return this.fetchFromAPI(baseURL + URLPath.organisations + `${orgId}/users/${ownerId}`, parameters)
    }

    async getSurveyById(token, orgId, surveyId) {
        console.log(arguments)
        const parameters = {
            method: HTTPMethod.GET,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return this.fetchFromAPI(baseURL + URLPath.organisations + `${orgId}/surveysTodo/${surveyId}`, parameters)
    }

    async sendCompletedSurvey(token, orgId, surveyId, body) {
        const parameters = {
            method: HTTPMethod.PATCH,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        return this.fetchFromAPI(baseURL + URLPath.organisations + `${orgId}/surveysTodo/${surveyId}`, parameters)

    }

    async getMyTeam(token, orgId) {
        const parameters = {
            method: HTTPMethod.GET,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return this.fetchFromAPI(baseURL + URLPath.organisations + `${orgId}/myTeam/users`, parameters)
    }

    async getUserSkillExcell(token, orgId, userId) {
        const parameters = {
            method: HTTPMethod.GET,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return this.fetchFromAPI_excel(baseURL + URLPath.organisations + `${orgId}/${userId}/skillScores/excel`, parameters)
    }

    async getUserFeedbackExcell(token, orgId, userId) {
        const parameters = {
            method: HTTPMethod.GET,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':   `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,
                'Content-Disposition': `attachment; filename="feedbacks_wood_aaron_2018-10-12.xlsx"`,
                // 'Cache-Control': `max-age=0`
            }
        }
        // return this.fetchFromAPI_excel(baseURL + URLPath.organisations + `${orgId}/${userId}/feedbacks/excel`, parameters)
        return this.fetchFromAPI_excel(baseURL + URLPath.organisations + `${orgId}/${userId}/feedbacks/excel`, parameters)
    }
};