import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar, TouchableOpacity, PermissionsAndroid, Animated, Easing, Image} from 'react-native'
import { connect } from 'react-redux'

import {Picker} from '@react-native-picker/picker';

import { CELESTE, BLANCO, VERDE, ROJO} from '../../utils/colors'

import { getMaterials } from '../../utils/api'

import { Ionicons } from '@expo/vector-icons'

import { createTicketEcopicker, getOrders} from '../../utils/api'

import { loadOrders } from '../../actions/index'

import RNBluetoothClassic, {BluetoothDevice, BluetoothEventType} from 'react-native-bluetooth-classic'

import loading from '../../utils/images/loading.png'

import axios from 'axios';

class NewEntry extends React.Component {
  rotateValue = new Animated.Value(0)
  state = {
    idTicket: "",
    peso: 0,
    materiales: [],
    material: "",
    lista: [],
    page: 0,
    balanza: {},
    // Balanza Bluetooth
    bloqueDispositivos: false,
    discovering: false,
    connected: false,
    devices: [],
    devicesList: [],
    connecting: false,
  }
  componentDidMount(){
    this.handleBtAvailable()
    getMaterials()
      .then(res => {
        const id = Object.keys(res.data.materiales)
        this.setState(() => ({materiales: id.map(id => res.data.materiales[id]), material: id[0]}))
      })
  }
  async componentWillUnmount() {
    if (this.state.connected) {
      try {
        if (this.state.balanza !== {}){
          await this.state.balanza.disconnect();
          console.log("Se desconecto el dispositivo")
        }
      } catch (error) {
        // Unable to disconnect from device
        console.log(error)
      }
    }
    this.uninitializeRead();
  }
  uninitializeRead() {
    if (this.readInterval) {
      clearInterval(this.readInterval);
    }
  }
  requestPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Request for Location Permission",
        message: "Bluetooth Scanner requires access to Fine Location Permission",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    return (granted === PermissionsAndroid.RESULTS.GRANTED);
  }

  handleBtAvailable = async () => {
    try {
      const available = await RNBluetoothClassic.isBluetoothAvailable()
      return available
    } catch (err) {
      // Handle accordingly
      alert("Tu dispositivo no permite conexión bluetooth")
    }
  }
  handleBtEnabled = async () => {
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      return enabled
    } catch (err) {
        // Handle accordingly
      alert("Tu dispositivo tuvo un error al tratar de saber si el bluetooth estaba encendido")
    }
  }
  
  bondedList = async () => {
    const permission = await this.requestPermission();
    if (permission){
      try {
        if(await this.handleBtEnabled()){
          this.setState((state) => ({bloqueDispositivos: !state.bloqueDispositivos}))
          this.getList()
        } else {
          alert("Activa el bluetooth...")
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  getList = async () => {
    this.rotateValue = new Animated.Value(0)
    Animated.loop(
      Animated.timing(this.rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true, // <-- Add this
        easing: Easing.linear
      })
    ).start()
    try {
      await this.setState((state) => ({discovering: !state.discovering}))
      const devices = await RNBluetoothClassic.getBondedDevices()
      await this.setState({devices})
      await this.setState((state) => ({discovering: !state.discovering}))
      // const device = await RNBluetoothClassic.pairDevice(id);
    } catch (err) {
      console.log(err)
      await this.setState((state) => ({discovering: !state.discovering}))
      alert("Hubo un error al tratar de conseguir los dispositivos paireds")
    }
  }
  connectDevice = async (device) => {
    this.rotateValue = new Animated.Value(0)
    Animated.loop(
      Animated.timing(this.rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true, // <-- Add this
        easing: Easing.linear
      })
    ).start()
    try {
      await this.setState((state) => ({connecting: !state.connecting}))
      let connection = await device.isConnected()
      if (!connection) {
        connection = await device.connect({
          DELIMITER: '\r',
        });
        if (connection){
          await this.setState((state) => ({connecting: !state.connecting, bloqueDispositivos: !state.bloqueDispositivos, connected: !state.connected, balanza: device}))
          console.log("Se conecto al dispositivo")
          alert(`Conectado al dispositivo ${device.name}`)
          this.initializeRead(device);
        } else {
          await this.setState((state) => ({connecting: !state.connecting}))
          alert('No se pudo conectar')
        }
      } else {
        await this.setState((state) => ({connecting: !state.connecting, bloqueDispositivos: !state.bloqueDispositivos, connected: !state.connected, balanza: device}))
        console.log("Se conecto al dispositivo")
        alert(`Conectado al dispositivo ${device.name}`)
        this.initializeRead(device);
      }
    } catch (error) {
      // Handle error accordingly
      await this.setState((state) => ({connecting: !state.connecting}))
      console.log(error)
      alert("Hubo un error al tratar de conectar al dispositivo")
    }
  }
  initializeRead = async (device) => {
    console.log(`Se inicio la lectura del dispositivo ${device.name}`)
    this.readInterval = setInterval(() => this.performRead(device), 100);
  }
  async performRead(device){
    try {
      // console.log('Polling for available messages');
      let available = await device.available();
      // console.log(`There is data available [${available}], attempting read`);

      if (available > 0) {
        for (let i = 0; i < available; i++) {
          // console.log(`reading ${i}th time`);
          let data = await device.read();
          let b = Buffer.from(data, 'utf-8')
          // console.log(`Read data ${data}`);
          // console.log(JSON.stringify(b));
          let peso = parseFloat(b.toString("utf-8").split("   ")[1])
          // console.log(veryLargeTextWorks)
          this.setState({peso})
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  handleAddList = () => {
    const newLista = this.state.lista
    if(!newLista.some(material => material.id_material == this.state.material)){
      newLista.push({id_material: this.state.material, peso: this.state.peso, id: this.state.lista.length})
    }
    this.setState(() => ({
      lista: newLista
    }))
  }
  handleChangeMaterial = (e) => {
    this.setState(() => ({
      material: e
    }))
  }
  handleDelete = (id) => {
    this.setState((state => ({
      lista: state.lista.filter(item => item.id !== id)
    })))
  }
  handleChangePage = (num) => {
    if (this.state.lista.length > 0){
      this.setState(() => ({page: num}))
    } else {
      alert('Debes seleccionar al menos un material')
    }
  }
  handleSubmit = () => {
    const {orden} = this.props.route.params
    console.log(orden)
    console.log(this.state.lista)
    const newLista = []
    this.state.lista.map(item => {
      newLista.push({
        id: item.id_material,
        peso: item.peso
      })
    })
    createTicketEcopicker(orden.pedido_id, this.props.authedUser.id, orden.ecoamigo_id, newLista)
      .then(res => {
        if(res.data.success){
          this.props.navigation.navigate('Mensaje', {mensaje: `Se a creado el ticket de tu pedido. A ${res.data.ticket.cliente} se le han acreditado ${res.data.ticket.total_ecopuntos} ecopuntos`})
          getOrders(this.props.authedUser.id)
            .then(res => {
              if (res.data.success){
                this.props.dispatch(loadOrders(res.data.pedidos))
              } else {
                this.props.dispatch(loadOrders([]))
              }
            })
        } else {
          alert(res.data.mensaje)
        }
      })
      .catch(error => {
        alert('Ocurrio un error, vuelve a intentarlo')
        console.log(error)
      })
  }
  render(){
    const spin = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <SafeAreaView style={[styles.AndroidSafeArea]}>
        {Platform.OS === 'ios' && <StatusBar 
          barStyle={'dark-content'}
        />}
        {/*console.log(this.props.route.params.orden)*/}
        {this.state.bloqueDispositivos && 
          <View style={[styles.backgroundOscuro]}>
            <View style={styles.card}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 24}}>Dispositivos</Text>
                <TouchableOpacity onPress={() => {
                  this.setState(() => ({
                    bloqueDispositivos: false
                  }))
                }}>
                  <Ionicons name="ios-close-sharp" size={28} color="black" />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                {this.state.discovering || this.state.connecting
                  ? <Animated.View style={{transform: [{ rotate: spin }], flex: 1}}>
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={loading} style={{width: 100, height: 100}}/>
                      </View>
                    </Animated.View>
                  : <SafeAreaView style={{marginVertical: 10, flex: 1}}>
                      <ScrollView>
                        {this.state.devices.length > 0 && this.state.devices.map(device => (
                          <TouchableOpacity key={device.id} style={{backgroundColor: CELESTE, paddingVertical: 15, paddingHorizontal: 10, marginHorizontal: 5, marginBottom: 10, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} onPress={() => this.connectDevice(device)}>
                            <View>
                              <Text><Text style={{fontWeight: 'bold', fontSize: 16}}>Nombre:</Text> {device.name}</Text>
                              <Text><Text style={{fontWeight: 'bold', fontSize: 16}}>ID:</Text> {device.id}</Text>
                            </View>
                            <Ionicons name="bluetooth" size={24} color="black" />
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </SafeAreaView>
                }
              </View>
            </View>
          </View>
        }
        {this.state.page === 0
          ? <View>
              <View style={styles.bloquePeso}>
                <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center', paddingVertical: 10}}>Peso de material</Text>
                <Text style={{textAlign: 'center', textDecorationLine: 'underline', textDecorationStyle: 'solid', fontSize: 64, paddingVertical: 10}}>{this.state.peso} Kg</Text>
                {!this.state.connected &&
                  <TouchableOpacity style={[styles.boton, {marginVertical: 10}]} onPress={this.bondedList}>
                    <Text style={{color: BLANCO}}>Conectar balanza</Text>
                  </TouchableOpacity>
                }
              </View>
              <View>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24, paddingVertical: 15, marginTop: 15}}>Tipo de material</Text>
                <View style={styles.formRow}>
                  <View style={styles.formRow1}>
                    <View style={Platform.OS === 'ios' ? [styles.input, {overflow: 'hidden', paddingHorizontal: 2, paddingVertical: 15}] : [styles.input, {overflow: 'hidden'}]}>
                      <Picker
                        selectedValue={this.state.material}
                        onValueChange={this.handleChangeMaterial}
                        style={[Platform.OS !== 'ios' ? {marginVertical: 6} : {marginVertical: -80}]}
                        itemStyle={Platform.OS === 'ios' && {fontSize: 16, }}
                      >
                        {this.state.materiales.length > 0 && this.state.materiales.map(material => (
                          <Picker.Item key={material.id} label={material.nombre} value={material.id}/>
                        ))}
                      </Picker>
                      
                    </View>
                    <View>
                      {this.state.lista.length > 0 
                        ? <ScrollView style={{maxHeight: '50%', marginVertical: 15, borderColor: VERDE, borderStyle: 'solid', borderWidth: 1, borderRadius: 15}} contentContainerStyle={{paddingVertical: 15}} showsVerticalScrollIndicator={false}>
                            {this.state.lista.map(material => (
                                <View key={material.id} style={{flexDirection: 'row', marginHorizontal: 15, alignItems: 'center'}}>
                                  <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '80%'}}>
                                    <Text style={{fontSize: 18}}>{this.state.materiales.find(obj => obj.id == material.id_material).nombre}</Text>
                                    <Text style={{fontSize: 18}}>{material.peso}</Text>
                                  </View>
                                  <TouchableOpacity style={{width: '20%', alignItems: 'center'}} onPress={() => this.handleDelete(material.id)}>
                                    <Ionicons name="close-circle" size={24} color="red" />
                                  </TouchableOpacity>
                                </View>
                              ))
                            }
                          </ScrollView>
                        : <Text style={{textAlign: 'center', fontSize: 18, marginVertical: 15}}>Ingresa al menos un material</Text>
                      }
                      <TouchableOpacity style={[styles.boton, {marginVertical: 10}]} onPress={this.handleAddList}>
                        <Text style={{color: BLANCO}}>Agregar material</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.boton, {marginVertical: 10}]} onPress={() => this.handleChangePage(1)}>
                        <Text style={{color: BLANCO}}>Siguiente</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          : <View style={styles.formRow}>
              <View style={[styles.formRow1]}>
                <View style={{alignItems: 'center'}}>
                  <Ionicons name="cart" size={48} color={VERDE} style={{marginVertical: 25}}/>                  
                    {this.state.lista.map(item => (
                      <View key={item.id} style={{flexDirection: 'row', marginHorizontal: 15, alignItems: 'center', marginVertical: 5}}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', flex: 1}}>
                          <Text style={{fontSize: 18}}>{this.state.materiales.find(obj => obj.id == item.id_material).nombre}</Text>
                          <Text style={{fontSize: 18}}>{item.peso}</Text>
                        </View>
                      </View>
                    ))}
                </View>
                <View style={{marginVertical: 25, flexDirection: 'row', justifyContent: 'space-around'}}>
                  <TouchableOpacity style={[styles.boton, {marginVertical: 10}]} onPress={() => this.handleChangePage(0)}>
                    <Text style={{color: BLANCO}}>Atras</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.boton, {marginVertical: 10}]} onPress={() => this.handleSubmit()}>
                    <Text style={{color: BLANCO}}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: BLANCO,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: 'center'
  },
  backgroundOscuro: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    display: 'none'
  },
  card: { 
    height: '70%',
    width: '80%',
    backgroundColor: BLANCO,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: 'relative',
  },
  bloquePeso: {
    backgroundColor: CELESTE,
    marginHorizontal: 40,
    borderRadius: 15,
    padding: 25,
  },
  boton: {
    backgroundColor: VERDE,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
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
  input: {
    fontSize: 16,
    borderStyle: 'solid',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios'? 8 : 3,
    borderColor: VERDE,
    borderWidth: 1,
    borderRadius: 25,
  },
})

function mapStateToProps({authedUser}){
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewEntry)