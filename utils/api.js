import axios from "axios"

export const API = process.env.API

export function loginApp (user, pass) {
  return axios({
    method: 'post',
    url: `${API}login`,
    data: {
      user,
      pass
    }
  })
}

export function registerApp (cedula, nombre, apellido, direccion, genero, correo, celular, fecha_nacimiento, usuario, contraseña, sector, foto) {
  return axios({
    method: 'post',
    url: `${API}eco-amigos`,
    data: {
      cedula,
      nombre,
      apellido,
      direccion,
      genero,
      correo,
      celular,
      fecha_nacimiento,
      usuario,
      contraseña,
      sector,
      foto,
    }
  })
}

export function updateCorreo(id, correo){
  return axios({
    method: 'post',
    url: `${API}correo-update`,
    data: {
      id,
      correo
    }
  })
}

export function updateContra(nueva_contrasena, vieja_contrasena, id){
  return axios({
    method: 'post',
    url: `${API}contrasena-update`,
    data: {
      nueva_contrasena,
      vieja_contrasena,
      id
    }
  })
}

export function updateUser(id, nombre, apellido, direccion, genero, celular, fecha_nacimiento, foto){
  return axios({
    method: 'post',
    url: `${API}eco-amigos-update`,
    data: {
      id,
      nombre,
      apellido,
      direccion,
      genero,
      celular,
      fecha_nacimiento,
      foto,
    }
  })
}