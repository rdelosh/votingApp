import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import SignInForm from './auth/signinform'
import Header from './header'
import Signout from './auth/signout'
import Signup from './auth/signup'
import LandingPage from './landingpage'
import ViewPoll from './viewpoll'
import CreatePoll from './createpoll'
import RequireAuth from './auth/requireAuth'
import MyPolls from './mypolls'
const Hello = () =>{
		{return <div>hello</div>}
	}

class Goodbye extends React.Component{
		render(){return <div>Goodbye</div>}
	}

class VotingApp extends React.Component{

	
	

	render(){
		return(
				<BrowserRouter>
					<div>
						<Header />
						<Switch>
							
							{this.props.children}
							<Route path="/viewpoll/:pollid" component={ViewPoll}/>
							<Route path="/createpoll" component={RequireAuth(CreatePoll)}/>
							<Route path="/mypolls" component={RequireAuth(MyPolls)}/>
							<Route path="/Hello" component={Hello}/>
							<Route path="/Goodbye" component={Goodbye}/>
							<Route path="/signin" component={SignInForm}/>
							<Route path="/signout" component={Signout}/>
							<Route path="/signup" component={Signup}/>
							<Route path="/" component={LandingPage}/>
						</Switch>
					</div>
				</BrowserRouter>
			)
	}
}

export default VotingApp;