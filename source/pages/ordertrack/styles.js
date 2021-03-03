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
        paddingHorizontal: width * 0.05,
    },

    title: {
        fontFamily: Font.bold,
        color: Color.dark_blue,
        fontSize: width * 0.058,
        paddingTop: 0,
        paddingBottom: width * 0.05
    },

    locationNav: {
        padding: width * 0.01,
        paddingLeft: 0,
    },

    dot: {
        width: width * 0.02,
        height: width * 0.02,
        borderRadius: 50,
    },

    content: {
        marginLeft: 35,
    },

    locationTitle: {
        fontFamily: Font.bold,
        fontSize: width * 0.031,
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
        borderStyle: 'dashed',
        // borderWidth: 1,
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
    
    mapContainer: {
        height: height * (85/100) - 60,
        //borderWidth: 2
    },

    map: {
        height: height * (85/100) - 60
    },

    bottomContainerInfo: {
        position: 'absolute',
        bottom: width * 0.18,
        width: width - width * 0.1,
        marginHorizontal: width * 0.05,
        backgroundColor: "rgba(255,255,255,1)",
        // paddingHorizontal: width * 0.04, 
        // paddingVertical: width * 0.01, 
        borderRadius: 7
    },

    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: width - width * 0.1,
        marginHorizontal: width * 0.05,
        backgroundColor: "rgba(255,255,255,1)",
        paddingVertical: width * 0.015, 
        paddingHorizontal: width * 0.04,
        paddingBottom: width * 0.04,
        borderTopLeftRadius: 7, 
        borderTopRightRadius: 7,
        justifyContent: 'center', 
    },

    navigation: {
        flexDirection:'row',
        alignItems: 'center', 
        paddingVertical: 0.01,
        // borderBottomWidth: 1, 
        // borderBottomColor: Color.grey_3
    },

    navigationRoot: {
        flexDirection:'column',
        alignItems: 'flex-start', 
        paddingVertical: 0.01,
        borderBottomWidth: 1, 
        borderBottomColor: Color.grey_3
    },

    navigationBtn: {
        flexDirection:'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.02,
    },

    left: {
        flex: 1,
        alignItems: 'center',
        flexDirection:'row',
        paddingHorizontal: width * 0.04,
        paddingVertical: width * 0.01,
    },

    imageContainer: {
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: width /2,
        //borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    userImage: {
        width: width * 0.09,
        height: width * 0.09,
        resizeMode: 'cover',
        borderRadius: width / 2,
    },

    leftNav: {
        marginLeft: 10,
        paddingTop: 3,
        //borderWidth: 1,
        justifyContent: 'center',
        padding: 0
    },

    name: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.032,
    },

    childView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,
    },

    starGiven: {
        resizeMode: 'cover',
        width: width * 0.047,
        height: width * 0.047,
        padding: 0,
        margin: 0,
        top: -height * 0.005,
    },

    starTitle: {
        fontFamily: Font.bold, 
        fontSize: width * 0.05,
        paddingLeft: 3,
        lineHeight: height * 0.028
    },

    number: {
        fontFamily: Font.regular,
        fontSize: width * 0.031,
        textAlign: 'center',
        lineHeight: height * 0.028
    },

    right: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: width * 0.04,
        paddingVertical: width * 0.01,
    },
    
    trackIcon: {
        width: width * 0.075,
        height: width * 0.075,
        resizeMode: 'contain',
        marginLeft: 10,
        marginVertical: width * 0.01,    
    },

    buttonBox: {
        width: (width - (width * 0.1)) / 4 - width * 0.01,
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 5,
        borderRightColor: Color.grey_3,
        borderRightWidth: 1
    },

    buttonImage: {
        resizeMode: 'contain',
        width:  width * 0.04,
        height: width * 0.04,
    },

    btnTitle: {
        fontFamily: Font.regular,
        fontSize: width * 0.025
    },

    modalContent: {
        backgroundColor: Color.white,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.015,
    },

    footerModal: {
        justifyContent: 'flex-end',
        marginHorizontal: width * 0.05,
        marginVertical: 0,
    },

    invoiceTitle: {
        fontFamily: Font.semi_bold, 
        fontSize: width * 0.05, 
        color: Color.black,

        // fontFamily: Font.bold,
        // fontSize: width * 0.07,
        // color: Color.dark_blue,
        // paddingHorizontal: width * 0.05,
        // paddingTop: width * 0.02,
        // borderBottomColor: Color.grey_3,
        // borderBottomWidth: 1
    },

    invoiceNavigation: {
        // marginHorizontal: width * 0.01,
        flexDirection: 'row',
        borderBottomColor: Color.grey_3,
        borderBottomWidth: 1,
        paddingVertical: width * 0.005
    },

    subTitleInv: {
        fontFamily: Font.regular,
        fontSize: width * 0.033
    },

    leftNavigation: {
        flex: 1,
        alignItems: 'flex-start'
    },

    rightNavigation: {
        flex: 1,
        alignItems: 'flex-end'
    },

})