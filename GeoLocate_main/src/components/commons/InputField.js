import React from "react";
import {

    View,
    Text,
    TextInput
} from "react-native";



const InputField = (props) =>{

    return(
        <View style={styles.inputContainerStyles}>
            <Text style={styles.labelStyles} >{props.label}</Text>
            <TextInput
                autoCorrect={false}
                secureTextEntry={props.secureTextEntry}
                value={props.value}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                style={ styles.inputStyles }
                underlineColorAndroid="transparent"
            >
            </TextInput>
        </View>

            );
};


const styles={
    inputStyles:{
        flex: 2,
        fontSize: 18,
        paddingLeft: 0,
        paddingRight: 5,
        lineHeight: 23
    },
    labelStyles:{
         fontSize: 18,
         flex: 1,
        fontWeight: "600",
         paddingLeft: 5

    },
    inputContainerStyles:{
        height: 40,
        flex:1,
        flexDirection: "row",
        alignItems: "center"
    }
};


export default InputField;


