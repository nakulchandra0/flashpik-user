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
        fontSize: width * 0.07,
        //paddingTop: width * 0.03,
        paddingBottom: width * 0.07
    },

    navbar: {
        flexDirection: 'row',
        justifyContent: "center",
        backgroundColor: Color.white,
        alignItems:'center',
        paddingVertical: width * 0.028,
        paddingHorizontal: width * 0.05,
        borderTopColor: Color.dark_blue,
        borderTopWidth: 1
    },
     
    leftContainer: {
        flexDirection: 'row',
        marginRight: width *  0.03
    },
    
    centerContainer:{
        flex: 1, 
        justifyContent: 'flex-start',
        alignItems:'flex-start'
    },

    rightContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    
    notTitle: {
        textAlign: 'left',
        fontSize: width * 0.041, 
        fontFamily: Font.semi_bold,
        alignItems:'center',
        color: Color.dark_blue
    },

    date: {
        fontSize: width * 0.024,
        lineHeight: height * 0.015,
        fontFamily: Font.semi_bold
        //borderWidth: 1
    },

    icon: {
        resizeMode: 'contain',
        width: width * 0.1,
        height: width * 0.1
    },
})