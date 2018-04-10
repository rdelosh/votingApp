const Authentication = require('../controllers/authentication')
const passportService = require('../services/passport')
const passport = require('passport')
const PollController = require('../controllers/PollController')


const requireAuth = passport.authenticate('jwt',{session:false})
const requireSignin = passport.authenticate('local',{session:false})
module.exports = function(app){
	app.get('/api/GetPolls',PollController.GetPolls)
	app.post('/api/CreatePoll',requireAuth,PollController.CreatePoll)
	app.post('/api/Vote',PollController.Vote)
	app.post('/api/GetPoll',PollController.GetPoll)
	app.post('/signin',requireSignin,Authentication.signin)
	app.post('/signup',Authentication.signup)
}