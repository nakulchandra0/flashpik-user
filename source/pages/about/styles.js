'use strict';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import Color from '../../component/color';
import Font from '../../component/font';

var { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.light_blue,
    },
    
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    headerLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: width * 0.03
    },

    menuIcon: {
        width: width * 0.08, 
        height: width * 0.08, 
        resizeMode:'contain'
    },
    
    mainContainer: {
        flex:1,
        justifyContent: 'center',
        paddingHorizontal: width * 0.1,
        alignItems: 'center', 
        //paddingTop: height * 0.2,
        //borderWidth: 1
    },

    logo: {
        width: width * 0.3,         
        height: width * 0.3,
        resizeMode:'contain',
    },

    flashpik: {
        width: width * 0.55,         
        height: width * 0.1,
        resizeMode:'contain',
    },
    
    bottom_view: {
        position: 'absolute',
        bottom: 0,
        width: width,
        height: height * 0.18,
        //alignItems: 'baseline',
        //borderWidth: 1
    },

    bottom_image: {
        width: width,
        height: height * 0.18,
        resizeMode: 'cover',
        marginBottom: 0,
        borderWidth: 1
    },

    version: {
        fontFamily: Font.extra_bold,
        fontSize: width * 0.03,
        color: Color.dark_blue,
        marginTop: height * 0.01,
        marginBottom: height * 0.04,
        //alignSelf: 'center'
    },
    
    box: {
        //borderWidth: 1,
        width: width,
        alignItems: 'center'
    },

    title: {
        fontFamily: Font.extra_bold,
        fontSize: width * 0.05,
        color: Color.dark_blue,
        textAlign: 'center',
        textDecorationLine: "underline"
    }
})