import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../components/Session/Login/index';
import Dashboard from '../components/Dashboard/index';
import ResetPassword from '../components/Session/ResetPassword/index';
import ResetConfirmation from '../components/Session/ResetPassword/Confirmation/index';
import SetPasswordContainer from '../components/Session/SetPassword/index';
import SetPasswordConfirmationContainer from '../components/Session/SetPassword/Confirmation/index';
import EmptyStateContainer from '../components/EmptyState/index';
import Constants from "../lib/constants";
import CreateFeedbackContainer from '../components/Dashboard/CreateFeedback/index';
import CreateFeedbackRequestContainer from '../components/Dashboard/CreateFeedbackRequest/index';
import FeedbackDetailContainer from '../components/Dashboard/FeedbackDetail/index';
import CompassContainer from '../components/Dashboard/Compass/index';
import RequestListContainer from '../components/Dashboard/RequestList/index';

import SurveyConteiner from '../components/Dashboard/SurveyConteiner/index';

import SkillsContainer from '../components/Dashboard/Skills/index';
import SkillsTopContainer from '../components/Dashboard/Skills/Top/index';
import SentenceContainer from '../components/Dashboard/Skills/Sentences/index';
import ProfileSettingsContainer from '../components/Dashboard/ProfileSettings/index';
import MyContentContainer from '../components/Dashboard/MyFeedbacks/index';
import PrivacyPolicy from '../components/Dashboard/PrivacyPolicy/index';

import MySurveys from '../components/Dashboard/MySurveys/MySurveys';
import CreateNewSurvey from '../components/Dashboard/CreateNewSurvey/CreateNewSurvey'
import SurveyDetails from '../components/Dashboard/SurveyDetails/SurveyDetails'
import SurveyForm from '../components/Dashboard/SurveyForm/SurveyForm';
import CreateNewSurveyTemplate from '../components/Dashboard/CreateNewSurveyTemplate/CreateNewSurveyTemplate';
import MyTeam from '../components/Dashboard/MyTeam/MyTeam';


const MainRoute = (params) => (
    <BrowserRouter onUpdate={params.logPageView()}>
        <Switch >
            <Route path={Constants.Route.LOGIN} exact component={Login} />
            <Route exact path={Constants.Route.RESET_PASSWORD} component={ResetPassword} />
            <Route exact path="/set_password_confirmation/:type" component={SetPasswordConfirmationContainer}/>
            <Route exact path={Constants.Route.RESET_CONFIRMATION} component={ResetConfirmation} />
            <Route exact path={Constants.Route.SET_NEW_PASSWORD} component={SetPasswordContainer} />
            <Route exact path={Constants.Route.NOT_FOUND} component={EmptyStateContainer} />
            <Route path="/" component={Dashboard} />
            <Redirect from='' to='/' />
            <Redirect from='*' to={Constants.Route.NOT_FOUND} />
        </Switch>
    </BrowserRouter>
);

const addPropsToComponent = ({MyComponent, rest}) => {
    return (<MyComponent {...rest}/> );
};

const DashboardRoutes = (params) => (
    <Switch >
        <Route exact path={Constants.Route.CREATE_COMPASS} render={(props) => (addPropsToComponent({
            MyComponent: CompassContainer,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>
        <Route exact path={Constants.Route.SKILLS} render={(props) => (addPropsToComponent({
            MyComponent: SkillsContainer,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>
        <Route exact path={Constants.Route.SKILLS_TOP} render={(props) => (addPropsToComponent({
            MyComponent: SkillsTopContainer,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>
        <Route exact path={Constants.Route.SKILLS_SENTENCES} render={(props) => (addPropsToComponent({
            MyComponent: SentenceContainer,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>
        <Route exact path={Constants.Route.NEW_FEEDBACK} render={(props) => (addPropsToComponent({
            MyComponent: CreateFeedbackContainer,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>
        <Route exact path={Constants.Route.NEW_REQUEST} render={(props) => (addPropsToComponent({
            MyComponent: CreateFeedbackRequestContainer,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>
        <Route exact path={Constants.Route.PROFILE} render={(props) => (addPropsToComponent({
            MyComponent: ProfileSettingsContainer,
            rest: {
                handleLogout: params.handleLogout,
                addNotification: params.addNotification,
                setProfilePicture: params.setProfilePicture
            }
        }))}/>
        <Route path={Constants.Route.FEEDBACK} render={(props) => (addPropsToComponent({
            MyComponent: MyContentContainer,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>
        <Route exact path="/feedback/:type/:id" render={(props) => (addPropsToComponent({
            MyComponent: FeedbackDetailContainer,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>

        <Route exact path={Constants.Route.INTERACT} render={(props) => (addPropsToComponent({
            MyComponent: RequestListContainer,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>

        <Route exact path={Constants.Route.SURVEY} render={(props) => (addPropsToComponent({
            MyComponent: SurveyConteiner,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>

        <Route exact path='/survey/:id' render={(props) => (addPropsToComponent({
            MyComponent: SurveyForm,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>

        <Route exact path={Constants.Route.PRIVACY} render={(props) => (addPropsToComponent({
            MyComponent: PrivacyPolicy
        }))}/>

        <Route exact path={Constants.Route.MY_SURVEYS} render={(props) => (addPropsToComponent({
            MyComponent: MySurveys,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>
        <Route exact path={Constants.Route.CREATE_NEW_SURVEY} render={(props) => (addPropsToComponent({
            MyComponent: CreateNewSurvey,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>
        <Route exact path={Constants.Route.CREATE_NEW_SURVEY_TEMPLATE} render={(props) => (addPropsToComponent({
            MyComponent: CreateNewSurveyTemplate,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>
        <Route exact path='/my_surveys/:id' render={(props) => (addPropsToComponent({
            MyComponent: SurveyDetails,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>
         <Route exact path={Constants.Route.MY_TEAM} render={(props) => (addPropsToComponent({
            MyComponent: MyTeam,
            rest: {handleLogout: params.handleLogout, addNotification: params.addNotification}
        }))}/>


        <Redirect exact from='/' to={Constants.Route.INTERACT}/>
        <Redirect from='*' to={Constants.Route.NOT_FOUND}/>
    </Switch>
);

export default MainRoute;
export { DashboardRoutes };
