import React, { Component, useState ,useEffect} from "react";
import { Alert, Button, TextInput, View, ScrollView,StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-dom";
import { DataTable ,Searchbar} from 'react-native-paper';

export default function FormLog({ navigation }) {
  
 
  
 const [email, setEmail] = useState([]);
 const [Search, setSearch] = useState("");

  useEffect(() => {
    const submit = async() =>{
      let token = await AsyncStorage.getItem("token");
    await axios.get("http://snapi.epitech.eu:8000/all",{
        headers:{
            token : token 
        }
    })
    .then( async function (response) {
      await setEmail(response.data.data);
    })
    .catch(function (error) {
      console.log(error,response, "error2");
    });
    
   }
   submit();
  }, []);
  
   return (
    <ScrollView >
         <Searchbar
        placeholder="Search"
        style={styles.Searchbar}
       
        />
        
         <DataTable style={styles.DataTable}>
     <DataTable.Title>Name </DataTable.Title>
   {
     
     email.map((email) => {
const user = email.email.split('@')[0];
// console.log(email)
       return(
         <DataTable.Row>
         <DataTable.Cell>{user}</DataTable.Cell>
         <DataTable.Cell >
         <Button title={"Envoyer un snap"} style={styles.button}
         onPress={() => navigation.navigate('Message', {
          email
         })} />
         </DataTable.Cell>
         </DataTable.Row>
       )
      })
}
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
DataTable:{
  paddingTop: 60,
  paddingHorizontal: 10,
  
},
Searchbar:{
  position: 'absolute',
  top:4,

  

},
example: {
  marginVertical: 24,
},
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
  button:{
    backgroundColor: "#FFFC00"
    },
});