
import React, { Component } from 'react';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import Button from './Button/Button';
import './CreateNewSurvey.css';

class CreateNewSurvey extends Component {
    state = {
        screenSide: 'left',
        isFormCorrect: true,
    }

    switchBack = () => {
       this.setState({
           screenSide: 'left'
       })
    }

    showNextScreen = (event) => {
        if(this.state.isFormCorrect) {
            this.setState({
                screenSide: 'right'
            })
        } else return;
    }

    render() {

        let backSwitchButton = <div className='back-button-title--survey-header' onClick={this.switchBack}></div>
        let closeButton = <a href="javascript:history.back()" className="close-button-title--create-new-header"></a>

        return (
            <div className='request-pre-container request-pre-container--create-new-main-wrapper'>
                <div className={this.state.screenSide == 'left' ? 
                                'request-pre-container request-pre-container--create-new-part1 create-new--center' :
                                'request-pre-container request-pre-container--create-new-part1 create-new--left'}>
                    <DefaultNavigationBarContainer
                        title='New survey (1/2)'
                        className="interact"
                        right={closeButton}
                    />
                    <div className='CreateNew__left-screen-wrapper'>
                        <div className='CreateNew__left-screen-content'>Left screen</div>
                        <div className='CreateNew__footer-wrapper'>
                            <Button text='NEXT' onClickAction={this.showNextScreen}/>
                        </div>
                    </div>
                </div>
                <div className={this.state.screenSide == 'right' ? 
                                'request-pre-container request-pre-container--create-new-part1 create-new--center' :
                                'request-pre-container request-pre-container--create-new-part1 create-new--right'}>
                {/* <div className="request-pre-container request-pre-container--create-new-part2 create-new--right"> */}
                    <DefaultNavigationBarContainer
                        title='New survey (2/2)'
                        className="interact"
                        backButton={backSwitchButton}
                        right={closeButton}
                    />
                    <div className='CreateNew__right-screen-wrapper'>
                        <div className='CreateNew__right-screen-content'>Right screen</div>
                        <div className='CreateNew__footer-wrapper'>
                            <Button text='SEND SURVEY' />
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}

export default CreateNewSurvey