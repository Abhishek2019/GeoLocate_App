import React,{ Component } from "react";
import { View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { PermissionsAndroid } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

const {width,height} = Dimensions.get("window");
const GOOGLE_MAPS_APIKEY = 'AIzaSyB13MpI1LMJD38RjFfdkoOyI25Rr2OyNV0';
const SCREEN_H = height;
const SCREEN_W = width;
const ASPECT_RATIO = SCREEN_W/SCREEN_H;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;




async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Access Location Permission',
                'message': ' App needs access to your GPS ' +
                'so we can track your location.'
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
        } else {
            console.log("Location access permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}


class App extends Component{

    state = {

        initialPosition:{
            latitude: 0,
            longitude: 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            watchID: 0,
        },
        markerCoordinates : {

            latitude: 0,
            longitude: 0,
        }

    };

    componentWillMount(){

        if(!(PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION))){

            this.requestLocationPermission()

        }

    }


    componentDidMount(){

        navigator.geolocation.getCurrentPosition((position) =>{

            lat = parseFloat(position.coords.latitude);
            lon = parseFloat(position.coords.longitude);

            initialPosition = {
                latitude: lat,
                longitude: lon,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };

            initialMarkerPosition = {
                latitude: lat,
                longitude: lon,
            };


            this.setState({initialPosition : initialPosition});
            this.setState({markerCoordinates : initialMarkerPosition});

        },(error) => alert(JSON.stringify(error))
            );

            ID = navigator.geolocation.watchPosition((position) => {

            lat = parseFloat(position.coords.latitude);
            lon = parseFloat(position.coords.longitude);

            currentPosition = {
                latitude: lat,
                longitude: lon,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };

            currentMarkerPosition = {
                latitude: lat,
                longitude: lon,
            };


            this.setState({watchID : ID  ,initialPosition : currentPosition});
            this.setState({markerCoordinates : currentMarkerPosition});


        })


    }

    componentWillUnmount(){

        navigator.geolocation.clearWatch(this.state.watchID);

    }

    render(){
      return(
          <View style = {{flex : 1}}>
              <MapView
                  initialRegion = {this.state.initialPosition}
                  style={styles.MapViewStyles}
                  mapType = "standard"
                  showsMyLocationButton
                  showsTraffic = {true}
                  zoomEnabled = {true}
                  loadingEnabled = {true}
                 showsUserLocation
              >


                  {/*<MapView.UrlTile*/}
                      {/*urlTemplate = "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                  {/*/>*/}

                  <MapView.Marker

                      coordinate={this.state.markerCoordinates}
                  >
                      {/*<View style={styles.radius}>*/}
                          {/*<View style={styles.markerStyles}/>*/}
                      {/*</View>*/}

                  </MapView.Marker>

              </MapView>

          </View>

      );
    };
}

const styles ={
  MapViewStyles:{
      left: 0,
      right: 0,
      top:5,
      bottom: 5,
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