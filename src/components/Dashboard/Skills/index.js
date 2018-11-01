import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Api from '../../../lib/api.js';
import {EnvVariable} from '../../../config';
import Skills from './Skills.js';
import CompetenceCardContainer from './Commons/SkillCard/index.js'
import NavigationBarContainer from '../Commons/NavigationBar/index.js'
import SegmentedContainer from '../Commons/SegmentedControl/index.js'
import EmptyStateContainer from '../../EmptyState/index.js';
import Constants from "../../../lib/constants";
import {spinner} from "../../Commons/Spinner/spinner";

const ReactGA = require('react-ga');

ReactGA.initialize(EnvVariable.googleAnalyticsId);

const createSkillsView = (skills, skillClicked) => {

    return skills.map((element) => {
        const { skill, sentenceScores } = element;

        const sentenceNumbers =  sentenceScores.map((sentence) => {
            return { agree: sentence.numberOfAgree, disagree: sentence.numberOfDisagree}
        });

        const results = sentenceNumbers.reduce((previous, current) => {
            previous.agree += current.agree;
            previous.disagree += current.disagree;
            return previous;
        }, {agree: 0, disagree:0});

        const numberOfAnswers = results.agree + results.disagree;
        const score = ( results.agree / numberOfAnswers ) * 100;

        return CompetenceCardContainer({
            element,
            key:element._id,
            name:skill.name,
            score,
            numberOfAnswers,
            skillClicked,
            type:"skills"
        });
    });
};


class SkillsContainer extends Component {

    constructor(props, context){
        super(props);
        this.store = context.store;
        this.state = { skills: undefined };
        this.skillClicked = this.skillClicked.bind(this);
    }

    componentDidMount(){
        const {currentUser} = this.store.getState();
        const orgId = currentUser.orgId;
        Api.compassstatistics(orgId)
            .then((response) => {this.setState({ skills: response })})
            .catch((error) => { console.log(error) });
    }

    skillClicked(skill) {
        let { history } = this.context.router;
        history.push({pathname: Constants.Route.SKILLS_SENTENCES, state:{skill:skill}});
        ReactGA.event({
            category: 'UI',
            action: 'Click',
            label: 'Skill card click'
        });
    }

    createNavigationBar() {
        const segmentedControl = (
            <SegmentedContainer
                options={
                    [{path: Constants.Route.SKILLS_BASE, title: 'Készségek'},
                        {path: Constants.Route.SKILLS_TOP, title: 'Top'}]
                }
            />);
        return <NavigationBarContainer barContent={segmentedControl}/>
    }

    render(){
        const { route } = this.context.router;
        const { skills } = this.state;
        const bar = this.createNavigationBar();
        if (skills){
            let skillsView;
            if (skills && skills.length > 0) {
                skillsView = createSkillsView(skills, this.skillClicked);
            } else {
                skillsView = (<EmptyStateContainer
                    {...this.props}
                    {...this.context}
                    container={route.location.pathname}
                    isSearch={false}
                />);
            }
            return (
                <Skills navigationBar={bar} competenceCards={skillsView}/>
            )
        }else{ return spinner() }
    }
}

SkillsContainer.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object.isRequired
};

export default SkillsContainer;
