import React, { Component } from 'react';
import './SentRequestCard.css';
import moment from 'moment';

class SentRequestCard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     timer: false
  //   }
  //   this.timer = false
  // }

  state = {
    timer: false
  }

  onClickHandler = (e) => {
    if(this.state.timer) {
      return
    }

    this.props.onClick()
    this.timer = true
    this.setState({
      timer: true
    })

    setTimeout(()=> {
      this.setState({
        timer: false
      })
    }, 5000)
  }

  render() {
    return (
      <div className="sentRequest-container" onClick={this.onClickHandler}>
        <div className="sentRequest-top-container">
          <div
            className="sentRequest-wing-overlap"
            style={{
              backgroundColor: this.props.type.color
            }}>
            <img alt="" src={this.props.type.image} />
          </div>
          <div className="sentRequest-content-container">
            <div className="sentRequest-content">
              <p className="sentRequest-content-message">{this.props.request.requestMessage}</p>
              <p className="sentRequest-content-recipient">{this.props.userNames}</p>
            </div>
            <div className="feedback-content-date">
              {moment(this.props.request.createdAt).format('YYYY.MM.DD • HH.mm')}
            </div>
          </div>
        </div>
        <div className='col-sm-10'></div>
      </div>
    );
  }
}

export default SentRequestCard;
