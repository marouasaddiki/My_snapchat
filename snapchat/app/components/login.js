import React, { Component, useState, useEffect } from "react";
import { Alert, Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { Accueil } from "./settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-dom";
// import { createDrawerNavigator } from '@react-navigation/drawer';

export default function FormLog({navigation}) {
  // nav = useNavigate();

  useEffect(() => {

    const storeData = async () => {
     let token = await AsyncStorage.getItem('token')
     console.log(token)
      if(token !== null){
      navigation.navigate("Camera")
      }
    }
    storeData()
  }, [])


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  var datas = {
    email,
 password
}

  // validate = () => {
  // let regex  = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/
  // console.log(regex.test(this.state.email) === false)
  // if (regex.test(this.state.email) === false ) {
  //   console.log("L'email n'est pas au bon format")
  // } else {

    const submit = () => {
    axios({
      method: "post",
      url: "http://snapi.epitech.eu:8000/connection",
      data: datas,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then( async function (response) {
        console.log('page')
        try {
            console.log("res token->", response.data.data.token);
            await AsyncStorage.setItem("token", response.data.data.token);
            console.log("token du store ->", await AsyncStorage.getItem("token"));
            // console.log('1')
            // setIsSubmitted(true)
            // if (isSubmitted) {
              navigation.navigate("Camera");
              // console.log(email + ' est bien connecter')
            // } 
          } catch (e) {
            console.log("error1");
        };
      })
      .catch(function (error) {
        console.log(error.response, "error2");
      });
    // console.log(data)
  };
  //
  // }
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Connecte-Toi</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder={"Email"}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder={"Password"}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button title={"Login"} style={styles.input} onPress={submit} />
      <Text>Vous n'êtes pas encore inscrit?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('register')}
      >
        <Text style={{ fontWeight:"bold"}}>Inscrivez-Vous</Text>
      </TouchableOpacity>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  Text: {
    marginBottom: 50,
    fontSize: 25,
  },
});