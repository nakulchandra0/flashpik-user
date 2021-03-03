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
      
    title: {
        fontSize: width * 0.058,
        fontFamily: Font.bold,
        color: Color.dark_blue,
        paddingBottom: width * 0.025, 
        paddingHorizontal: width * 0.05
    },
     

    inputContainer: {
        paddingBottom : width * 0.05,
        // paddingVertical: width * 0.01,
        // borderWidth: 1,
    },

    textContainer: {
        marginVertical: width * 0.025,
    },

    label: {
        fontFamily: Font.bold, 
        fontSize: width * 0.03, 
        color: Color.dark_blue
    },

    labelValueContainer: {
        width: width * 0.9,
        padding: 0, 
        paddingTop: 9,
        paddingBottom: 2, 
        borderBottomColor: Color.dark_blue, 
        borderBottomWidth: 1.5, 
    },

    labelValue: {
        fontFamily: Font.regular, 
        // fontSize: width * 0.053,
        fontSize: width * 0.04,
    },

    invoiceContainer: {
        backgroundColor: Color.bottom_bar,
        borderRadius: 17,
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.03,
        marginBottom: width * 0.03
    },

    invoicelTitle: {
        fontFamily: Font.bold,
        color: Color.dark_blue,
        fontSize: width * 0.058,
    },

    titleModal : {
        fontFamily: Font.regular,
        fontSize: width * 0.05,
        color: Color.black
    },

    infoNav: {
        paddingTop: width * 0.01,
        flexDirection: 'row',
        alignItems: 'center',
        //borderWidth: 1
    },

    infoNavBox: {
        flex:1
    },

    infoNavTitle: {
        fontFamily: Font.regular,
        fontSize: width * 0.05,
        color: Color.dark_blue
    },

    infoNavTax: {
        paddingVertical: width * 0.005,
        flexDirection: 'row',
        alignItems: 'center',
    },

    choiceInfo: {
        width: width * 0.027,
        height: width * 0.027,
        resizeMode: 'contain',
        marginLeft: 8,
        marginTop: width * 0.02,
    },

    detailContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.02,
        marginBottom: height * 0.04,
        paddingHorizontal: width * 0.02,
        //borderWidth: 1,
    },

    detailImage: {
        resizeMode: 'contain',
        width: width * 0.15,
        height: width * 0.15
    },

    detailTitle: {
        paddingTop: width * 0.01,
        fontFamily: Font.regular,
        fontSize: width * 0.04,
        color: Color.dark_blue,
    },

    detailSubTitle: {
        fontFamily: Font.bold,
        fontSize: width * 0.04,
        color: Color.dark_blue,
        lineHeight: width * 0.045
    },

    buttonContainer: {
        width: '100%', 
        // paddingHorizontal: width * 0.06
    },

    buttonTitle: {
        fontFamily: Font.bold, 
        fontSize: width * 0.06,
        textAlign: 'center',
    },

    button: {
        backgroundColor: Color.dark_blue,
        width: '100%',
        //height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: height * 0.005,
        paddingTop: width * 0.02,
        paddingBottom: width * 0.025
    },

    /* modal css */
    content: {
        backgroundColor: Color.white,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
        justifyContent: 'center',
        paddingHorizontal: width * 0.07,
        paddingVertical: width * 0.02,
    },

    footerModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

})