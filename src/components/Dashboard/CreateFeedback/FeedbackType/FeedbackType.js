import React from 'react';
import './FeedbackType.css';
import TypeCellContainer from './TypeCell/index.js';

export const buildDropDown = (props) => {
    const user = props.user;
    if (!props.opened){
        return (
            <div className={props.object.style}>
              <TypeCellContainer key={0} object={props.object} username={user.firstName} handleClick={props.handleClick.bind(this, props.object.type)}/>
            </div>
        );
    }else{
        const cells=props.options.map((element, index) => {
            return (<TypeCellContainer key={index} object={element} username={user.firstName} handleClick={props.handleClick.bind(this, index)}/>);
        });

        return (
            <div className="border-div-options">
                {cells}
            </div>
        );
    }
};