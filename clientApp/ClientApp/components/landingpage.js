import React, {Component} from 'react';
import {connect} from'react-redux'
import * as actions from '../actions'
class LandingPage extends Component{

    
    componentWillMount(){
        this.props.updatePolls()
    }
    componentWillUpdate(){
        this.props.updatePolls()
    }
    render(){
        return(
        <div className="container">
            <button className="btn btn-success">Create Poll</button>
            <button className="btn btn-primary">My Polls</button>
            <button className="btn btn-info">View Recent polls</button>

            <ul className="list-group">
                {
                    this.props.polls.map((poll)=>{
                        return <li className="list-group-item">{poll.name}</li>
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