import React from 'react';
import './CreateFeedbackRequest.css';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import SearchContainer from '../Commons/Search/index.js';
import MessageContainer from '../Commons/Message/index.js';

const CreateFeedbackRequest = (props) => {
  return(
    <div>
      <DefaultNavigationBarContainer
        title={props.title}
        right={props.cancelButton}/>
        <div className="create-request-container container-fluid">
          <div className="row">
            <div className='col-sm-8 col-sm-offset-2 new-feedback-component-container'>
              {props.components}
            </div>
          </div>
            <div className="button-send-request">
              <div className={props.button.classSytle} onClick={props.button.handler}>
                  <button disabled={props.disabled} className="button-next">{props.button.title}</button>
              </div>
          </div>
        </div>
    </div>
  );
};

export const userComponent = (props) => {
    return (
        <div className="create-request-components-container">
            {props.selectedUsers}
          <div className="search-field">
            <SearchContainer searchFor={props.searchFor} defaultValue={props.search}/>
          </div>
          <div>
            <div className="search-result-title">
                {props.groupTitle}
            </div>
              {props.userList}
          </div>

        </div>
    );
};

export const messageComponent = (props) => {
    return (
        <div className="row">
          <div className="col-sm-12">
              {props.selectedUsers}
            <MessageContainer
                myStyle="feedback-message-style"
                name="requestMessage"
                placeholder="Add request message"
                maxLength={200}
                handleText={props.handleRequestMessage}
                value={props.message}
            />
          </div>
        </div>
    )
};

export default CreateFeedbackRequest;
