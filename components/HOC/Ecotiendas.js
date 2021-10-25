import React from "react";
import { Text, View, ImageBackground, Image, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import MapView, {Marker} from 'react-native-maps';

import { BLANCO, CELESTE, ROJO, VERDE } from '../../utils/colors'

import Patron from '../../utils/images/patron.png'
import Logo from '../../utils/images/LogoSinFondo.png'
import Marcador from '../../utils/images/Marcador.png'
import { TouchableOpacity } from "react-native-gesture-handler";
import { unsetReward } from "../../actions";

class Confirmacion extends React.Component{
  enviarReward = () => {
    this.props.dispatch(unsetReward())
    this.props.navigation.navigate('Mensaje', {mensaje: 'Transacción realizada con éxito'})
  }
  render(){
    const {rewards} = this.props
    return(
      <View style={{flex: 1}}>
        <ImageBackground source={Patron} style={{width: '100%', height: '100%', backgroundColor: CELESTE}}>
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
              <MapView 
                style={styles.map} 
                initialRegion={{
                  latitude: -2.161072,
                  longitude: -79.889475,
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

function mapStateToProps({rewards}){
  return {
    rewards
  }
}

export default connect(mapStateToProps)(Confirmacion)