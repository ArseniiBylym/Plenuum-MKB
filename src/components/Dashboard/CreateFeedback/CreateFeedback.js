import React from 'react';
import './CreateFeedback.css';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import SearchContainer from '../Commons/Search/index.js';
import TagList from '../Commons/TagList/index.js';
import PrivacyContainer from './Privacy/index.js';
import MessageContainer from '../Commons/Message/index.js';
import Quotation from '../../../resources/quotation.svg';
import FeedbackTypeContainer from './FeedbackType/index.js';
import ManagerVisibilityContainer from './ManagerVisibility/index.js';

const CreateFeedback = (props) => {
    // console.log(props)
  return (
    <div>
      <DefaultNavigationBarContainer
        title={props.title}
        right={props.backButton}/>
      <div className="createFeedback-container container-fluid">
        <div className="row">
          <div className='col-sm-8 col-sm-offset-2 new-feedback-component-container'>
            {props.components}
          </div>
        </div>
      </div>
    </div>
  );
};

export const userList = (props) => {
    return (
        <div>
            <div className="search-field">
                <SearchContainer searchFor={props.searchFor} />
            </div>
            <div className="users-new-feedback">
                <div className="search-result-title">
                    {props.groupTitle}
                </div>
                {props.userList}
            </div>

        </div>
    );
};

export const bottomContainer = (props) => {
    // console.log(props)
    return (
        <div className="createFeedback-bottom-div margin-top-1">
            <TagList
                tags={props.tags}
                selectedTags={props.selectedTags}
                tagClicked={props.handleFeedbackTags}
            />
            <PrivacyContainer
                handleCheckBox={props.handleCheckBox}
                user={props.recipient}
            />
            <ManagerVisibilityContainer 
                 handleCheckBox={props.handleCheckBox}
                 user={props.recipient}
                 isChecked={props.isManagerVisibilityChecked}
            />
            <button disabled={props.disabled}
                className={
                    (props.message.length > 4 && props.type) ?
                        "button-create-feedback-enable margin-top-1" :
                        "button-disabled"
                } onClick={
                (props.message.length > 4 && props.type) ?
                    props.nextButton : undefined
            } >
                Visszajelzés elküldése
            </button>
        </div>
    );
};

export const requestMessageComponent = (props) => {
    return (<div
        className="createFeedback-request-message">
        <img alt="" src={Quotation} />
        <p>
            {props.requestMessage}
        </p>
    </div>);
};

export const feedbackTypeComponent = (props) => {
    return (<div
        className="createFeedback-feedback-type" >
        <FeedbackTypeContainer
            handleFeedbackType={props.handleFeedbackType}
            type={props.type}
            user={props.recipient}
        />
    </div>);
};

export const createFeedbackUI = (props) => {
    return (
        <div className="createFeedback-details">
            <div className="row">
                <div className="col-sm-12">
                    {props.feedbackUser}
                </div>
            </div>
            <div className="row margin-botton-1">
                <div className="col-sm-12 ">
                    {props.requestMessage}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="createFeedback-message-div">
                        <MessageContainer
                            myStyle="feedback-message-style"
                            name="feedbackMessage"
                            placeholder="Visszajelzés hozzáadása"
                            maxLength={200}
                            handleText={props.handleFeedbackMessage}
                            value={props.message}
                        />
                    </div>
                </div>
            </div>
            <div className="row unique-row">
                <div className="col-sm-12">
                    {props.feedbackType}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    {props.bottomPart}
                </div>
            </div>
        </div>
    );
};

export default CreateFeedback;
