/** @format */

import React, { useContext } from "react";
import { Router, Route, Switch, Redirect } from "react-router";

import Home from "./components/landingPage/Home";
import RegistrationForm from "./components/RegistrationForm";
import SignIn from "./components/SignIn";
import ContactUs from "./components/ContactUs";
import Feedback from "./components/Feedback";
import "./App.css";
import RegistrationGroup from "./components/RegistrationGroup";
import DAndIRegistration from "./components/DAndIRegistration";
import SponsorHome from "./components/SponsorHome";
import Sponsorship from "./components/Sponsorship";
import RegistrationEndNavigation from "./components/RegistrationEndNavigation";
import EqualithonSelection from "./components/EqualithonSelection";
import SelectLocation from "./components/SelectLocation";
import JobInfo from "./components/JobInfo";
import EqualithonInfo from "./components/EqualithonInfo";
import CompanyRating from "./components/CompanyRating";
import ParticipantRegistration from "./components/ParticipantRegistration";
import Slack from "./components/Slack";
import Profile from "./components/Profile";
import JoinTeam from "./components/JoinTeam";
import TeamAcknowledgement from "./components/TeamAcknowledgement";
import CreateTeam from "./components/CreateTeam";
import TeamArea from "./components/TeamArea";
import YourEqualithons from "./components/YourEqualithons";
import TeamStatus from "./components/TeamStatus";
import ValidateApplicant from "./components/ValidateApplicant";
import YourAcclaim from "./components/YourAcclaim";
import DenyApplicant from "./components/DenyApplicant";
import DenyApplicantTwo from "./components/DenyApplicantTwo";

import history from "./authentication/history";
import Context from "./authentication/context";
import AuthCheck from "./authentication/authcheck";

const PrivateRoute = ({ component: Component, auth }) => (
	<Route
		render={(props) =>
			auth === true ? (
				<Component auth={auth} {...props} />
			) : (
				<Redirect to={{ pathname: "/signin" }} />
			)
		}
	/>
);

const Routes = () => {
	const context = useContext(Context);

	return (
		<div className="App">
			<Router history={history}>
				<Header />
				<br />
				<br />
				<div>
					<Switch>
						<Route path="/" exact component={RegistrationForm} />
						<Route path="/authcheck" component={AuthCheck} />
						<Route
							path="/registrationendnavigation"
							exact
							component={RegistrationEndNavigation}
						/>
						<Route path="/signin" exact component={SignIn} />
						<PrivateRoute
							path="/home"
							auth={context.authState}
							component={Home}
						/>
						<PrivateRoute
							path="/profile"
							auth={context.authState}
							component={Profile}
						/>
						<PrivateRoute
							path="/equalithon-selection"
							auth={context.authState}
							component={EqualithonSelection}
						/>
						<PrivateRoute
							path="/slack"
							auth={context.authState}
							component={Slack}
						/>
						<PrivateRoute
							path="/select-location"
							auth={context.authState}
							component={SelectLocation}
						/>
						<PrivateRoute
							path="/job-info"
							auth={context.authState}
							component={JobInfo}
						/>
						<PrivateRoute
							path="/equalithon-info"
							auth={context.authState}
							component={EqualithonInfo}
						/>
						<PrivateRoute
							path="/contact"
							auth={context.authState}
							component={ContactUs}
						/>
						<PrivateRoute
							path="/feedback"
							auth={context.authState}
							component={Feedback}
						/>
						<PrivateRoute
							path="/registration-group"
							auth={context.authState}
							component={RegistrationGroup}
						/>
						<PrivateRoute
							path="/sponsorship"
							auth={context.authState}
							component={Sponsorship}
						/>
						<PrivateRoute
							path="/sponsorhome"
							auth={context.authState}
							component={SponsorHome}
						/>
						<PrivateRoute
							path="/dandiregistration"
							auth={context.authState}
							component={DAndIRegistration}
						/>
						<PrivateRoute
							path="/company-rating"
							auth={context.authState}
							component={CompanyRating}
						/>
						<PrivateRoute
							path="/Participant-Registration"
							auth={context.authState}
							component={ParticipantRegistration}
						/>
						<PrivateRoute
							path="/profile"
							auth={context.authState}
							component={Profile}
						/>
						<PrivateRoute
							path="/joinTeam"
							auth={context.authState}
							component={JoinTeam}
						/>
						<PrivateRoute
							path="/TeamAcknowledgement"
							auth={context.authState}
							component={TeamAcknowledgement}
						/>
						<PrivateRoute
							path="/CreateTeam"
							auth={context.authState}
							component={CreateTeam}
						/>
						<PrivateRoute
							path="/TeamArea"
							auth={context.authState}
							component={TeamArea}
						/>
						<PrivateRoute
							path="/YourEqualithons"
							auth={context.authState}
							component={YourEqualithons}
						/>
						<PrivateRoute
							path="/TeamStatus"
							auth={context.authState}
							component={TeamStatus}
						/>
						<PrivateRoute
							path="/ValidateApplicant"
							auth={context.authState}
							component={ValidateApplicant}
						/>
						<PrivateRoute
							path="/YourAcclaim"
							auth={context.authState}
							component={YourAcclaim}
						/>
						<PrivateRoute
							path="/DenyApplicant"
							auth={context.authState}
							component={DenyApplicant}
						/>
						<PrivateRoute
							path="/DenyApplicantTwo"
							auth={context.authState}
							component={DenyApplicantTwo}
						/>
						<Route
							path="/callback"
							render={(props) => {
								context.handleAuth(props);
								return <Callback />;
							}}
						/>
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default Routes;
