import React from 'react'
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, SectionList} from 'react-native'
import { connect } from 'react-redux'

import Patron from '../../utils/images/patron.png'
import Logo from '../../utils/images/LogoSinFondo.png'
import Ecotienda from '../../utils/images/Ecotienda.png'

import { CELESTE, BLANCO, VERDE } from '../../utils/colors'

import { setReward } from '../../actions'

class Premios extends React.Component {
  FlatListItemSeparator = () => {
    return (
      <View style={{height: 2, width: "100%", marginBottom: 15}}>
        <View style={{height: 2, backgroundColor: "rgba(0,0,0,.5)", borderRadius: 5, marginHorizontal: 35}}/>
      </View>
    )
  }
  setReward = (id, name, ecopuntos) => {
    this.props.dispatch(setReward(id, name, ecopuntos))
    this.props.navigation.navigate('Confirmacion')
  }
  render(){
    const DATA = [{
      title: "Premios", 
      data: [
        {id: 1, nombre: 'Computadora Samsung', ecopuntos: 8000}, 
        {id: 2, nombre: 'Computadora Samsung', ecopuntos: 8000}, 
        {id: 3, nombre: 'Computadora Samsung', ecopuntos: 8000}, 
        {id: 4, nombre: 'Computadora Samsung', ecopuntos: 8000}, 
        {id: 5, nombre: 'Computadora Samsung', ecopuntos: 8000}, 
        {id: 6, nombre: 'Computadora Samsung', ecopuntos: 8000}, 
        {id: 7, nombre: 'Computadora Samsung', ecopuntos: 8000}, 
        {id: 8, nombre: 'Celular Xiaomi', ecopuntos: 2500}
      ]}]
    return(
      <View style={{flex: 1}}>
        <ImageBackground source={Patron} style={{width: '100%', height: '100%', backgroundColor: CELESTE}}>
          <View style={[styles.bloqueCeleste]}>
              <Image source={Logo} style={styles.logo}/>
          </View>
          <View style={styles.bloqueBlanco}>
            {/* <TouchableOpacity onPress={() => console.log(this.props.states)}>
              <Text>ReviewState</Text>
            </TouchableOpacity> */}
            <SectionList 
              sections={DATA}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <View key={item.id} style={{justifyContent: 'center'}}>
                  <Image source={Ecotienda} style={{width: 158, height: 106, alignSelf: 'center'}}/>
                  <Text style={{textAlign: 'center', margin: 10}}>{item.nombre}</Text>
                  <Text style={{textAlign: 'center', marginBottom: 10}}>Válido por {item.ecopuntos} ecopuntos</Text>
                  <TouchableOpacity 
                    style={{backgroundColor: VERDE, borderRadius: 25, marginBottom: 15, marginHorizontal: 35}}
                    onPress={() => this.setReward(item.id, item.nombre, item.ecopuntos)}
                  >
                    <Text style={{color: BLANCO, padding: 10, textAlign: 'center'}}>Canjear premio</Text>
                  </TouchableOpacity>
                </View>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{color: VERDE, fontSize: 22, marginVertical: 25, textAlign: 'center'}}>{title}</Text>
              )}
              ItemSeparatorComponent={this.FlatListItemSeparator}
            />
          </View>
        </ImageBackground>
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    states: state
  }
}

export default connect(mapStateToProps)(Premios)

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
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  container: {
    alignItems: 'center',
    width: '100%'
  }
})