import React from 'react';

const NavigationBar = (props) => {
  return (
      <div className="navi-navbar-default">
          <div className='navi-centered-items'>
            {props.title ? <div className='nav-bar-title'>{props.title}</div> : props.barContent}
          </div>
      </div>
  );
};

export default NavigationBar;
