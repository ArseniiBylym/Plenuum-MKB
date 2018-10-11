import React, { Component } from 'react';
import './SurveyCard.css';
import { NavLink } from 'react-router-dom';
import PlenuumBot from '../../../../resources/plenuum-bot-face.svg';
import Api from '../../../../lib/api';
import {connect} from 'react-redux';

class SurveyCard extends Component {

	state = {
		currentSurveyOwner: null
	}

	componentDidMount = () =>{
		console.log(this.props)
		const token = window.localStorage.getItem('token')
		console.log(this.props.survey.survey.owner)
		Api.getSpecificUser(token, this.props.orgId, this.props.survey.survey.owner)
			.then(response => {
				console.log(response)
				this.setState({
					currentSurveyOwner: response
				})
			})
	}
	renderPage() {
		if(!this.state.currentSurveyOwner) return null
		return (

			<div className="survey-container" key={this.props.key}>
				<div className="survey-user">
					<img alt="picture" src={`${this.state.currentSurveyOwner.pictureUrl}`} />
					<p>{this.state.currentSurveyOwner.firstName} {this.state.currentSurveyOwner.lastName}</p>
				</div>
				<div className="survey-message">
					<p>{this.props.title}</p>
				</div>
				<NavLink
					className="survey-link"
					to={{
						pathname: `/survey/${this.props.survey.survey._id}`,
						
					}}
				>
					Start Survey
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
		orgId: state.currentUser.orgId
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

