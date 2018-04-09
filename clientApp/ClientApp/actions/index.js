
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom'
import {AUTH_USER} from './types'
import {AUTH_ERROR} from './types'
import {UNAUTH_USER} from './types'

export function signinUser({email,password,history}){
	return function(dispatch){
		axios.post('/signin',{email,password})
		.then(response=>{
			console.log(AUTH_USER)
			dispatch({type:AUTH_USER})
			localStorage.setItem('token',response.data.token)
			history.push('/Hello')
		})
		.catch(()=>{
			
			dispatch(authError('bad login info'))
			
		})
	}
}
export function signupUser({email,password,history}){
	return function(dispatch){
		axios.post('/signup',{email,password})
		.then(response=>{
			dispatch({type:AUTH_USER})
			localStorage.setItem('token',response.data.token)
			history.push('/Hello')
		}).catch((response)=>{
			//console.log(response)
			dispatch(authError('Could not sign up, email might be in use'))
			
		})

		
	}
}
export function authError(error){
	return{
		type:AUTH_ERROR,
		payload:error
	}
}
export function signoutUser(){
	localStorage.removeItem('token');

	return {type:UNAUTH_USER}
}
