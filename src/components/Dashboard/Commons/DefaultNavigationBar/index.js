import React from 'react';
import DefaultNavigationBar from './DefaultNavigationBar.js';
import NavigationBarContainer from '../NavigationBar/index.js';

export const createNavRightButtons = (actionRight, actionLeft, iconRight, iconLeft) => {
  return (
    <div className="compass-nav-buttons">
      <div
        className="compass-nav-buttons-replay"
        onClick={actionRight}>
        <img alt="" src={iconRight}/>
      </div>
      <div
        className="compass-nav-buttons-close"
        onClick={actionLeft}
        >
        <img alt="" srcSet={iconLeft} />
      </div>
    </div>
  )
};

export const createBackButton = (actionRight, iconRight) => {
  return (
    <div className="compass-nav-buttons">
      <div
        className="compass-nav-buttons-close"
        onClick={actionRight}
        >
        <img alt="" srcSet={iconRight} />
      </div>
    </div>
  )
};


class DefaultNavigationBarContainer extends NavigationBarContainer {

  render() {
    const {title, backButton, right, className} = this.props;
    return (
      <DefaultNavigationBar className={className} title={title} backButton={backButton} right={right}/>
    );
  }

}

export default DefaultNavigationBarContainer;
