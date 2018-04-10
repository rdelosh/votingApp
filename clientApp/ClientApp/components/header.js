import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Header extends Component{
	
	renderList(){
		
		if(this.props.authenticated){
			return(
				<li className="nav-item">
					<Link to="/signout" className="nav-link">Sign Out</Link>
				</li>
				)
		}else{
			return(
				[
					<li className="nav-item">
						<Link to="/signin" className="nav-link">Sign in</Link>
					</li>,
					<li className="nav-item">
						<Link to="/signup" className="nav-link">Sign up</Link>
					</li>

				]
				)
			
		}
		
	}
	render(){
		return(
			<nav className="navbar navbar-light">
				<div className="container">
					<Link to="/" className="navbar-brand">Voting App</Link>
					<ul className="nav navbar-nav pull-right">
						{this.renderList()}
						
					</ul>
				</div>
				
			</nav>
			)
	}
}
function mapStateToProps(state){
	return{
		authenticated:state.auth.authenticated
	}
}

export default connect(mapStateToProps)(Header)