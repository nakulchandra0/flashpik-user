'use strict';
import { StyleSheet, Dimensions, Platform } from 'react-native';
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
        resizeMode: 'stretch',
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
    }, 

    inputContainer: {
        backgroundColor: Color.light_blue, 
        width: width * 0.85,
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

    textContainer: {
        marginVertical: width * 0.025
    },

    label: {
        fontFamily: Font.bold, 
        fontSize: width * 0.03, 
        color: Color.dark_blue
    },

    textBox: {
        padding: 0, 
        paddingTop: width * 0.03, 
        paddingBottom: 2, 
        borderBottomColor: Color.dark_blue, 
        borderBottomWidth: 1, 
        fontFamily: Font.regular, 
        fontSize: width * 0.055
    },

    buttonContainer: {
        width: width * 0.75,
        alignSelf: 'center', 
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
        marginTop: width * 0.05,
        marginBottom: width * 0.09,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingBottom: 12,
    },
    
    bottomContainer: {
        width: width * 0.7,
        alignItems:'center', 
        alignSelf: 'center',
        // borderWidth: 1
        paddingVertical: width * 0.02,
    },

    seprate: {
        flexDirection: 'row', 
        alignItems: 'center',
        width: width * 0.65
     },

    line: {
        flex: 1, 
        borderWidth: 0.7, 
        width:'100%', 
        borderColor: Color.dark_blue, 
    },

    socialTitle: {
        fontFamily: Font.bold, 
        fontSize: width * 0.03, 
        paddingHorizontal: width * 0.04,
    },

    logoContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: width * 0.06,
    },

    lLeft: {
        flex: 1, 
        alignItems:'flex-end', 
        paddingHorizontal: width * 0.02
    },

    lRight: {
        flex: 1, 
        paddingHorizontal: width * 0.02
    },

    logo: {
        width: width * 0.1,
        height: width * 0.1
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