'use strict';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import Color from '../../component/color';
import Font from '../../component/font';

var { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    
    mainContainer: {
        flex:1,
        alignItems:'center', 
        paddingHorizontal: width * 0.15,
        paddingTop: width * 0.3,
    },

    logo: {
        width: width * 0.3,         
        height: width * 0.3,
        resizeMode:'contain',
    },

    mainTitle: {
        fontSize: width * 0.058,         
        fontFamily: Font.bold,
        color: Color.dark_blue,
        textAlign:'center',
        paddingVertical: width * 0.03
    },
    
    subTitle: {
        fontSize: width * 0.046,         
        fontFamily: Font.semi_bold,
        textAlign:'center',
        paddingVertical: width * 0.02
    },

    bottomContainer: {
        position: 'absolute',
        bottom: width * 0.05,
        width: width,
        paddingHorizontal: width * 0.05
    },

    buttonTitle: {
        fontFamily: Font.bold, 
        textAlign: 'center',
        fontSize: width * 0.05,
    },

    button: {
        backgroundColor: Color.dark_blue,
        width: '100%',
        height: 45,
        borderRadius: 50,
        // paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.02,
        marginBottom: width * 0.06,
    },
    

    
})