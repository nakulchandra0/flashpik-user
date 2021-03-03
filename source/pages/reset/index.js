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
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font'
import styles from './styles';
import Config from '../../config/config';
import ApiService from "../../config/ApiService";
import Utility from "../../config/utility";

var { width, height } = Dimensions.get('window');

export default class Signup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
        }
    }

    /* email validation check */
    validateEmail = email => {
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    };

    /* reset api call */
    reset = () => {
        const { email } = this.state;
        !this.validateEmail(email) ? this.setState({ emailError: "Ex: name@domain.com"}) : "";
        !email ? this.setState({ emailError: "Email required"}) : "";
        
        if(email && this.validateEmail(email)) 
            this.setState({ isLoading: true }, () => {  
                var url = Config.baseUrl + Config.reset; 
                var reqJson = {
                    email: this.state.email
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
                            viewUtils.showToast(response.message.trim());
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
                <View style={styles.overlay}>
                    <View style={{ height: height * (23 / 100) }} />
                    <KeyboardAwareScrollView
                        contentContainerStyle={{
                            width: width,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={styles.inputContainer}>
                            <Text style={styles.title}>Forgot Password</Text>
                            <Text style={styles.info}>Please enter your email to receive a link to create a new password via email.</Text>
                            <View style={styles.textContainer}>
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
                                    onFocus={()=>this.setState({ emailError: null })}
                                />
                                { this.state.emailError &&
                                <Text style={styles.error}>{this.state.emailError}</Text>
                                } 
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Send"
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.button}
                                onPress={() => this.reset()}
                            />
                        </View>

                        <View style={styles.bottomContainer}>
                            <Text style={styles.alreadyTitle}>Back to
                                <Text style={{ color: Color.dark_blue }} onPress={() =>this.props.navigation.navigate('Signin')}> Login</Text>
                            </Text>
                        </View>

                    </KeyboardAwareScrollView>
                </View>
            </View>
        );
    }
}



