import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {
  return (
    <div className="sidebar-main-container">

      {/*{ (props.profile.props.orgId === "hipteam" || 
         props.profile.props.orgId === "mkb-bank" ||
         props.profile.props.orgId === "mkb-bank-test1" ||
         props.profile.props.orgId === "mkb-bank-test2" ||
         props.profile.props.orgId === "mkb-bank-test3" ||
         props.profile.props.orgId === "mkb-bank-test4" ||
         props.profile.props.orgId === "mkb-bank-test5"
         ) && (
          <div className="orgLogoContainer">
            <NavLink className="orgLogoLink" to="/">
              <img src="/mkb-large.png" />
            </NavLink>
          </div>
         )}*/}
      { (
         props.profile.props.orgId === "mkb-bank" ||
         props.profile.props.orgId === "hipteam" 

         ) && (
          <div className="orgLogoContainer">
            <NavLink className="orgLogoLink" to="/">
              <img src="/mkb-large.png" />
            </NavLink>
          </div>
        )}

      <div className="wrapping-for-padding">
        <div className='row'>
          <div className="col-sm-12">
            <div className="sidebar-profile">
              {props.profile}
            </div>
          </div>
        </div>
        <hr className='divider '/>
        <div className='row  margin-top-1 grow'>
          <div className="col-sm-12">
            <div className="sidebar-mycontent">
              {props.options}
            </div>
          </div>
        </div>
        <hr className='divider '/>
        <div className='row last-side  '>
          <div className="col-sm-12">
            <div className="sidebar-actions col-sm-12">
              <NavLink className='action-button'
                to={{
                  pathname: props.createNewFeedback.pathname,
                  state: {
                    fromRequest: props.createNewFeedback.fromRequest
                    }
                  }}
                replace={props.replace}
                activeClassName='active'
                >
                Új visszajelzés
              </NavLink>
              <NavLink className='action-button'
                to={props.createRequest.pathname}
                activeClassName='active'
                replace={props.replace}
                >
                Visszajelzés kérése
              </NavLink>
              <NavLink className='action-button'
                to={props.answerCards.pathname}
                activeClassName='active'
                replace={props.replace}
                >
                Készség értékelés
              </NavLink>
            </div>
          </div>
        </div>
        <div className="plenuum-verion">
          <p>{props.version}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
