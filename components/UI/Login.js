import React from 'react'
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native'

import Hojas2 from '../../utils/images/Hojas_2.png'

import { VERDE, BLANCO } from '../../utils/colors.js'

export default class Login extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.formulario}>
          <Text style={styles.subtitle}>Iniciar sesión</Text>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput 
            style={styles.input}
            placeholder="ejemplo@correo.com"
          />
          <Text style={styles.label}>Contraseña</Text>
          <TextInput 
            placeholder="xxxxxxxxxxx"
            style={styles.input}
            secureTextEntry={true}
          />
          <TouchableOpacity>
            <Text style={styles.text}>¡Olvidé mi contraseña!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boton}>
            <Text style={{color: BLANCO, fontSize: 16}}>Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.boton, {backgroundColor: BLANCO}]}>
            <Text style={[{color: VERDE, fontSize: 16}]}>Registrarse</Text>
          </TouchableOpacity>
          <Image style={styles.image} source={Hojas2}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BLANCO,
    paddingTop: 100,
  },
  boton: {
    backgroundColor: VERDE,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginVertical: 10,
    alignSelf: 'center',
  },
  formulario: {
    flex: 1,
    alignSelf: 'stretch',
  },
  subtitle: {
    fontSize: 24,
    paddingHorizontal: 32,
    paddingTop: 50,
    paddingBottom: 20
  },
  label: {
    fontSize: 16,
    paddingHorizontal: 48,
    paddingTop: 10,
    paddingBottom: 2,
  },
  text: {
    paddingHorizontal: 48,
    paddingBottom: 20,
    textAlign: 'right'
  },
  input: {
    fontSize: 16,
    marginHorizontal: 48,
    marginVertical: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderStyle: 'solid',
    borderColor: VERDE,
    borderWidth: 1,
    borderRadius: 25,
  },
  image: {
    position: 'absolute',
    bottom: 0,
    right: 10,
  }
})