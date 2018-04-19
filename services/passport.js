const passport = require('passport')
const User = require('../models/user')
var env = 'dev'
if (process.env.NODE_ENV=='production') {
    var config = require('../config')
}
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const LocalStrategy = require('passport-local').Strategy


const localLogin = new LocalStrategy({usernameField:'email'}, function(email,password,done){
	User.findOne({email:email},function(err,user){
		if(err){return done(err)}
		if(!user){return done(null,false)}

		user.comparePassword(password,function(err,isMatch){
		if(err){return done(err)}
		if(!isMatch){return done(null,false)}

		return done(null,user)
	})

	})
	
})


const jwtOptions = {
	jwtFromRequest:ExtractJwt.fromHeader('authorization'),
	secretOrKey:process.env.SECRETCODE||config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload,done){
	User.findById(payload.sub,function(err,user){
		if(err){return done(err,false)}
		if(user){
			done(null,user);
		}else{
			done(null,fulse)
		}
	})
})
passport.use(jwtLogin)
passport.use(localLogin)