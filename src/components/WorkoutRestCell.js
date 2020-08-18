import React, { Component } from 'react';
import { StyleSheet, View, Text, Image,Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const {height,width} = Dimensions.get('window');
class WorkoutRestCell extends Component {
    render() {
        return (
            <View style={{flex:1,
              //borderBottomRightRadius: 34,
              //borderBottomLeftRadius: 34, 
              backgroundColor: "rgba(0,161,255, 1)",
              height:width * 1.2,
              overflow:"hidden" }}>
           <View style={{flex:1, marginLeft:16,justifyContent:"center"}}>
             <Text style={{color:"#FFFFFF",fontSize:24,lineHeight:26,fontStyle:"normal",fontWeight:"bold",fontFamily:"Poppins"}}>Rest</Text>
           </View>
           <View style={{flex:4,justifyContent:"center" ,alignItems:"center" }} >
             <View style={{height:240,width:240 ,alignItems:'center' ,justifyContent:"center"}}>

             <AnimatedCircularProgress
                size={240}
                width={20}
                fill={50}
                rotation={0}
                tintColor="#FFFFFF"
                duration={1000}
                style={{position:"absolute",left:0,top:0}}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="rgba(255,255,255, .4)" />
               <Text  style={{color:"#FFFFFF",fontSize:40,lineHeight:42,fontStyle:"normal",fontWeight:"bold",fontFamily:"Poppins"}}>30</Text>
                 <Text  style={{color:"#FFFFFF",marginTop:5,fontSize:18,lineHeight:20,fontStyle:"normal",fontWeight:"bold",fontFamily:"Poppins" ,letterSpacing:1.6}}>Rest</Text>
             </View>
            
           </View>
           <View style={{flex:1 ,marginLeft:16,justifyContent:"center"}} >
           <Text style={{color:"#FFFFFF",fontSize:32,lineHeight:34,fontStyle:"normal",fontWeight:"bold",fontFamily:"Poppins"}}>00:30</Text>
           </View>
           </View>
        );
    }
}
export default WorkoutRestCell;
