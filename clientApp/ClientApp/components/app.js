import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import SignInForm from './auth/signinform'
import Header from './header'
import Signout from './auth/signout'
import Signup from './auth/signup'
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
							<Route path="/Hello" component={Hello}/>
							<Route path="/Goodbye" component={Goodbye}/>
							<Route path="/signin" component={SignInForm}/>
							<Route path="/signout" component={Signout}/>
							<Route path="/signup" component={Signup}/>
						</Switch>
					</div>
				</BrowserRouter>
			)
	}
}

export default VotingApp;