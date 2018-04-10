import axios from 'axios'
function getPolls(){
    axios.get("/api/GetPolls")
    .then((polls)=>{
        return polls
    }).catch(err=>{
        return {}
    })
        
    
    
}

export {getPolls}