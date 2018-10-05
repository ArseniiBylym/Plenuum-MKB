import React from 'react';
import PlusIcon from '../../../../resources/ic_add_black_24dp_1x.png';
import CloseIcon from '../../../../resources/ic-close-black.svg';
import ProfileIcon from '../../../../resources/profile.svg';
import './ProfileManagerForm.css'

const ProfileManegerForm = (props) => {
    console.log(props)
    let managerProfilePicture = props.managerProfilePicture ? `url('${props.managerProfilePicture}')` : `url('${ProfileIcon}')`;
    let closeIcon = props.managerSelected ? `url('${CloseIcon}')` : `url('${PlusIcon}')`;
    const errorBorderManager = props.managerSelected ? "errorBorderManager" : '';
    let classForSelectLine = props.managerFullName ? 'manager-without-border' : '';
    return (
        <form className="ProfileManagerForm survey-form-container" onSubmit={props.onSubmit} >
            <div >
                <div className={`select-manager ${errorBorderManager} ${classForSelectLine}`} onClick={props.selectManager}>
                    <div style={{ display: "flex", alignItems: "center" }}  >
                        <div style={{ backgroundImage: managerProfilePicture, backgroundSize: "contain" }} className="profile-picture-manager"></div>
                        <span className="firstname">{props.managerFullName ? props.managerFullName : 'Select manager'}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {!props.managerFullName ?
                            <img alt="" src={PlusIcon} />
                            : <img alt="" src={CloseIcon} onClick={props.deleteSelectedManager} />
                        }
                    </div>
                </div>
            </div>
        </form>
    );
};


export default ProfileManegerForm;
