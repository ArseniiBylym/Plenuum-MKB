import React, { Component } from 'react';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Constants from '../../../lib/constants'

import './CreateNewSurveyTemplate.css';

class CreateNewSurveyTemplate extends Component {

    state = {
        templates: []
    }

    componentDidMount = () => {
        //send request to the back and put response to the state and redux store
    }

    render() {
        //add check is state templates empty. If not, create templates object with Link items with map method and render the page
        let closeButton = <a href="javascript:history.back()" className="close-button-title--create-new-header"></a>
        return (
            <div className='request-pre-container request-pre-container--create-new-template-wrapper'>
                <DefaultNavigationBarContainer
                    title='Survey templates'
                    className="interact"
                    right={closeButton}
                />
                <div className='CreateNewSurveyTemplate'>
                    <div className='template-content-wrapper'>
                        <div className="template-header">Select survey template</div>
                        <Link to={Constants.Route.CREATE_NEW_SURVEY} className='template-item '>
                            <div className='template-item-img blank-template'></div>
                            Start blank
                        <div className='template-item-arrow'></div>
                        </Link>
                        {/* <Link to={Constants.Route.CREATE_NEW_SURVEY} className='template-item'>
                            <div className='template-item-img fill-template'></div>
                            Long tempate name for a survey that you
                            fill out in case you need it and truncated at th…
                        <div className='template-item-arrow'></div>
                        </Link>
                        <Link to={Constants.Route.CREATE_NEW_SURVEY} className='template-item'>
                            <div className='template-item-img fill-template'></div>
                            Short name
                        <div className='template-item-arrow'></div>
                        </Link>
                        <Link to={Constants.Route.CREATE_NEW_SURVEY} className='template-item'>
                            <div className='template-item-img fill-template'></div>
                            Somewhat longer template name
                        <div className='template-item-arrow'></div>
                        </Link> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateNewSurveyTemplate