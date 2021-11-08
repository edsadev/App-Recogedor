import React from "react"
import { Text, View, ImageBackground, Image, StyleSheet, Platform, StatusBar, Alert, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import MapView, {Marker} from 'react-native-maps'
import * as Location from 'expo-location'

import { BLANCO, CELESTE, ROJO, VERDE } from '../../utils/colors'

import Patron from '../../utils/images/patron.png'
import Logo from '../../utils/images/LogoSinFondo.png'
import Marcador from '../../utils/images/Marcador.png'

import { toggleLoading } from "../../actions"

import Loading from "../UI/Loading";

class Ecotiendas extends React.Component{
  state={
    location: null,
  }
  componentDidMount(){
    this.props.dispatch(toggleLoading())
    try {
      (async() => {
        let status = await Location.requestForegroundPermissionsAsync()
        if (status.status !== 'granted') {
          Alert.alert('Otorga permisos de ubicación a la aplicación')
          return;
        }
        let location = await Location.getCurrentPositionAsync();
        this.setState(() => ({
          location: location
        }))
        this.props.dispatch(toggleLoading())
      })()
    } catch {
      console.log(new Error('Hubo un error al cargar la location'))
      this.props.dispatch(toggleLoading())
    }
  }
  render(){
    const {loading} = this.props
    return(
      <View style={{flex: 1}}>
        <ImageBackground source={Patron} style={{width: '100%', height: '100%', backgroundColor: CELESTE}}>
          {Platform.OS === 'ios' && <StatusBar 
            barStyle={'dark-content'}
          />}
          <View style={[styles.bloqueCeleste]}>
              <Image source={Logo} style={styles.logo}/>
          </View>
          <View style={styles.bloqueBlanco}>
            <View style={{alignItems: 'stretch'}}>
              {Platform.OS !== 'ios'
                ? <Text 
                    style={{
                      color: BLANCO, 
                      fontSize: 24, 
                      fontWeight: 'bold', 
                      backgroundColor: VERDE, 
                      lineHeight: 60,
                      borderTopLeftRadius: 40,
                      borderTopRightRadius: 40,
                      textAlign: 'center'
                  }}>
                    Ecotiendas
                  </Text>
                : <View 
                    style={{
                      backgroundColor: VERDE,
                      height: 60,
                      borderTopLeftRadius: 40,
                      borderTopRightRadius: 40,
                  }}/>
              }
            </View>
            <View style={{flex: 1, width: '100%'}}>
              {this.state.location && loading 
              ? <MapView 
                  style={styles.map} 
                  initialRegion={{
                    latitude: this.state.location && this.state.location.coords.latitude,
                    longitude: this.state.location && this.state.location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker
                    key={0}
                    coordinate={{ latitude : -2.161072 , longitude : -79.889475 }}
                    title={"Ecotienda"}
                    description={"Ecotienda de sauces"}
                    image={Marcador}
                  >
                  </Marker>
                </MapView>
              : <Loading />
              }
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 60,
    width: 60,
    alignSelf: 'center',
  },
  bloqueCeleste: {
    paddingTop: Platform.OS !== 'ios' ? 70 : 30,
    paddingBottom: Platform.OS !== 'ios' ? 50 : 30,
  }, 
  bloqueBlanco: {
    flexDirection: 'column',
    backgroundColor: BLANCO,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1, 
    alignItems: 'stretch'
  },
  map: {
    height: '100%',
    width: '100%'
  }
})

function mapStateToProps({loading}){
  return {
    loading
  }
}

export default connect(mapStateToProps)(Ecotiendas)