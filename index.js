var express = require('express')
var path = require('path')
var app = express()


app.use(express.static('./clientApp/wwwroot/'))
app.get('*',function(req,res){
	res.sendFile(path.resolve(__dirname,'clientApp','wwwroot','index.html'))
})


app.listen(3000)