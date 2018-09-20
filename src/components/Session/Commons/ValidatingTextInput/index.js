import {Component} from 'react';
import ValidatingTextInput from './ValidatingTextInput.js';
import PropTypes from 'prop-types';

class ValidatingTextInputContainer extends Component {

  constructor(props){
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      label: props.label,
      name:props.name,
      type: props.type,
      onTextChange: props.onChange,
      errorClass: props.errorClass || "",
      showErrors:props.showErrors,
      onFocusChange:props.onFocusChange
    }
  }

  onFocus(e){
    this.setState({showErrors:false, errorClass : "focus"});
    this.state.onFocusChange(e);
  }

  onBlur(e) {
    this.setState({showErrors:true, errorClass : ""});
  }

  onChange(e){
    this.setState({showErrors:false, errorClass : "focus"});
    this.state.onTextChange(e);
  }

  render(){
    const styleClass = this.props.errorMessage ? "error" : this.state.errorClass;
    return ValidatingTextInput({
        label:this.state.label,
        onFocus:this.onFocus,
        onBlur:this.onBlur,
        onChange:this.onChange,
        name:this.state.name,
        type:this.state.type,
        errorClass:styleClass,
        errorMessage:this.props.errorMessage});
  }
}

ValidatingTextInputContainer.contextTypes = {
  store: PropTypes.object
}

export default ValidatingTextInputContainer;
