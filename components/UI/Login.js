import React from 'react'
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, SafeAreaView} from 'react-native'

import Hojas2 from '../../utils/images/Hojas_2.png'

import { VERDE, BLANCO } from '../../utils/colors.js'
import { connect } from 'react-redux'

import { setUser } from '../../actions'

class Login extends React.Component{
  login = () => {
    if (this.correo === "esala.094@gmail.com" && this.contraseña === "123456"){
      this.props.dispatch(setUser(1, 'ecoamigo', 'Edmundo', undefined, 1000))
    } else {
      Alert.alert('Hubo un error al iniciar sesión')
    }
  }
  check = () => {
    debugger
    console.log(this.correo, this.contraseña)
  }
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.formulario}>
          <Text style={styles.subtitle}>Iniciar sesión</Text>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput 
            style={styles.input}
            placeholder="ejemplo@correo.com"
            onChangeText={(text) => this.correo = text}
          />
          <Text style={styles.label}>Contraseña</Text>
          <TextInput 
            placeholder="xxxxxxxxxxx"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => this.contraseña = text}
          />
          <TouchableOpacity onPress={this.check}>
            <Text style={styles.text}>¡Olvidé mi contraseña!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boton} onPressIn={this.login}>
            <Text style={{color: BLANCO, fontSize: 16}}>Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.boton, {backgroundColor: BLANCO}]}>
            <Text style={[{color: VERDE, fontSize: 16}]}>Registrarse</Text>
          </TouchableOpacity>
          <Image style={styles.image} source={Hojas2}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default connect()(Login)

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