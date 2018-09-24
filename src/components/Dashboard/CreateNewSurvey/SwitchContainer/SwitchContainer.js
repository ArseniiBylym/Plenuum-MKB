import React from 'react';
import { Input } from 'react-materialize';
import './SwitchContainer.css';

function SwitchContainer(props) {
    let isChecked = null;
    if(props.isOn) {
        isChecked = true
    } else {
        isChecked = false
    }
    console.log(isChecked)
    return(
        <div className='SwitchContainer'>
            <Input name='on' type='switch' checked={isChecked} onLabel=" " offLabel=" " value='0' onChange={props.click}/>
            <div className='SwitchContainer__text'>Send to everyone in MKB Bank</div>
        </div>
    )
}

export default SwitchContainer