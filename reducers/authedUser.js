import { SET_USER, UNSET_USER } from "../actions/index"

export default function authedUser(state = null, action){
  switch(action.type){
    case SET_USER:
      return {
        id: action.id,
        rank: action.rank,
        name: action.name,
        foto: action.foto,
        ecopuntos: action.ecopuntos
      }
    case UNSET_USER:
      return null
    default:
      return state
  }
}