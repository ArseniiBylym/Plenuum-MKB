import React, { Component } from 'react';
import './SurveyCard.css';
import { NavLink } from 'react-router-dom';
import PlenuumBot from '../../../../resources/plenuum-bot-face.svg';
import Api from '../../../../lib/api';
import {connect} from 'react-redux';
import Profile from '../../../../resources/profile.svg'

class SurveyCard extends Component {

	state = {
		currentSurveyOwner: null,
		isCompletedCurrentSurvey: null
	}

	componentDidMount = () =>{
		// console.log(this.props)
		const token = window.localStorage.getItem('token')
		const iscompleteTemp = this.props.survey.isCompleted || this.props.surveyState.completedSurveyId == this.props.survey.survey._id
		if(this.props.survey.survey.owner == 'admin') {
			this.setState({
				currentSurveyOwner: 'admin',
				isCompletedCurrentSurvey: iscompleteTemp
			})
		}else {
			Api.getSpecificUser(token, this.props.orgId, this.props.survey.survey.owner)
			.then(response => {
				// console.log(response)
				this.setState({
					currentSurveyOwner: response,
					isCompletedCurrentSurvey: iscompleteTemp
				})
			})
		}
	}

	onClickHandler = (e) => {
		// console.log(this.props.survey.isCompleted)
		// console.log(this.props.surveyState.completedSurveyId)
		// console.log(this.props.survey.survey._id)

		// console.log(this.props.surveyState.completedSurveyId)

		if(this.props.survey.isCompleted || 
			(this.props.surveyState.completedSurveyId && this.props.surveyState.completedSurveyId == this.props.survey._id)) {
			e.preventDefault()
		}
	}

	renderPage() {
		if(!this.state.currentSurveyOwner) return null
		return (

			<div className="survey-container" key={this.props.key}>
				<div className="survey-user">
					<img alt="picture" src={this.state.currentSurveyOwner == 'admin' ? 
						`${Profile}`:
						`${this.state.currentSurveyOwner.pictureUrl}`} 
					/>
					<p>{this.state.currentSurveyOwner == 'admin' ? 
						`admin` : 	
						`${this.state.currentSurveyOwner.firstName} ${this.state.currentSurveyOwner.lastName}`}
					</p>
				</div>
				<div className="survey-message">
					<p>{this.props.title}</p>
					{this.props.survey.isCompleted || 
			(this.props.surveyState.completedSurveyId && this.props.surveyState.completedSurveyId == this.props.survey._id) && <div className='dot'>1</div>}
				</div>
				<NavLink
					className="survey-link"
					to={{
						pathname: `/survey/${this.props.survey._id}`,
						
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

