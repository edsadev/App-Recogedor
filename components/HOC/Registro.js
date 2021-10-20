import React from 'react'
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import DefaultUser from '../../utils/images/DefaultUser.png'

import { VERDE, BLANCO } from '../../utils/colors.js'
import { SafeAreaView } from 'react-native-safe-area-context'

export default class Login extends React.Component{
  state={
    image: null
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    console.log(result)

    if (!result.cancelled) {
      this.setState(() => ({
        image: result.uri
      }))
    }
  }
  render(){
    const {image} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.formulario}>
          <Text style={styles.subtitle}>Registrarse</Text>
          {image && <Image source={{ uri: image }} style={styles.avatar} />}
          {!image && <Image source={DefaultUser} style={styles.avatar} />}
          <TouchableOpacity onPress={this.pickImage}>
            <Text style={{color: VERDE, textAlign: 'center', paddingTop: 5}}>Agregar imagen</Text>
          </TouchableOpacity>
          <View style={styles.formRow}>
            <View style={styles.formRow1}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput style={styles.input}/>
            </View>
            <View style={styles.formRow2}>
              <Text style={styles.label}>Apellido</Text>
              <TextInput style={styles.input}/>
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.formRow1}>
              <Text style={styles.label}>Número de cédula</Text>
              <TextInput style={styles.input}/>
            </View>
            <View style={styles.formRow2}>
              <Text style={styles.label}>Número de celular</Text>
              <TextInput style={styles.input}/>
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.formRow1}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput style={styles.input}/>
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.formRow1}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput style={styles.input}/>
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.formRow1}>
              <Text style={styles.label}>Confirmar contraseña</Text>
              <TextInput style={styles.input}/>
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.formRow1}>
              <Text style={styles.label}>Dirección de domicilio</Text>
              <TextInput style={styles.input}/>
            </View>
          </View>
          <Text style={[{color: VERDE, paddingHorizontal: 40, marginBottom: 20}]}>Al registrarte aceptas los términos y condiciones</Text>
          <TouchableOpacity style={styles.boton}>
            <Text style={{color: BLANCO}}>Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.boton, {backgroundColor: BLANCO, marginBottom: 50}]}>
            <Text style={[{color: VERDE}]}>¿Ya tienes cuenta? ¡Ingresa!</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLANCO,
    alignItems: 'center',
  },
  boton: {
    backgroundColor: VERDE,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginVertical: 5,
    alignSelf: 'center',
  },
  formulario: {
    alignSelf: 'stretch',
  },
  formRow: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingVertical: 6,
  },
  formRow1: {
    flex: 1,
    paddingRight: 5,
  },
  formRow2: {
    flex: 1,
    paddingLeft: 5,
  },
  label: {
    fontSize: 16,
    paddingBottom: 2,
  },
  subtitle: {
    fontSize: 24,
    paddingHorizontal: 32,
    paddingTop: 50,
    paddingBottom: 20,
    textAlign: 'center'
  },
  input: {
    fontSize: 16,
    borderStyle: 'solid',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: VERDE,
    borderWidth: 1,
    borderRadius: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: VERDE,
  }
})