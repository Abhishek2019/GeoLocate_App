import React,{ Component } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";


class App extends Component{



    render(){
      return(
          <View style={{flex : 1}}>
              <MapView

                  initialRegion={{
                      latitude: 37.78825,
                      longitude: -122.4324,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                  }}

                  style={styles.MapViewStyles}
              >

                  <MapView.Marker

                      coordinate={{
                          latitude: 37.78825,
                          longitude: -122.4324
                      }}
                  >
                      <View style={styles.radius}>
                          <View style={styles.markerStyles}/>
                      </View>

                  </MapView.Marker>

              </MapView>

          </View>

      );
    };
}

const styles ={
  MapViewStyles:{
      left: 10,
      right: 10,
      top:10,
      bottom: 10,
      position: "absolute"
  },
  radius:{
      height: 50,
      width: 50,
      borderRadius: 50/2,
      overflow: "hidden",
      backgroundColor: "rgba(0,122,255,0.1)",
      borderWidth: 1,
      borderColor: "rgba(0,122,255,0.3)",
      justifyContent: "center",
      alignItems: "center",
  },
    markerStyles:{

      height: 20,
        width:20,
        borderWidth: 3,
        borderColor: "white",
        borderRadius: 20/2,
        overflow: "hidden",
        backgroundColor: "#007AFF"
    }

};


export default App;