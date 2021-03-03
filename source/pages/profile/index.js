import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView,
    TouchableHighlight,
    TextInput,
    BackHandler
} from 'react-native';

import moment from 'moment';
import { Button, Input, CheckBox, ListItem } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font';
import Header from '../../component/header';
import styles from './styles';
import Config from '../../config/config';
import ApiService from "../../config/ApiService";
import Utility from "../../config/utility";

import { TabRouter } from 'react-navigation';

var { width, height } = Dimensions.get('window');

export default class Orders extends Component {
    constructor() {
        super();
        apiService = new ApiService();
        viewUtils = new Utility();
        this.state = {
            name: null,
            email: null,
            phone_number: null,
            profile_image: [],
            images: null,
            profile: null,

            new_password: null,
            retype_password: null,

            listItem: [],
        };
    }

    componentDidMount = async () => {
        // console.log(await AsyncStorage.getItem('@profile'))
        // console.log(this.state.profile_image.uri)
        this.setState({
            name: await AsyncStorage.getItem('@name'),
            email: await AsyncStorage.getItem('@email'),
            phone_number: await AsyncStorage.getItem('@phone'),
            profile_image: { uri: await AsyncStorage.getItem('@profile'), type: 'image/jpg', name: 'image.jpg' }
        });

    }

    editProfile = () => {
        ImagePicker.openPicker({
            width: width,
            height: width,
            cropping: true,
            includeExif: true
        }).then(image => {
            console.log('image', image);
            this.setState({
                profile_image: {
                    uri: image.path,
                    type: image.mime,
                    name: Platform.OS === 'ios' ? image.filename : 'image.jpg'
                }
            });
        }).catch(e => alert(e));
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

    profile_api_call = async () => {
        //console.log('profile', await AsyncStorage.getItem('@userid'))

        const { name, email, phone_number, new_password, retype_password, profile_image } = this.state;

        !name ? this.setState({ nameError: "Name required" }) : "";
        !this.validateEmail(email) ? this.setState({ emailError: "Ex: name@domain.com" }) : "";
        !email ? this.setState({ emailError: "Email required" }) : "";
        !phone_number ? this.setState({ phoneError: "phone number required" }) : "";
        !this.validateNumber(phone_number) ? this.setState({ phoneError: "Valide phone number required" }) : "";
        phone_number.length !== 10 ? this.setState({ phoneError: "Enter valid phone number" }) : "";
        //profile_image.uri == null ? viewUtils.showToast('Set profile image') : '';
        new_password !== null ? retype_password == null 
            ? this.setState({ retype_pass_error: "Enter Re-type password" }) 
            : new_password !== retype_password 
                ? this.setState({ retype_pass_error: "Both password not match" }) : "" : "";

        if (name && email && phone_number && this.validateEmail(email) && this.validateNumber(phone_number)) {
            //alert('hi')
            if (new_password == null) {
                this.setState({ isLoading: true }, async () => {
                    var url = Config.baseUrl + Config.editprofile;
                    var reqJson = {
                        userid: await AsyncStorage.getItem('@userid'),
                        name: this.state.name,
                        email: this.state.email,
                        phone_number: this.state.phone_number,
                        new_password: this.state.new_password,
                    };

                    var formData = new FormData();
                    if (this.state.profile_image.uri != null) {
                        formData.append('profile_image', this.state.profile_image);
                    } else {
                        //alert('')
                        formData.append('profile_image', '');
                    }
                    formData.append('jsonstring', JSON.stringify(reqJson));
                    console.log('jsonstring====>',formData)
                    
                    apiService.executeFormApi(
                        url,
                        "POST",
                        formData,
                        async (error, response) => {

                            if (error !== "") {
                                this.setState({ isLoading: false });
                                viewUtils.showToast(error);
                                //viewUtils.showToast('ghh');
                            }

                            if (response !== null && response !== "") {
                                this.setState({ isLoading: false });
                                if (response.status == "true") {
                                    try {
                                        await AsyncStorage.setItem('@name', response.data.name)
                                        await AsyncStorage.setItem('@email', response.data.email)
                                        await AsyncStorage.setItem('@phone', response.data.phone_number)
                                        await AsyncStorage.setItem('@profile', response.data.profile_image)
                                        viewUtils.showToast(response.message.trim());
                                        this.setState({ 
                                            profile_image: { uri: await AsyncStorage.getItem('@profile'), type: 'image/jpg', name: 'image.jpg' }
                                        })

                                    } catch (e) {
                                        console.log(e)
                                    }
                                    //viewUtils.showToast(response.message.trim());
                                } else {
                                    viewUtils.showToast(response.message.trim());
                                }
                            }
                        });
                })
            }
            else {
                //alert()
                if (retype_password == new_password) {
                    // console.log(retype_password)
                    // console.log(new_password)
                    this.setState({ isLoading: true }, async () => {
                        var url = Config.baseUrl + Config.editprofile;
                        var reqJson = {
                            userid: await AsyncStorage.getItem('@userid'),
                            name: this.state.name,
                            email: this.state.email,
                            phone_number: this.state.phone_number,
                            new_password: this.state.new_password,
                        };

                        var formData = new FormData();
                        if (this.state.profile_image.uri != null) {
                            formData.append('profile_image', this.state.profile_image);
                        } else {
                            //alert('')
                            formData.append('profile_image', '');
                        }
                        formData.append('jsonstring', JSON.stringify(reqJson));
                        //console.log('jsonstring2====>',formData)
                            
                        apiService.executeFormApi(
                            url,
                            "POST",
                            formData,
                            async (error, response) => {

                                if (error !== "") {
                                    this.setState({ isLoading: false });
                                    viewUtils.showToast(error.trim());
                                    //viewUtils.showToast('ghh');
                                }
    
                                if (response !== null && response !== "") {
                                    this.setState({ isLoading: false });
                                    if (response.status == "true") {
                                        try {
                                            await AsyncStorage.setItem('@name', response.data.name)
                                            await AsyncStorage.setItem('@email', response.data.email)
                                            await AsyncStorage.setItem('@phone', response.data.phone_number)
                                            await AsyncStorage.setItem('@profile', response.data.profile_image)
                                            viewUtils.showToast(response.message.trim());
                                            
                                            this.setState({ 
                                                new_password: null, 
                                                retype_password: null,
                                                profile_image: { uri: await AsyncStorage.getItem('@profile'), type: 'image/jpg', name: 'image.jpg' }
                                            })
                                        } catch (e) {
                                            console.log(e)
                                        }
                                        //viewUtils.showToast(response.message.trim());
                                    } else {
                                        viewUtils.showToast(response.message.trim());
                                    }
                                }
                                });
                    })
                }
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <GeneralStatusBar backgroundColor={Color.white} barStyle="dark-content" />
                <Spinner visible={this.state.isLoading} textContent={''} />

                <Header
                    onMenu={() => this.props.navigation.toggleDrawer()}
                    onNotification={() => this.props.navigation.navigate('Notification')}
                />

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Profile Setting</Text>
                </View>
                <KeyboardAwareScrollView>
                    <View style={styles.mainContainer}>

                        <View style={styles.profileContainer}>
                            <View style={styles.imageContainer}>
                                {this.state.profile_image.uri == null
                                    ? <Image source={require('./../../../assets/img/user.png')} style={styles.userImage} />
                                    : this.state.profile_image && <Image source={this.state.profile_image} style={styles.userImage} />}
                            </View>
                            <TouchableOpacity onPress={() => this.editProfile()}>
                                <Text style={styles.editText}>Edit Profile Image</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.textBox}
                                autoCapitalize="words"
                                placeholder="Enter Name"
                                keyboardType="default"
                                value={this.state.name}
                                onChangeText={(value) => this.setState({ name: value })}
                                ref={input => { this.name = input }}
                                onFocus={() => this.setState({ nameError: null })}
                            />
                            {this.state.nameError &&
                                <Text style={styles.error}>{this.state.nameError}</Text>
                            }
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.textBox}
                                autoCapitalize="none"
                                placeholder="Enter Email"
                                keyboardType="email-address"
                                value={this.state.email}
                                onChangeText={(value) => this.setState({ email: value })}
                                ref={input => { this.email = input }}
                                onFocus={() => this.setState({ emailError: null })}
                            />
                            {this.state.emailError &&
                                <Text style={styles.error}>{this.state.emailError}</Text>
                            }
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.label}>Phone</Text>
                            <TextInput
                                style={styles.textBox}
                                autoCapitalize="none"
                                placeholder="Enter Phone"
                                maxLength={10}
                                keyboardType="phone-pad"
                                value={this.state.phone_number}
                                onChangeText={(value) => this.setState({ phone_number: value })}
                                ref={input => { this.phone_number = input }}
                                onFocus={() => this.setState({ phoneError: null })}
                            />
                            {this.state.phoneError &&
                                <Text style={styles.error}>{this.state.phoneError}</Text>
                            }
                        </View>

                        {/* <View style={styles.textContainer}>
                            <Text style={styles.label}>Current Password</Text>
                            <TextInput
                                style={styles.textBox}
                                autoCapitalize="none"
                                placeholder="Enter Current Password"
                                keyboardType="default"
                                secureTextEntry={true}
                                value={this.state.current_password}
                                onChangeText={(value) => this.setState({ current_password: value })}
                                ref={input => { this.current_password = input }}
                                onFocus={() => this.setState({ cur_pass_error: null })}
                            />
                            {this.state.cur_pass_error &&
                                <Text style={styles.error}>{this.state.cur_pass_error}</Text>
                            }
                        </View> */}

                        <View style={styles.textContainer}>
                            <Text style={styles.label}>New Password</Text>
                            <TextInput
                                style={styles.textBox}
                                autoCapitalize="none"
                                placeholder="Enter New Password"
                                keyboardType="default"
                                secureTextEntry={true}
                                value={this.state.new_password}
                                onChangeText={(value) => this.setState({ new_password: value })}
                                ref={input => { this.new_password = input }}
                                onFocus={() => this.setState({ pass_error: null })}
                            />
                            {this.state.pass_error &&
                                <Text style={styles.error}>{this.state.pass_error}</Text>
                            }
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.label}>Re-type New Password</Text>
                            <TextInput
                                style={styles.textBox}
                                autoCapitalize="none"
                                placeholder="Enter Re-type New Password"
                                keyboardType="default"
                                secureTextEntry={true}
                                value={this.state.retype_password}
                                onChangeText={(value) => this.setState({ retype_password: value })}
                                ref={input => { this.retype_password = input }}
                                onFocus={() => this.setState({ retype_pass_error: null })}
                            />
                            {this.state.retype_pass_error &&
                                <Text style={styles.error}>{this.state.retype_pass_error}</Text>
                            }
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Save Changes"
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.button}
                                onPress={() => this.profile_api_call()}
                            />
                        </View>
                    </View>

                </KeyboardAwareScrollView>
            </View>
        );
    }
}

