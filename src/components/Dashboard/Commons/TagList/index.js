import React from 'react';
import TagContainer from './Tag/index.js';

const createTags = (features) => {
  const { selectedTags, tags, customStyle, tagClicked } = features
  return tags.map((element, index) => {
    const isSelected = selectedTags ? selectedTags.includes(element) : false;
    let myStyle;
    if (isSelected) {
      myStyle = 'tag-enabled';
    }else if (selectedTags && selectedTags.length >= 5) {
      myStyle = 'tag-disabled';
    }else{
      myStyle = 'tag-normal';
    }
    myStyle = customStyle || myStyle;
    if (typeof element === "string") {
      return undefined;
    }
    return <TagContainer
      tag={element}
      key={element._id}
      myStyle={myStyle}
      tagClicked={tagClicked ? tagClicked.bind(this, element) : undefined}
    />
  });
};

const TagList = (props, context) => {
  const features = {
    selectedTags: props.selectedTags,
    tags: props.tags,
    customStyle: props.customStyle,
    tagClicked: props.tagClicked
  };
  const tags = createTags(features);
  return(
    <div className={ props.tagsStyle || "createFeedback-feedback-tags"}>
      {tags}
    </div>
  );
};

export default TagList;
