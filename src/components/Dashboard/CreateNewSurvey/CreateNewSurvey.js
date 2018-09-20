
import React, { Component } from 'react';
import DefaultNavigationBarContainer from '../Commons/DefaultNavigationBar/index.js';
import Button from './Button/Button';
import AddAnoterButton from './AddAnotherButton/AddAnotherButton';
import FormContainer from './FormContainer/FormContainer';
import './CreateNewSurvey.css';

class CreateNewSurvey extends Component {
    state = {
        screenSide: 'left',
        isFormCorrect: true,
        title: '',
        description: '',
        open_until: '',
        questions: [
            {
                id: Date.now() + Math.random(),
                text: '',
                type: '',
                isRequired: ''
            }
        ]
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

    addAnoterQuestion = (event) => {
        window.scrollBy(0, 500)
        this.setState((prevState) =>{
            return {
                questions: prevState.questions.concat([
                    {
                        id: Date.now() + Math.random(),
                        text: '',
                        type: '',
                        isRequired: ''
                    }
                ])
            }
        })
    }

    deleteLastQuestion = (event) => {
        console.log('delete last')
        if(this.state.questions.length <= 1) return
        this.setState((prevState) => {
            let arr = prevState.questions.slice();
            arr.pop();
            return(
                {
                    ...prevState,
                    questions: arr
                }
            )
        })
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
                        <FormContainer config={this.state} 
                                        deleteLastQuestion={this.deleteLastQuestion} 
                                        length={this.state.questions.length}/>

                        <div className='CreateNew__footer-wrapper'>
                            <AddAnoterButton text='ADD ANOTHER QUESTION' onClickAction={this.addAnoterQuestion} />
                            <Button text='NEXT' onClickAction={this.showNextScreen}/>
                        </div>
                    </div>
                </div>
                <div className={this.state.screenSide == 'right' ? 
                                'request-pre-container request-pre-container--create-new-part1 create-new--center' :
                                'request-pre-container request-pre-container--create-new-part1 create-new--right'}>
                    <DefaultNavigationBarContainer
                        title='New survey (2/2)'
                        className="interact"
                        backButton={backSwitchButton}
                        right={closeButton}
                    />
                    <div className='CreateNew__right-screen-wrapper'>
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