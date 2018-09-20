// import Api from '../../../lib/api';
// import { Utils } from '../../../lib/utils';
// import { createBackButton } from '../Commons/DefaultNavigationBar/index.js';
// import SurveyFormContainer from './SurveyContainer.jsx';
// import { searchUsersComponent } from '../MyFeedbacks/MyContent.js';
// import { spinner } from "../../Commons/Spinner/spinner";
// import SearchContainer from '../Commons/Search/index.js';

import React, { Component } from 'react';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import EmptySurveysList from './EmptySurveysList/EmptySurveysList'
import FullSurveysList from './FullSurveysList/FullSurveysList'
import CreateNewButton from './CreateNewButton/CreateNewButton'


import './MySurveys.css';

export default class MySurveys extends Component {
    state = {
        list: [
            {
                id:  Date.now() + Math.random(),
                // title: 'Survey title in one line ',
                title: 'Survey title in one line Survey title in one lineSurvey title in one line Survey title in one lineSurvey title in one line',
                totalAnswers: 21,
                doneAnswers: 10,
                startDate: `2018.06.01`,
                finishDate: `2018.09.01`,
                members: [

                ],
                questions: [

                ]
            },
            {
                id:  Date.now() + Math.random(),
                title: 'Survey title in one line',
                totalAnswers: 10,
                doneAnswers: 4,
                startDate: '2018.04.21',
                finishDate: '2018.11.05',
                members: [

                ],
                questions: [

                ]
            },
            {
                id:  Date.now() + Math.random(),
                title: 'Survey title in one line',
                totalAnswers: 15,
                doneAnswers: 0,
                startDate: '2018.10.01',
                finishDate: '2018.11.13',
                members: [

                ],
                questions: [

                ]
            }
        ]
    }

    render() {

        let cardList = null
        if (this.state.list.length == 0) {
            cardList = <EmptySurveysList />
        } else {
            cardList = <FullSurveysList list={this.state.list}/>
        }
        let createButton = <CreateNewButton text='New survey' />
        return (
            <div className="request-pre-container request-pre-container--my-surveys">
                <DefaultNavigationBarContainer
                    title='My surveys'
                    className="interact"
                    right={createButton}
                />
                {cardList}
            </div>
        )
    }
}
