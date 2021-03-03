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

    mainContainer: {
        paddingHorizontal: width * 0.05
    },

    title: {
        fontFamily: Font.bold,
        color: Color.dark_blue,
        fontSize: width * 0.058,
        paddingTop: width * 0.01,
        paddingBottom: width * 0.05
    },

    subTitle: {
        fontFamily: Font.bold,
        color: Color.dark_blue,
        fontSize: width * 0.058,
        paddingBottom: width * 0.035
    },

    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Color.grey_2, 
        height: width * 0.15,
    },

    leftNavigation: {
        width: width * 0.83,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //borderWidth: 1
    },

    rightNavigation: {
        width: width * 0.07,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',  
        //borderWidth: 1
    },

    radioBorder: {
        width: width * 0.04, 
        height: width * 0.04, 
        borderWidth: 1,
        borderRadius: 50, 
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.dark_blue,
    },

    innerRadio: {
        width: width * 0.025, 
        height: width * 0.025, 
        backgroundColor: Color.dark_blue, 
        borderRadius: 50
    },

    payImage: {
        resizeMode: 'contain',
        width: width * 0.2,
        height: width * 0.2
    },

    payTitle: {
        fontFamily: Font.regular,
        color: Color.dark_blue,
        fontSize: width * 0.05,
        paddingLeft: width * 0.06,
        paddingRight: 15,
    },

    payTitleSub: {
        fontFamily: Font.semi_bold,
        color: Color.red,
        fontSize: width * 0.03,
    },

    bottomContainer: {
        position: 'absolute',
        bottom: width * 0.05,
        width: width,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonTitle: {
        fontFamily: Font.bold, 
        fontSize: width * 0.05,
        textAlign: 'center',
    },

    disableButton: {
        backgroundColor: Color.grey_button,
        width: width * 0.9,
        textAlign: 'center',
    },

    disableTitleButton: {
        color: Color.white,
        fontFamily: Font.bold, 
        fontSize: width * 0.05,
    },

    button: {
        backgroundColor: Color.dark_blue,
        width: width * 0.9,
        // height: 45,
        borderRadius: 50,
        paddingTop: 8,
        paddingBottom: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.02,
        marginBottom: width * 0.02,
        // paddingBottom: width * 0.03,
    },
    
    /* modal css */
    content: {
        backgroundColor: Color.white,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
        justifyContent: 'center',
        paddingHorizontal: width * 0.07,
    },

    footerModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    inputContainer: {
        paddingTop: width * 0.03,
    },

    titleModal: {
        fontFamily: Font.regular, 
        fontSize: width * 0.045, 
        color: Color.black,
        paddingBottom: width * 0.02
    },

    textContainer: {
        marginVertical: width * 0.02,
    },

    label: {
        fontFamily: Font.bold, 
        fontSize: width * 0.03, 
        color: Color.dark_blue
    },

    textBox: {
        padding: 0,  
        paddingTop: 6,  
        paddingBottom: 2, 
        borderBottomColor: Color.dark_blue, 
        borderBottomWidth: 1.5, 
        fontFamily: Font.regular, 
        fontSize: width * 0.05,
        width: '100%'
    },

    toast: {
        width: width * 0.9,
        alignItems: 'center',
        opacity: 0.9,
    }
})