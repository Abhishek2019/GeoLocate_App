import React,{ Component } from "react";
import { View, Dimensions, BackHandler } from "react-native";
import MapView from "react-native-maps";
import { PermissionsAndroid } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { FloatingAction } from 'react-native-floating-action';


import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";


const {width,height} = Dimensions.get("window");
const GOOGLE_MAPS_APIKEY = 'AIzaSyB13MpI1LMJD38RjFfdkoOyI25Rr2OyNV0';
const SCREEN_H = height;
const SCREEN_W = width;
const ASPECT_RATIO = SCREEN_W/SCREEN_H;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const actions = [{
    text: 'Accessibility',
    icon: require('./src/images/taylor_app_logo.jpg'),
    name: 'bt_accessibility',
    position: 2
}, {
    text: 'Language',
    icon: require('./src/images/taylor_app_logo.jpg'),
    name: 'bt_language',
    position: 1
}, {
    text: 'Location',
    icon: require('./src/images/taylor_app_logo.jpg'),
    name: 'bt_room',
    position: 3
}, {
    text: 'Video',
    icon: require('./src/images/taylor_app_logo.jpg'),
    name: 'bt_videocam',
    position: 4
}];



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


        },
        markerCoordinates : {

            latitude: 0,
            longitude: 0,
        },

        longPressCoordinates :{
            latitude: 0,
            longitude: 0,
        },

        watchID: 0,

        visibleModeFloatButton : false,

    };

    componentWillMount(){

        if(!(PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION))){

            this.requestLocationPermission()

        }


        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO",
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true, // false => Directly catch method is called if location services are turned off
            preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
            preventBackClick: false //true => To prevent the location services popup from closing when it is clicked back button
        });

        BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
            LocationServicesDialogBox.forceCloseDialog();
        });


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

    onMapLongPress(e){

        longPress = {

            latitude : e.nativeEvent.coordinate.latitude,
            longitude : e.nativeEvent.coordinate.longitude,
        };

        this.setState({longPressCoordinates : longPress, visibleModeFloatButton : true })

    }


    checkModeFloatButton(){

        if(this.state.visibleModeFloatButton){
            return(
            <FloatingAction
                actions={actions}
                position = "left"
                showBackground = {true}

                onPressItem={
                    (name) => {
                        console.log(`selected button: ${name}`);
                    }
                }

            />
            );
        }
    }


    render(){
      return(
          <View style = {{flex : 1}}>
              <MapView
                  initialRegion = {this.state.initialPosition}
                  style={styles.MapViewStyles}
                  mapType = "standard"
                  showsUserLocation = {true}
                  showsMyLocationButton = {true}
                  // showsTraffic = {true}
                  zoomEnabled = {true}
                  loadingEnabled = {true}

                  onLongPress={this.onMapLongPress.bind(this)}
              >


                  <MapView.Marker

                      coordinate={this.state.longPressCoordinates}
                      pinColor = {"darkgreen"}
                  />

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

                  <MapViewDirections
                      origin={this.state.markerCoordinates}
                      destination={this.state.longPressCoordinates}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={5}
                      strokeColor="hotpink"
                      // language
                      alternatives = {true}
                  />

              </MapView>


              {this.checkModeFloatButton()}

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