
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom'


export function signinUser({email,password,history}){
	return function(dispatch){
		axios.post('/signin',{email,password})
		.then(response=>{
			console.log(response.data)
			history.push('/Hello')
		})
		.catch(()=>{
			console.log(response.data)
		})
	}
}