import React from 'react';
import './RequestList.css';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import SurveySentButton from '../MySurveys/SurveySentButton/SurveySentButton'

const RequestList = (props) => {
  return (
    <div>

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
          {/* <SurveySentButton text='Válaszok elküldve' /> */}
          {props.showCompleteSurveyNotification && <SurveySentButton text='Válaszok elküldve' />}
        </div>
    </div>
    </div>
  );
};

export default RequestList;
