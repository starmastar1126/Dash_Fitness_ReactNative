import * as React from 'react';
import {
    StyleSheet,
    Animated,
    Dimensions,
    Platform,
    View,
    StatusBar,
    Text,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import IconEntypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

export default class NewView extends React.Component {

    render() {
        console.log(" Comleeted props =", this.props); 
        return (
            <View style={{ flex: 1, backgroundColor: 'rgb(0, 154, 255)' }}>
                <View style={{
                    height: '100%', width: '100%'
                }}>
<Text>Chandni</Text>
                </View>
                </View>)}
}