import React, { useState, useRef, useEffect ,Component} from "react";
import { StyleSheet, Dimensions, View, Platform, Text, TouchableOpacity, SafeAreaView, Image,Button} from "react-native";
import { Camera } from "expo-camera"; 
import { NavigationContainer } from "@react-navigation/native";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';


const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032); // dimension du bouton close de la fenetre
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09); // dimension du bouton capture
// La fonction Math.floor(x) renvoie le plus grand entier qui est inférieur ou égal à un nombre x

export default function App({navigation}) {

  let deco = require("../../assets/logout.png");
  let home = require("../../assets/home.png")
  let Envoyer = require("../../assets/envoyer.png")
  let imagePath = require('../../assets/return.png');
  
  
  const logout = async () => {
    let token = await AsyncStorage.getItem('token')
    if(token != null){
      await AsyncStorage.removeItem('token')
      navigation.navigate('Home')
      console.log('Vous êtes déconnecter')
    }
  }
  
 

  const [hasPermission, setHasPermission] = useState(null); 
  const [image, setImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  // utilise la camera coté back
  const [isCameraReady, setIsCameraReady] = useState(false); 
  const [isPreview, setIsPreview] = useState(false); 
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const cameraRef = useRef();


  
  useEffect(() => {

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => { // Capture l'image
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      await AsyncStorage.setItem("path", source);
      console.log(await AsyncStorage.getItem("path"))
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        console.log("picture source", source);  
      } 
    }
  };

  const recordVideo = async () => {
    if (cameraRef.current) {
      try {
        const videoRecordPromise = cameraRef.current.recordAsync();
        if (videoRecordPromise) {
          setIsVideoRecording(true);
          const data = await videoRecordPromise;
          const source = data.uri;
          
          if (source) {
            setIsPreview(true);
            console.log("video source", source);
            setVideoSource(source);
 
           
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };
  // const formdata = new FormData()
  // formdata.append('file',{
  // })

  const stopVideoRecording = () => 
  {
    if (cameraRef.current) {
      setIsPreview(false);
      setIsVideoRecording(false);
      cameraRef.current.stopRecording();
    }
  };


  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
    prevCameraType === Camera.Constants.Type.back
    ? Camera.Constants.Type.front
    : Camera.Constants.Type.back
    );
  };


  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
    setVideoSource(null);
    // <View>
    // <TouchableOpacity
    // onPress={() => navigation.navigate("user")}>
    // <Image
    //  style ={{width:40, height:40, top: 718, left: 0}}
    //  source={Envoyer}/>
    //  </TouchableOpacity>
    //  </View>

  };

  const renderCancelPreviewButton = () => (
    <SafeAreaView>
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
      <View style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}/>
         </TouchableOpacity>
    
    <TouchableOpacity
    onPress={() => navigation.navigate("user")}>
    <Image
     style ={{width:40, height:40, top:90}}
     source={Envoyer}/>
     </TouchableOpacity>
  
     </SafeAreaView>
     
  );

  const renderVideoPlayer = () => (
    <Video
    source={{ uri: videoSource }}
    shouldPlay={true}
    style={styles.media}
    />
  );

     const pickImage = async () => 
      { 
     
     let result = await ImagePicker.launchImageLibraryAsync({
       
       mediaTypes: ImagePicker.MediaTypeOptions.All,
       allowsEditing: true,
       quality: 1,
      }
      );
      
      console.log(result);
      
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
   

  const renderVideoRecordIndicator = () => (
    <View style={styles.recordIndicatorContainer}>
      <View style={styles.recordDot} />
      <Text style={styles.recordTitle}>{"Recording..."}</Text>
     
    </View>
    
  );

  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Image style={{ width:40, height:40}}
      source={imagePath}></Image>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onLongPress={recordVideo} //
        onPressOut={stopVideoRecording}
        onPress={takePicture}//
        style={styles.capture}
   
      />
        <View>
        <TouchableOpacity
        onPress={() => navigation.navigate("user")}
        >
        <Image
         style ={{width:40, height:40}}
         source={Envoyer}
       
         />
         </TouchableOpacity>
         </View>
    <TouchableOpacity onPress={pickImage}>
             <Icon name="photo" size={30} style={{width:50, height:70, top: 18, alignItems: "center"}}>
             </Icon>
    </TouchableOpacity>


    
   </View>
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera 
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("camera error", error);
        }}/>
      
      <View style={styles.container}>
        {isVideoRecording && renderVideoRecordIndicator()}
        {videoSource && renderVideoPlayer()}
        {isPreview && renderCancelPreviewButton()}
        {!videoSource && !isPreview && renderCaptureControl()}


     
           {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>

        <TouchableOpacity
         onPress={logout}>
            <Image style={{ width:20, height:25, top: 5, left: 5}} source={deco} />
        </TouchableOpacity> 
            {image && <Image source={{ uri: image }} style={{ width: 500, height: 850 }} />} 

    
    </SafeAreaView>
  );  
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 380,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "70%",
    top: 18,
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "whitesmoke",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
});





