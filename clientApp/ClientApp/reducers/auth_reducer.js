import {AUTH_USER} from '../actions/types'
import {UNAUTH_USER} from '../actions/types'
import {AUTH_ERROR} from '../actions/types'

export default function(state={},action){
	switch(action.type){
		case AUTH_USER:
			return {authenticated:true,error:''};
		case UNAUTH_USER:
			return {authenticated:false,error:''}
		case AUTH_ERROR:
			console.log(action.payload)
			return {authenticated:false,error:action.payload}
	}

	return state
}