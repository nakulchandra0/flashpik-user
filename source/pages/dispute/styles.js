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
        //paddingTop: width * 0.03,
        paddingBottom: width * 0.03
    },

    orderBox: {
        backgroundColor: Color.white,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginHorizontal: width * 0.05,
        marginVertical: width * 0.025,
        borderWidth: 1,
        borderColor: Color.grey_4,
    }, 
     
    topNavigation: {
        flexDirection:'row',
        alignItems: 'center', 
        borderBottomWidth:1, 
        borderBottomColor: Color.grey_3,
        paddingHorizontal: width * 0.03, 
        paddingVertical: width * 0.005, 
    },

    leftNavigation: {
        width: width * 0.3,
        alignItems: 'flex-start',
        //borderWidth: 1
    },

    rightNavigation: {
        flex: 1,
        alignItems: 'flex-end',
        //borderWidth: 1
    },
    
    subTitle: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.037,
    },
 
    nav: {
        flexDirection:'row',
        borderBottomColor: Color.grey_3,
        paddingHorizontal: width * 0.03, 
        //paddingBottom: width * 0.005,
    },

    leftNav: {
        flex: 0.3,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    rightNav: {
        flex: 1,
        alignItems: 'flex-start',
    },

    heading: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.038,
        //lineHeight: height * 0.025
    },
    
})