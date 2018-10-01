import React from 'react';
import './Compass.css';

const Compass=(props) => {
  return (
    <div className="compass-main-container">
      {props.cards}
      {!props.post.ready ?
        <div className="compass-buttons">
          <p className="disagree" onClick={props.disagree}>Disagree</p>
          <p className="agree" onClick={props.agree}>Agree</p>
        </div>
        :
        <div className="compass-buttons">
          <button disabled={props.disabled} className="done" onClick={props.post.action}>Kész</button>
        </div>
      }

    </div>
  );
};

export const lastCard = (image, index, marginTop) => {
  return (
    <div className="compass" key="lastcard"
      style={{ position: "absolute", marginTop: marginTop}}>
      <div className="compass-card">
        <div className='compass-ready-to-send'>
          <img alt='' src={image}/>
          <p>Thanks for helping!</p>
        </div>
      </div>
    </div>
  )
};

export const createCard = (item, total, current, action) => {
  return (
    <div className="compass-card">
      <div className="compass-card-top">
        <div className="compass-card-order">
          <p className="compass-skip"></p>
          <p className="compass-card-amount">
            {current + "/" + total}
          </p>
          <p className="compass-skip" onClick={action.bind(this, "skip", item)}>Skip</p>
        </div>
        <div>
          <p className="compass-card-sentence-title">
            {item.skill.name}
          </p>
        </div>
      </div>
      <div className="compass-card-sentence">
        <p>{item.sentence.message}</p>
      </div>
    </div>
  )
};

export default Compass;
