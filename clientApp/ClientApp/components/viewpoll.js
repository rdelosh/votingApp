import React, {Component} from 'react'
import {Pie} from 'react-chartjs-2'
import axios from 'axios'
import {connect} from 'react-redux'


let fixedpollid=0;
class ViewPoll extends Component{
    constructor(props){
        super(props)
        this.state={
            polldata:null
        }
    
    }
    getpollid(){
        // const {match:{params}} = this.props
        const {pollid} = this.props.match.params
        fixedpollid=pollid
        // console.log(pollid)
        return pollid
    }
    
    componentDidMount(){
        axios.post("/api/GetPoll/",{
            id:this.getpollid()
        })
        .then(res => {
            console.log(res.data)
            const persons = res.data;
            this.setState({ polldata:res.data });
        })
    }
    vote(option){
        var confirm =window.confirm(`Are you sure you want to vote for ${option.name}?`)
        if(confirm){


            var data ={
                "optionid":option._id,
                "pollid":fixedpollid
            }
            var headers = {
                'authorization':localStorage.getItem('token')+"",
                'Content-Type': 'application/json'
            }
            console.log(this.props.authenticated)
            if(this.props.authenticated){
                console.log("voting authenticated")
                axios.post("/api/Vote",data,
                {
                    'headers':headers
                }
                ).then((res)=>{
                    
                        axios.post("/api/GetPoll/",{
                            id:this.getpollid()
                        })
                        .then(res => {
                            console.log(res.data)
                            const persons = res.data;
                            this.setState({ polldata:res.data });
                        })
                    
                    
                    
                })
            }else{
                console.log("voting unauthenticated")
                axios.post("/api/Vote",data)
                .then((res)=>{
                    
                        axios.post("/api/GetPoll/",{
                            id:this.getpollid()
                        })
                        .then(res => {
                            console.log(res.data)
                            const persons = res.data;
                            this.setState({ polldata:res.data });
                        })
                    
                    
                    
                })
            }



        }
    }
    polldatareceived(){
        
        if(this.state.polldata){
            let optionsnames = []
            let votes = []
            let colors = []
            let hovercolors = []
            this.state.polldata.options.map(function(polldata){
                optionsnames.push(polldata.name)
                votes.push(polldata.votes)
                colors.push("#"+Math.floor(Math.random()*16777215).toString(16));
                hovercolors.push("#"+Math.floor(Math.random()*16777215).toString(16));
            })
            console.log(optionsnames)
            console.log(votes)
            console.log(colors)
            const data = {
                labels: optionsnames,
                datasets: [{
                    data: votes,
                    backgroundColor: colors,
                    hoverBackgroundColor: hovercolors
                }]
            };

            return (
                <div className="row">
                    <div className="col-md-6">
                        <div>
                        <h3>{this.state.polldata.name}</h3>
                        </div>
                        <ul className="list-group">
                            {this.state.polldata.options.map((option)=>{
                                return (<li className="list-group-item">
                                <button onClick={()=>{
                                    this.vote(option)
                                }

                                }className="btn btn-primary btn-lg btn-block">{option.name}</button>
                                
                                    
                                </li>)
                            })}
                        </ul>

                    </div>
                    <div className="col-md-6">
                        <Pie data={data}></Pie>
                    </div>
                </div>
                
                
            )
        }else{
            return <h1>Loading...</h1>
        }
    }
    render(){
        return(
            <div className="container">
                <div>
                    {this.polldatareceived()}
                    
                </div>
            {this.getpollid()}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        authenticated:state.auth.authenticated
    }
}
export default connect(mapStateToProps)(ViewPoll)