import { combineReducers } from 'redux'
import authedUser from './authedUser'
import rewards from './rewards'

export default combineReducers({
  authedUser,
  rewards
})