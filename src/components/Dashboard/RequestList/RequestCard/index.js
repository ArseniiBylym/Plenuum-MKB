import RequestCard from './RequestCard.js';

const RequestCardContainer = (props) => {
    return RequestCard({
        ...props,
        key:props.key,
        user:props.user,
        linkProperties:{
            pathname: '/newfeedback',
            state: { fromRequest: props.request }
        }});
};

export default RequestCardContainer;
