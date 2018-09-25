import React from 'react';
import Card from './Card/Card';
import SurveySentButton from '../SurveySentButton/SurveySentButton'
import './FullSurveysList.css';

function FullSurveysList(props) {
  
    let items = props.list.map((item, i) => {
        return <Card  key={item.id} config={item} index={i}/>
    })
    return(
        <div className='FullSurveysList'> 
            {items}
            {props.isShowSendNotification && <SurveySentButton text='Survey sent' />}
        </div>
    )
}

export default FullSurveysList