import React from 'react'
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Platform, StatusBar, NativeModules, LayoutAnimation, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";


import DefaultUser from '../../utils/images/DefaultUser.png'
import Separador from '../../utils/images/Separador.png'

import { VERDE, BLANCO, CELESTE } from '../../utils/colors.js'
import { SafeAreaView } from 'react-native-safe-area-context'

import { _validateContra, _validateEmail } from '../../utils/helpers';

const { UIManager } = NativeModules;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default class Login extends React.Component{
  state = {
    image: null,
    genero: 'masculino',
    date: new Date('07/31/1999'),
    showDate: false,
    bloqueCorreo: false,
    bloqueContra: false,
    email: '',
    isEmail: false
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
  handleBloque = (bloque) => {
    LayoutAnimation.easeInEaseOut()
    if (bloque === 'BloqueCorreo'){
      this.setState(() => (
        this.state.bloqueCorreo === false
          ? {bloqueCorreo: true}
          : {bloqueCorreo: false}
      ))
    } else if(bloque ==='BloqueContra') {
      this.setState(() => (
        this.state.bloqueContra === false
          ? {bloqueContra: true}
          : {bloqueContra: false}
      ))
    }
  }
  handleChangeGender = (e) => {
    this.setState(() => ({
      genero: e
    }))
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
  handleChangeEmail = () => {
    if (this.state.isEmail){
      this.props.navigation.navigate('Mensaje', {mensaje: 'Se ha enviado un correo de confirmación al nuevo correo'})
    } else {
      Alert.alert('El correo ingresado no es correcto, revisa nuevamente')
    }
  }
  handleChangeContra = (contra, newContra) => {
    if(_validateContra(contra, newContra)){
      this.props.navigation.navigate('Mensaje', {mensaje: 'Se ha enviado un correo de confirmación a tu correo'})
    }
  }
  render(){
    const {image, date, showDate} = this.state
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        {Platform.OS === 'ios' && <StatusBar 
          barStyle={'dark-content'}
        />}
        <ScrollView style={styles.formulario}>
          {image && <Image source={{ uri: image }} style={styles.avatar} />}
          {!image && <Image source={DefaultUser} style={styles.avatar} />}
          <TouchableOpacity onPress={this.pickImage}>
            <Text style={{color: VERDE, textAlign: 'center', paddingTop: 15, paddingBottom: 25}}>Cambiar imagen</Text>
          </TouchableOpacity>
          <View style={styles.formRow}>
            <View style={[styles.formRow1, {flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between'}]}>
              <Text style={[styles.label, {flex: 1}]}>Correo electrónico</Text>
              <TouchableOpacity style={[styles.input, {flex: 1, backgroundColor: VERDE}]} onPress={() => this.handleBloque('BloqueCorreo')}>
                <Text style={{padding: 5, textAlign: 'center', color: BLANCO}}>Cambiar correo</Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.bloqueCorreo && 
            <View style={[{backgroundColor: BLANCO, marginHorizontal: 20, borderRadius: 20, paddingVertical: 20, marginVertical: 20}, this.state.bloqueCorreo]}>
              <View style={styles.formRow}>
                <View style={styles.formRow1}>
                  <Text style={styles.label}>Correo actual</Text>
                  <TextInput style={styles.innerBloqueInput} editable={false} value={'esala.094@gmail.com'}/>
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formRow1}>
                  <Text style={styles.label}>Nuevo correo</Text>
                  <TextInput 
                    style={styles.innerBloqueInput}
                    onChangeText={(text) => _validateEmail(text, (data) => {
                      this.setState(() => ({
                        email: data.email,
                        isEmail: data.isEmail
                      }))
                    })}
                    value={this.state.email}
                  />
                </View>
              </View>
              <TouchableOpacity style={[styles.input, {backgroundColor: VERDE, marginHorizontal: 40}]} onPress={this.handleChangeEmail}>
                <Text style={{padding: 5, textAlign: 'center', color: BLANCO}}>Guardar cambio</Text>
              </TouchableOpacity>
            </View>
          }
          <View style={styles.formRow}>
            <View style={[styles.formRow1, {flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between'}]}>
              <Text style={[styles.label, {flex: 1}]}>Contraseña</Text>
              <TouchableOpacity style={[styles.input, {flex: 1, backgroundColor: VERDE}]} onPress={() => this.handleBloque('BloqueContra')}>
                <Text style={{padding: 5, textAlign: 'center', color: BLANCO}}>Cambiar contraseña</Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.bloqueContra && 
            <View style={[{backgroundColor: BLANCO, marginHorizontal: 20, borderRadius: 20, paddingVertical: 20, marginVertical: 20}, this.state.bloqueCorreo]}>
              <View style={styles.formRow}>
                <View style={styles.formRow1}>
                  <Text style={styles.label}>Ingresa tu contraseña actual</Text>
                  <TextInput 
                    style={styles.innerBloqueInput}
                    onChangeText={(antiguaContra) => this.antiguaContra = antiguaContra}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formRow1}>
                  <Text style={styles.label}>Ingresa tu nueva contraseña</Text>
                  <TextInput 
                    style={styles.innerBloqueInput}
                    onChangeText={(newContra) => this.newContra = newContra}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formRow1}>
                  <Text style={styles.label}>Ingresa nuevamente tu nueva contraseña</Text>
                  <TextInput 
                    style={styles.innerBloqueInput}
                    onChangeText={(newContra2) => this.newContra2 = newContra2}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              <TouchableOpacity style={[styles.input, {backgroundColor: VERDE, marginHorizontal: 40}]} onPress={() => this.handleChangeContra(this.newContra, this.newContra2)}>
                <Text style={{padding: 5, textAlign: 'center', color: BLANCO}}>Guardar cambio</Text>
              </TouchableOpacity>
            </View>
          }
          <View style={styles.formRow}>
            <Image source={Separador} resizeMode={'stretch'} style={{width: '100%'}}/>
          </View>
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
              <Text style={styles.label}>Número de celular</Text>
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
            <Text style={{color: BLANCO}}>Enviar cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: CELESTE,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: 'center',
  },
  innerBloqueInput: {
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(0,0,0,.3)', 
    padding: 5,
    fontSize: 16,
    borderStyle: 'solid',
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
    borderRadius: 25,
    backgroundColor: BLANCO,
  },
  avatar: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: VERDE,
  },
  menu: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 25,
    backgroundColor: BLANCO
  }
})