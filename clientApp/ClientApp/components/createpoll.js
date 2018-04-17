import React,{Component} from 'react'
import axios from 'axios'




class CreatePoll extends Component{
    constructor(props){
        super(props)
        this.state={
            topic:"",
            options:["",""]
        }
    }
    handleSubmit(event){
        console.log(this.state)
        event.preventDefault()
        
        var data ={
            "question":this.state.topic,
            "options":this.state.options
        }
        var headers = {
            'authorization':localStorage.getItem('token')+"",
            'Content-Type': 'application/json'
        }
        axios.post("/api/CreatePoll", data,
            {
                'headers':headers
            }
        )
        .then((res) => {
            console.log(res.data)
        })

        

    }
 
    modifyoption(index,event){
        var newarray = Object.assign([],this.state.options)
        newarray[index]=event.target.value
        this.setState({
            options:newarray
        })

    }
    modifytopic(event){
        this.setState({
            topic:event.target.value
        })
        
    }
    
    render(){

        

        return(
            <div className="container">
                <h1>Create Poll</h1>
                <h3>{this.state.topic}</h3>
                <form onSubmit={(event)=>{this.handleSubmit(event)}}>
                    <div className="form-group">
                        <label htmlFor="topic">Topic</label>
                        <input className="form-control" onChange={(event)=>{this.modifytopic(event)}} value={this.state.topic}
                        type="text" id="topic" name="topic"/>
                    </div>
                    
                    {
                        
                        this.state.options.map((option,index)=>{
                            return(
                                <div className="form-group">
                                    <label htmlFor={"option"+index}>{`Option ${index+1}`}</label>
                                    <input className="form-control" onChange={(event)=>{this.modifyoption(index,event)}}
                                        value={this.state.options[index]} type="text" id={`option${index}`}/>
                                    {
                                        index>=2 &&
                                        <button className="btn btn-danger" onClick={
                                            (event)=>{
                                                event.preventDefault()
                                                
                                                var newarray = Object.assign([],this.state.options)
                                                
                                                newarray.splice(index,1)
                                                
                                                this.setState({options:newarray})
                                            }
                                        }>remove this option</button>
                                        


                                        
                                            
                                        
                                    }
                                    
                                </div>
                            )
                            
                        })
                        

                    }
                    <input className="form-control btn btn-success" type="submit"/>
	    	    </form>
                <button className="btn btn-primary" onClick={()=>{
                        
                        this.setState({
                            options:this.state.options.concat("")
                        })
                    }}>add option</button>
					
            </div>
        )
    }
}
export default CreatePoll