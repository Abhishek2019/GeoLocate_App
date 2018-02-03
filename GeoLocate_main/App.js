import React,{ Component } from "react";
import { View, Dimensions } from "react-native";
import MapView from "react-native-maps";

const {width,height} = Dimensions.get("window");

const SCREEN_H = height;
const SCREEN_W = width;
const ASPECT_RATIO = SCREEN_W/SCREEN_H;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class App extends Component{

    state = {

        initialPosition:{
            latitude: 0,
            longitude: 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }

    };

    componentDidMount(){

        navigator.geolocation.getCurrentPosition((position) =>{

            lat = parseFloat(position.coords.latitude);
            lon = parseFloat(position.coords.longitude);

            currentPosition = {
                latitude: lat,
                longitude: lon,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };

            this.setState({initialPosition : currentPosition});

        })

    }

    render(){
      return(
          <View style = {{flex : 1}}>
              <MapView

                  initialRegion = {this.state.initialPosition}

                  style={styles.MapViewStyles}
              >

                  {/*<MapView.Marker*/}

                      {/*coordinate={{*/}
                          {/*latitude: 0,*/}
                          {/*longitude: 0*/}
                      {/*}}*/}
                  {/*>*/}
                      {/*<View style={styles.radius}>*/}
                          {/*<View style={styles.markerStyles}/>*/}
                      {/*</View>*/}

                  {/*</MapView.Marker>*/}

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