import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Api from '../../../../lib/api';
import SkillsTop from './SkillsTop.js';
import CompetenceCardContainer from '../Commons/SkillCard/index.js'
import NavigationBarContainer from '../../Commons/NavigationBar/index.js'
import SegmentedContainer from '../../Commons/SegmentedControl/index.js'
import EmptyStateContainer from '../../../EmptyState/index.js';
import Constants from "../../../../lib/constants";
import {spinner} from "../../../Commons/Spinner/spinner";

const createSkillsView = (sentences) => {
    return sentences.map((sentence) => {
        const { numberOfAgree, numberOfDisagree } = sentence;
        return CompetenceCardContainer({
            element: sentence,
            key:sentence._id,
            name:sentence.sentence.message,
            competenceName:sentence.skillName,
            score: (numberOfAgree / (numberOfAgree + numberOfDisagree)) * 100,
            numberOfAnswers: numberOfAgree + numberOfDisagree,
            type:"skills"});
    });
};

class SkillsTopContainer extends Component {

    constructor(props, context){
        super(props);
        this.store = context.store;
        this.state = { skills: undefined };
    }

    componentDidMount(){
        const {currentUser} = this.store.getState();
        const orgId = currentUser.orgId;
        Api.compassstatistics(orgId)
            .then((response) => { this.setState({skills: response}) })
            .catch((error) => { console.log(error) });
    }

    createNavigationBar() {
        const segmentedControl = (
            <SegmentedContainer
                options={
                    [{path: Constants.Route.SKILLS, title: 'Skills'},
                        {path: Constants.Route.SKILLS_TOP, title: 'Top'}]
                }
            />);
        return <NavigationBarContainer barContent={segmentedControl}/>
    }

    sortSkills(skills) {
        const topCount = 3;

        let sentences = skills.map((skill) => {
            let sentences = [];
            skill.sentenceScores.map((sentence) => {
                sentence.skillName = skill.skill.name;
                sentences.push(sentence);
            });
            return sentences;
        })
            .reduce((previous, current) => previous.concat(current), []);

        let sorted = sentences.sort((a, b) => parseInt(b.numberOfAgree) - parseInt(a.numberOfAgree));
        let strength, opportunities;
        if (sorted.length > topCount) {
            strength =  sorted.slice(0, topCount - 1);
            opportunities = sorted.slice(Math.max(sorted.length - 3, 1));
        } else if (sorted.length > 0 && sorted.length <= topCount) {
            strength = sorted;
            opportunities = [];
        } else {
            strength = []; opportunities = [];
        }
        return { strength: strength, opportunities: opportunities };
    }


    render() {
        const { route } = this.context.router;
        const { skills } = this.state;
        const bar = this.createNavigationBar();
        if (skills) {
            const {strength, opportunities} = this.sortSkills(skills);
            let strengthView, opportunitiesView;
            if (!strength || strength.length <= 0) {
                strengthView = (<EmptyStateContainer
                    {...this.props}
                    {...this.context}
                    container={route.location.pathname}
                    isSearch={false}
                />);
            } else {
                strengthView = createSkillsView(strength);
            }
            if (!opportunities || opportunities.length <= 0) {
                opportunitiesView = (<EmptyStateContainer
                    {...this.props}
                    {...this.context}
                    container={route.location.pathname}
                    isSearch={false}
                />);
            } else {
                opportunitiesView = createSkillsView(opportunities);
            }
            return SkillsTop({navigationBar:bar, topCards:strengthView, bottomCards:opportunitiesView});
        }else{ return spinner() }
    }
}

SkillsTopContainer.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object.isRequired
};

export default SkillsTopContainer;
