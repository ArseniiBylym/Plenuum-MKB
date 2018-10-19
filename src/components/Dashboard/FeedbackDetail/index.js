import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FeedbackDetail, {sentAsComponent, managerVisibilityComponent, nextButton, previousButton, totalCounter, request} from './FeedbackDetail.js';
import ContinueIMG from '../../../resources/continue-38.svg';
import ConsiderIMG from '../../../resources/consider-38.svg';
import Lock from '../../../resources/hidden.png';
import Unlock from '../../../resources/unlock_icon.png';
import MaskAnon from '../../../resources/anonim.png';
import LockClosedIcon from '../../../resources/lock@2x.png';
import LockOpenIcon from '../../../resources/unlock@2x.png';
import ProfileAnon from '../../../resources/anonymous_profile@1x.png';
import Api from '../../../lib/api';
import {EnvVariable} from '../../../config';
import TagList from '../Commons/TagList/index.js';
import ProfilePicDefault from '../../../resources/profile.svg';
import SentAsDefaultPic from '../../../resources/profile.svg';
import Constants from '../../../lib/constants'
import {spinner} from "../../Commons/Spinner/spinner";
import moment from 'moment';
import {connect} from 'react-redux';
import axios from 'axios';

const ReactGA = require('react-ga');

ReactGA.initialize(EnvVariable.googleAnalyticsId);

class FeedbackDetailContainer extends Component {

    constructor(props, context) {
        super(props);

        const {route} = context.router;
        if (route.location.state) {
            this.object = route.location.state.object;
        }
        this.object = this.props.detail;
        this.handleSingleFeedback = this.handleSingleFeedback.bind(this);
        this.store = context.store;
        if (this.object) {
            this.state = {
                feedback: this.object.feedback,
                request: undefined,
                requestObj: undefined,
                currentUser: undefined,
                isAbusiveModalShow: false,
                abusiveFeedbackJustSended: false
            };
        }

        this.nextFeedback = this.nextFeedback.bind(this);
        this.previousFeedback = this.previousFeedback.bind(this);
        this.close = this.close.bind(this);
    }

    handleSingleFeedback(response, error) {
        if (error) {
            console.error(error);
        } else {
            this.object = {
                feedback: response
            };
            this.setState({
                feedback: response
            })
        }
    }

    nextFeedback() {
        ReactGA.event({ category: 'UI', action: 'Click', label: 'Detailpage right arrow' });
        const {feedback, feedbacks, users} = this.object;
        let currentFeedbackIndex = feedbacks.findIndex((element) => {
            return element._id === feedback._id;
        });
        const nextFeedback = feedbacks[currentFeedbackIndex + 1]
            ? feedbacks[currentFeedbackIndex + 1]
            : feedback;

        this.props.feedbackClicked(nextFeedback, feedbacks, users);
    }

    previousFeedback() {
        ReactGA.event({ category: 'UI', action: 'Click', label: 'Detailpage left arrow' });
        const {feedback, feedbacks, users} = this.object;
        let currentFeedbackIndex = feedbacks.findIndex((element) => {
            return element._id === feedback._id;
        });
        let previousFeedback = feedbacks[currentFeedbackIndex - 1]
            ? feedbacks[currentFeedbackIndex - 1]
            : feedback;
        this.props.feedbackClicked(previousFeedback, feedbacks, users);
    }

    close() {
        this.props.feedbackClicked(undefined, undefined, undefined);
    }

