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
    TouchableHighlight,
    TouchableWithoutFeedback,
    BackHandler
} from 'react-native';

import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font';
import Header from '../../component/header';
import styles from './styles';
import Config from '../../config/config';
import ApiService from "../../config/ApiService";
import Utility from "../../config/utility";

var { width, height } = Dimensions.get('window');

export default class Orders extends Component {
    constructor() {
        super();
        apiService = new ApiService();
        viewUtils = new Utility();

        this.state = {
            Default_Rating: 2,
            Max_Rating: 5,
            // orders: [
            //     {
            //         "date": "03/02/2020",
            //         "status": "On the way",
            //         "name": "Nakul Chandra",
            //         "rate": 4,
            //         "profile": require('../../../assets/img/user.png'),
            //         "pick": "46, Angle Arcade, Opp Kalupur Com Bank, Sold Rd",
            //         "drop": "46, ABC Tower, Gurukul road, Ghatlodia"
            //     },
            //     {
            //         "date": "01/02/2020",
            //         "status": "Delivered",
            //         "name": "Nakul Chandra",
            //         "rate": 3,
            //         "profile": require('../../../assets/img/user.png'),
            //         "pick": "46, Angle Arcade, Opp Kalupur Com Bank, Sold Rd",
            //         "drop": "46, ABC Tower, Gurukul road, Ghatlodia"
            //     },
            //     {
            //         "date": "31/01/2020",
            //         "status": "Cancelled",
            //         "name": "Nakul Chandra",
            //         "rate": 2,
            //         "profile": require('../../../assets/img/user.png'),
            //         "pick": "46, Angle Arcade, Opp Kalupur Com Bank, Sold Rd",
            //         "drop": "46, ABC Tower, Gurukul road, Ghatlodia"
            //     },
            // ]
            listItem: [],
        };
        // this.Star = '../../../assets/img/star_filled.png';
        // this.Star_With_Border = '../../../assets/img/star_corner.png';

        this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
        this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    }

    UpdateRating(key) {
        this.setState({ Default_Rating: key });
    }

    _navigate = (index) => {
        // alert(index)
        this.props.navigation.navigate('DetailsTrack', {
            visible: false,
            orderId: index
        })
    }

    componentDidMount = async () => {
        //alert(await AsyncStorage.getItem('@userid'))
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('willFocus', () => {
            this.setState({ isLoading: true }, async () => {
                var url = Config.baseUrl + Config.orderlist;
                var reqJson = {
                    userid: await AsyncStorage.getItem('@userid')
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
                            console.log('orderList', response)
                            this.setState({ isLoading: false });
                            if (response.status == "true") {
                                this.setState({ listItem: response.data });
                            } else {
                                viewUtils.showToast(response.message.trim());
                            }
                        }
                    });
            })
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    renderItem({ item, index }) {
        const lengthArray = this.state.listItem.length;
        let React_Native_Rating_Bar = [];
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.starImage}
                        source={
                            i <= item.driver_rating
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }
        return (
            <TouchableWithoutFeedback underlayColor="transparent" onPress={() => this._navigate(item.id)}>
                <View style={lengthArray - 1 == index ? [styles.orderBox, { marginBottom: width * 0.035 }] : styles.orderBox} >
                    <View style={[styles.navigation, { borderBottomWidth: 1 }]}>
                        <View style={styles.leftNavigation}>
                            <Text style={styles.date}>{item.order_place_date.split(' ')[0].trim()}</Text>
                            <Text style={[styles.orderStatus, { color: item.order_status == "pending" ? Color.red : item.order_status == "delivered" ? Color.light_green : 'orange' }]}>{item.order_status}</Text>
                        </View>
                        <View style={styles.rightNavigation}>

                            {item.order_status == "pending" ?
                                <View style={styles.rightNav}>
                                    <Text style={{ ...styles.name, textAlignVertical: 'center', lineHeight: height * 0.032 }}>Waiting for driver</Text>
                                </View>
                                :
                                <View style={styles.rightNav}>
                                    <Text style={styles.name}>{item.driver_name}</Text>
                                    {item.driver_name !== '' &&
                                        <View style={styles.childView}>{React_Native_Rating_Bar}</View>}
                                </View>
                            }
                            <View style={styles.profileContainer}>
                                {item.driver_profile == "" ? <Image source={require('../../../assets/img/app_logo.png')} style={styles.userImage} />
                                    : <Image source={{ uri: item.driver_profile }} style={styles.userImage} />}

                            </View>
                        </View>
                    </View>
                    <View style={[styles.locationNav, { marginTop: 5 }]}>
                        <View style={styles.timeline}>
                            <View style={styles.line}>
                                <View style={[styles.topLine, styles.hiddenLine]} />
                                <View style={styles.bottomLine} />
                            </View>
                            <View style={[styles.dot, { backgroundColor: Color.green }]} />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.locationTitle}>{item.pic_up_location}</Text>
                        </View>
                    </View>
                    <View style={[styles.locationNav, { marginBottom: 5 }]}>
                        <View style={styles.timeline}>
                            <View style={styles.line}>
                                <View style={styles.topLine} />
                                <View style={[styles.bottomLine, styles.hiddenLine]} />
                            </View>
                            <View style={[styles.dot, { backgroundColor: Color.red }]} />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.locationTitle}>{item.drop_location}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
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
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>My Orders</Text>
                </View>


                <FlatList
                    refreshing={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.listItem}
                    extraData={this.state}
                    numColumns={1}
                    renderItem={this.renderItem.bind(this)}
                />

            </View>
        );
    }
}

