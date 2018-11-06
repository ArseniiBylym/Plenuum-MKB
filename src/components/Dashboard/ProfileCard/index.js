import React, {Component} from 'react';
import ProfileCard from './ProfileCard';
import {NavLink} from 'react-router-dom';
import {EnvVariable} from '../../../config';
import Api from '../../../lib/api'
import { connect } from 'react-redux';

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
                  <NavLink onClick={this.props.closeSidebar} key="profile" to={{ pathname: '/profile' }} activeClassName="active">Profilbeállítások</NavLink>,
                  <NavLink onClick={this.props.closeSidebar} key="privacy_policy" to={{pathname: '/privacy'}}>Adatvédelmi irányelvek</NavLink>,
                  <NavLink key="login" to="/login" activeClassName="active" onClick={this.logout}>Kijelentkezés</NavLink>
            ];
            this.setState({opened: true});
        }
    }

    logout(){
        this.props.closeSidebar()
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

const mapDispatchToProps = dispatch => {
    return {
        closeSidebar: () => {dispatch({type: 'CLOSE'})},
    }
}

export default connect(null, mapDispatchToProps)(ProfileCardContainer);
