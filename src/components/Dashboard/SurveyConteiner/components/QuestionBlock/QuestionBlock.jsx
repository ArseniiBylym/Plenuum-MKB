import React, {Component} from 'react';
import { Input } from 'react-materialize';

// import './materialize.min.css';
import './QuestionBlock.css';


export default class QuestionBlock extends Component {

    constructor(props){

        super(props);

        this.state = {
            fieldDescription: this.props.fieldDescription,
            answer: {
                "question":this.props.id,
                "questionText":this.props.question,
                "answerText":this.props.answerText,
                "required":this.props.required,
                "min":this.props.minLengthOfText,
                "max":this.props.maxLengthOfText
            },
            answerIsMatched:!this.props.required,
            inputValue:"",
            errorState:false
        }

        this.errorState = this.errorState.bind(this)

    }

    componentWillMount(){
        this.props.answersStatusArr(this.state.answerIsMatched)
    }
    componentDidMount(){
        this.props.answersArr(this.state.answer)
    }
    componentDidUpdate( prevProps, prevState ){
        if( this.props.submitError !== prevProps.submitError ) this.errorState();
    }

    errorState() {
        if( this.props.required ){
            if ( this.props.minLengthOfText ) this.setState({ fieldDescription: `${ this.props.minLengthOfText } characters minimum.` })
            let fildDescriptionArr = document.querySelectorAll( ".field-description" );
            let surveysInputsArr = document.querySelectorAll( ".survey-input-conteiner" );
            let label = document.querySelector( `.question-${ this.props.itemsIndex } label:not(.label-icon)` );

            fildDescriptionArr[this.props.itemsIndex].classList.add( "error-description" );
            surveysInputsArr[this.props.itemsIndex].classList.add( "errorBorder", "notEmpty" );
            label.classList.add( "errorLabel" );
        }
    }

    handleInputChange(e){

        
        // Selectors
        let fildDescriptionArr = document.querySelectorAll( ".field-description" );
        let surveysInputsArr = document.querySelectorAll( ".survey-input-conteiner" );
        let label = document.querySelector( `.question-${ this.props.itemsIndex } label:not(.label-icon)` );
        let value = e.target.value

        this.setState({ inputValue:value })

        let remainsOfCharacters = this.props.maxLengthOfText - value.length

        // Managing the state when Inputs block is Required and has min length of characters
        if ( this.props.required && this.props.minLengthOfText !== null ){
            if (value.length >= this.props.minLengthOfText ){
                this.setState({ fieldDescription: "", answerIsMatched: true }, () => { this.props.updateAnswersStatusArr( this.state.answerIsMatched, this.props.itemsIndex ) })
                fildDescriptionArr[this.props.itemsIndex].classList.remove( "error-description" );
                surveysInputsArr[this.props.itemsIndex].classList.remove( "errorBorder" );
                label.classList.remove( "errorLabel" );
            }
            else if ( value.length < this.state.answer.min  ) {
                label.classList.add( "active", "errorLabel" );

                this.setState({ fieldDescription: `${ this.props.minLengthOfText } characters minimum.`, answerIsMatched: false }, () => { this.props.updateAnswersStatusArr( this.state.answerIsMatched, this.props.itemsIndex ) })
                fildDescriptionArr[this.props.itemsIndex].classList.add( "error-description" );
                surveysInputsArr[this.props.itemsIndex].classList.add( "errorBorder", "notEmpty" );
            }
            // Managing the state of Inputs block when typed text was fully erased
            else if (value.length === 0 ) {
                this.setState({ fieldDescription: this.props.fieldDescription, answerIsMatched: false }, () => { this.props.updateAnswersStatusArr( this.state.answerIsMatched, this.props.itemsIndex ) })
                fildDescriptionArr[this.props.itemsIndex].classList.remove( "error-description" );
                surveysInputsArr[this.props.itemsIndex].classList.remove( "errorBorder", "notEmpty" );
                label.classList.remove( "errorLabel" );
            }
        }
        //
        else if ( this.props.required && this.props.minLengthOfText === null ){
            if( value.length > 0 ) {
                this.setState({ fieldDescription: `${ remainsOfCharacters } characters left`, answerIsMatched: true }, () => { this.props.updateAnswersStatusArr( this.state.answerIsMatched, this.props.itemsIndex ) })
                fildDescriptionArr[this.props.itemsIndex].classList.add( "active-description" );
                surveysInputsArr[this.props.itemsIndex].classList.add( "notEmpty" );

                surveysInputsArr[this.props.itemsIndex].classList.remove( "errorBorder" );
                fildDescriptionArr[this.props.itemsIndex].classList.remove( "error-description" );

                label.classList.add( "norm" );
            }
            else if ( value.length === 0 ){
                this.setState({ fieldDescription: this.props.fieldDescription, answerIsMatched: false }, () => { this.props.updateAnswersStatusArr( this.state.answerIsMatched, this.props.itemsIndex ) })
                fildDescriptionArr[this.props.itemsIndex].classList.remove( "active-description" );
                surveysInputsArr[this.props.itemsIndex].classList.remove( "notEmpty" );
            }
        }
        // Managing the state of Inputs block when answer is optional and has a limit in length
        else if ( !this.props.required ) {

            this.setState({ fieldDescription: `${ remainsOfCharacters } characters left`, answerIsMatched: true }, () => { this.props.updateAnswersStatusArr( this.state.answerIsMatched, this.props.itemsIndex ) })
            fildDescriptionArr[this.props.itemsIndex].classList.add( "active-description" );
            surveysInputsArr[this.props.itemsIndex].classList.add( "notEmpty" );
            label.classList.add( "norm" );

        // Managing the state of Inputs block when answer is optional and text was cleared
            if ( value.length === 0 ) {

                this.setState({ fieldDescription: this.props.fieldDescription, answerIsMatched: true }, () => { this.props.updateAnswerArr( value, this.props.itemsIndex ) })
                fildDescriptionArr[this.props.itemsIndex].classList.remove( "active-description" );
                surveysInputsArr[this.props.itemsIndex].classList.remove( "notEmpty" );
                label.classList.remove( "norm" );
            }
        }
        this.props.updateAnswersStatusArr( this.state.answerIsMatched, this.props.itemsIndex )
        this.props.answerTextHandling( value );
        this.props.updateAnswerArr( value, this.props.itemsIndex )
    }

    render(){
        return (
            <div>
                <span className="question">{ this.props.question }</span>
                    <div className={"survey-input-conteiner question-" + this.props.itemsIndex} tabIndex="5">
                        <Input
                            onChange={ this.handleInputChange.bind(this) }
                            minLength={ this.props.minLengthOfText }
                            maxLength={ this.props.maxLengthOfText }
                            type='textarea'
                            label={ this.props.labelForInput }
                            s={12}
                            className="survey-input"
                            style={{ height: "180px", padding: "0", border: "none" }}
                            onInvalid={ this.props.onInvalid }
                            value={ this.state.value }
                            autoComplete="off"
                        />
                    </div>
                <span className="field-description">{ this.state.fieldDescription }</span>
                <hr />
            </div>
        );
    }
}
