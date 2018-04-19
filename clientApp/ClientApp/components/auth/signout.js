import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Signout extends Component{
    componentWillMount(){
        this.props.signoutUser()
        setTimeout(() => {
            this.props.history.push('/')
        }, 2000);
    }
    render(){
        return <div className="container">
        <h1>Sorry to see you go</h1></div>
    }
}

export default connect(null,actions)(Signout)
