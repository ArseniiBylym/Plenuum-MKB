import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Sentences from './Sentences.js';
import CompetenceCardContainer from '../Commons/SkillCard/index.js'
import DefaultNavigationBarContainer from '../../Commons/DefaultNavigationBar/index.js'
import BackButtonContainer from '../../Commons/BackButton/index.js'
import Constants from "../../../../lib/constants";
import {spinner} from "../../../Commons/Spinner/spinner";

const createSentencesView = (sentences, skillClicked) => {

  const competenceCards = sentences.map((element) => {
      const { sentence, numberOfAgree, numberOfDisagree } = element;
    return (
      <CompetenceCardContainer
        key={sentence._id}
        element={sentence}
        name={sentence.message}
        score={(numberOfAgree / (numberOfAgree + numberOfDisagree)) * 100}
        numberOfAnswers={numberOfDisagree + numberOfAgree}
        type="sentence"/>
    )
  });
  return competenceCards;
};

class SentenceContainer extends Component {

    createNavigationBar(title) {
        const backButton = <BackButtonContainer title="Back to Skills"/>;
        return <DefaultNavigationBarContainer title={title} backButton={backButton}/>
    }

    render() {
        const {route, history} = this.context.router;
        if (!route.location.state) {
            history.replace({pathname: Constants.Route.SKILLS});
            return null;
        }
        const {skill} = route.location.state;
        const sentence = skill.sentenceScores;
        const bar = this.createNavigationBar(skill.skill.name);
        if (sentence) {
            const sentencesView = createSentencesView(sentence);
            return Sentences({navigationBar: bar, sentences: sentencesView});
        } else {
            return spinner()
        }
    }
}

SentenceContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SentenceContainer;
