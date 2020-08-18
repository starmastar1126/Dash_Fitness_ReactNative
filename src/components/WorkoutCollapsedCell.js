import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

class WorkoutCollapsedCell extends Component {
    render() {
        return (
            <View style={styles.contentView}>
                {/* <Image source={require('../res/workoutimage.png')} resizeMode="cover" style={styles.image}/> */}
                <View style={{width:"100%", bottom: 0, alignSelf: "center", left: 0, right: 0}}>
                        <Text style={styles.exercise}>{this.props.exercise}</Text>
                        <Text style={styles.reps}>{this.props.reps} Reps</Text>
                </View>
                <View style={{width: "60%", height: "100%", right: 0, bottom: 0, position: "absolute", opacity: 0.33}}>
                    <Image source={require("../res/workoutimage.png")} resizeMode="cover" style={styles.image}/>
                    <LinearGradient colors={["#C4C4C4", "rgba(196, 196, 196, 0)"]} style={styles.linearGradient}/>
                </View>
            </View>
        );
    }
}

export default WorkoutCollapsedCell;

WorkoutCollapsedCell.propTypes = {
    exercise: PropTypes.string,
    reps: PropTypes.number,
}

WorkoutCollapsedCell.defaultProps = {
    exercise: "Exercise name",
    reps: 0,
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        backgroundColor: "#6F80A7"
    },
    linearGradient: {
        flex: 1
        // borderRadius: 8
    },
    exercise: {
        marginTop: 20,
        marginLeft: 16,
        marginRight: 16,
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 16,
        color: "#FFFFFF"
    },
    image: {
        width: "100%",
        height: "100%",
        position: "absolute"
    },
    reps: {
        marginLeft: 16,
        marginBottom: 21,
        marginRight: 16,
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 16,
        color: "#FFFFFF"
    }
});