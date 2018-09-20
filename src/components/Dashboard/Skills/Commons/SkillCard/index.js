import CompetenceCard from './SkillCard.js';

const CompetenceCardContainer = (props) => {
    const { element, numberOfAnswers, score, type, skillClicked, name, competenceName } = props;
    return CompetenceCard({
        element,
        score,
        name,
        numberOfAnswers,
        competenceName,
        skillClicked:skillClicked && numberOfAnswers ? skillClicked.bind(this, element) : undefined,
        type});
};

export default CompetenceCardContainer;
