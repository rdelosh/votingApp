import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom'

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
						world
						<Route path="/Hello" component={Hello}/>
						<Route path="/Goodbye" component={Goodbye}/>
					</div>
				</BrowserRouter>
			)
	}
}

export default VotingApp;