import React, { PureComponent } from 'react';
import { Input } from 'react-materialize';

class TypeQuestionSelect extends PureComponent {

    render() {
        return (
            <div className='input__question-type-select-wrapper'>
                <Input name='question_type' s={12} type='select' label=""
                    defaultValue={this.props.type === 'yes_no' ? 'yes_no' : this.props.type === '1_to_6' ? '1_to_6' : 'free_text'}
                    onChange={this.props.onChange}
                >
                    <option value='free_text'>Szabadszavas válasz</option>
                    <option value='yes_no'>Igen/nem válasz</option>
                    <option value='1_to_6'>1-től 6-ig válasz</option>
                </Input>
                <div className='triangle-for-question-type-select'>&#9662;</div>
            </div>
        )
    }
}

export default TypeQuestionSelect