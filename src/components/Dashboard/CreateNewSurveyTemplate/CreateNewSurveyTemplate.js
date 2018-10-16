import React, { Component } from 'react';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Constants from '../../../lib/constants'

import './CreateNewSurveyTemplate.css';
import Api from '../../../lib/api.js';

class CreateNewSurveyTemplate extends Component {

    state = {
        templates: []
    }

    componentDidMount = () => {
        const token = window.localStorage.getItem('token');
        Api.getSurveyTemplates(token, this.props.orgId)
            .then((response) => {
                console.log(response)
                this.props.putTemplatesToRedux(response)
            })
            .catch((error) => {
                console.log(error.message)
            })
        //send request to the back and put response to the state and redux store
    }

    renderPage() {

        let templates = null;
        if (this.props.templates.length > 0) {
            templates = this.props.templates.map((item, i) => {
                return (
                    <Link key={item._id} to={`${Constants.Route.CREATE_NEW_SURVEY}/${i}`} className='template-item '>
                        <div className='template-item-img blank-template'></div>
                        {item.title}
                        <div className='template-item-arrow'></div>
                    </Link>
                )
            })
        }
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
                        <div className="template-header">Válassz kérdőív sablont</div>
                        <Link to={Constants.Route.CREATE_NEW_SURVEY_TEMPLATE_BLANK} className='template-item '>
                            <div className='template-item-img blank-template'></div>
                            Üres kérdőív
                        <div className='template-item-arrow'></div>
                        </Link>
                        {templates}

                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderPage()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        templates: state.syrveyTemplates.templates,
        orgId: state.currentUser.orgId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        putTemplatesToRedux: (templates) => { dispatch({ type: "PUT_TEMPLATES_TO_REDUX", templates: templates }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewSurveyTemplate)