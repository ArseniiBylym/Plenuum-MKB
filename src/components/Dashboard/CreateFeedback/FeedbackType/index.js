import {Component} from 'react';
import Consider38 from '../../../../resources/consider-38.svg';
import Continue38 from '../../../../resources/continue-38.svg';
import {buildDropDown} from './FeedbackType';

class FeedbackTypeContainer extends Component {

    constructor(props){
        super(props);

        this.options = [{
            color: 'rgba(0, 0, 0, 0.3)',
            image: undefined,
            text: "Visszajelzés típusa",
            type: 0,
            style: "border-div-single"
        },{
            color: '#f4d141',
            image: Consider38,
            text: "fontold meg",
            type: 1,
            style: "type-cell-selected consider"
        },{
            color: '#00d6a5',
            image: Continue38,
            text: "így tovább",
            type: 2,
            style: "type-cell-selected continue"
        }
        ];
        this.state = {
            opened: false,
            object: this.options[0]
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index){
        if (this.props.handleFeedbackType !== undefined && index !== 0) {
            this.props.handleFeedbackType(index);
        }
        if (index === 0 && this.state.object === this.options[0]) {
            this.setState({opened: !this.state.opened});
        }else if(index !== 0){
            this.setState({opened: !this.state.opened, object: this.options[index]});
        }else{
            this.setState({opened: !this.state.opened});
        }
    }

    render(){
        const dropDown = buildDropDown({opened:this.state.opened,
            object:this.state.object,
            handleClick:this.handleClick,
            options:this.options,
            user:this.props.user});
        return (
            dropDown
        );
    }
}

export default FeedbackTypeContainer;
