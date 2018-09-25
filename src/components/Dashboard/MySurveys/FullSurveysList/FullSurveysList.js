import React, {Component, Fragment} from 'react';
import Card from './Card/Card';
import SurveySentButton from '../SurveySentButton/SurveySentButton'
import './FullSurveysList.css';

class FullSurveysList extends Component {
    state = {
        isSentButton: true
    }

    componentDidMount = () => {
        // console.log(this.props)
    }

    render() {
        let items = this.props.list.map((item, i) => {
            return <Card  key={item.id} config={item} index={i}/>
        })
        return(
            <div className='FullSurveysList'> 
            {items}
            {this.state.isSentButton && <SurveySentButton text='Survey sent' />}
        </div>
        )
    }
}

export default FullSurveysList