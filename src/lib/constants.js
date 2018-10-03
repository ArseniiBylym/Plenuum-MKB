
    const FeedbackPrivacy = {
        PRIVATE: "PRIVATE",
        ANONYMOUS: "ANONYMOUS"
    };

    const FeedbackType = {
        CONSIDER: "CONSIDER",
        CONTINUE: "CONTINUE"
    };

    const Route = {
        LOGIN: "/login",
        SKILLS: "/skills",
        SKILLS_SENTENCES: "/skills/sentences",
        SKILLS_TOP: "/top",
        FEEDBACK: "/feedback",
        FEEDBACK_INCOMING: "/feedback/incoming",
        FEEDBACK_SENT: "/feedback/sent",
        SENT_REQUESTS: "/feedback/sentrequests",
        CREATE_COMPASS: "/compass",
        NEW_FEEDBACK: "/newfeedback",
        NEW_REQUEST: "/newrequest",
        PROFILE: "/profile",
        INTERACT: "/interact",
        NOT_FOUND: "/404",
        SET_NEW_PASSWORD: "/set_new_password",
        RESET_PASSWORD: "/reset_password",
        RESET_CONFIRMATION: "/reset_confirmation",
        SURVEY: "/survey",
        PRIVACY: "/privacy",
        MY_SURVEYS: '/my_surveys',
        CREATE_NEW_SURVEY: '/my_surveys/create_new_survey',
        CREATE_NEW_SURVEY_TEMPLATE: '/my_surveys/create_new_survey/template',
    };

    const ReducersActionType = {
        ADD_SELECTED_USER: "ADD_SELECTED_USER",
        REMOVE_SELECTED_USER: "REMOVE_SELECTED_USER",
        ADD_CURRENT_USER: "ADD_CURRENT_USER",
        REMOVE_CURRENT_USER: "REMOVE_CURRENT_USER",
        SET_USER_PICTURE: "SET_USER_PICTURE",
        FORGET_ME: "FORGET_ME",
        ADD_BASIC_COMPASS_STRUCTURE: "ADD_BASIC_COMPASS_STRUCTURE",
        NO_CONNECTION_COMPASS: "NO_CONNECTION_COMPASS",
        ADD_SENTENCE_COMPASS: "ADD_SENTENCE_COMPASS",
        SET_ANSWER_COMPASS: "SET_ANSWER_COMPASS",
        RESTART_COMPASS: "RESTART_COMPASS",
        SAVE_FRESH_COMPASS: "SAVE_FRESH_COMPASS",
        POPULATE_SURVEYS: "POPULATE_SURVEYS",
        CREATE_NEW_SURVEY: "CREATE_NEW_SURVEY",
        CLEAR_SURVEY_HAS_SENDED: "CLEAR_SURVEY_HAS_SENDED",
        COMPLETE_SURVEY: "COMPLETE_SURVEY",
        CLEAR_ANSWER_SENT_MESSAGE: "CLEAR_ANSWER_SENT_MESSAGE",
        ADD_USERS_MANAGER: "ADD_USERS_MANAGER"
    };

    export const Colors = {
        Consider:'#f5d141',
        Continue:'#00D6A5'
    };

    const RegexExpressions = {
        emailChecking: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };

    const Constants = ({
        FeedbackType,
        FeedbackPrivacy,
        Route,
        ReducersActionType,
        RegexExpressions
    });

    export default Constants;
