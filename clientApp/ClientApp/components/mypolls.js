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
    render(){
        return(
            <div className="container">
                <h1>My Polls</h1>
                
                <ul className="list-group">
                {
                    
                    this.state.mypolls.map((mypoll)=>{
                        return <Link to={`/viewpoll/${mypoll._id}`} className="list-group-item">{mypoll.name}</Link>
                    })
                
                }
                </ul>
            </div>
            
        )
    }
}
export default MyPolls