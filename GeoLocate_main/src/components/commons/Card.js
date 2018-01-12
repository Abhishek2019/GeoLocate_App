import React from "react";
import {
    View
} from "react-native";



const Card = (props) =>{
    return(
        <View style={ styles.containerStyle }>
            { props.children }
        </View>
    );
};


const styles ={

    containerStyle: {

        borderWidth: 2,
        borderRadius: 2,
        borderColor: "#ddd",
        borderBottomWidth: 0,
        shadowColor: "black",
        shadowOpacity: 0.6,
        elevation: 2
    }
};




export default Card ;