import React from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar, ImageBackground, Image, TouchableOpacity, NativeModules, LayoutAnimation} from 'react-native'
import { connect } from 'react-redux'
import { Feather } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';

import Patron from '../../utils/images/patron.png'
import Logo from '../../utils/images/LogoSinFondo.png'
import DefaultUser from '../../utils/images/DefaultUser.png'
import Moto from '../../utils/images/MOTO.png'
import Ecotienda from '../../utils/images/Ecotienda.png'
import Botellas from '../../utils/images/Botellas.png'
import Decoración from '../../utils/images/Decoración.png'

import { unsetUser } from '../../actions';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

import { CELESTE, BLANCO, VERDE, AZUL, CELESTEOSCURO, AMARILLO, NARANJA } from '../../utils/colors'

class Home extends React.Component {
  state = {
    menuBottom: -1000
  }
  handleMenu = () => {
    LayoutAnimation.easeInEaseOut()
    this.setState(() => (
      this.state.menuBottom === 0
        ? {menuBottom: -1000}
        : {menuBottom: 0}
    ))
  }
  render(){
    const { authedUser, navigation } = this.props
    const base64Image = `data:image/png;base64,${authedUser.foto}`
    return (
      <SafeAreaView style={[styles.AndroidSafeArea]}>
        {Platform.OS === 'ios' && <StatusBar 
          barStyle={'dark-content'}
        />}
        <View style={styles.navBar}>
          <TouchableWithoutFeedback accessibilityRole={'menu'} onPress={this.handleMenu}>
            <Feather name="settings" size={32} color="black" />
          </TouchableWithoutFeedback>
        </View>
        <ScrollView>
          <View style={{backgroundColor: CELESTE}}>
            <ImageBackground source={Patron} style={styles.bloqueCeleste}>
              <Image source={Logo} style={styles.logo}/>
            </ImageBackground>
            <View style={styles.bloqueBlanco}>
              <View style={styles.info}>
                <View style={{shadowColor: '#000', shadowOffset: { width: -3, height: 3 }, shadowOpacity: 0.15, shadowRadius: 3, }}>
                  <Image source={authedUser.foto === '' ? DefaultUser : {uri: base64Image}} style={styles.avatar}/>
                </View>
                <Text style={{color: VERDE, fontSize: 20}}>{authedUser.nombre} {authedUser.apellido}</Text>
                <Text style={{color: VERDE, fontSize: 22}}>{authedUser.ecopuntos}</Text>
                <Text>Ecopuntos</Text>
              </View>
            </View>
          </View>
          <View style={styles.bloqueEcopicker}>
            <Text style={{color: AZUL, fontSize: 32, fontWeight: 'bold'}}>Ecopicker</Text>
            <Image source={Moto} style={{alignSelf: 'center', marginVertical: 20}}/>
            <TouchableOpacity style={{backgroundColor: AZUL, borderRadius: 25, width: '50%', alignSelf: 'center'}} onPress={() => navigation.navigate('Searching') }>
              <Text style={{color: BLANCO, fontSize: 22, textAlign: 'center', padding: 10}}>Llamar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bloqueEcotiendas}>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30, paddingBottom: 20}}>
              <Text style={{color: VERDE, fontSize: 32, fontWeight: 'bold'}}>Ecotiendas</Text>
              <TouchableOpacity style={{backgroundColor: VERDE, borderRadius: 25, alignSelf: 'center'}} onPress={() => navigation.navigate('Ecotiendas')}>
                <Text style={{color: BLANCO, fontSize: 22, textAlign: 'center', paddingVertical: 10, paddingHorizontal: 20}}>Ver todas</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
              {[{id: 'Samborondon'}, {id: 'Sauces'}, {id: 'Milagro'}].map(ecotienda => (
                <View key={ecotienda.id} style={{padding: 10}}>
                  <ImageBackground source={Ecotienda} style={{width: 158, height: 106, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: BLANCO, fontSize: 16, fontWeight: 'bold'}}>{ecotienda.id}</Text>
                  </ImageBackground>
                  <TouchableOpacity style={{backgroundColor: BLANCO, padding: 10, zIndex: 100, borderRadius: 20, margin: 15}}>
                    <Text style={{textAlign: 'center'}}>Ver en mapa</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.bloquePromo}>
            <ImageBackground source={Botellas} style={{width: 'auto', height: 180}}>
              <View style={{marginLeft: 160, justifyContent: 'center', flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={Decoración} style={{transform: [{ rotate: "150deg" }]}}/>
                  <Text style={{fontWeight: 'bold', fontSize: 28, color: BLANCO, textAlign: 'center'}}>Super Promo</Text>
                  <Image source={Decoración} />
                </View>
                <Text style={{fontSize: 16, color: VERDE, textAlign: 'center', padding: 10}}>Solo por este mes, todo el plástico tiene el doble de ecopuntos</Text>
                <Text style={{fontSize: 14, color: BLANCO, textAlign: 'center'}}>Acércate a tu punto más cercano y recibe tus puntos</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.bloquePremios}>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30, paddingBottom: 20}}>
              <Text style={{color: NARANJA, fontSize: 32, fontWeight: 'bold'}}>Premios</Text>
              <TouchableOpacity style={{backgroundColor: NARANJA, borderRadius: 25, alignSelf: 'center'}} onPress={() => navigation.navigate('Premios')}>
                <Text style={{color: BLANCO, fontSize: 22, textAlign: 'center', paddingVertical: 10, paddingHorizontal: 20}}>Ver premios</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
              {[{id: 'Juguete'}, {id: 'Celular'}, {id: 'Refri'}].map(ecotienda => (
                <View key={ecotienda.id} style={{padding: 10}}>
                  <View style={{width: 158, height: 106, justifyContent: 'center', alignItems: 'center', backgroundColor: BLANCO, borderRadius: 20}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{ecotienda.id}</Text>
                  </View>
                  <TouchableOpacity style={{backgroundColor: BLANCO, padding: 10, zIndex: 100, borderRadius: 20, margin: 15}}>
                    <Text style={{textAlign: 'center'}}>Canjear producto</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={[styles.menu, {bottom: this.state.menuBottom}]}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={() => navigation.navigate('EditarPerfil')}>
            <Ionicons name="cog" size={36} color="rgba(0,0,0,.5)" style={{marginHorizontal: 40}}/>
            <View style={{borderStyle: 'solid', borderColor: 'rgba(0,0,0,.5)', borderBottomWidth: 1, flexGrow: 1, marginRight: 40}}>
              <Text style={{fontSize: 16, padding: 12 }}>
                Editar perfil
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={() => navigation.navigate('Reportar')}>
            <Ionicons name="ios-warning-outline" size={36} color="rgba(0,0,0,.5)" style={{marginHorizontal: 40}}/>
            <View style={{borderStyle: 'solid', borderColor: 'rgba(0,0,0,.5)', borderBottomWidth: 1, flexGrow: 1, marginRight: 40}}>
              <Text style={{fontSize: 16, padding: 12 }}>
                Reportar un problema
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={() => navigation.navigate('Ayuda')}>
            <Ionicons name="help-circle-outline" size={36} color="rgba(0,0,0,.5)" style={{marginHorizontal: 40}}/>
            <View style={{borderStyle: 'solid', borderColor: 'rgba(0,0,0,.5)', borderBottomWidth: 1, flexGrow: 1, marginRight: 40}}>
              <Text style={{fontSize: 16, padding: 12 }}>
                Ayuda
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={() => navigation.navigate('TerminosCondiciones')}>
            <Ionicons name="ios-information-circle-outline" size={36} color="rgba(0,0,0,.5)" style={{marginHorizontal: 40}}/>
            <View style={{borderStyle: 'solid', borderColor: 'rgba(0,0,0,.5)', borderBottomWidth: 1, flexGrow: 1, marginRight: 40}}>
              <Text style={{fontSize: 16, padding: 12 }}>
                Términos y Condiciones
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}} onPress={() => this.props.dispatch(unsetUser())}>
            <Ionicons name="exit" size={36} color="rgba(0,0,0,.5)" style={{marginHorizontal: 40}}/>
            <View style={{borderStyle: 'solid', borderColor: 'rgba(0,0,0,.5)', borderBottomWidth: 1, flexGrow: 1, marginRight: 40}}>
              <Text style={{fontSize: 16, padding: 12 }}>
                Salir
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  navBar: {
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingVertical: 20,
  },
  logo: {
    height: 60,
    width: 60,
    alignSelf: 'center',
  },
  bloqueCeleste: {
    paddingBottom: 60,
    paddingTop: 25,
  }, 
  bloqueBlanco: {
    backgroundColor: BLANCO,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 40,
  },
  info: {
    position: 'relative',
    top: -70,
    alignItems: 'center',
    marginBottom: -30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 20, 
  },
  bloqueEcopicker: {
    backgroundColor: CELESTEOSCURO,
    paddingVertical: 40,
    paddingHorizontal: 30
  },
  bloqueEcotiendas: {
    backgroundColor: CELESTE,
    paddingVertical: 30,
  },
  bloquePremios: {
    backgroundColor: AMARILLO,
    paddingVertical: 30,
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

function mapStateToProps({authedUser}){
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Home)