import React, {Component} from 'react'
import axios from 'axios'

class EditPoll extends Component{
    constructor(props){
        super(props)
        this.state={
            polldata:null,
            newoptions:[]
        }
    }
    getpollid(){
        const {pollid} = this.props.match.params
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
    handleSubmit(event){
        event.preventDefault()
        var data ={
            "pollid":this.getpollid(),
            "newoptions":this.state.newoptions
        }
        var headers = {
            'authorization':localStorage.getItem('token')+"",
            'Content-Type': 'application/json'
        }
        axios.post("/api/EditPoll", data,
            {
                'headers':headers
            }
        )
        .then((res) => {
            console.log(res.data)
        })


    }
    renderform(){
        if(this.state.polldata){
            return(
                <form onSubmit={(event)=>{this.handleSubmit(event)}}>
                                <div className="form-group">
                                    <label htmlFor="topic">Topic</label>
                                    <input disabled className="form-control" value={this.state.polldata.name}
                                    type="text" id="topic" name="topic"/>
                                </div>
                    {
                        
                        this.state.polldata.options.map((option,index)=>{
                            return (
                                <div className="form-group">
                                    <label htmlFor="topic">Option {index+1}</label>
                                    <input disabled className="form-control" value={option.name}
                                    type="text" id="topic" name="topic"/>
                                </div>
                            )
                        })
                    }
                    { this.renderNewOptions()}
                    <input className="btn btn-success form-control" type="submit" value="Submit Poll Changes"/>
                </form>
            )
        }else{
            return <div>Loading...</div>
        }
    }
    renderNewOptions(){
        return (
            this.state.newoptions.map((option,index)=>{
                return (
                    <div className="form-group">
                        <label htmlFor="topic">Option {this.state.polldata.options.length +  index+1}</label>
                        <input value={this.state.newoptions[index]} onChange={(event)=>{
                            var newarray = Object.assign([],this.state.newoptions)
                            newarray[index] = event.target.value
                            this.setState({newoptions:newarray})
                            console.log(this.state.newoptions)
                            }   
                        } className="form-control" value={option}
                        type="text" id="topic" name="topic"/>

                        <button className="btn btn-danger" onClick={
                                            (event)=>{
                                                event.preventDefault()
                                                
                                                var newarray = Object.assign([],this.state.newoptions)
                                                
                                                newarray.splice(index,1)
                                                
                                                this.setState({newoptions:newarray})
                                            }
                        }>remove this option</button>
                    </div>
                )
            })
        )
    }
    render(){
        return (
            <div className="container">
                <h1>Edit Poll</h1>
                <h3>Poll Id:{this.getpollid()} </h3>
                {this.renderform()}
                
                
                
                <button className="btn btn-primary" onClick={()=>{
                    var newarray = Object.assign(this.state.newoptions)
                    newarray.push("")
                    this.setState({
                        newoptions:newarray
                    })
                }}>add options</button>
                
                

            </div>
        )
    }

    
}
export default EditPoll