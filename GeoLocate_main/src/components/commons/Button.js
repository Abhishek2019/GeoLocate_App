import React from "react";
import { Text,TouchableOpacity } from "react-native"



const Button = (props) =>{

    return(
        <TouchableOpacity style={styles.buttonContainerStyles} onPress={ props.onPress }>
            <Text style={styles.buttonTextStyles}> {props.text} </Text>
        </TouchableOpacity>

    );
};

const styles = {

    buttonContainerStyles: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#007aff",
        borderRadius: 2,
        flex: 1,
        alignSelf: "stretch",
        marginLeft: 10,
        marginRight: 10,


    },

    buttonTextStyles: {

        fontSize: 18,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: "center",
        fontWeight: "600"
    }
};



export default Button ;