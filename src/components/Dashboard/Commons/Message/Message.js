import React from 'react';
import './Message.css';

const Message = (props) => {
  return (
    <div className="message-container" >
      <textarea className={props.myStyle} name={props.name} placeholder={props.placeholder} onChange={props.onChange} maxLength={props.maxLength} defaultValue={props.value} />
    </div>
  );
};

export default Message;
