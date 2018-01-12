import React from "react";
import { View } from "react-native";



const CardSection =(props) =>{
    return(
        <View style={ [styles.containerStyle] }>
            { props.children }
        </View>
    );
};


const styles ={
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: "#fff",
        borderColor: "black",
        flexDirection: "row",
        justifyContent: "flex-start",
        position: "relative"

    }
};


export default CardSection;

