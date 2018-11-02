import React, { Component } from 'react';
import './SurveyCard.css';
import { NavLink } from 'react-router-dom';
import PlenuumBot from '../../../../resources/plenuum-bot-face.svg';
import Api from '../../../../lib/api';
import {connect} from 'react-redux';
import Profile from '../../../../resources/profile.svg';
import moment from 'moment';

class SurveyCard extends Component {


	componentDidMount = () =>{
		console.log(this.props)
	
	}

	onClickHandler = (e) => {
		// if(this.props.survey.isCompleted || 
		// 	(this.props.surveyState.completedSurveyId && this.props.surveyState.completedSurveyId == this.props.survey._id)) {
		// 	e.preventDefault()
		// }
	}

	renderPage() {
		// if(!this.state.currentSurveyOwner) return null
		return (

			<div className="survey-container" key={this.props.key}>
				<div className="survey-user">
					<div className='picture-wrapper'>
						<div className='picture-wrapper--img' style={{backgroundImage: `url(${this.props.survey.survey.owner == 'admin' ? 
							Profile :
							this.props.surveyOwner.pictureUrl ?
							this.props.surveyOwner.pictureUrl :
							Profile})`}}
						></div>
						<img alt="picture" src={this.props.survey.survey.owner == 'admin' ? 
							`${Profile}`:
							this.props.surveyOwner.pictureUrl ?
							`${this.props.surveyOwner.pictureUrl}` :
							`${Profile}`} 
						/>
					</div>
					<p>{this.props.surveyOwner == 'admin' ? 
						`admin` : 	
						`${this.props.surveyOwner.firstName} ${this.props.surveyOwner.lastName}`}
					</p>
				</div>
				<div className="survey-message">
					<p>{this.props.title}</p>
				</div>
				<div className='feedback-content-date interact-card'>
						{moment(this.props.survey.createdAt).format('YYYY.MM.DD • HH.mm')}
				</div>
				<NavLink
					className="survey-link"
					to={{
						pathname: `/interact/survey/${this.props.survey._id}`,
						
					}}
					onClick={this.onClickHandler}
				>
					Kérdőív kitöltése
     			</NavLink>
			</div>
		);
	}
	render() {
		return (
			<div>
				{this.renderPage()}
			</div>
		)
	}

};

const mapStateToProps = state => {
	return{
		orgId: state.currentUser.orgId,
		surveyState: state.incomingSurveys
	}
}

export default connect(mapStateToProps, null)(SurveyCard);



// import React from 'react';
// import './SurveyCard.css';
// import { NavLink } from 'react-router-dom';
// import PlenuumBot from '../../../../resources/plenuum-bot-face.svg';

// const SurveyCard = (props) => {
//   function onClickHandler (e) {
//     if(props.survey.completed) {
//       e.preventDefault()
//     }
//   }
//   return (
//     <div className="survey-container" key={props.survey._id}>
//       <div className="survey-user">
//         <img alt="" src={props.survey.sender.pictureUrl} />
//         <p>{props.survey.sender.firstName} {props.survey.sender.lastName}</p>
//       </div>
//       {/* {props.survey.completed && <div className='dot' />} */}
//       <div className="survey-message">
//         <p>{ props.survey.title }</p>
//         {props.survey.completed && <div className='dot'>1</div>}
//       </div>
//       <NavLink
//         className="survey-link"
//         to={{
//           pathname: props.linkProperties.pathname,
//         }}
//        onClick={onClickHandler}
//       >
//         Start Survey
//       </NavLink>
//     </div>
//   );
// };

// export default SurveyCard;

