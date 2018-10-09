import {EnvVariable} from '../config.js';
import Networking from './networking';
import {HTTPMethod} from './networking';

const URLPath = {
    user: "user/",
    users: "users",
    login: "user/login",
    request:"request",
    requests:"/requests/",
    todos:"/todo",
    sentRequests:"/requests/sender",
    feedback:"feedback",
    feedbacks:"/feedbacks/",
    tags:"tags",
    compassstatistics:"/compassstatistics",
    createTodo:"compasstodo",
    postAnswers:"compassanswers",
    setPicture:"profile/setpicture",
    changePassword:"user/password",
    session:"session",
    setPassword:"setPassword",
    resetPassword:"resetPassword",
    validToken:"session/validtoken"

};

const baseURL = EnvVariable.host + "/api/";

export default class Api_v1 extends Networking {

    constructor() {
        super();
    }

    login(email, password, handlerResponse){
        const parameters = {
            method: HTTPMethod.POST,
            headers: {
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //headers: header,
            body: JSON.stringify({
                'email': email,
                'password': password,
            }),
            cache: "no-store"
        };
        this.fetchFromAPI({handlerResponse, url:URLPath.login, parameters})
    }

    user({handlerResponse}){
        this.fetchFromAPI({handlerResponse, url:this.userUrlWithPath()})
    }

    users({handlerResponse}) {
        this.fetchFromAPI({handlerResponse, url:this.urlWithOrgCookie(URLPath.users)})
    }

    request({handlerResponse, requestId}){
        this.fetchFromAPI({handlerResponse, url: this.userUrlWithPath(this.getReactCookie('currentUser')._id + URLPath.requests + requestId)})
    }

    requests({handlerResponse, showReplied}) {
        this.fetchFromAPI({handlerResponse, url:this.userUrlWithPath(URLPath.todos + "?showReplied=" + showReplied)})
    }

    sentRequests({handlerResponse}){
        this.fetchFromAPI({handlerResponse, url:this.userUrlWithPath(URLPath.sentRequests)})
    }

    postFeedbackRequest({handlerResponse, feedbackRequest}){
        const parameters = this.basePostParams(feedbackRequest);
        this.fetchFromAPI({handlerResponse, url: this.urlWithOrgCookie(URLPath.request), parameters});
    }

    feedback({handlerResponse, userId, path}) {
        this.fetchFromAPI({handlerResponse, url: this.userUrlWithPath(userId + '/type/' + path
            + URLPath.feedback + "/" + path)})
    }

    feedbacks({handlerResponse, incoming = true}) {
        const feedbackType = incoming ? "incoming" : "sent";
        this.fetchFromAPI({handlerResponse, url:this.userUrlWithPath(URLPath.feedbacks + feedbackType)})
    }

    postFeedback({handlerResponse, feedback}){
        const parameters = this.basePostParams(feedback);
        this.fetchFromAPI({handlerResponse, url: this.urlWithOrgCookie(URLPath.feedback), parameters});
    }

    tags({handlerResponse}) {
        this.fetchFromAPI({handlerResponse, url: this.urlWithOrgCookie(URLPath.tags)});
    }

    compassstatistics({handlerResponse}){
        this.fetchFromAPI({handlerResponse, url:this.userUrlWithPath(URLPath.compassstatistics)})
    }

    createCompassTodo({handlerResponse, recipientId}){
        const parameters = this.basePostParams(JSON.stringify({
            'recipientId': recipientId,
        }));
        this.fetchFromAPI({handlerResponse, url:this.urlWithOrgCookie(URLPath.createTodo), parameters})
    }

    postCompassAnswers({handlerResponse, body}){
        const parameters = this.basePostParams(body);
        this.fetchFromAPI({handlerResponse, url: this.urlWithOrgCookie(URLPath.postAnswers), parameters});
    }

    setPicture({handlerResponse, data}){
        const parameters = {
            method: HTTPMethod.POST,
            headers: {},
            body: data
        };
        this.fetchFromAPI({handlerResponse, url:URLPath.setPicture, parameters})
    }

    changePassword({handlerResponse, body}){
        const parameters = this.basePostParams(body);
        this.fetchFromAPI({handlerResponse, url: URLPath.changePassword, parameters});

    }

    setPassword({email, password, handlerResponse}){
        const parameters = this.basePostParams(JSON.stringify({
            email: email,
            password: password
        }));
        this.fetchFromAPI({handlerResponse, url: URLPath.session, parameters});
    }

    resetPassword({token, password, handlerResponse}) {
        const parameters = this.basePostParams(JSON.stringify({
            token: token,
            newPassword: password,
            passwordAgain: password
        }));
        this.fetchFromAPI({handlerResponse, url: URLPath.setPassword, parameters});
    }

    resendLink({handlerResponse, email, isNew = false}){
        const parameters = this.basePostParams(JSON.stringify({
            email: email
        }));
        this.fetchFromAPI({handlerResponse, url: URLPath.resetPassword + (isNew ? "?new=true" : ""), parameters});
    }

    validateToken({token, handlerResponse}){
        const parameters = this.basePostParams(JSON.stringify({
            token: token
        }));
        this.fetchFromAPI({handlerResponse, url: URLPath.validToken, parameters});
    }


    fetchFromAPI({handlerResponse, url , parameters = defaultParameters, mocked = null}){
        if (mocked) {
            console.log("This is a mocked response");
            return handlerResponse(mocked, null);
        }else{
            debugger
            // console.log(arguments)
            parameters = this.addTokenToRequestHeader(parameters);
            fetch(baseURL + url, parameters)
                .then(this.handlErrors)
                .then((responseJson) => {
                    // console.log(JSON.stringify(responseJson));
                    return handlerResponse(responseJson, null);
                })
                .catch((error) => {
                    return handlerResponse(null, error);
                })
        }
    }

    addTokenToRequestHeader(parameters){
        parameters.headers['api-version'] = '1.0.0';
        parameters.credentials = "include";
        parameters.cache = "no-store";

        return parameters;
    }

    urlWithOrgCookie(path){
        return this.getReactCookie("orgId") + (path !== undefined ? "/" + path : "")
    }

    userUrlWithPath(path) {
        return this.urlWithOrgCookie(URLPath.user) + this.getReactCookie("userId") + (path !== undefined ? path : "");
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
}
