const User = require('../models/user')
const PollObject = require('../models/poll')
const OptionObject = require('../models/option')
const jwt = require('jwt-simple')
var env = process.env.NODE_ENV||'dev'
if (env=='dev') {
	var config = require('../config')
}
const Poll = PollObject.model
const Option = OptionObject.model

exports.GetPolls = function(req,res,next){
    Poll.find({}).sort({date: 'desc'}).exec(function(err, foundpolls) { 
        res.send(foundpolls)
     });

}
// /api/CreatePoll takes 2 parameters in jsonformat like this:
// {
// 	"question":"who is going to win elections?",
// 	"options":["trump2","hillary","bernie"]
// }
exports.CreatePoll = function(req,res,next){

    User.findById(decoded_id(req.headers.authorization),function(err,founduser){
        if(err){return res.send('Unexpected error happened')}
        var setOfOptions =[]
        req.body.options.map(function(data){

            var newoptions = new Option({
                name:data,
                votes:0
            })
            newoptions.save(function(err){
                if(err){return next(err)}
            })
            setOfOptions.push(newoptions)
        })

        var newpoll = new Poll({
            name:req.body.question,
            owner:founduser._id,
            options:setOfOptions
        })
        newpoll.save(function(err){
            if(err){return next(err)}
        })
        // founduser.polls.push(newpoll)
        // founduser.save(function(err){
		// 	if(err){return next(err)}
		// })
    })

    res.send("created poll succesfully")
}
//  /api/Vote takes parameter optionid, pollid and (ip||jwt token)
exports.Vote = function(req,res,next){
    if(!req.body.optionid||!req.body.pollid){return res.send('Error: Need to supply an option id')}
    
    var optionid = req.body.optionid
    var pollid = req.body.pollid
    if(req.headers.authorization){
        var userid = decoded_id(req.headers.authorization)
        //  userid = "5ac339eeda8b2741a0d2af63"
        // IF USERID ALREADY EXISTS IN POLL.USERS, THEN RES.SEND("USER ALREADY VOTED")
        Poll.findOne({_id:pollid,users:userid},function(err,foundpoll){
            if(err){return res.send('could not find a poll with that id')}
            if(foundpoll){
                return res.send('User already voted')
            }else{
                performVoting(optionid,pollid,res,{type:"userid",userid:userid})
            }

        })
        
    }else{
        var ip = req.headers["x-forwarded-for"]
        console.log(req.headers["x-forwarded-for"])
        console.log(req.headers)
        Poll.findOne({_id:pollid,ips:ip},function(err,foundpoll){
            if(err){return res.send('could not find a poll with that id')}
            if(foundpoll){
                return res.send('this IP address already voted')
            }else{
                performVoting(optionid,pollid,res,{type:"ip",ip:ip})
            }

        })


        // IF IP ALREADY EXISTS IN POLL.IPS, THEN RES.SEND("IP ALREADY VOTED")
        // performVoting(optionid,pollid,res,{type:"ip",ip:ip})
    }
}
function decoded_id(token){
    var decoded_jwt = jwt.decode(token,process.env.SECRETCODE||config.secret)
    return decoded_jwt.sub
}
function performVoting(optionid,pollid,res){
    // userid = (typeof userid === 'undefined') ? null : userid;
    var args = [].slice.call(arguments)
    var identifier = args[3]
    console.log("trolismo")
    console.log(args[3])
    

            
    Option.findById(optionid,function(err,foundoption){
        
        if(err){return res.send("Could not find option with that ID")}
        if(identifier.type==='userid'){
            
            Poll.findById(pollid,function(err,foundpoll)
            {   
                
                if(err){return res.send('could not find poll with that id')}
                
                foundpoll.users.push(identifier.userid+"")
                foundpoll.save(function(err){
                    if(err){return res.send('error while updating poll users')}
                })
            })
            
            
        }else if(identifier.type==='ip'){
            console.log('ip works')
            Poll.findById(pollid,function(err,foundpoll)
            {   
                
                if(err){return res.send('could not find poll with that id')}
                
                foundpoll.ips.push(identifier.ip+"")
                foundpoll.save(function(err){
                    if(err){return res.send('error while updating poll users')}
                })
            })

        }else{ 
            return res.send('cannot verify ip or userid in order to vote')
        }
        
        foundoption.votes=foundoption.votes+1
        
        Poll.findOneAndUpdate(
            { "_id": pollid, "options._id": optionid},
            { 
                "$set": {
                    "options.$.votes": foundoption.votes
                }
            },
            function(err,doc) {
                if(err){
                    return res.send(err)
                }
                
            }
        );

        
        
        
        foundoption.save(function(err){
            if(err){return res.send("error during updating db")}
            return res.send("Voted succesfully")
        })
    })
}
// /api/GetPoll takes a poll id as parameter
exports.GetPoll = function(req,res,next){
    
    if(!req.body.id){return res.send("error: invalid poll id")}
    console.log("req.body.id:" + req.body.id)
    Poll.findById(req.body.id,function(err,foundpoll){
        if(err){return res.send("error: cannot find poll")}
        
        res.send(foundpoll)
    })  
}
// /api/GetMyPolls   does not take any parameters, only needs jwt in headers
exports.GetMyPolls =  function(req,res,next){

    
    Poll.find({owner:decoded_id(req.headers.authorization)},function(err,foundpolls){
        if(err){return res.send("error: cannot find polls")}
        
        return res.send(foundpolls)
    })
    
}

// /api/DeletePoll  takes a poll id as parameter and also requires jwt in headers
exports.DeletePoll = function(req,res,next){
    
    if(!req.body.pollid){return res.send("error: Need to provide a poll id")}
    
    Poll.findOneAndRemove(
        { "_id": req.body.pollid,"owner":decoded_id(req.headers.authorization)},
         function(err) {
                if(err){
                    return res.send("error: could not find a poll that belongs to you with that poll id")
                }
        }
    );
    
    return res.send("deletedpoll")

}
// /api/EditPoll takes a poll id and array of new options

// {
//     "pollid": "5ad59f533700df289cc0a053",
//     "newoptions": [gauss,newton,euler]
// }
exports.EditPoll = function(req,res,next){
    if(!req.body.pollid){return res.send("error: Need to provide a poll id")}
    console.log(req.body.pollid)
    console.log(decoded_id(req.headers.authorization))
    console.log(req.body.newoptions)
    
    var setOfOptions=[]
    req.body.newoptions.map(function(data){

        var newoption = new Option({
            name:data,
            votes:0
        })
        newoption.save(function(err){
            if(err){return next(err)}
        })
        setOfOptions.push(newoption)
    })

    Poll.findOneAndUpdate({ "_id": req.body.pollid,"owner":decoded_id(req.headers.authorization)},    
    { 
        "$push": {
            "options": {"$each":setOfOptions}
        }
    },
    function(err) {
        if(err){
            return res.send("error: could not find a poll that belongs to you with that poll id")
        }else{
            return res.send("updated succesfully")
        }
    })
    
}


// exports.RemovePoll = function(req,res,next){
//     if(!req.body.id){return res.send('Error: need to supply a valid poll id')}
//     Poll.findById()
// }