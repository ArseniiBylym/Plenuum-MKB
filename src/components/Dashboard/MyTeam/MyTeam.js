import React, { Component } from 'react';
// import './MyTeam.css';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import { connect } from 'react-redux';
import MyTeamEmptyState from './MyTeamEmptyState/MyTeamEmptyState';
import MyTeamFullState from './MyTeamFullState/MyTeamFullState';
import Api from '../../../lib/api';
import {spinner} from '../../Commons/Spinner/spinner.js'

class MyTeam extends Component {
    state = {
        selectedUser: '',
        isRequestSended: false, //this value for set is visible flow
        usersList: []
    }
    componentDidMount = () => {
        const token = window.localStorage.getItem('token');
        Api.getMyTeam(token, this.props.currentUser.orgId)
            .then(response => {
                // console.log(response)
                this.setState({
                    usersList: response,
                    isRequestSended: true
                })
            })
            .catch(error => {
                console.log(error.message)
            })


        this.setState({
            currentUser: this.props.currentUser
        })

    }

    returnSelectedUserProfile = (user) => {

        // console.log(user)

        this.setState({
            selectedUser: user,
        })

    }
    componentDidUpdate = () => {
        // console.log(this.state)
    }

    returnUsersToMyTeamFlow = (firstUser) => {
        setTimeout(() => {
            this.setState({
                selectedUser: firstUser,
            })
        }, 0)
    }

    renderPage() {
        // console.log(this.state.isRequestSended);
        // console.log(this.state.usersList.length)
        return (
            <div className="request-pre-container request-pre-container--my-team">
                <DefaultNavigationBarContainer
                    title='Közvetlen beosztottak'
                    className="interact"
                />
                {this.state.isRequestSended && this.state.usersList.length > 0 ?
                    <MyTeamFullState
                        orgId={this.props.currentUser.orgId}
                        userId={this.state.selectedUser._id}
                        usersList={this.state.usersList}
                        returnSelectedUserProfile={this.returnSelectedUserProfile}
                        isUserHRStatus={this.props.currentUser.status}
                        returnUsersToMyTeamFlow={this.returnUsersToMyTeamFlow}
                        myTeamUserId={this.state.selectedUser._id}
                        pictureUrl={this.state.selectedUser.pictureUrl}
                        firstName={this.state.selectedUser.firstName}
                        lastName={this.state.selectedUser.lastName}
                    /> :
                    this.state.isRequestSended && this.state.usersList.length == 0 ? 
                    <MyTeamEmptyState /> : 
                    spinner()
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


