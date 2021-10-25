import React from 'react'
import { Platform } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Main from '../../components/UI/Main'
import Login from '../../components/UI/Login'
import Registro from '../../components/HOC/Registro'
import Home from '../../components/UI/Home'
import Premios from '../../components/UI/Premios'
import Confirmacion from '../../components/UI/Confirmacion'
import Ecotiendas from '../../components/HOC/Ecotiendas'
import Searching from '../../components/HOC/Searching'
import Mensaje from '../../components/UI/Mensaje'
import TerminosCondiciones from '../UI/TerminosCondiciones'
import Ayuda from '../UI/Ayuda'
import Reportar from '../UI/Reportar'

const Stack = createNativeStackNavigator()

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen 
        name="Main" 
        component={Main}  
        options={{headerShown: false}}
      />  
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={Platform.OS !== 'ios' && {headerShown: false}}
      />
      <Stack.Screen 
        name="Registro" 
        component={Registro} 
        options={Platform.OS !== 'ios' && {headerShown: false}}
      />
    </Stack.Navigator>
  )
}

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Premios"
        component={Premios}
        options={Platform.OS !== 'ios' && {headerShown: false}}
      />
      <Stack.Screen
        name="Confirmacion"
        component={Confirmacion}
        options={Platform.OS !== 'ios' ? {headerShown: false} :{title: 'Confirma tu premio'}}
      />
      <Stack.Screen
        name="Ecotiendas"
        component={Ecotiendas}
        options={Platform.OS !== 'ios' ? {headerShown: false} :{title: 'Ecotiendas'}}
      />
      <Stack.Screen
        name="Searching"
        component={Searching}
        options={Platform.OS !== 'ios' ? {headerShown: false} :{title: 'Buscando ecopicker'}}
      />
      <Stack.Screen
        name="TerminosCondiciones"
        options={Platform.OS !== 'ios' ? {headerShown: false} :{title: 'Terminos y Condiciones'}}
        component={TerminosCondiciones}
      />
      <Stack.Screen
        name="Ayuda"
        options={Platform.OS !== 'ios' ? {headerShown: false} :{title: 'Ayuda'}}
        component={Ayuda}
      />
      <Stack.Screen
        name="Reportar"
        options={Platform.OS !== 'ios' ? {headerShown: false} :{title: 'Reportar un problema'}}
        component={Reportar}
      />
      <Stack.Screen
        name="Mensaje"
        options={{headerShown: false}}
        component={Mensaje}
      />
    </Stack.Navigator>
  )
}

export {MainStackNavigator, HomeStackNavigator}