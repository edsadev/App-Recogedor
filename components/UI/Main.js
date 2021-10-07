import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

import Logo from '../../utils/images/Logo.png'
import Fondo from '../../utils/images/Mancha.png'
import Hojas from '../../utils/images/Hojas.png'

import { CELESTE, VERDE, BLANCO } from '../../utils/colors.js'

export default class Login extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Image source={Hojas} style={styles.imageTop}/>
        <Image source={Logo}/>
        <Text style={{color: VERDE}}>Bienvenido/a a tu ecotienda online</Text>
        <TouchableOpacity style={styles.boton}>
          <Text style={{color: BLANCO}}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton}>
          <Text style={{color: BLANCO}}>Registrarse</Text>
        </TouchableOpacity>
        <Image source={Fondo} style={styles.imageBottom}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CELESTE,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 150,
  },
  boton: {
    backgroundColor: VERDE,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  imageTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  imageBottom: {
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
  },
})