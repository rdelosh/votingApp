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
import EditPoll from './editpoll'
import PageWrapper from './pagewrapper'


class Hello extends React.Component{
	componentDidMount(){
		setTimeout(() => {
			this.props.history.push('/')
		}, 2000);
	}
	render(){return (
				<div className="container">
				<h1>Hello!</h1>
				<h1>Welcome Back!</h1>
				
				</div>
			)}
}
class Goodbye extends React.Component{
		render(){return <h1>Goodbye</h1>}
	}

class VotingApp extends React.Component{

	
	

	render(){
		return(
				<BrowserRouter>
					<div>
						<Header />
						<Switch>
							
							{this.props.children}
							<Route path="/editpoll/:pollid" component={PageWrapper(RequireAuth(EditPoll))}/>
							<Route path="/viewpoll/:pollid" component={PageWrapper(ViewPoll)}/>
							<Route path="/createpoll" component={PageWrapper(RequireAuth(CreatePoll))}/>
							<Route path="/mypolls" component={PageWrapper(RequireAuth(MyPolls))}/>
							<Route path="/Hello" component={Hello}/>
							<Route path="/Goodbye" component={Goodbye}/>
							<Route path="/signin" component={PageWrapper(SignInForm)}/>
							<Route path="/signout" component={PageWrapper(Signout)}/>
							<Route path="/signup" component={PageWrapper(Signup)}/>
							<Route path="/" component={PageWrapper(LandingPage)}/>
						</Switch>
					</div>
				</BrowserRouter>
			)
	}
}

export default VotingApp;