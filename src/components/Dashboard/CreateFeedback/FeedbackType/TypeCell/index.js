import TypeCell from './TypeCell.js';

const buildValuesToCell = (object, username) => {
  let values;
  switch (object.type) {
    case 1:
      values = {
        text: username + ", " + object.text,
        cellStyle: "type-cell consider",
        image: object.image
      };
      break;
    case 2:
      values = {
        text: username + ", " + object.text,
        cellStyle: "type-cell continue",
        image: object.image
      };
      break;
    default:
      values = {
        text: object.text,
        cellStyle: "type-cell default",
        image: undefined
      };
      break;
  }

  return values;
};

const TypeCellContainer = (props) => {
    const values = buildValuesToCell(props.object, props.username);
    return TypeCell({
        text:values.text,
        cellStyle:values.cellStyle,
        image:values.image,
        handleClick:props.handleClick});
};

export default TypeCellContainer;
