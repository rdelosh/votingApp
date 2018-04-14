const User = require('../models/user')
const PollObject = require('../models/poll')
const OptionObject = require('../models/option')
const jwt = require('jwt-simple')
const config = require('../config')
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
        founduser.polls.push(newpoll)
        founduser.save(function(err){
			if(err){return next(err)}
		})
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
        // IF IP ALREADY EXISTS IN POLL.IPS, THEN RES.SEND("IP ALREADY VOTED")
        performVoting(optionid,pollid,res,{type:"ip",ip:ip})
    }
}
function decoded_id(token){
    var decoded_jwt = jwt.decode(token,config.secret)
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
        }else{
            return res.send('cannot verify ip or userid in order to vote')
        }
        foundoption.votes=foundoption.votes+1
        foundoption.save(function(err){
            if(err){return res.send("error during updating db")}
            return res.send("voted succesfully")
        })
    })
}
// /api/GetPoll takes a poll id as parameter
exports.GetPoll = function(req,res,next){
    
    if(!req.body.id){return res.send("error: invalid poll id")}
    console.log("req.body.id:" + req.body.id)
    Poll.findById(req.body.id,function(err,foundpoll){
        console.log(foundpoll)
        res.send(foundpoll)
    })  
}

// exports.RemovePoll = function(req,res,next){
//     if(!req.body.id){return res.send('Error: need to supply a valid poll id')}
//     Poll.findById()
// }