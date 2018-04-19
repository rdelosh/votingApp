import React, {Component} from 'react';
import {connect} from'react-redux'
import * as actions from '../actions'
import {Link} from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class LandingPage extends Component{

    
    componentWillMount(){
        this.props.updatePolls()
    }
    
    render(){
        return(
        <div className="container ">
            
            <div className="frontcover">
                <div className="pollbuttons">
                    <Link to="/createpoll" className="btn btn-success createpoll">Create Poll</Link>
                    <Link to="/mypolls" className="btn btn-primary mypolls">My Polls</Link>
                </div>
            </div>
            <div className="frontcoverholder">

            </div>
            
            
            <h3>Recent Polls</h3>
            <ul className="list-group">
                {
                    this.props.polls.map((poll,index)=>{
                        
                        return (
                            
                            <CSSTransitionGroup 
                                transitionAppear={true}
                                transitionAppearTimeout={600}
                                transitionEnterTimeout={600}
                                transitionLeaveTimeout={600}
                                transitionName="fade">
                                    
                                        <ListItem poll={poll} wait={300+300*index*0.2}/>

                                    
                            </CSSTransitionGroup>
                            )
                        
                    }) 
                }
                
            </ul>

        </div>
        )
    }
}
class ListItem extends Component{
    constructor(props){
        super(props)
        this.state={
            hidden:"hidden"
        }
    }
    
    componentWillMount(){
        
        setTimeout(()=> {
            this.show();
        }, this.props.wait);
    }
    show() {
        this.setState({hidden : ""});
    }
    render() {
        return (
            <div className={this.state.hidden}>
                
                    <Link className="list-group-item" to={`/viewpoll/${this.props.poll._id}`}>{this.props.poll.name}</Link>
                
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