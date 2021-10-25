import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { setUser } from './actions';

import { HomeStackNavigator, MainStackNavigator } from './components/Navigation/StackNavigator'

class App extends React.Component {

  render(){
    const {authedUser} = this.props
    if (!authedUser){
      // this.props.dispatch(setUser(1, 'ecoamigo', 'Edmundo', undefined, 1000))
      return (
        <NavigationContainer styles={styles.container}>
          <MainStackNavigator/>
        </NavigationContainer>
      )
    }

    if (authedUser.rank === "ecoamigo"){
      return (
        <NavigationContainer styles={styles.container}>
          <HomeStackNavigator/>
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
