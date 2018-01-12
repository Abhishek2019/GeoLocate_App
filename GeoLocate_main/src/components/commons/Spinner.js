import React from "react";
import { View, ActivityIndicator } from "react-native";



const Spinner = (props) => {

    return(
        <View style={styles.spinnerStyles}>
            <ActivityIndicator size={ props.size || 'large' }/>
        </View>
    );
};

const styles={

    spinnerStyles:{

        alignItems: "center",
        flex: 1,
        justifyContent: "center"

    }

};

export default Spinner;