    createFeedbackDetail(feedback) {
        const type = this.object.type;
        const user = this.object.users.find((element) => {
            if (type === 1) { //incoming
                return element._id === feedback.recipientId;
            } else {
                return element._id === feedback.senderId; //Incoming or sentRequest
            }
        });

        let username = user ? user.firstName + " " + user.lastName : "User deleted";
        let userPic;
        if (!user) {
            userPic = ProfilePicDefault;
        } else {
            userPic = user.pictureUrl;
        }
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const createdAt = new Date(feedback.createdAt);
        // const dateString = createdAt.getDate() + "."
        //     + monthNames[createdAt.getMonth()] + "."
        //     + createdAt.getFullYear();
        const dateString = moment(createdAt).format('YYYY.MM.DD • HH.mm')
        
        let anonymous = false;
        let privacy = false;
        if (feedback.privacy) {
            for (let index in feedback.privacy) {
                if (feedback.privacy[index] === Constants.FeedbackPrivacy.PRIVATE) {
                    privacy = true;
                }
                if (feedback.privacy[index] === Constants.FeedbackPrivacy.ANONYMOUS) {
                    anonymous = true;
                }
            }
        }

        let typeMessage;
        const currentUser = this.state.currentUser;
        if (currentUser._id === feedback.recipientId) {
            if(feedback.type == 'CONTINUE') {
                typeMessage = "Így tovább";
            }
            if(feedback.type == 'CONSIDER') {
                typeMessage = "Fontold meg";
            }
        } else {
            if(user) {
                if(feedback.type == 'CONTINUE') {
                    typeMessage = `${user.firstName}, így tovább`
                }
                if(feedback.type == 'CONSIDER') {
                    typeMessage = `${user.firstName}, fontold meg`
                }
            } else {
                if(feedback.type == 'CONTINUE') {
                    typeMessage = `Valaki folytatja ezt`
                }
                if(feedback.type == 'CONSIDER') {
                    typeMessage = `Valaki ezt fontolja meg`
                }
            }
            // typeMessage = user ? user.firstName + " should " + feedback.type.toLowerCase()
            //     + " this" : "Someone should " + feedback.type.toLowerCase() + " this";
        }

        let sentAs = undefined;
        if (currentUser._id === feedback.recipientId) {
            const {requestObj} = this.state;
            if (requestObj) {
                sentAs = sentAsComponent({imageSrc:currentUser.pictureUrl !== "" ? currentUser.pictureUrl : SentAsDefaultPic,
                text:requestObj.requestMessage});
            }
        } else {
            const options = anonymous ? {imageSrc:MaskAnon, text:'Névtelenül küldve'} :
                {imageSrc:currentUser.pictureUrl !== "" ? currentUser.pictureUrl :
                    SentAsDefaultPic, text:currentUser.firstName + " ként küldve"};
            sentAs = sentAsComponent(options);
        }

        let managerVisibility = undefined;
        const managerOptions = privacy ? {imageSrc: Lock, text: 'Nem látható a vezetőd számára'} :
            {imageSrc: Unlock, text: 'Látható a vezetőd számára'};
            managerVisibility = managerVisibilityComponent(managerOptions)


        const currentIndex = this.object.feedbacks.findIndex((element) => {
            return element._id === feedback._id;
        });

        let tags = undefined;
        if (feedback.tags && feedback.tags.length > 0) {
            tags = (<TagList tags={feedback.tags} customStyle="tag-custom" tagClicked={undefined}/>)
        }

        if (anonymous && type !== 1) {
            username = "Névtelenül";
            userPic = ProfileAnon;
        }

        const index = this.object.feedbacks.findIndex((element) => {
            return element._id === feedback._id;
        });
        //previous
        let prev = undefined;
        let next = undefined;
        if (index > 0) {
            prev = previousButton({previousFeedback:this.previousFeedback});
        }

        if (index < this.object.feedbacks.length - 1) {
            next = nextButton({nextFeedback:this.nextFeedback});
        }

        let total = totalCounter({type, count:index + 1 + "/" + this.object.feedbacks.length});

        const currentFeedback = {
            username: username,
            userPic: userPic,
            createdAt: dateString,
            message: feedback.message,
            context: feedback.context,
            typeMessage: typeMessage,
            typeIcon: feedback.type === Constants.FeedbackType.CONSIDER
                ? ConsiderIMG
                : ContinueIMG,
            typeClassName: feedback.type === Constants.FeedbackType.CONSIDER
                ? "feedback-detail-type-consider"
                : "feedback-detail-type-continue",
            request: type === 1 ? this.state.request : undefined,
            sentAs: sentAs,
            managerVisibility: managerVisibility,
            tags: tags,
            page: currentIndex + 1,
            total: total,
            next: next,
            prev: prev
        };

        return currentFeedback;
    }

