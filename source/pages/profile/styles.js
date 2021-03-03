'use strict';
import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import Color from '../../component/color';
import Font from '../../component/font';

var { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },
    
    titleContainer: {
        paddingHorizontal: width * 0.05,
        //borderWidth: 3,
    },

    title: {
        fontFamily: Font.bold,
        color: Color.dark_blue,
        fontSize: width * 0.058,
        //paddingTop: width * 0.03,
        paddingBottom: width * 0.03
    },

    mainContainer: {
        paddingHorizontal: width * 0.05,
        //borderWidth: 3,
    },

    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1
    },

    imageContainer: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: width / 2,
        //borderWidth: 1
    },

    userImage: {
        resizeMode: 'cover',
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: width / 2
    },

    editText: {
        fontFamily: Font.bold,
        color: Color.dark_blue,
        fontSize: width * 0.031,
        paddingVertical: width * 0.02
    },
   
    textContainer: {
        marginVertical: width * 0.022,
        //borderWidth: 1
    },

    label: {
        fontFamily: Font.bold, 
        fontSize: width * 0.03, 
        color: Color.dark_blue
    },

    textBox: {
        padding: 0,  
        paddingTop: 1,  
        paddingBottom: 2, 
        borderBottomColor: Color.dark_blue, 
        borderBottomWidth: 1.5, 
        fontFamily: Font.regular, 
        fontSize: width * 0.054,
        width: '100%'
    },

    buttonContainer: {
        paddingVertical: width * 0.05,
        //borderWidth: 2
    },

    buttonTitle: {
        fontFamily: Font.bold, 
        fontSize: width * 0.05,
        textAlign: 'center',
    },

    button: {
        backgroundColor: Color.dark_blue,
        width: '100%',
        //height: 45,
        borderRadius: 50,
        // paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: width * 0.015,
        // marginBottom: width * 0.015,
        paddingBottom: width * 0.025,
        paddingTop: width * 0.02,
    },
    
    toast: {
        fontFamily: Font.regular, 
        color: Color.white, 
        textAlign: 'center', 
        fontSize: width * 0.05,
        paddingTop: width * 0.001,
        paddingHorizontal:10,
        position: 'relative',
    },

    error: {
        color: Color.red,
        fontFamily: Font.extra_bold,
        fontSize: width * 0.03,
    },
    
    toast: {
        width: width * 0.9,
        alignItems: 'center',
        opacity: 0.9,
    }


})