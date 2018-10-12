import React, { Component } from 'react';
// import './MyTeam.css';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import { connect } from 'react-redux';
import MyTeamEmptyState from './MyTeamEmptyState/MyTeamEmptyState';
import MyTeamFullState from './MyTeamFullState/MyTeamFullState';
import Api from '../../../lib/api';

class MyTeam extends Component {
    state = {
        selectedUser: '',
        isRequestSended: true, //this value for set is visible flow
        usersList: null
    }
    componentDidMount = () => {
        const token = window.localStorage.getItem('token');
        // Api.getMyTeam(token, this.props.currentUser.orgId)
        //     .then(response => {
        //         console.log(response)
        //         if(response.length > 0 && this.props.currentUser.roles && this.props.currenUser.roles.includes('HR')){
        //             this.setState({
        //                 usersList: response,
        //                 isRequestSended: true
        //             })
        //         } else if(response.length > 0){
        //             let users = response.filter((item, i) => {
        //                 if(item.manager == this.props.currentUser._id) return true
        //                 else return false
        //             })
        //             this.setState({
        //                 usersList: users,
        //                 isRequestSended: true
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error.message)
        //     })


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
        return (
            <div className="request-pre-container request-pre-container--my-team">
                <DefaultNavigationBarContainer
                    title='Közvetlen beosztottak'
                    className="interact"
                />
                {this.state.isRequestSended ?
                    <MyTeamFullState
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


