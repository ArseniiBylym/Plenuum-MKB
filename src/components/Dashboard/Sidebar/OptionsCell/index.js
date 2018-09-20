import OptionsCell from './OptionsCell.js';

const OptionCellContainer = (props) => {
    return OptionsCell({
        item:props.item,
        onClick:props.onClick,
        classActive:props.active ? "options-name-active" : "options-name"});
};

export default OptionCellContainer;
