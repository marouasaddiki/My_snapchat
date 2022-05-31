import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login';
import Register from './register';

let imagePath = require('../../assets/logo.png');

export default function App({navigation}) {
  return (
    <View style={styles.container}
    >
      <Text style={{
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 50,
        color: "whitesmoke",
      }}>Bienvenue sur Snapchat !</Text>
      <Image 
      style={{ width:200, height:200,marginBottom: 0}}
      source={imagePath}
      />
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={{ fontWeight:"bold"}}>Connexion</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('register')}
      >
        <Text style={{ fontWeight:"bold"}}>Inscription</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={{ fontWeight:"bold"}}>Appareil photo</Text>
      </TouchableOpacity> */}

      
    </View>
  );
}
const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    alignItems: "center",
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:200,
    height:40,
    marginTop:20,
    backgroundColor:'whitesmoke',
    borderRadius:50,
    
  },
  

});