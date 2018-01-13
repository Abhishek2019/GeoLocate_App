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
                      longitudeDelta: 0.0421,
                  }}

                  style={styles.MapViewStyles}



              />
          </View>

      );
    };
}

const styles ={
  MapViewStyles:{
      left: 5,
      right: 5,
      top:5,
      bottom: 5,
      position: "absolute"
  }
};


export default App;