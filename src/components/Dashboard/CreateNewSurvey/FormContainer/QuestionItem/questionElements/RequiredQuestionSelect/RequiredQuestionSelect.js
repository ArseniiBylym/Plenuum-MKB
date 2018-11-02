import React, { PureComponent } from 'react';
import { Input } from 'react-materialize';

class RequiredQuestionSelect extends PureComponent {
   
    render() {
        return(
            <div className='input__question-type-select-wrapper'>
            <Input name='question_required' s={12} type='select' label="" 
                defaultValue={this.props.isRequired === 'required' ? 'required' : 'optional'} 
                onChange={this.props.onChange}
            >
                <option value='optional'>Opcionális mező</option>
                <option value='required'>Kötelező mező</option>
            </Input>
            <div className='triangle-for-question-type-select'>&#9662;</div>
        </div>
        )
    }
}

export default RequiredQuestionSelect