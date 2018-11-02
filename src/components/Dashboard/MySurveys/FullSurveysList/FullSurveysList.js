import React from 'react';
import Card from './Card/Card';
import SurveySentButton from '../SurveySentButton/SurveySentButton'
import './FullSurveysList.css';

function FullSurveysList(props) {
    // console.log(props)
  
    let items = props.list.map((item, i) => {
        return <Card  key={item.id} config={item} index={i} orgId={props.orgId}/>
    })
    return(
        <div className='FullSurveysList'> 
            {items}
            {props.isShowSendNotification && <SurveySentButton text='Válaszok elküldve!' />}
        </div>
    )
}

export default FullSurveysList