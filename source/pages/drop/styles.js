'use strict';
import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import Color from '../../component/color';
import Font from '../../component/font';

var { width, height } = Dimensions.get('window');

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.28;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 10;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },

    map: {
        height: height * (24.5 / 100),
    },

    title: {
        fontFamily: Font.bold,
        fontSize: width * 0.058,
        color: Color.dark_blue,
        paddingHorizontal: width * 0.05,
        paddingBottom: width * 0.025,
    },

    inputContainer: {
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.01
    },

    textContainer: {
        marginVertical: width * 0.02,
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.01
    },

    textContainerImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    contactImage: {
        width: width * 0.08,
        position: 'absolute',
        right: 0,
        bottom: 7,
    },

    contact: {
        width: width * 0.06,
        height: width * 0.06,
        resizeMode: 'contain',
    },

    customView: {
        width: width * 0.4,
        // height: width * 0.1,
    },

    toolAddress: {
        fontFamily: Font.semi_bold,
        fontSize: width * 0.03,
        textAlign: 'center',
        marginHorizontal: width * 0.005,
    },

    label: {
        fontFamily: Font.bold,
        fontSize: height * 0.013,
        color: Color.dark_blue
    },

    textBox: {
        padding: 0,
        paddingTop: 6,
        paddingBottom: 2,
        borderBottomColor: Color.dark_blue,
        borderBottomWidth: 1.5,
        fontFamily: Font.regular,
        fontSize: height * 0.02,
        width: '100%'
    },

    buttonContainer: {
        width: '100%',
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.01
    },

    buttonTitle: {
        fontFamily: Font.bold,
        textAlign: 'center',
        fontSize: width * 0.05
    },

    button: {
        backgroundColor: Color.dark_blue,
        width: '100%',
        //height: 45,
        // paddingVertical: 5,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 7,
        paddingBottom: 8,
        // marginTop: width * 0.03,
        marginBottom: width * 0.07,
        marginVertical: width * 0.02,
    },

    /* drop page */

    checkContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.005,
        padding: 0,
        marginLeft: 0,
        margin: 0,
        //borderWidth: 1
    },

    checkedTitle: {
        fontFamily: Font.regular,
        fontSize: height * 0.025,
        fontWeight: "normal",
        color: Color.dark_blue,
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