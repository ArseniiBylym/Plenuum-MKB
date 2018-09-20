import React, {Component} from 'react';
import ProfileCard from './ProfileCard';
import {NavLink} from 'react-router-dom';
import {EnvVariable} from '../../../config';
import Api from '../../../lib/api'

const ReactGA=require('react-ga');

ReactGA.initialize(EnvVariable.googleAnalyticsId);

class ProfileCardContainer extends Component {

    constructor(props){
        super(props);

        this.profileMenu=this.profileMenu.bind(this);
        this.logout=this.logout.bind(this);
        this.state={
            hover: false,
            opened: true
        }
    }

    componentWillMount(){
        this.profileMenu();
    }

    profileMenu(){
        if (this.state.opened) {
            this.options=undefined;
            this.setState({opened: false});
        }else {
            this.options=[
                  <NavLink key="profile" to={{ pathname: '/profile' }} activeClassName="active">Profile settings</NavLink>,
                  <NavLink key="privacy_policy" to={{pathname: '/privacy'}}>Privacy policy</NavLink>,
                  <NavLink key="login" to="/login" activeClassName="active" onClick={this.logout}>Log out</NavLink>
            ];
            this.setState({opened: true});
        }
    }

    logout(){
        ReactGA.event({
            category: 'UI',
            action: 'Click',
            label: 'Sign out click'
        });
        Api.logout()
            .then(() => { this.props.handleLogout() })
            .catch((error) => { console.error(error)});
    }

    render(){
        return ProfileCard({
                ...this.props,
                logout:this.logout,
                onClick:this.props.leaveProfile,
                chevron:this.state.opened ? 'chevron-clicked' : 'chevron',
                menu:this.options,
                menuClicked:this.profileMenu});
    }
}

export default ProfileCardContainer;
