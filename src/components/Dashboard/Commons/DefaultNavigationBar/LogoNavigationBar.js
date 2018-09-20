import React from 'react';
import logo from '../../../../resources/logo-name.svg';
import css from './DefaultNavigationBar.css';
import NavigationBar from '../NavigationBar/NavigationBar.css'

const LogoNavigationBar = () => {
  return (
    <div className="navi-navbar-default logo">
        <div className='navi-centered-items'>
          <div className="nav-nav-nav">
            <div className="nav-left nav-element"><div className="nav-inner-content"></div></div>
            <div className="nav-title nav-element"><div className="nav-inner-content nav-inner-content-title">
                <img className="" src={logo} alt=""/>
                <p className="nav-logo-text">PLENUUM</p>
            </div></div>
            <div className="nav-right nav-element"><div className="nav-inner-content nav-inner-content-right"></div></div>
          </div>
        </div>
    </div>
  );
};

export default LogoNavigationBar;
