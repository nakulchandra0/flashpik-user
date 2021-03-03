'use strict';
import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import Color from '../../component/color';
import Font from '../../component/font';

var { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    imgBg: {
        width: '100%', 
        height: '100%',
        resizeMode: 'stretch'
    },

    overlay: {
        flex:1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 1,
        width: width,  
        backgroundColor:'transparent', 
        height: height,
        justifyContent: 'center',
        alignItems: 'center',  
    }, 

    inputContainer: {
        backgroundColor: Color.light_blue, 
        width: width * 0.86,
        borderRadius: 12,
        shadowColor: '#2D3082',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,        
        paddingHorizontal: width * 0.04,
        paddingVertical: width * 0.04,
        alignSelf: 'center',
    },

    title: {
        fontFamily: Font.bold, 
        fontSize: width * 0.058, 
        color: Color.dark_blue
    },

    info: {
        fontSize: width * 0.041,
        fontFamily: Font.regular,
        lineHeight: 15,
        paddingTop: width * 0.03
    },

    textContainer: {
        marginVertical: width * 0.03
    },

    label: {
        fontFamily: Font.bold, 
        fontSize: width * 0.03, 
        color: Color.dark_blue
    },

    textBox: {
        padding: 0,  
        paddingTop: 12, 
        paddingBottom: 4, 
        borderBottomColor: Color.dark_blue, 
        borderBottomWidth: 1, 
        fontFamily: Font.regular, 
        fontSize: width * 0.06
    },

    buttonContainer: {
        width: width * 0.75, 
    },

    buttonTitle: {
        fontFamily: Font.bold, 
        textAlign: 'center',
        fontSize: width * 0.06,
    },

    button: {
        backgroundColor: Color.dark_blue,
        width: '100%',
        height: height * 0.07,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
        marginVertical: width * 0.05,
        justifyContent: 'center',
        alignItems:'center',
        // paddingBottom: 12,
    },
    
    bottomContainer: {
        position: 'absolute',
        bottom: width * 0.08,
    },

    alreadyTitle: {
        fontFamily: Font.bold, 
        fontSize: width * 0.03, 
        color: Color.black,
    },
    
    error: {
        color: Color.red,
        fontFamily: Font.extra_bold,
        fontSize: width * 0.03,
    }

})