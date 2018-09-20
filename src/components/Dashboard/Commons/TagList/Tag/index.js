import React from 'react';
import Tag from './Tag.js';

const TagContainer = (props) => {
  return(
    <Tag
      title={props.tag.title}
      myStyle={props.myStyle}
      tagClicked={props.tagClicked}
    />
  );
};

export default TagContainer;
