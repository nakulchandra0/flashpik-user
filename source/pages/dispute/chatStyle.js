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
        //paddingTop: width * 0.025,
        paddingBottom: width * 0.05
    },

    orderBox: {
        borderBottomColor: Color.dark_blue,
        borderBottomWidth: 1,
        paddingHorizontal: width * 0.05,
        //borderWidth: 1,
    },
    
    topNavigation: {
        flexDirection:'row',
        alignItems: 'center', 
        marginBottom: 10,
        paddingVertical: 1,
        //borderWidth: 1,
    },

    leftNavigation: {
        flex: 1,
        alignItems: 'flex-start',
    },

    rightNavigation: {
        flex: 1,
        alignItems: 'flex-end'
    },
    
    subTitle: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.037,
        //borderWidth: 1,
        lineHeight: height * 0.023
    },
 
    nav: {
        flexDirection:'row',
        borderBottomColor: Color.grey_3,
        paddingBottom: width * 0.001,
        //borderWidth: 1,
    },

    leftNav: {
        flex: 0.25,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },

    rightNav: {
        flex: 1,
        alignItems: 'flex-start'
    },

    heading: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.036
    },
    
    reason: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.03,
    },

    chatContainer: {
        flex: 1,
    }
})