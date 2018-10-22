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
        usersList: [
            // {
            //     email: "christina.jacobs@example.com",
            //     firstName: "christina",
            //     lastActive: "2018-10-12T12:21:34.027Z",
            //     lastName: "jacobs",
            //     managerId: "5984342227cd340363dc84bb",
            //     pictureUrl: "https://randomuser.me/api/portraits/women/74.jpg",
            //     _id: "5984342227cd340363dc84a9",
            // }
        ]
    }
    componentDidMount = () => {
        const token = window.localStorage.getItem('token');
        Api.getMyTeam(token, this.props.currentUser.orgId)
            .then(response => {
                console.log(response)
                this.setState({
                    usersList: response,
                    isRequestSended: true
                })
            })
            .catch(error => {
                console.log(error.message)
                this.setState({
                    isRequestSended: true
                })
            })


        this.setState({
            currentUser: this.props.currentUser
        })

    }

    returnSelectedUserProfile = (user) => {

        console.log(user)

        this.setState({
            selectedUser: user,
        })

    }
    componentDidUpdate = () => {
        console.log(this.state)
    }

    returnUsersToMyTeamFlow = (firstUser) => {
        setTimeout(() => {
            this.setState({
                selectedUser: firstUser,
            })
        }, 0)
    }

    getSkillFile = () => {
        console.log('get skill')
        const token = window.localStorage.getItem('token');
        Api.getUserSkillExcell(token, this.props.currentUser.orgId, this.state.selectedUser._id)
            .then(response => {
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    getFeedbackFile = () => {
        console.log('get feedback')
        const token = window.localStorage.getItem('token');
        Api.getUserFeedbackExcell(token, this.props.currentUser.orgId, this.state.selectedUser._id)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    renderPage() {
        console.log(this.state.isRequestSended);
        console.log(this.state.usersList.length)
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
                        getSkillFile={this.getSkillFile}
                        getFeedbackFile={this.getFeedbackFile}
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


