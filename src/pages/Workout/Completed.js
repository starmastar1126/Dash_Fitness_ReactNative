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

export default class Completed extends React.Component {

    render() {
        console.log(" Comleeted props =", this.props); 
        return (
            <View style={{ flex: 1, backgroundColor: 'rgb(0, 154, 255)' }}>
                <View style={{
                    height: '100%', width: '100%'
                }}>
                    <LinearGradient
                        colors={['rgb(0, 132, 254)', 'rgb(0, 152, 254)','#007BFF']}
                        style={{
                            flex: 1,
                            width: '100%',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                        <View style={{ alignItems: 'center', top: 70, position:'absolute', alignSelf:'center' }}>
                            <View style={{

                                backgroundColor: 'rgb(52, 176, 255)',
                                width: 110, height: 110,
                                borderRadius: 55, borderColor: 'white', borderWidth: 7,
                                alignItems: 'center', justifyContent: 'center',
                            }}>
                                <IconEntypo name="check" color="white" style={{ fontSize: 40 }} x/>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 24,
                                    lineHeight: 28,
                                }}
                            >Great Work!</Text>
                            <Text style={{
                                color: 'white',
                                fontFamily: 'Poppins-Bold',
                                fontSize: 24,
                                lineHeight: 28,

                            }}>You have finished
                        </Text>
                            <Text style={{
                                color: 'white',
                                fontFamily: 'Poppins-Bold',
                                fontSize: 24,
                                lineHeight: 28,

                            }}>todays task.</Text>

                        </View>

                        <View style={{
                            bottom: 15,
                            position: 'absolute', width: '90%', alignSelf: 'center',
                        }} >
                            <View style={{

                               height:167,
                                borderRadius: 22, paddingBottom: 20,
                                backgroundColor: '#FFFFFF',

                            }}>
                                <View style={{}}>
                                    <View>
                                        <Text
                                            style={{
                                                color: 'black',
                                                fontFamily: 'Poppins-Bold',
                                                fontSize: 20,
                                                paddingTop:23,
                                                // lineHeight: 24,
                                                alignSelf: 'center',
                                            }}>Day 1</Text>
                                        <Text
                                            style={{
                                                color: 'rgb(176, 190, 212)',
                                                fontFamily: 'Poppins-Medium',
                                                fontSize: 14,
                                                alignSelf: 'center',
                                                paddingTop:5
                                            }}
                                        > Mediation Day</Text>
                                    </View>
                                    <View style={{}}>

                                        <TouchableOpacity style={{
                                            height: 50,
                                            alignItems: 'center',
                                            marginTop:10,
                                            width: '70%',
                                            alignSelf: 'center'

                                        }} onPress={() => {
                                            Actions.ChallengeDetail({challenge: this.props.challenge, user: this.props.user, isTaskCompleted: true })
                                        }}>
                                            <LinearGradient
                                                colors={['#007BFF', '#00A1FF']}
                                                style={{
                                                    flex: 1,
                                                    width: '100%',
                                                    borderRadius: 24,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: '#FFFFFF',
                                                        fontFamily: 'Poppins-Medium',
                                                        fontSize: 14,
                                                        lineHeight: 24,
                                                        padding: 2,
                                                    }}>
                                                    Mark As Complete!
                             </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        )
    }

}