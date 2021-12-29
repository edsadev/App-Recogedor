import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar, TouchableOpacity, Image} from 'react-native'
import { BLANCO } from '../../utils/colors'
import * as Linking from 'expo-linking'

export default class Solicitud extends React.Component {
  render(){
    return (
      <SafeAreaView style={[styles.AndroidSafeArea]}>
        {Platform.OS === 'ios' && <StatusBar 
          barStyle={'dark-content'}
        />}
        <TouchableOpacity style={{backgroundColor: BLANCO, padding: 10, zIndex: 100, borderRadius: 20, margin: 15}} onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${this.props.route.params.orden.latitud},${this.props.route.params.orden.longitud}`)}>
          <Text style={{textAlign: 'center'}}>Ver en mapa</Text>
        </TouchableOpacity>
        {console.log(this.props.route.params.orden)}
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
  }
})