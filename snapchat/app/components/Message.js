import React, {useState, useEffect, useCallback} from "react";
import {ScrollView, StyleSheet,Button, View} from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
var FormData = require('form-data');


export default function Message({navigation, route}){



    const { email } = route.params;

    console.log(email)
    console.log(route.params)

    const [view, setView] = useState(null);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 33
        }
    })

    const [duration, setDuration] = useState('5');
    const [to, setTo] = useState(email.email);
    // const [source, setSource] = useState('');

    // console.log(to);
    
    
    
    const submit = async() =>{
        let file =  await AsyncStorage.getItem("path");
        let token = await AsyncStorage.getItem("token"); 

        const data = new FormData();
        data.append('image',{
          uri: file,
          name: 'image',
          type: 'image/jpg'
    });
         data.append("duration", 5);
         data.append("to", to);

        // console.log(file, 'oijroeijeràofjofjireofjirefj')
        var config = {
            method: "post",
            url: "http://snapi.epitech.eu:8000/snap",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              token: token,
            },
            data: data,
          };

        axios(config)
        .then(function (response) {
            console.log(response.data);
            navigation.navigate('Camera')

            })
        .catch(function (error) {
                console.log(error.response, "error2");
              }); 
            }     
submit()

    return(
        <ScrollView style={styles.container}>
                {/* <Button title={"Voir les messages"}
                  onPress={() => navigation.navigate('Reçu')}/> */}
        </ScrollView>
    )
}