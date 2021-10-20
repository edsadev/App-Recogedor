import React from 'react';
import { StyleSheet } from 'react-native';

import Main from './components/UI/Main'
import Login from './components/UI/Login'
import Registro from './components/HOC/Registro'
import Home from './components/UI/Home'
import Premios from './components/UI/Premios'
import Confirmacion from './components/UI/Confirmacion'
import Mensaje from './components/UI/Mensaje'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect } from 'react-redux';
import { setUser } from './actions';


class App extends React.Component {
  render(){
    const {authedUser} = this.props
    if (!authedUser){
      const Stack = createNativeStackNavigator();
      this.props.dispatch(setUser(1, 'ecoamigo', 'Edmundo', undefined, 1000))
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen 
              name="Main" 
              component={Main}  
              options={{headerShown: false}}
            />  
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registro" component={Registro} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    if (authedUser.rank === "ecoamigo"){
      const Stack = createNativeStackNavigator();
      return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Premios"
                component={Premios}
              />
              <Stack.Screen
                name="Confirmacion"
                options={{title: 'Confirma tu premio'}}
                component={Confirmacion}
              />
              <Stack.Screen
                name="Mensaje"
                options={{headerShown: false}}
                component={Mensaje}
              />
            </Stack.Navigator>
        </NavigationContainer>
      )
    }    
  }
}

function mapStateToProps({ authedUser }){
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
