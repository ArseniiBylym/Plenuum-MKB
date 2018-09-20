import React from 'react';
import './RequestList.css';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';

const RequestList = (props) => {
  return (
    <div className="request-pre-container">
      <DefaultNavigationBarContainer
        title={props.title} className="interact" />
        <div className="request-list-container">

        	{ props.showMessage && 
              <div className="dashboard-notification">
                  { props.notification( props.mes, props.col ) } 
              </div>
          }

          { props.requestsAndTodos }
        </div>
    </div>
  );
};

export default RequestList;
