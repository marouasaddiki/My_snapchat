import { View, Text } from 'react-native'
import React from 'react'

const Reçu = () => {



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

    // const [source, setSource] = useState('');

    // console.log(to);
    
    
    
    const submit = async() =>{
        let token = await AsyncStorage.getItem("token"); 
        // console.log(file, 'oijroeijeràofjofjireofjirefj')
        var config = {
            method: "get",
            url: "http://snapi.epitech.eu:8000/snaps",
            headers: {
              token: token,
            },
          };
          
        axios(config)
        .then(function (response) {
            console.log(response.data);

            })
        .catch(function (error) {
                console.log(error.response, "error2");
              }); 
            }     
submit()

  return (
    <View>
      <Text>Reçu</Text>
    </View>
  )
}
export default Reçu
