import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    StatusBar,
    Alert,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import firebase, { notifications } from 'react-native-firebase';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font'
import styles from './styles';

var { width, height } = Dimensions.get('window');

export default class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fcmToken: null
        }
    }

    async componentDidMount() {
        this.checkPermission();
        this.timeoutHandle = setTimeout(async() => {
            if(await AsyncStorage.getItem('@userid') == null) {
                this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Intro' })], 0)
            } else {
                this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Menu' })], 0)
            }
        }, 2000);
    }

    /* chaeck the user has messaging permission for this app */
    async checkPermission() { 
        const enabled = await firebase.messaging().hasPermission();    
        if (enabled) {  
            this.getToken();
        } else {    
            this.requestPermission();
        }
    }

    /* Returns an FCM token for this device. Optionally you can specify a custom authorized entity or scope to tailor tokens to your own use-case. */
    async getToken() { 
        let fcmToken = await AsyncStorage.getItem('@fcmToken');  
        this.setState({ fcmToken: fcmToken });  
        console.log("fcmToken ===", fcmToken)
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();    
            console.log("fcmToken ===", fcmToken)
            if (fcmToken) {
                this.setState({ fcmToken: fcmToken });
                await AsyncStorage.setItem('@fcmToken', fcmToken);
            }
        }
    }

    /* On iOS, messaging permission must be requested by the current application before messages can be received or sent. */
    async requestPermission() {  
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <GeneralStatusBar backgroundColor={Color.transparent} barStyle="light-content" />
                <Image source={require('../../../assets/img/app_logo.png')} style={styles.logo} />
                <Image source={require('../../../assets/img/flashpik.png')} style={styles.flashpik} />
                <View style={styles.bottom_view}>
                    <Image source={require('../../../assets/img/bottom_layer.png')} style={styles.bottom_image} />
                </View>
            </View>

        );
    }
}



