import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dashboard from './Dashboard.js';
import Api from '../../lib/api';
import ProfileCardContainer from './ProfileCard/index.js';
import SidebarContainer from './Sidebar/index.js';
import {OrderedSet} from 'immutable';
import {NotificationStack} from 'react-notification';
import {Errors} from '../../lib/errors.js';
import { DashboardRoutes } from '../../routes/index';

//Containers
import Constants, {Colors} from "../../lib/constants";
import {spinner} from "../Commons/Spinner/spinner";

class DashboardContainer extends Component {

    constructor(props, context){
        super(props);

        this.store = context.store;
        this.state = {
            indexOption: 0,
            showMenu: false,
            users: undefined,
            notifications: OrderedSet(),
            count: 0,
            user: undefined
        };

        this.setProfilePicture = this.setProfilePicture.bind(this);
        this.removeNotification = this.removeNotification.bind(this);
        this.menuClicked = this.menuClicked.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleTesting = this.handleTesting.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.error = Errors();
    }

    addNotification(notification){
        const { route } = this.context.router;
        const { notifications, count } = this.state;
        const newCount = count + 1;
        if ((notifications.filter(n => n.key === notification.userId)).size > 0) {
            return undefined;
        }

        const notificationColor = route.location.pathname === Constants.Route.SENT_REQUESTS ? Colors.Consider : Colors.Continue;
        return this.setState({
            count: newCount,
            notifications: notifications.add({
                message: notification.message,
                className: "notification-style",
                style: true,
                backgroundColor: notificationColor,
                key: notification.userId,
                dismissAfter: 3000,
                onClick: () => this.removeNotification(newCount)
            })
        });
    }

    removeNotification (count){
        const { notifications } = this.state;
        this.setState({notifications: notifications.filter((element) => {
            return element.key !== count;
        })});
    }

    setProfilePicture(){
        this.setState({});
    }

    handleLogout(){
        this.store.dispatch({type: Constants.ReducersActionType.REMOVE_CURRENT_USER});
        this.context.router.history.replace({
            pathname: Constants.Route.LOGIN
        })
    }


    handleTesting(response){
        console.log(response);
    }

    menuClicked(){
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    componentDidMount() {
        Api.userMySelf()
            .then((response) => {
                this.store.dispatch({type: Constants.ReducersActionType.ADD_CURRENT_USER, currentUser: response});
                this.user = response;
                this.setState({user: response});
            })
            .catch((error) => {
                this.error.handleError(error, this.handleLogout)
            });
    }

    componentWillUnmount(){
        window.clearTimeout(this.timeout);
    }

    render(){
        if (this.state.user !== undefined) {
            this.notification = (
                <NotificationStack
                    barStyleFactory={ (index, style) => Object.assign(
                        {},
                        style,
                        {
                            bottom: `${2 + (index * 5)}rem`,
                            left: 'auto',
                            right: '-100%',
                            backgroundColor: this.state.notifications.toArray()[index].backgroundColor,
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
                            backgroundColor: this.state.notifications.toArray()[index].backgroundColor
                        }
                    )}
                    notifications={this.state.notifications.toArray()}
                    onDismiss={notification => this.setState({
                        notifications: this.state.notifications.delete(notification)
                    })}
                />
            );

            this.profile = (
                <ProfileCardContainer {...this.user} handleLogout={this.handleLogout} leaveProfile={this.menuClicked} />
            );
            this.options = (
                <SidebarContainer profile={this.profile}/>
            );

            let routes = DashboardRoutes(this);

            return Dashboard({
                children:routes,
                user:this.user,
                menuObject:this.state,
                options:this.options,
                profile:this.profile,
                notification:this.notification});
        } else {
            return spinner();
        }
    }
}

DashboardContainer.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object.isRequired
};

export default DashboardContainer;
