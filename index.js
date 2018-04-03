var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var router = require('./routes/router')

mongoose.connect('mongodb://localhost:27017/votingApp')



app.use(morgan('combined'))
app.use(bodyParser.json({type:'*/*'}))
router(app)
// app.get('/api/signup',function(req,res){
// 	res.send({hi:'there'})
// })



app.use(express.static('./clientApp/wwwroot/'))
app.get('*',function(req,res){
	res.sendFile(path.resolve(__dirname,'clientApp','wwwroot','index.html'))
})


app.listen(3000)