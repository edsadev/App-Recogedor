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