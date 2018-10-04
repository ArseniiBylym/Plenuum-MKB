import React, { Component } from 'react';
import './MyTeam.css';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import { connect } from 'react-redux';
import AvatarImg from '../../../resources/profile.svg'
import CreateFeedbackRequestContainer from '../CreateFeedbackRequest/index.js';


class MyTeam extends Component {
    state = {
        selectedUser: '',
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
                <div className='MyTeam'>
                    <div className='MyTeam__search-container'>
                        <div className="search-container__header">Közvetlen beosztottak</div>
                        <div className="search-container__main">
                            <CreateFeedbackRequestContainer
                                showOnlyOneUser={true}
                                returnSelectedUserProfile={this.returnSelectedUserProfile}
                                isUserHRStatus={this.props.currentUser.status}
                                returnUsersToMyTeamFlow={this.returnUsersToMyTeamFlow}
                            />
                        </div>
                    </div>
                    <div className='MyTeam__current-user-container'>
                        <div className='current-user-container__header'>Kiválasztott felhasználó</div>
                        <div className='current-user-container__main'>
                            <div className='current-user-container__main--user-profile'>
                                <div className='user-profile--photo'>
                                    {this.state.selectedUser.pictureUrl &&
                                        <img src={this.state.selectedUser.pictureUrl} alt='Avatar' />
                                    }
                                </div>
                                {this.state.selectedUser.firstName &&
                                    <div className='user-profile--name'>{this.state.selectedUser.firstName} {this.state.selectedUser.lastName}</div>
                                }
                            </div>
                            <div className='current-user-container__main--download-wrapper'>
                                <div className="download-wrapper__header">ELÉRHETŐ RIPORTOK</div>
                                <div className="download-wrapper__statistic-wrapper">
                                    <div className='download-wrapper__statistic-info'>
                                        <div className="statistic-info--header">Kapott visszajelzések</div>
                                        <div className="statistic-info--text">Vezető számára is látható visszajelzések</div>
                                    </div>
                                    <a href='#' alt='link'> 
                                        <div className="download-wrapper__statistic-button">
                                            <div className="download-wrapper__statistic-button-icon"></div>
                                            Excel letöltése
                                    </div>
                                    </a>
                                </div>
                                <div className="download-wrapper__statistic-wrapper">
                                    <div className='download-wrapper__statistic-info'>
                                        <div className="statistic-info--header">Képesség pontszámok</div>
                                        <div className="statistic-info--text">Összes képesség pontszám</div>
                                    </div>
                                    <a href='#' alt='link'>
                                        <div className="download-wrapper__statistic-button">
                                            <div className="download-wrapper__statistic-button-icon"></div>
                                            Excel letöltése
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