    getRequestById(requestId) {
        const {currentUser} = this.store.getState();
        const orgId = currentUser.orgId;
        Api.request(requestId, orgId)
            .then((response) => {
                const requestDiv = request({requestMessage:response.requestMessage});
                this.setState({request: requestDiv, requestObj: response});
            })
            .catch((error) => { console.log("Could not load the request") });
    }

    componentWillMount() {
        const {route} = this.context.router;
        if (route.location.state) {
            this.object = route.location.state.object;
        }
        this.object = this.props.detail;
        if (this.object && this.object.feedback.requestId && this.object.feedback.requestId.length > 0) {
            this.getRequestById(this.object.feedback.requestId);
        } else {
            this.setState({request: undefined});
        }
    }

    componentDidMount() {
        Api.userMySelf()
            .then((response) => {
                this.setState({currentUser: response})
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location) {
            this.object = nextProps.location.state.object;
        }
        this.object = nextProps.detail;
        if (this.object && this.object.feedback.requestId && this.object.feedback.requestId.length > 0) {
            this.setState({request: undefined, requestObj: undefined});
            this.getRequestById(this.object.feedback.requestId);
        } else {
            this.setState({request: undefined, requestObj: undefined});
        }
    }

    showAbusiveModalHandler = () => {
        this.setState({
            isAbusiveModalShow: true
        })
    }
    hideAbusiveModalHandler = () => {
        this.setState({
            isAbusiveModalShow: false
        })
    }
    sentToManagerHandler = () => {
        const token = window.localStorage.getItem('token')
        console.log(token)

        Api.sentAbusiveFeedback(token, this.state.currentUser.orgId, this.props.detail.feedback._id)
            .then((response) => {
                console.log(response);
                console.log('Abusive feedback was sended to the manager');
                this.hideAbusiveModalHandler();
                this.setState({
                    abusiveFeedbackJustSended: true
                })
            })
            .catch((e) => {
                console.log(e.message);
                console.log(`Can't send abusive feedback`)
            })
    }

    render() {
        const {requestObj, request, currentUser} = this.state;
        if (currentUser === undefined || (!this.object
                || (this.object.feedback.requestId && !requestObj)
                || (this.object.feedback.requestId && !request)
            )) {
            return spinner();
        } else {
            const feedback = this.createFeedbackDetail(this.object.feedback);
            console.log(this.props.detail.type)
            if(this.props.detail.type == 0){
                console.log('case 0')
                return FeedbackDetail({
                    feedback,
                    close:this.close,
                    showModalMenuIcon: true,
                    isAbusiveModalShow: this.state.isAbusiveModalShow,
                    showAbusiveModal: this.showAbusiveModalHandler,
                    hideAbusiveModal: this.hideAbusiveModalHandler,
                    sentToManager: this.sentToManagerHandler,
                    abusiveFeedbackJustSended: this.state.abusiveFeedbackJustSended
                });
            } else {
                console.log('case 1')
                return FeedbackDetail({
                    feedback,
                    close:this.close,
                    
                });
            }
        }
    }
}


FeedbackDetailContainer.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object,
};

const mapDispatchToProps = dispatch => {
    return{
        sentAbusiveRequestSaga: (feedbackId, userId) => {dispatch({type: "SENT_ABUSIVE_REQUEST_SAGA", details: {feedbackId, userId}})}
    }
}

export default connect(null, mapDispatchToProps) (FeedbackDetailContainer);

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  function logCookies(cookies) {
    for (let cookie of cookies) {
      console.log(cookie.value);
    }
  }