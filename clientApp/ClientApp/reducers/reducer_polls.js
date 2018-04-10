import {getPolls} from '../clienthelpers/sharedfunctions'
import {UPDATE_POLLS} from '../actions/types'
import {POLL_UPDATE_ERROR} from '../actions/types'

let initialpolls = getPolls()
export default function(state=[],action){
    switch(action.type){
        case UPDATE_POLLS:
            return action.payload.data
        case POLL_UPDATE_ERROR:
            return state
    }
    return state
}