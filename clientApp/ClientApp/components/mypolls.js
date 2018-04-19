import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class MyPolls extends Component{
    constructor(props){
        super(props)  
        this.state={
            mypolls:[]
        } 
    }
    componentDidMount(){
        
        var headers = {
            'authorization':localStorage.getItem('token')+"",
            'Content-Type': 'application/json'
        }
        axios.post("/api/GetMyPolls", {},
            {
                'headers':headers
            }
        ).then(res=>{
            console.log(res.data)
            this.setState({
                mypolls:res.data
            })
        })

    }
    deletePoll(pollid){
        console.log(pollid)

        var data ={
            "pollid":pollid
        }
        var headers = {
            'authorization':localStorage.getItem('token')+"",
            'Content-Type': 'application/json'
        }
        axios.post("/api/DeletePoll", data,
            {
                'headers':headers
            }
        )
        .then((res) => {
            console.log(res.data)
        })
    }
    render(){
        return(
            <div className="container">
                <h1>My Polls</h1>
                
                <ul className="list-group">
                {
                    
                    this.state.mypolls.map((mypoll)=>{
                        return (
                            <li className="list-group-item">
                                {mypoll.name}
                                <Link to={`/viewpoll/${mypoll._id}`} className="btn btn-primary pull-right">View Poll</Link>   
                                <Link to={`/editpoll/${mypoll._id}`} className="btn btn-warning pull-right">Edit Poll</Link>   
                                <button onClick={()=>{this.deletePoll(mypoll._id)}} className="btn btn-danger pull-right">DeletePoll</button>   
                            </li>

                        )
                    })
                
                }
                </ul>
            </div>
            
        )
    }
}
export default MyPolls