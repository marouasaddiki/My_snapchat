import React, { Component,useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/components/home';
import Login from './app/components/login';
import Register from './app/components/register';
import Camera from './app/components/Camera';
import Message from './app/components/Message';
import Settings from './app/components/settings';
import reçu from './app/components/Reçu';
import { createDrawerNavigator } from '@react-navigation/drawer';

import user from './app/components/user';

const Stack = createNativeStackNavigator();

function App() {
  
  
  const [route, setRoute] = useState('Home');
  function LogoTitle() {
    return (
      // <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
      <Image
        style={{ width: 20, height: 20,}}
        source={require('./assets/pngegg1.png')}
      />
      //  </View>
    );
  }

 
  
console.log(route)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login}  options={{ headerTitle: (props) => <LogoTitle {...props} />, headerLayoutPreset: 'center', }}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Message" component={Message} />
        {/* <Stack.Screen name="test" component={Test} /> */}
        <Stack.Screen name="register" component={Register}   options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="Camera" component={Camera} options={{headerBackVisible:false}} />
        <Stack.Screen name="reçu" component={reçu}/>
        <Stack.Screen name="user" component={user} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;











































// import { StatusBar } from 'expo-status-bar';
// import React from 'react'
// import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';

//          <Image style={{ width:20, height:25, top: 5, left: 5}} source={deco} />
//     <View>
{/* <TouchableOpacity
onPress={() => navigation.navigate("user")}>
<Image style={{width:40, height:40, top: 718, left: 370}} source={Envoyer}/>
 </TouchableOpacity>
 </View> */}
// let imagePath = require('../snapchat/assets/logo.png');

// export default function App() {
//   return (
//     <View style={styles.container}
//     >
//       <Text style={{
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 100,
//         color: "white",
//       }}>Bienvenue sur Snapchat !</Text>
//       <Image 
//       style={{ width:300, height:300,}}
//       source={imagePath}
//       />
//       <StatusBar style="auto" />
//       <TouchableOpacity
//         style={styles.button}
//       >
//         <Text style={{ fontWeight:"bold"}}>Connexion</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//       >
//         <Text style={{ fontWeight:"bold"}}>Inscription</Text>
//       </TouchableOpacity>
  
     
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: 
//   {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   button: {
//     alignItems: "center",
//     borderWidth:1,
//     borderColor:'rgba(0,0,0,0.2)',
//     alignItems:'center',
//     justifyContent:'center',
//     width:250,
//     height:50,
//     marginTop:20,
//     backgroundColor:'white',
//     borderRadius:50,
    
//   },
  

// });