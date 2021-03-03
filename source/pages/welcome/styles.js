'use strict';
import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import Color from '../../component/color';
import Font from '../../component/font';

var { width, height } = Dimensions.get('window');

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.25;
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
    
    carouselContainer: {
        paddingTop: width * 0.03,
    },
    
    slider: {
       overflow: 'visible'  
    },
     
    paginationContainer: {
        position:'absolute',
        bottom: 0,
        width: '100%'
    },

    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: -10
    },

    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },

    imageContainer: {
        flex:1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: Color.white,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
    },

    imageContainerEven: {
        height: '100%',
        backgroundColor: Color.white
    },

    image: {
        height: 100,
        resizeMode: 'contain',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },

    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },

    radiusMaskEven: {
        backgroundColor: Color.black
    },
    
    serviceContainer: {
        justifyContent: 'center',
        alignItems: 'center', 
        flex: 1
    },

    flatlist: {
        width: width - (width * 0.1),
    },

    serviceBox: {
        width: (width - (width * 0.16))/3,
        alignItems: 'center',
        marginHorizontal: width * 0.01,
    },

    serviceImageContainer: {
        backgroundColor: Color.light_blue,
        paddingHorizontal: width * 0.01,
        borderRadius: 4,
        alignItems: 'center',
        width: width * 0.21,
        height: width * 0.17,
    },

    serviceImage: {
        width: width * 0.19,
        height: width * 0.15,
        resizeMode: 'contain',
        marginTop: width * 0.05,
    },

    serviceTitleContainer: {
        width: '75%',
        alignItems: 'center',
        // borderWidth: 1,
    },

    serviceTitle: {
        fontFamily: Font.bold,
        color: Color.dark_blue,
        fontSize: width * 0.03,
        paddingVertical: width * 0.04
    },

    serviceMainTitle: {
        fontFamily: Font.bold,
        color: Color.dark_blue,
        fontSize: width * 0.058,
        paddingBottom: width * 0.05
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

    buttonContainer: {
        width: '100%', 
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
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 50,
        alignSelf: 'center',
        alignItems:'center',
        justifyContent: 'center',
        alignItems:'center',
        paddingTop: 7,
        paddingBottom: 8,
        marginVertical: width * 0.02,
    },
    
    error: {
        color: Color.red,
        fontFamily: Font.extra_bold,
        fontSize: width * 0.03,
    }

})