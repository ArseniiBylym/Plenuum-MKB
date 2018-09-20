import React from 'react';
import Message from './Message.js';

const MessageContainer = (props, context) => {
  return (
    <Message
      myStyle={props.myStyle}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.handleText}
      maxLength={props.maxLength}
      value={props.value}
    />
  );
}

export default MessageContainer;
