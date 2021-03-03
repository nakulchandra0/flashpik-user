'use strict';
import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import Color from '../../component/color';
import Font from '../../component/font';

var { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
    container: {
        flex: 1,
    },

    /* Book Page */
    bookContainer: {
        backgroundColor: Color.grey_2
    },

    pickMap: {
        height: height * (32 / 100),
        zIndex: -1,
    },

    bookNavTop: {
        flexDirection: 'row',
        paddingHorizontal: width * 0.05,
        paddingTop: width * 0.04,
        paddingBottom: width * 0.03,
        backgroundColor: Color.white
    },

    bookNavTopLeft: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Color.light_blue,
        marginRight: width * 0.02,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //paddingHorizontal: width * 0.01
    },

    bookNavTopRight: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Color.light_blue,
        marginLeft: width * 0.02,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    bookNavTopTitle: {
        fontFamily: Font.bold,
        fontSize: width * 0.03,
        paddingVertical: width * 0.017,
        paddingLeft: 8
    },

    bookDot: {
        height: width * 0.04,
        width: width * 0.04,
        borderRadius: 50,
    },

    bookChoice: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: width * 0.05,
        // paddingVertical: width * 0.02,
        backgroundColor: Color.white,
        borderTopLeftRadius: width * 0.05,
        borderTopRightRadius: width * 0.05,
    },

    bookChoiceBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    bookChoiceContainer: {
        width: width * 0.17,
        height: width * 0.17,
        alignItems: 'center',
        justifyContent: 'center',
    },

    selectedBookChoiceContainer: {
        width: width * 0.17,
        height: width * 0.17,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: width /2,
        backgroundColor: Color.light_blue,
    },

    selectedChoiceIcon: {
        width: width * 0.15,
        height: width * 0.15,
        resizeMode: 'contain',
    },

    choiceIcon: {
        width: width * 0.11,
        height: width * 0.11,
        resizeMode: 'contain',
        alignSelf: 'center',
    },

    bookChoiceTitle: {
        fontSize: width * 0.047,
        paddingVertical: width * 0.025,
    },

    bookChoiceSubTitle1: {
        fontFamily: Font.regular,
        fontSize: width * 0.03,
        paddingTop: width * 0.04,
    },

    bookChoiceSubTitle2: {
        fontFamily: Font.regular,
        fontSize: width * 0.03,
        paddingBottom: width * 0.03,
    },

    bookChoiceInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    bookChoiceInfo: {
        width: width * 0.023,
        height: width * 0.023,
        resizeMode: 'contain',
        marginLeft: 8,
        marginBottom: width * 0.027,
    },

    pickUpContactContainer: {
        paddingHorizontal: width * 0.05,
        backgroundColor: Color.white,
        marginTop: width * 0.03,
        paddingVertical: width * 0.008
    },

    pickupTitle: {
        fontFamily: Font.regular,
        fontSize: width * 0.05,
        paddingBottom: width * 0.003,
    },

    pickupTitleInfo: {
        color: Color.dark_blue,
        fontFamily: Font.bold,
        fontSize: width * 0.04,
        paddingBottom: width * 0.01
    },

    serviceContainer: {
        paddingHorizontal: width * 0.05,
        backgroundColor: Color.white,
        marginVertical: width * 0.03,
        paddingVertical: width * 0.005
    },

    serviceTitle: {
        fontFamily: Font.regular,
        fontSize: width * 0.04,
        //lineHeight: height * 0.025 
    },

    buttonContainer: {
        width: '90%',
        // paddingHorizontal: width * 0.06,
        alignSelf: 'center',
        paddingVertical: height * 0.1
    },

    buttonTitle: {
        fontFamily: Font.bold,
        textAlign: 'center',
        fontSize: width * 0.05,
    },

    button: {
        backgroundColor: Color.dark_blue,
        width: '100%',
        //height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        paddingTop: 7,
        paddingBottom: 8,
        marginBottom: width * 0.07,
        marginVertical: width * 0.02,
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

    modalImgContainerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: width * 0.07,
        //borderWidth: 1
    },

    modalImgContainerInfoIcon: {
        width: width * 0.13,
        height: width * 0.13,
        resizeMode: 'contain'
    },

    modalImgContainerInfoTitle: {
        fontFamily: Font.bold,
        fontSize: width * 0.047,
        paddingLeft: 15,
        color: Color.dark_blue,
    },

    infoNav: {
        paddingTop: width * 0.01,
        flexDirection: 'row',
        alignItems: 'center',
    },

    infoNavBox: {
        flex: 1
    },

    infoNavTitle: {
        fontFamily: Font.regular,
        fontSize: width * 0.04,
    },

    instruction: {
        paddingVertical: width * 0.07
    },

    instructionBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 9,
        //borderWidth: 1,
    },

    instructionDot: {
        height: width * 0.02,
        width: width * 0.02,
        backgroundColor: Color.black,
        borderRadius: 50,
        marginTop: 5,
    },

    instructionTitle: {
        fontFamily: Font.regular,
        fontSize: width * 0.031,
        paddingLeft: 8,
    },

    inputContainer: {
        paddingTop: width * 0.03,
    },

    titleModal: {
        fontFamily: Font.regular,
        fontSize: width * 0.05,
        color: Color.black
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

    bookTextContainerImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bookContactImage: {
        width: width * 0.08,
        position: 'absolute',
        right: 0,
        bottom: 10,
    },

    bookContact: {
        width: width * 0.07,
        height: width * 0.07,
        resizeMode: 'contain',
    },

    error: {
        color: Color.red,
        fontFamily: Font.extra_bold,
        fontSize: width * 0.03,
    },

    // show contact Model style
    contactContent: {
        flex: 0.9,
        backgroundColor: Color.white,
        // borderColor: 'rgba(0, 0, 0, 0.1)',
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
        justifyContent: 'center',
        // paddingHorizontal: width * 0.07,
    },

    footerModal: {
        justifyContent: 'flex-end',
        margin: 0,
        marginTop: 20,
    },

    popupHeader: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1.5,
        borderColor: Color.grey_5,
        // alignItems: "center",
        flexDirection: "column",
        width: width,
        // height: width * 0.1,
    },

    modalHeader: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.05,
        marginBottom: width * 0.03,
        // color: Color.dark_blue
    },

    searchContainer: {
        width: width * 0.9,
        flexDirection: 'row',
        alignSelf: 'center',
    },

    searchIconContainer: {
        width: width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.grey_3,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },

    searchIcon: {
        fontSize: width * 0.05,
        color: Color.grey_5,
    },

    searchBox: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        //borderBottomColor: Color.dark_blue,
        //borderBottomWidth: 1.5,
        fontFamily: Font.regular,
        fontSize: width * 0.05,
        width: width * 0.8,
        backgroundColor: Color.grey_3,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },

    contactsItemContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: Color.grey_5,
        alignItems: "center",
        flexDirection: "row",
        width: width,
    },

    contactsAvatarCont: {
        width: width * 0.13,
        height: width * 0.13,
        marginRight: 10,
        borderRadius: 50,
        backgroundColor: Color.grey_3,
        // borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
    },

    fontReg: {
        fontFamily: Font.bold,
        fontSize: width * 0.045,
    },

    notificationTextView: {
        flexDirection: 'column',
        paddingHorizontal: 10,
    },

    contactName: {
        fontSize: width * 0.045,
        fontFamily: Font.bold,
    },

    number: {
        color: Color.grey_5,
        fontSize: width * 0.035,
        fontFamily: Font.bold,
    },

    buttonPopupHeader: {
        width: width * 0.1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 3,
    },

    popupIconClose: {
        width: 14,
        height: 14,
        resizeMode: "contain",
        alignSelf: "center",
    },

})