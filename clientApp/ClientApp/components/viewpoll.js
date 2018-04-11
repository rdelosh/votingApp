import React, {Component} from 'react'

class ViewPoll extends Component{
    
    getpollid(){
        // const {match:{params}} = this.props
        const {pollid} = this.props.match.params

        console.log(pollid)
        return pollid
    }
    render(){
        return(
            <div>
            {this.getpollid()}
            </div>
        )
    }
}
export default ViewPoll