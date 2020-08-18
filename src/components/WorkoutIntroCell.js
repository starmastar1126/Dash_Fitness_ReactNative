import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const {height,width} = Dimensions.get('window');

class WorkoutIntroCell extends Component {
    render() {
        return (
            <View style={styles.contentView}>
                <Text style={styles.intro}>{this.props.text}</Text>
            </View>
        )
    }
}

export default WorkoutIntroCell;

WorkoutIntroCell.propTypes = {
    text: PropTypes.string,
}

WorkoutIntroCell.defaultProps = {
    text: "Some intro text here"
}

const styles = StyleSheet.create ({
    contentView: {
        flex: 1, 
        //borderBottomRightRadius: 34,
        //borderBottomLeftRadius: 34, 
        backgroundColor: "#6F80A7",
        height:width * 1.2,
        overflow:"hidden",
        justifyContent:"center",
    },
    intro: {
        marginTop: 20,
        marginLeft: 17,
        marginRight: 17,
        marginBottom: 20,
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 24,
        textAlign: "center",
        textAlignVertical: "center",
        color: "#FFFFFF"
    }
})