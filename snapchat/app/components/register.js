import React, { Component, useState } from "react";
import { Alert, Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from "axios";


export default function FormLog({ navigation }) {
  // nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

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
      url: "http://snapi.epitech.eu:8000/inscription",
      data: datas,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        navigation.navigate("login");
        console.log(response);
      })


      
      // try {
      //     console.log("res token->", response.data.data.token);
      //     await AsyncStorage.setItem("token", response.data.data.token);
      //     console.log("token du store ->", await AsyncStorage.getItem("token"));
      //     console.log('1')
      //   } catch (e) {
      //     console.log("error1");
      // };
      .catch(function (error) {
        console.log(error.response, "error2");
      });
    // console.log(data)
  };
  //
  // }
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Inscris-Toi avec ta tête là</Text>
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

      <Button title={"S'inscrire"} style={styles.button} onPress={submit} />
      <Text>Vous avez déjà compte?</Text>
      <TouchableOpacity
        style={styles.button}
       
      >
        <Text style={{ fontWeight: "bold" }}>Connectez-Vous</Text>
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
  button:{
  // backgroundColor: "#FFFC00"
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