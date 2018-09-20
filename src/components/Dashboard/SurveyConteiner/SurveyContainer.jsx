import React from 'react';
import { Button } from 'react-materialize'
import QuestionBlock from './components/QuestionBlock/QuestionBlock.jsx'
import './SurveyConteiner.css';
import PlusIcon from '../../../resources/ic_add_black_24dp_1x.png';
import CloseIcon from '../../../resources/ic-close-black.svg';

const SurveyFormContainer = (props) => {
    const managerProfilePicture = 'url(' + props.managerProfilePicture + ')';
    const errorBorderManager = props.managerSelected ? "errorBorderManager" : '';
    return (
        <form className="survey-form-container" onSubmit={ props.onSubmit } >

            <div>
                <span className="set-manager">Kérjük válaszd ki közvetlen vezetőd, akivel a TÉR értékelést készíted.</span>
                    <div className={ `select-manager ${ errorBorderManager }` } onClick={ props.selectManager }>
                        <div style={{ display: "flex", alignItems: "center" }}  >
                            <div style={{  backgroundImage: managerProfilePicture, backgroundSize: "contain" }} className="profile-picture-manager"></div>
                            <span className="firstname">{ props.managerFullName }</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            { props.managerFullName === 'Válaszd ki a vezetőd' ?
                            <img alt="" src={ PlusIcon } />
                            : <img alt="" src={ CloseIcon } onClick={ props.deleteSelectedManager } />
                            }
                        </div>
                    </div>
                    
                { props.managerSelected && <span className="selectManager">Please select your line manager</span> }

                <hr />
            </div>

            { props.children }

            <button style={{ textTransform: "uppercase" }} className="button-complete-survey margin-top-1">KÜLDÉS</button>
        </form>
    );
};


export default SurveyFormContainer;
