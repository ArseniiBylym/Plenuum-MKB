import React, { Component } from 'react';
// import './MyTeam.css';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import { connect } from 'react-redux';
import MyTeamEmptyState from './MyTeamEmptyState/MyTeamEmptyState';
import MyTeamFullState from './MyTeamFullState/MyTeamFullState';

class MyTeam extends Component {
    state = {
        selectedUser: '',
        fullState: false   //Need to be changed when users directs will get
    }
    componentDidMount = () => {
        this.props.currentUser.status = 'HR' // // the identifier for user for HR rights
    }

    returnSelectedUserProfile = (user) => {
        this.setState({
            selectedUser: user
        })
    }

    returnUsersToMyTeamFlow = (firstUser) => {
        setTimeout(() => {
            this.setState({
                selectedUser: firstUser,
            })
        }, 0)
    }

    renderPage() {
        return (
            <div className="request-pre-container request-pre-container--my-team">
                <DefaultNavigationBarContainer
                    title='Közvetlen beosztottak'
                    className="interact"
                />
                {this.state.fullState ? 
                    <MyTeamFullState 
                        returnSelectedUserProfile={this.returnSelectedUserProfile}
                        isUserHRStatus={this.props.currentUser.status}
                        returnUsersToMyTeamFlow={this.returnUsersToMyTeamFlow}
                        pictureUrl={this.state.selectedUser.pictureUrl}
                        firstName={this.state.selectedUser.firstName}
                        lastName={this.state.selectedUser.lastName}
                    /> : 
                    <MyTeamEmptyState />
                }
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderPage()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}


export default connect(mapStateToProps, null)(MyTeam)
