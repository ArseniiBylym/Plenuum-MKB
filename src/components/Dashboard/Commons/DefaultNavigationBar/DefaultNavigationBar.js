import React, { Component } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar.js'
// import logo from './DefaultNavigationBar.css';

class DefaultNavigationBar extends Component {
  
  render () {
    const {title, right, backButton, className} = this.props;
    const barContent = (
      <div className={`nav-nav-nav ${className}`}>
      <div className="nav-left nav-element"><div className="nav-inner-content">{backButton}</div></div>
      <div className="nav-title nav-element"><div className="nav-inner-content nav-inner-content-title">{title}</div></div>
      <div className="nav-right nav-element"><div className="nav-inner-content nav-inner-content-right">{right}</div></div>
      </div>
    );
    return (
      <NavigationBar barContent={barContent}/>
    );
  }
};

DefaultNavigationBar.defaultProps = {
  className: ''
}

export default DefaultNavigationBar;
