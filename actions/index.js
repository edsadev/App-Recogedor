export const SET_USER = 'SET_USER'
export const UNSET_USER = 'UNSET_USER'

export const SET_REWARD = 'SET_REWARD'
export const UNSET_REWARD = 'UNSET_REWARD'

export function setUser (id, rank, name, foto, ecopuntos) {
  return {
    type: SET_USER,
    id, rank, name, foto, ecopuntos
  }
}

export function unsetUser () {
  return {
    type: UNSET_USER,
  }
}

export function setReward (id, name, ecopuntos) {
  return {
    type: SET_REWARD,
    id, name, ecopuntos
  }
}

export function unsetReward (){
  return {
    type: UNSET_REWARD
  }
}
