import React from 'react'
import { Icon } from 'react-materialize';
import './SendToEveryone.css';

function SendToEveryone(props) {
    return (
        <div className='SendToEveryone'>
            <div className="SendToEveryone__icon"></div>
            {/* <Icon large>report_problem</Icon> */}
            <div className="SendToEveryone__text">Sending to everyone at MKB Bank</div>
        </div>
    )
}

export default SendToEveryone