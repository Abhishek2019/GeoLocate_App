import React,{ Component } from "react";
import { Text,View, Dimensions, BackHandler, Alert } from "react-native";
import MapView from "react-native-maps";
import { PermissionsAndroid } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { FloatingAction } from 'react-native-floating-action';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";


const {width,height} = Dimensions.get("window");
const GOOGLE_MAPS_APIKEY = 'AIzaSyB13MpI1LMJD38RjFfdkoOyI25Rr2OyNV0';
const GOOGLE_PLACES_APIKEY = 'AIzaSyBdCRNDm2aRQ9JRcsMVkEKwUGC4aK448K0';
const SCREEN_H = height;
const SCREEN_W = width;
const ASPECT_RATIO = SCREEN_W/SCREEN_H;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


const actions = [{
    text: 'driving',
    icon: require('./src/images/taylor_app_logo.jpg'),
    name: 'mode_drive',
    position: 1
}, {
    text: 'bicycling',
    icon: require('./src/images/taylor_app_logo.jpg'),
    name: 'mode_bicycle',
    position: 2
}, {
    text: 'walking',
    icon: require('./src/images/taylor_app_logo.jpg'),
    name: 'mode_walk',
    position: 3
}, {
    text: 'transit',
    icon: require('./src/images/taylor_app_logo.jpg'),
    name: 'mode_transit',
    position: 4
}];


// const GooglePlacesInput = () =>{
//
//     return(
//         <GooglePlacesAutocomplete
//             placeholder='Search'
//             minLength={2} // minimum length of text to search
//             autoFocus={false}
//             returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
//             listViewDisplayed='auto'    // true/false/undefined
//             fetchDetails={true}
//             renderDescription={row => row.description} // custom description render
//             onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
//                 console.log(data, details);
//             }}
//
//             getDefaultValue={() => ''}
//
//             query={{
//                 // available options: https://developers.google.com/places/web-service/autocomplete
//                 key: GOOGLE_PLACES_APIKEY,
//                 language: 'en', // language of the results
//                 types: '(cities)' // default: 'geocode'
//             }}
//
//             styles={{
//                 textInputContainer: {
//                     width: '100%'
//                 },
//                 description: {
//                     fontWeight: 'bold'
//                 },
//                 predefinedPlacesDescription: {
//                     color: '#1faadb'
//                 }
//             }}
//
//             currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
//             currentLocationLabel="Current location"
//             nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
//             GoogleReverseGeocodingQuery={{
//                 // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
//             }}
//             GooglePlacesSearchQuery={{
//                 // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
//                 rankby: 'distance',
//                 types: 'food'
//             }}
//
//             filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
//             predefinedPlaces={[homePlace, workPlace]}
//
//             debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
//             renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
//             renderRightButton={() => <Text>Custom text after the input</Text>}
//         />
//
//     );
//
// };


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

        watchID : null,

        visibleModeFloatButton : false,

        modeMap : 'driving',

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

        // alert('Position could not be determined.');

        longPress = {

            latitude : e.nativeEvent.coordinate.latitude,
            longitude : e.nativeEvent.coordinate.longitude,
        };

        this.setState({longPressCoordinates : longPress, visibleModeFloatButton : true });



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

                        if(name === 'mode_drive'){
                            console.log(name);
                            this.setState({modeMap : 'driving'})
                        }
                        else if(name === 'mode_bicycle'){

                            console.log(name);
                            this.setState({modeMap : 'bicycling'})

                        }
                        else if(name === 'mode_walk'){

                            console.log(name);
                            this.setState({modeMap : 'walking'})

                        }
                        else if(name === 'mode_transit'){

                            console.log(name);
                            this.setState({modeMap : 'transit'})

                        }


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
                  region = {this.state.initialPosition}
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
                      mode = {this.state.modeMap}
                      strokeColor="hotpink"
                      // language
                      alternatives = {true}
                  />




              </MapView>



              <GooglePlacesAutocomplete
                  placeholder='Enter Location'
                  minLength={2}
                  autoFocus={false}
                  returnKeyType={'default'}
                  fetchDetails={true}

                  onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                     // console.log(data, details);
                      alert(data+" "+details);
                  }}

                  query={{
                      // available options: https://developers.google.com/places/web-service/autocomplete
                      key: GOOGLE_MAPS_APIKEY,
                      language: 'en', // language of the results
                      // types: '(cities)' // default: 'geocode'
                  }}

                  styles={{
                      textInputContainer: {
                          backgroundColor: 'rgba(0,0,0,0)',
                          borderTopWidth: 0,
                          borderBottomWidth:0
                      },
                      textInput: {
                          marginLeft: 0,
                          marginRight: 0,
                          height: 38,
                          color: '#5d5d5d',
                          fontSize: 16
                      },
                      predefinedPlacesDescription: {
                          color: '#1faadb'
                      },
                  }}
                  currentLocation={false}
              />

              {this.checkModeFloatButton()}

          </View>

      );
    };
}

const styles ={
  MapViewStyles:{
      left: 0,
      right: 0,
      top:0,
      bottom: 0,
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