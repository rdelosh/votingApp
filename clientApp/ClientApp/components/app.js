import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import SignInForm from './auth/signinform'

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
					<Switch>
						world
						{this.props.children}
						<Route path="/Hello" component={Hello}/>
						<Route path="/Goodbye" component={Goodbye}/>
						<Route path="/signin" component={SignInForm}/>
					</Switch>
				</BrowserRouter>
			)
	}
}

export default VotingApp;