'use strict';
import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import Color from '../../component/color';
import Font from '../../component/font';

var { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
    container: {
        height: height * 1.2,
        backgroundColor: Color.white,
    },

    mainContainer: {
        paddingHorizontal: width * 0.045,
    },

    title: {
        fontFamily: Font.bold,
        color: Color.dark_blue,
        fontSize: width * 0.058,
        paddingTop: 0,
        paddingBottom: width * 0.05
    },

    paymentMethodDiv: {
        backgroundColor: Color.dark_blue,
        alignItems: 'center',
        width: width * 0.23,
        borderRadius: 4,
        justifyContent: 'center',
        //paddingTop: width * 0.001,
        marginTop: width * 0.01
    },

    paymentMethod: {
        color: Color.white,
        fontSize: width * 0.025,
        fontFamily: Font.bold,
        lineHeight: width * 0.032,
        paddingVertical: 3
    },


    topNavigation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: width * 0.001,
        paddingHorizontal: width * 0.05,
    },

    orderBox: {
        backgroundColor: Color.white,
        borderRadius: 10,
        shadowColor: Color.dark_blue,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 2.22,
        elevation: 4,
        marginHorizontal: width * 0.05,
        marginTop: width * 0.04,
        borderWidth: 1,
        borderColor: Color.grey_4
    },

    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Color.grey_3,
        paddingHorizontal: width * 0.03,
        paddingVertical: width * 0.018,
    },

    leftNavigation: {
        flex: 1,
        alignItems: 'flex-start',
        //borderWidth: 1,
    },

    rightNavigation: {
        flex: 1,
        alignItems: 'flex-end',
        //borderWidth: 1
    },

    subTitle: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.038
    },

    rightNav: {
        paddingLeft: 15
    },

    rateTiItle: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.037,
        marginRight: width * 0.015,
        lineHeight: height * 0.023,
    },

    date: {
        fontFamily: Font.regular,
        fontSize: width * 0.045
    },

    // orderStatus: {
    //     fontFamily: Font.regular,
    //     fontSize: width * 0.04
    // },

    name: {
        fontFamily: Font.regular,
        fontSize: width * 0.05,
    },

    profile_container: {
        width: width * 0.11,
        height: width * 0.11,
        resizeMode: 'cover',
        borderRadius: width / 2,
        //borderWidth: 1,
    },

    userImage: {
        width: width * 0.11,
        height: width * 0.11,
        //resizeMode: 'contain',
        borderRadius: width / 2,
    },

    childView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //borderWidth: 1,
        padding: 0
    },

    starImage: {
        width: width * 0.04,
        height: width * 0.04,
        marginRight: 3,
        resizeMode: 'cover',
        //top: -2,
    },

    starImageForm: {
        width: width * 0.075,
        height: width * 0.075,
        resizeMode: 'contain',
        marginRight: width * 0.015,
        marginTop: 5
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
        marginLeft: 37,
    },

    locationTitle: {
        fontFamily: Font.bold,
        fontSize: width * 0.03,
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

    invoiceTitleContainer: {
        borderBottomColor: Color.grey_4,
        borderBottomWidth: 1,
    },

    invoiceTitle: {
        fontFamily: Font.bold,
        fontSize: width * 0.058,
        color: Color.dark_blue,
        paddingHorizontal: width * 0.03,
        paddingVertical: width * 0.005,
    },

    invoiceNavigation: {
        marginHorizontal: width * 0.03,
        flexDirection: 'row',
        borderBottomColor: Color.grey_3,
        borderBottomWidth: 1,
        paddingVertical: width * 0.01,
    },

    subTitleInv: {
        fontFamily: Font.regular,
        fontSize: width * 0.05,
    },

    mainBtnContainer: {
        //borderWidth: 1,
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: height * 0.03,
        flexDirection: 'row',
    },

    leftBtnContainer: {
        //borderWidth: 1,
        width: width * 0.45,
        paddingRight: width * 0.03,
    },

    rightBtnContainer: {
        //borderWidth: 1,
        width: width * 0.45,
        paddingLeft: width * 0.03,
    },

    btnTitle: {
        fontFamily: Font.bold,
        textAlign: 'center',
        fontSize: width * 0.05,
    },

    btn: {
        backgroundColor: Color.dark_blue,
        width: '100%',
        //height: 45,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6,
        paddingBottom: 7,
        marginTop: width * 0.03,
        marginBottom: width * 0.04,
    },

    /* footer modal css */
    contentModel: {
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
        fontSize: width * 0.055,
        color: Color.black,
        paddingBottom: width * 0.02
    },

    textContainer: {
        marginVertical: width * 0.025,
        // borderWidth: 1
    },

    label: {
        fontFamily: Font.bold,
        fontSize: width * 0.03,
        color: Color.dark_blue
    },

    textBox: {
        padding: 0,
        paddingTop: 10,
        paddingBottom: 2,
        borderBottomColor: Color.dark_blue,
        borderBottomWidth: 2,
        fontFamily: Font.regular,
        fontSize: width * 0.055,
        width: '100%',
        //borderWidth: 1
    },

    buttonContainer: {
        //borderWidth: 1
    },

    buttonTitle: {
        fontFamily: Font.bold,
        textAlign: 'center',
        fontSize: width * 0.057,
    },

    button: {
        backgroundColor: Color.dark_blue,
        width: '100%',
        //height: 45,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6,
        paddingBottom: 7,
        marginTop: width * 0.03,
        marginBottom: width * 0.04,
    },

    /* center modal css */
    centerContentModel: {
        backgroundColor: Color.white,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 7,
        justifyContent: 'center',
        paddingHorizontal: width * 0.03,
    },

    centerModal: {
        justifyContent: 'center',
    },

    centerTitleModal: {
        fontFamily: Font.regular,
        fontSize: width * 0.055,
        color: Color.black,
        paddingBottom: width * 0.02,
        //borderWidth: 1
    },

    closeTouchable: {
        //borderWidth: 1,
        //backgroundColor: Color.red,
        //borderRadius: width / 2,
        width: width * 0.1,
        height: width * 0.1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: - height * 0.025,
        // right: width * 0.5,
        //justifyContent: 'center'
    },

    closeContainer: {
        //borderWidth: 1,
        backgroundColor: Color.red,
        borderRadius: width / 2,
        width: width * 0.06,
        height: width * 0.06,
        alignItems: 'center',
        //alignSelf: 'center',
        justifyContent: 'center',
        paddingBottom: 2
        // position: 'absolute',
        // top: - height * 0.02,
        // // right: width * 0.5,
        // //justifyContent: 'center'
    },

    cross: {
        color: Color.white,
        //alignSelf: 'center'
    },

    inputContainer: {
        paddingTop: width * 0.035,
    },

    textContainer: {
        marginVertical: width * 0.025,
        // borderWidth: 1
    },

    label: {
        fontFamily: Font.bold,
        fontSize: width * 0.03,
        color: Color.dark_blue
    },

    textBox: {
        padding: 0,
        paddingTop: 10,
        paddingBottom: 2,
        borderBottomColor: Color.dark_blue,
        borderBottomWidth: 2,
        fontFamily: Font.regular,
        fontSize: width * 0.055,
        width: '100%',
        //borderWidth: 1
    },

    buttonContainer: {
        //borderWidth: 1
    },

    buttonContainer: {
        width: '100%',
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.01
    },

    buttonTitle: {
        fontFamily: Font.bold,
        textAlign: 'center',
        fontSize: width * 0.057,
    },

    button: {
        backgroundColor: Color.dark_blue,
        width: '100%',
        //height: 45,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6,
        paddingBottom: 7,
        marginTop: width * 0.03,
        marginBottom: width * 0.04,
    },

    error: {
        color: Color.red,
        fontFamily: Font.extra_bold,
        fontSize: width * 0.03,
    }
})