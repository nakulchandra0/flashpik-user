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
    
    childView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        top: -1
    },
       
    starImage: {
        width: width * 0.037,
        height: width * 0.037,
        resizeMode: 'cover',
        marginRight: 3,
    },
      
    mainContainer: {
        paddingHorizontal: width * 0.05
    },

    title: {
        fontFamily: Font.bold,
        color: Color.dark_blue,
        fontSize: width * 0.058,
        //paddingTop: width * 0.01,
        paddingBottom: width * 0.03
    },

    orderBox: {
        backgroundColor: Color.white,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 2.22,
        elevation: 4,
        marginHorizontal: width * 0.05,
        marginVertical: width * 0.02,
        paddingVertical: height * 0.003,
        borderWidth: 1,
        borderColor: Color.grey_4
    },
     
    navigation: {
        flexDirection:'row',
        alignItems: 'center', 
        borderBottomColor: Color.grey_3,
        paddingHorizontal: width * 0.03,
        paddingVertical: width * 0.006,
    },

    leftNavigation: {
        flex: 1
    },

    rightNavigation: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'flex-end'
    },
    
    rightNav: {
        paddingRight: 10
    },

    date: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.037,
    },

    orderStatus: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.037,
        textTransform: 'capitalize',
        lineHeight: height * 0.023
    },

    name: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.037,
        lineHeight: height * 0.023,
        //borderWidth: 1,
    },

    profileContainer: {
        width: width * 0.085,
        height: width * 0.085,
        resizeMode: 'cover',
        borderRadius: width / 2,
        //borderWidth :1,
    },

    userImage: {
        width: width * 0.085,
        height: width * 0.085,
        borderRadius: width / 2
    },

    locationNav: {
        padding: width * 0.008,
        paddingLeft: 0,
    },

    dot: {
        width: width * 0.02,
        height: width * 0.02,
        borderRadius: 50,
    },

    content: {
        marginLeft: 37,
    },

    locationTitle: {
        fontFamily: Font.bold,
        fontSize: width * 0.03
    },
     
    timeline: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 40,
        justifyContent: 'center',  
        alignItems: 'center',
    },
    
    line: {
        position: 'absolute',
        top: 0,
        width: 2,
        bottom: 0,
    },
    
    topLine: {
        flex: 1,
        width: 2,
        backgroundColor: 'black',
    },
    
    bottomLine: {
        flex: 1,
        width: 2,
        backgroundColor: 'black',
    },
    
    hiddenLine: {
        width: 0,
    },
      
})