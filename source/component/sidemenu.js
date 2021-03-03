import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    ScrollView,
    FlatList,
    Dimensions,
    StyleSheet,
    StatusBar,
    TouchableOpacity
} from 'react-native';

var { width, height } = Dimensions.get('window');

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Color from './color';
import Font from './font';
import DeviceInfo from 'react-native-device-info';

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //buildNumber: DeviceInfo.getVersion(),
            buildNumber: '1.0.0',
            name: null,
            email: null,
            phone_number: null,
            profile_image: null,
            menus: [
                {
                    "name": "Home",
                    "route": "WelcomeHome",
                    "icon": require('../../assets/img/side_home.png')
                },
                {
                    "name": "Orders",
                    "route": "Track",
                    "icon": require('../../assets/img/side_order.png')
                },
                // {
                //     "name": "Get Statement",
                //     "route": "Statement",
                //     "icon": require('../../assets/img/side_statement.png')
                // },
                {
                    "name": "Dispute",
                    "route": "Dispute",
                    "icon": require('../../assets/img/side_dispute.png')
                },
                {
                    "name": "Profile Settings",
                    "route": "Account",
                    "icon": require('../../assets/img/side_settings.png')
                },
                {
                    "name": "About",
                    "route": "About",
                    "icon": require('../../assets/img/side_about.png')
                }
            ]
        }

    }

    componentDidUpdate() {
        this.detail()
    }

    detail = async () => {
        this.setState({
            name: await AsyncStorage.getItem('@name'),
            email: await AsyncStorage.getItem('@email'),
            phone_number: await AsyncStorage.getItem('@phone'),
            profile_image: await AsyncStorage.getItem('@profile'),
            type: await AsyncStorage.getItem('@login')
        });
    }

    renderItem({ item, index }) {
        // console.log(item);
        const lengthArray = this.state.menus.length;
        return (
            <View style={lengthArray - 1 == index ? [styles.menu, { borderBottomWidth: 0 }] : index == 0 ? [styles.menu, { paddingTop: width * 0.05 }] : styles.menu}>
                <TouchableOpacity underlayColor="transparent" style={styles.menuView} onPress={() => this.props.navigation.navigate(item.route) && this.props.navigation.closeDrawer()}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={item.icon} style={styles.menuIcon} />
                        <Text style={styles.menuItem} >{item.name}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Icon name='arrow-right' color={Color.black} size={width * 0.033} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    logout = () => {
        this.setState({ isLoading: true }, async() => {  
            if (await AsyncStorage.getItem('@login') == "google") {
                try {
                    await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();
                } catch (e) {
                    console.log('Failed to clear the async storage.')
                }
            } else {
                try {
                    LoginManager.logOut();
                } catch (e) {
                    console.log('Failed to clear the async storage.')
                }
            }
            await AsyncStorage.clear();
            this.setState({ isLoading: false });
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Signin' })],
            });
            this.props.navigation.dispatch(resetAction)
        })
    }

    render() {
        let index = 0;
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.isLoading} textContent={''} />   
                <View style={styles.topContainer}>
                    <View style={styles.mainBox}>
                        <View style={{ position: 'relative' }}>
                            {this.state.profile_image == null ? <Image source={require('../../assets/img/user.png')} style={styles.userImage} />
                                : <Image source={{ uri: this.state.profile_image }} style={styles.userImage} />}
                            <TouchableOpacity underlayColor="transparent" onPress={() => this.props.navigation.navigate('Account') && this.props.navigation.closeDrawer()} style={styles.edit}>
                                <Image source={require('../../assets/img/edit_profile.png')} style={styles.editIcon} />
                            </TouchableOpacity>
                        </View>
                        {this.state.name &&
                        <View style={styles.profile}>
                            <Text style={styles.name}>
                                {this.state.name}
                            </Text>
                            <Image source={require('../../assets/img/verification.png')} style={styles.verification} />
                        </View>
                        }
                        {!this.state.name && 
                            <View style={styles.profile}></View>
                        }
                        {this.state.phone_number &&
                        <Text style={styles.phone}>
                            {this.state.phone_number}
                        </Text>
                        }   
                        <Text style={styles.email}>
                            {this.state.email}
                        </Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={{ flex:1 }}
                    showsVerticalScrollIndicator={false}>
                    <FlatList
                        refreshing={true}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.menus}
                        extraData={this.state}
                        numColumns={1}
                        renderItem={this.renderItem.bind(this)}
                    />

                    <View style={styles.logoutContainer}>
                        <TouchableOpacity underlayColor="transparent" onPress={() => this.logout()}>
                            <Image source={require('../../assets/img/logout.png')} style={styles.logout} />
                            <Text style={styles.logoutText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>

                    <Image source={require('../../assets/img/bottom_layer.png')} style={styles.bottom_view} />
                    <Text style={styles.version}>Version {this.state.buildNumber}</Text>

                </ScrollView>
            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },

    topContainer: {
        backgroundColor: Color.light_blue,
    },

    mainBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: width * 0.05,
        paddingTop: width * 0.13,
        paddingHorizontal: width * 0.05,
    },

    userImage: {
        width: width * 0.28,
        height: width * 0.28,
        borderRadius: width / 2,
        marginTop: width * 0.05
    },

    edit: {
        position: 'absolute',
        right: 0,
        top: 11
    },

    editIcon: {
        width: width * 0.08,
        height: width * 0.08,
        resizeMode: 'contain',
    },

    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: width * 0.02
    },

    name: {
        fontFamily: Font.bold,
        fontSize: width * 0.047,
        color: Color.dark_blue,
    },

    verification: {
        width: width * 0.05,
        height: width * 0.05,
        resizeMode: 'contain',
        marginLeft: 5,
    },

    phone: {
        fontFamily: Font.bold,
        fontSize: width * 0.039,
        color: Color.black
    },

    email: {
        textAlign: 'center',
        fontFamily: Font.bold,
        fontSize: width * 0.039,
        color: Color.black
    },

    menu: {
        marginHorizontal: width * 0.065,
        borderBottomWidth: 1,
        borderBottomColor: Color.grey_3,
    },

    menuView: {
        flexDirection: 'row',
        paddingVertical: width * 0.025,
    },

    menuItem: {
        fontSize: width * 0.047,
        fontFamily: Font.bold,
    },

    menuIcon: {
        width: width * 0.06,
        height: width * 0.06,
        resizeMode: 'contain',
        marginRight: width * 0.07
    },

    logoutContainer: {
        zIndex: 9999,
        alignItems: 'center',
        paddingBottom: width * 0.05,
        justifyContent: 'center',
        position: 'absolute',
        bottom: height * 0.05,
        width: '100%',
        //borderWidth: 1
    },

    logout: {
        width: width * 0.15,
        height: width * 0.15,
        resizeMode: 'contain',
        alignSelf: 'center',
    },

    logoutText: {
        color: Color.dark_blue,
        fontFamily: Font.bold,
        fontSize: width * 0.045,
        alignSelf: 'center'
    },

    bottom_view: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 130,
        resizeMode: 'cover',
    },

    version: {
        color: Color.black,
        fontFamily: Font.semi_bold,
        fontSize: width * 0.028,
        position: 'absolute',
        bottom: width * 0.02,
        right: width * 0.02
    }
})

