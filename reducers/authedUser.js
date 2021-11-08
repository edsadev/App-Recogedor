import { SET_USER, UNSET_USER } from "../actions/index"

export default function authedUser(state = null, action){
  switch(action.type){
    case SET_USER:
      return {
        cedula: action.cedula, 
        direccion: action.direccion, 
        genero: action.genero, 
        correo: action.correo, 
        telefono: action.telefono, 
        fecha_nacimiento: action.fecha_nacimiento, 
        rango: action.rango, 
        id: action.id, 
        nombre: action.nombre, 
        apellido: action.apellido, 
        foto: action.foto,
        ecopuntos: action.ecopuntos
      }
    case UNSET_USER:
      return null
    default:
      return state
  }
}