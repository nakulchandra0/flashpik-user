import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    StatusBar,
    Alert,
    TouchableHighlight,
    ImageBackground,
    TextInput,
    ScrollView,
    BackHandler
} from 'react-native';

import { Button, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase, { notifications } from 'react-native-firebase';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font'
import styles from './styles';
import Config from '../../config/config';
import ApiService from "../../config/ApiService";
import Utility from "../../config/utility";
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    LoginManager,
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';

var { width, height } = Dimensions.get('window');

export default class Signup extends React.PureComponent {
    constructor(props) {
        super(props);
        apiService = new ApiService();
        viewUtils = new Utility();
        this.state = {
            email: null,
            phone_number: null,
            password: null,
            isLoading: false,
            user_name: '',
            token: '',
            profile_image: '',

            fcmToken: null,
            userInfo: null,
            gettingLoginStatus: true,
        }
    }

    async componentDidMount() {
        this.setState({ fcmToken: await firebase.messaging().getToken() });
        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            // "scopes": ["https://people.googleapis.com/auth/user.gender.read"],
            //     "https://www.googleapis.com/auth/user.gender.read"] ,
            // Repleace with your webClientId generated from Firebase console
            webClientId: Config.webClientId,
            
            // "client_id":"571192234320-23t9hqim44tm3opvknqr7err534t1ajn.apps.googleusercontent.com",
            // "project_id":"flashpik-user",
            // "auth_uri":"https://accounts.google.com/o/oauth2/auth",
            // "token_uri":"https://oauth2.googleapis.com/token",
            // "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
            // "redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]
        
            // "access_token": "ya29.a0AfH6SMBSXa7PU9OMcAaQVpsyST_AX2edDomzC9vNChpDPK6vHS-A55aN3-dLam4YUrk3nAMcQcSkYB9fLt4EMgjcpbse3YaVNJJz1yz120G68y9_P0sU5aZujsSalkt1A7Ecg0pozaPwbUOeHk56MQvRxzQi-4elR94", 
            // "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE0MWEzNTcwYjhlM2FlMWI3MmNhYWJjYWE3YjhkMmRiMjA2NWQ3YzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc5NTI5MTQwNDUyMzkzMzUzNzgiLCJlbWFpbCI6ImJoYXZpc2hhLnRlY2hkb29kbGVzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiZDgzd0hMT2RyOVVBenpSUUpfdFlhQSIsIm5hbWUiOiJNYW5zaSBUZWNoRG9vZGxlcyIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLWdyM3pPcEpPYWtjL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2xmcVdCTnNVRjFVd3B0cjJJdlZJNFBuNHZxZ3cvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6Ik1hbnNpIiwiZmFtaWx5X25hbWUiOiJUZWNoRG9vZGxlcyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTkzNDEzNDM4LCJleHAiOjE1OTM0MTcwMzh9.O7Yl1tzAX4s_txxXCpZCDjW_p-5tV4FP3s-FWH_BT81FgafaF6c40OvM-7nbHACxqb7pCxO7y3skbxasmkBChQSWZMH9s37Z5mJiLrR9s1M33uAcnUGOM4T5vX7TO1kJY2laBPIxXM2QIJLe9aGAenogKBUV6Lu3AY1Qk897sVwepuTNJ6u4zZB6M8UKCf89aZBkvwD6yRAdXl_K_ucZmHoR4dH8bQa7cGzk3S8MN_B3pzw0FK59lvtIILwsn3gFlVTYqv0AlpuG6YMs8LQRKXuah7X65C5nasgmITKiyfLzipuC3lbhwBdYtBhReVMjgqN8k9DbUFCNmiifKqZ-Jw", 
            // "expires_in": 3599, 
            // "token_type": "Bearer", 
            // "scope": "https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email", 
            // "refresh_token": "1//04jUK4IN5yPVRCgYIARAAGAQSNwF-L9IrYzGsRO45psYvoe-wQYomdiHnEASqbZK0ZNgAegOfFaXaGKpBrQVt-zW1-CkEb3Ry290"
        });

        this._isSignedIn();
    }

    _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            console.log('User is already signed in');
            //Get the User details as user is already signed in
            this._getCurrentUserInfo();
        } else {
            console.log('Please Login');
        }
        this.setState({ gettingLoginStatus: false });
    };

    _getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            // console.log('User Info',userInfo)
            //console.log('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log('User has not signed in yet');
            } else {
                console.log("Something went wrong. Unable to get user's info");
            }
        }
    };




    /* facebook sign in */
    handleFacebookLogin = () => {
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(result => {
            if (result.isCancelled) {
                console.log('Login cancelled');
            } else {
                console.log('Login success with permissions: ' + result.grantedPermissions.toString());

                AccessToken.getCurrentAccessToken().then(data => {
                    const token = data.accessToken.toString();
                    console.log('facebook initialLogin');
                    console.log(token);

                    const req = new GraphRequest(
                        '/me', {
                        httpMethod: 'GET',
                        version: 'v2.5',
                        parameters: {
                            fields: {
                                string: 'email,name,picture.width(720).height(720)',
                            },
                        },
                    },
                        (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                this.social_login(res.id, res.email, res.name, res.picture.data.url, "facebook");
                            }
                        });
                    new GraphRequestManager().addRequest(req).start();
                });
            }
        })
            .catch(error => {
                console.log('Login fail with error: ' + error);
            });
    }

    /* google sign in */
    handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info --> ', userInfo);
            this.social_login(userInfo.user.id, userInfo.user.email, userInfo.user.name, userInfo.user.photo, "google");
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
            }
        }
    };

    /* social login */
    async social_login(id, email, name, profile, type) {

        this.setState({ isLoading: true }, () => {
            var url = Config.baseUrl + Config.sociallogin;
            var reqJson = {
                auth_key: id,
                auth_provider: type,
                device_id: this.state.fcmToken ? this.state.fcmToken : NULL,
                email: email,
                name: name,
                //profile: profile
            };

            //console.log(reqJson)
            apiService.executeFormApi(
                url,
                "POST",
                JSON.stringify(reqJson),
                async (error, response) => {

                    if (error !== "") {
                        this.setState({ isLoading: false });
                        viewUtils.showToast(error);
                    }

                    if (response !== null && response !== "") {
                        if (response.status == "true") {
                            try {
                                await AsyncStorage.setItem('@userid', response.data.id)
                                await AsyncStorage.setItem('@name', response.data.name)
                                await AsyncStorage.setItem('@email', response.data.email)
                                await AsyncStorage.setItem('@phone', response.data.phone_number)
                                await AsyncStorage.setItem('@profile', response.data.profile_image_thumb)
                                await AsyncStorage.setItem('@login', type)

                            } catch (e) {
                                console.log(e)
                            }
                            response.data.firsttime_login == 'yes'
                            ? this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Profile' })], 0)
                            : this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Menu' })], 0);
                        } else {
                            viewUtils.showToast(response.message.trim());
                        }

                        this.setState({ isLoading: false })
                    }
                });
        });
    }

    /* email validation check */
    validateEmail = email => {
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    };

    /* mobile number formate */
    validateNumber = phone_number => {
        let re = /^[0]?[6789]\d{9}$/;
        return re.test(phone_number);
    };
    
    /* normal signup api */
    signup = async () => {
        const { email, phone_number, password } = this.state;
        !this.validateEmail(email) ? this.setState({ emailError: "Ex: name@domain.com" }) : "";
        !email ? this.setState({ emailError: "Email required" }) : "";
        !phone_number ? this.setState({ phoneError: "Phone number required" }) : "";
        !this.validateNumber(phone_number) ? this.setState({ phoneError: "Valide phone number required" }) : "";
        !password ? this.setState({ passwordError: "Password required" }) : "";


        if (email && phone_number && password && this.validateEmail(email) && this.validateNumber(phone_number))
            this.setState({ isLoading: true }, () => {
                var url = Config.baseUrl + Config.signup;
                var reqJson = {
                    email: this.state.email,
                    phone_number: this.state.phone_number,
                    password: this.state.password,
                    device_id: this.state.fcmToken ? this.state.fcmToken : NULL
                };

                apiService.executeFormApi(
                    url,
                    "POST",
                    JSON.stringify(reqJson),
                    async (error, response) => {

                        if (error !== "") {
                            this.setState({ isLoading: false });
                            viewUtils.showToast(error);
                        }

                        if (response !== null && response !== "") {
                            this.setState({ isLoading: false });
                            if (response.status == "true") {
                                try {
                                    await AsyncStorage.setItem('@userid', response.data.id)
                                    await AsyncStorage.setItem('@email', response.data.email)
                                    await AsyncStorage.setItem('@phone', response.data.phone_number)
                                    await AsyncStorage.setItem('@login', "normal")
                                } catch (e) {
                                    console.log(e)
                                }
                                this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Profile' })], 0)
                            } else {
                                viewUtils.showToast(response.message.trim());
                            }
                        }
                    });
            })
    }

    render() {
        return (
            <View style={styles.container}>

                <Image source={require('../../../assets/img/screen_bg.png')} style={styles.imgBg} />
                <GeneralStatusBar backgroundColor={Color.transparent} barStyle="light-content" />
                <Spinner visible={this.state.isLoading} textContent={''} />
                <View style={[styles.overlay, { width: width, justifyContent: 'center', alignItems: 'center' }]}>
                
                <ScrollView style={{ width: width }}>
                        <View style={{ height: height * (27.5 / 100) }} />

                        {/* <View style={styles.inputContainerShadow}> */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.title}>Sign Up</Text>
                            <View style={[styles.textContainer, { marginTop: width * 0.05 }]}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.textBox}
                                    autoCapitalize="none"
                                    placeholder="Enter Email"
                                    keyboardType="email-address"
                                    placeholderTextColor={Color.black}
                                    value={this.state.email}
                                    onChangeText={(value) => this.setState({ email: value })}
                                    ref={input => { this.email = input }}
                                //onFocus={() => this.setState({ emailError: null })}
                                />
                                {this.state.emailError
                                    && setTimeout(async () => {
                                        this.setState({ emailError: null })
                                    }, 1500)
                                    &&
                                    <Text style={styles.error}>{this.state.emailError}</Text>
                                }
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Phone No.</Text>
                                <TextInput
                                    style={styles.textBox}
                                    keyboardType="number-pad"
                                    placeholder="Enter Phone No."
                                    maxLength={10}
                                    placeholderTextColor={Color.black}
                                    value={this.state.phone_number}
                                    onChangeText={(value) => this.setState({ phone_number: value })}
                                    ref={input => { this.phone_number = input }}
                                    onFocus={() => this.setState({ phoneError: null })}
                                />
                                {this.state.phoneError
                                    && setTimeout(async () => {
                                        this.setState({ phoneError: null })
                                    }, 1500)
                                    &&
                                    <Text style={styles.error}>{this.state.phoneError}</Text>
                                }
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={styles.textBox}
                                    keyboardType="default"
                                    placeholder="Enter Password"
                                    secureTextEntry={true}
                                    placeholderTextColor={Color.black}
                                    value={this.state.password}
                                    onChangeText={(value) => this.setState({ password: value })}
                                    ref={input => { this.password = input }}
                                //onFocus={() => this.setState({ passwordError: null })}

                                />
                                {this.state.passwordError
                                    && setTimeout(async () => {
                                        this.setState({ passwordError: null })
                                    }, 1500)
                                    &&
                                    <Text style={styles.error}>{this.state.passwordError}</Text>
                                }
                            </View>
                        </View>
                        {/* </View> */}


                        <View style={styles.buttonContainer}>
                            <Button
                                title={'Sign Up'}
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.button}
                                onPress={() => this.signup()}
                            />
                        </View>

                        <View style={styles.bottomContainer}>
                            <View style={styles.seprate}>
                                <View style={styles.line} />
                                <Text style={styles.socialTitle}>Social Login</Text>
                                <View style={styles.line} />
                            </View>

                            <View style={styles.logoContainer}>
                                <View style={styles.lLeft}>
                                    <TouchableHighlight underlayColor="transparent" onPress={() => this.handleFacebookLogin()}>
                                        <Image source={require('../../../assets/img/facebook.png')} style={styles.logo} />
                                    </TouchableHighlight>
                                </View>
                                <View style={styles.lRight}>
                                    <TouchableHighlight underlayColor="transparent" onPress={this.handleGoogleLogin}>
                                        <Image source={require('../../../assets/img/google.png')} style={styles.logo} />
                                    </TouchableHighlight>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.alreadyTitle}>Already Registered?</Text>
                                <TouchableHighlight underlayColor="transparent" style={{ paddingRight: 10, padding: 5, alignItems: 'flex-start' }} onPress={() => this.props.navigation.navigate('Signin')}>
                                    <Text style={{ color: Color.dark_blue, fontFamily: Font.bold, fontSize: width * 0.03 }}>Login</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}



