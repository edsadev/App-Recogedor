import React from 'react';
import { StyleSheet, View } from 'react-native';
import Main from './components/UI/Main'
import Login from './components/UI/Login'
import Registro from './components/HOC/Registro'

export default function App() {
  return (
    <View style={styles.container}>
      <Registro />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
