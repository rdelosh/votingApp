import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import authReducer from './auth_reducer'
import pollReducer from './reducer_polls'

const rootReducer = combineReducers({
	form:form,
	auth:authReducer,
	polls:pollReducer
})

export default rootReducer