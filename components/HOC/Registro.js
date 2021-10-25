import React, {useState} from 'react'
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Platform} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";


import DefaultUser from '../../utils/images/DefaultUser.png'

import { VERDE, BLANCO } from '../../utils/colors.js'
import { SafeAreaView } from 'react-native-safe-area-context'

export default class Login extends React.Component{
  state = {
    image: null,
    genero: 'masculino',
    date: new Date(),
    showDate: false
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
  handleChangeGender = (e) => {
    this.setState(() => ({
      genero: e
    }))
  }
  review = () => {
    console.log(this.state)
  }
  showDatePicker = () => {
    this.setState(() => ({
      showDate: true
    }))
  }
  hideDatePicker = () => {
    this.setState(() => ({
      showDate: false
    }))
  }
  handleChangeDateIOS = (value) => {
    this.setState(() => ({
      date: value,
      showDate: false
    }))
  }
  handleChangeDateAndroid = (e, value) => {
    this.setState(() => ({
      date: value,
      showDate: false
    }))
  }
  render(){
    const {image, date, showDate} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.formulario}>
          <Text style={styles.subtitle}>Registrarse</Text>
          {image && <Image source={{ uri: image }} style={styles.avatar} />}
          {!image && <Image source={DefaultUser} style={styles.avatar} />}
          <TouchableOpacity onPress={this.pickImage}>
            <Text style={{color: VERDE, textAlign: 'center', paddingTop: 15, paddingBottom: 25}}>Agregar imagen</Text>
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
          <View style={styles.formRow}>
            <View style={styles.formRow1}>
              <View>
                {Platform.OS === 'ios'
                  ? <View>
                      <Text style={styles.label}>Fecha de nacimiento</Text>
                      <View style={[styles.input, {paddingVertical: 0, paddingHorizontal: 0, flexDirection: 'row', alignItems: 'center', flex: 1}]}>
                        <TouchableOpacity style={[styles.boton, {paddingHorizontal: 20, marginVertical: 0}]} onPress={this.showDatePicker}>
                          <Text style={{color: BLANCO}}>Seleccionar fecha</Text>
                        </TouchableOpacity>
                        <Text style={{flex: 1, textAlign: 'center'}}>
                          {date 
                            ? `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` 
                            : `${(new Date()).getDate()}/${(new Date()).getMonth()+1}/${(new Date()).getFullYear()}`
                          }
                        </Text>  
                      </View>
                      <DateTimePickerModal
                        isVisible={showDate}
                        mode="date"
                        onConfirm={this.handleChangeDateIOS}
                        onCancel={this.hideDatePicker}
                      />
                    </View>
                  : <View>
                      <Text style={styles.label}>Fecha de nacimiento</Text>
                      <TouchableOpacity style={styles.input} editable={true} onPress={this.showDatePicker}>
                        <Text style={{color: "#000", paddingVertical: 8, textAlign: 'center'}}>
                          {date 
                            ? `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` 
                            : `${(new Date()).getDate()}/${(new Date()).getMonth()+1}/${(new Date()).getFullYear()}`
                          }
                        </Text>
                        {showDate && (
                          <DateTimePicker 
                            testID="dateTimePicker"
                            value={date ? date : new Date()}
                            mode={'date'}
                            display="default"
                            is24Hour={true}
                            onChange={this.handleChangeDateAndroid}
                          />
                        )}
                      </TouchableOpacity>
                  </View>
                }
              </View>
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.formRow1}>
              <Text style={styles.label}>Género</Text>
              <View style={Platform.OS === 'ios' ? [styles.input, {overflow: 'hidden', paddingHorizontal: 2, paddingVertical: 15}] : [styles.input, {overflow: 'hidden'}]}>
                <Picker
                  selectedValue={this.state.genero}
                  onValueChange={this.handleChangeGender}
                  style={Platform.OS !== 'ios' ? {marginVertical: 6} : {marginVertical: -80}}
                  itemStyle={Platform.OS === 'ios' && {fontSize: 16, }}
                >
                  <Picker.Item label="Masculino" value="masculino" />
                  <Picker.Item label="Femenino" value="femenino" />
                </Picker>
              </View>
            </View>
          </View>
          <Text style={[{color: VERDE, paddingHorizontal: 40, marginBottom: 20}]}>Al registrarte aceptas los términos y condiciones</Text>
          <TouchableOpacity style={styles.boton} onPress={this.review}>
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
    marginBottom: 5
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
    paddingBottom: 10,
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
    paddingVertical: Platform.OS === 'ios'? 8 : 3,
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