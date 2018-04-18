import React, {Component} from 'react';
import {connect} from'react-redux'
import * as actions from '../actions'
import {Link} from 'react-router-dom'
class LandingPage extends Component{

    
    componentWillMount(){
        this.props.updatePolls()
    }
    
    render(){
        return(
        <div className="container">
            <Link to="/createpoll" className="btn btn-success">Create Poll</Link>
            <Link to="/mypolls" className="btn btn-primary">My Polls</Link>
            <button className="btn btn-info">View Recent polls</button>

            <ul className="list-group">
                {
                    this.props.polls.map((poll)=>{
                        return (
                            <li className="list-group-item">
                            
                                <Link to={`/viewpoll/${poll._id}`}>{poll.name}</Link>
                            </li>
                            )
                    }) 
                }
                
            </ul>

        </div>
        )
    }
}
function mapStateToProps(state){
    return {
        polls:state.polls
    }
}

export default connect(mapStateToProps,actions)(LandingPage)