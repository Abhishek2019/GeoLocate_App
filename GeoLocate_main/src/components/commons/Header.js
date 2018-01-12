//imported required lib
import React from "react";
import { Text,
         View
} from "react-native";

const Header = ( props ) =>{

    const {viewStyle, textStyle} = styles;


    return(


            <View style={ viewStyle }>
                <Text style={ textStyle }>{ props.headerText }</Text>
            </View>

    );
};

const styles={

    viewStyle: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
        height: 60


    },
    textStyle:{
        fontSize: 40 ,
        fontWeight: "700" ,
        color: "#1777CB"
    }
};

//export it for implementing in index.js file
export default Header ;
