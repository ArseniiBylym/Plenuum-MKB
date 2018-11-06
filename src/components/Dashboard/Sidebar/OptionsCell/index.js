import OptionsCell from './OptionsCell.js';
import { connect } from 'react-redux'

const OptionCellContainer = (props) => {
    return OptionsCell({
        item:props.item,
        onClick:props.closeSidebar,
        classActive:props.active ? "options-name-active" : "options-name"});
};

const mapDispatchToProps = dispatch => {
    return{
        closeSidebar: () => {dispatch({type: 'CLOSE'})}
    }
}

export default connect(null, mapDispatchToProps)(OptionCellContainer);
