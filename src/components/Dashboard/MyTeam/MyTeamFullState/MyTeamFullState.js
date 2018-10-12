import React from 'react';
import CreateFeedbackRequestContainer from '../../CreateFeedbackRequest/index.js';
import './MyTeamFullState.css';

function MyTeamFullState(props) {
    console.log(props)
    return (
        <div className='MyTeam'>
            <div className='MyTeam__search-container'>
                <div className="search-container__header">Közvetlen beosztottak</div>
                <div className="search-container__main">
                    <CreateFeedbackRequestContainer
                        usersList={props.usersList}
                        showOnlyOneUser={true}
                        returnSelectedUserProfile={props.returnSelectedUserProfile}
                        isUserHRStatus={props.isUserHRStatus}
                        returnUsersToMyTeamFlow={props.returnUsersToMyTeamFlow}
                    />
                </div>
            </div>
            <div className='MyTeam__current-user-container'>
                <div className='current-user-container__header'>Kiválasztott felhasználó</div>
                <div className='current-user-container__main'>
                    <div className='current-user-container__main--user-profile'>
                        <div className='user-profile--photo'>
                            {props.pictureUrl &&
                                <img src={props.pictureUrl} alt='Avatar' />
                            }
                        </div>
                        {props.firstName &&
                            <div className='user-profile--name'>{props.firstName} {props.lastName}</div>
                        }
                    </div>
                    <div className='current-user-container__main--download-wrapper'>
                        <div className="download-wrapper__header">ELÉRHETŐ RIPORTOK</div>
                        <div className="download-wrapper__statistic-wrapper">
                            <div className='download-wrapper__statistic-info'>
                                <div className="statistic-info--header">Kapott visszajelzések</div>
                                <div className="statistic-info--text">Vezető számára is látható visszajelzések</div>
                            </div>
                            <a href='#' alt='link' onClick={props.getSkillFile}>
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
                            <a href='#' alt='link' onClick={props.getFeedbackFile}>
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
    )
}

export default MyTeamFullState

// usersList={props.usersList}
