import React, { useRef, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground, Image, Animated } from "react-native";

import Patron from '../../utils/images/patron.png'
import Logo from '../../utils/images/LogoSinFondo.png'
import Verificado from '../../utils/images/verificado.png'

import { CELESTE, BLANCO, VERDE } from '../../utils/colors'

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1300,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      <Image source={Verificado}></Image>
    </Animated.View>
  );
}

export default class Mensaje extends React.Component{
  componentDidMount(){
    setTimeout(() => {
      this.props.navigation.popToTop()
    }, 1500);
  }
  render(){
    return(
      <View style={{flex: 1}}>
        <ImageBackground source={Patron} style={{width: '100%', height: '100%', backgroundColor: CELESTE}}>
          <View style={[styles.bloqueCeleste]}>
              <Image source={Logo} style={styles.logo}/>
          </View>
          <View style={styles.bloqueBlanco}>
            <Text style={{color: VERDE, fontSize: 36, fontWeight: 'bold'}}>¡Gracias!</Text>
            <FadeInView />
            <Text style={{marginTop: 12, fontSize: 24}}>{this.props.route.params.mensaje}</Text>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: "30%"
  },
})