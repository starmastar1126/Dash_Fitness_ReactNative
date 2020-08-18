import React, { Component } from 'react';
import { StyleSheet, View, Text, Image,Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
const {height,width} = Dimensions.get('window');
class WorkoutCompleteCell extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.contentView}>
                    <Image source={require('../res/completeBackground.png')} resizeMode="cover" style={styles.image}/>
                    <View style={styles.greenView}/>
                    <View style={{alignSelf: "center", alignItems: "center"}}>
                        <Image source={require('../res/check.png')} resizeMode="contain"/>
                        <Text style={styles.text}>Completed!</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
export default WorkoutCompleteCell;

WorkoutCompleteCell.propTypes = {
    onPress: PropTypes.func,
}

WorkoutCompleteCell.defaultProps = {
    onPress: {},
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1, 
        borderBottomRightRadius: 34,
        borderBottomLeftRadius: 34, 
        backgroundColor: "#F0F5FA",
        height: width * 0.45,
        overflow:"hidden",
        justifyContent: "center"
    },
    greenView: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "#26B223",
        opacity: 0.8
    },
    image: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    text: {
        top:14,
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 20,
        lineHeight: 24,
        color: "#FFFFFF"
    }
});