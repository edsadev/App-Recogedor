import { SET_USER } from "../actions/index"

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
    default:
      return state
  }
}