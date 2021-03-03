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
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    BackHandler,
    TouchableHighlight
} from 'react-native';

import moment from 'moment';
import { Button, Input, CheckBox } from 'react-native-elements';
import Modal from "react-native-modal";
// import { , ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Entypo';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font';
import Header from '../../component/goBackNotification';
import styles from './styles';
import Config from '../../config/config';
import ApiService from "../../config/ApiService";
import Utility from "../../config/utility";
import { ScrollView } from 'react-native-gesture-handler';

var { width, height } = Dimensions.get('window');

export default class Orders extends React.Component {
    onWillFocus = this.props.navigation.addListener(
        'willFocus',
        payload => {
            this.params = this.props.navigation.state.params;
            this.setState({ isModalVisibleInfo: this.params.visible })
        }
    );

    constructor(props) {
        super(props);
        apiService = new ApiService();
        viewUtils = new Utility();

        this.params = this.props.navigation.state.params;
        this.state = {
            Default_Rating: 3,
            Max_Rating: 5,
            Default_Rating_form: 0,
            isModalVisibleInfo: this.params.visible,
            disputeModalVisible: false,

            keyboardSpace: '',
            listItem: [],
            disputeList: [],

            date: null,
            time: null,
            pickupLocation: null,
            dropLocation: null,
            review: null,
            rating: null,

            message: null,
            reason: null,
            // disputeList: [
            //     {
            //         "id": "1",
            //         "reason": "Order is not delivered",
            //     },
            //     {
            //         "id": "2",
            //         "reason": "Parcel damage",
            //     },
            //     {
            //         "id": "3",
            //         "reason": "Late delievery",
            //     },
            // ],
            selectedDispute: null,
            disputeId: null
        };

        this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
        this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png'
        this.Blue_Star = 'https://webstockreview.net/images/clipart-star-math-18.png'

        if (Platform.OS == "ios") {
            Keyboard.addListener('keyboardDidShow', frames => {
                if (!frames.endCoordinates) return;
                this.setState({ keyboardSpace: frames.endCoordinates.height });
            });
        }

        Keyboard.addListener('keyboardDidHide', frames => {
            this.setState({ keyboardSpace: '' });
        });
    }

    componentDidMount = async () => {
        //console.log('userId========>',this.props.navigation.state.params.orderId)
        this.setState({ isLoading: true }, async () => {
            var url = Config.baseUrl + Config.orderdetails;
            var reqJson = {
                userid: await AsyncStorage.getItem('@userid'),
                orderid: this.props.navigation.state.params.orderId
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
                        console.log(response)
                        this.setState({ isLoading: false });
                        if (response.status == "true") {
                            console.log("response ", response.data)
                            this.setState({
                                listItem: response.data,
                                date: response.data.order_place_date.split(' ')[0].trim(),
                                time: response.data.order_place_date.split(' ')[1].trim() + ' ' + response.data.order_place_date.split(' ')[2].trim(),
                                pickupLocation: response.data.pic_up_location,
                                dropLocation: response.data.drop_location
                                //pickup: response.data.pic_up_location.split(",").trim()
                            });

                        } else {
                            viewUtils.showToast(response.message.trim());
                        }
                    }
                });
        })

        this.setState({ isLoading: true }, async () => {
            var url = Config.baseUrl + Config.reasonlist;
            var reqJson = {
                userid: await AsyncStorage.getItem('@userid'),
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
                            console.log(response.data)
                            this.setState({
                                disputeList: response.data,
                            });

                        } else {
                            viewUtils.showToast(response.message.trim());
                        }
                    }
                });
        })
    }

    UpdateRating(key) {
        //console.log(key)
        this.setState({ Default_Rating_form: key });
    }

    addReview = () => {
        const { review } = this.state;
        !review ? this.setState({ reviewError: "Review required" }) : "";

        this.setState({ isLoading: true }, async () => {
            var url = Config.baseUrl + Config.addreview;
            var reqJson = {
                userid: await AsyncStorage.getItem('@userid'),
                orderid: this.props.navigation.state.params.orderId,
                review: this.state.review,
                rating: this.state.Default_Rating_form,
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
                        console.log(response)
                        this.setState({ isLoading: false });
                        if (response.status == "true") {
                            console.log(response.data)
                            this.setState({ isModalVisibleInfo: false })
                            // this.setState({
                            //     listItem: response.data,
                            //     date: response.data.order_place_date.split(' ')[0].trim(),
                            //     time: response.data.order_place_date.split(' ')[1].trim(),
                            //     pickupLocation: response.data.pic_up_location,
                            //     dropLocation: response.data.drop_location
                            //     //pickup: response.data.pic_up_location.split(",").trim()
                            // });

                        } else {
                            viewUtils.showToast(response.message.trim());
                        }
                    }
                });
        })
        // this.setState({ isModalVisibleInfo: false })
        // this.props.navigation.navigate('OrderHome');
    }

    createDispute = () => {
        const { selectedDispute } = this.state;
        !selectedDispute ? this.setState({ reasonError: "Dispute reason required" }) : "";

        if (selectedDispute) {
            this.setState({ isLoading: true }, async () => {
                var url = Config.baseUrl + Config.createdispute;
                var reqJson = {
                    userid: await AsyncStorage.getItem('@userid'),
                    orderid: this.props.navigation.state.params.orderId,
                    reason: this.state.selectedDispute,
                    reason_text: this.state.message,
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
                            console.log(response)
                            this.setState({ isLoading: false });
                            if (response.status == "true") {
                                console.log(response.data)
                                this.setState({ disputeModalVisible: false })
                                viewUtils.showToast(response.message.trim());
                                // this.setState({
                                //     listItem: response.data,
                                //     date: response.data.order_place_date.split(' ')[0].trim(),
                                //     time: response.data.order_place_date.split(' ')[1].trim(),
                                //     pickupLocation: response.data.pic_up_location,
                                //     dropLocation: response.data.drop_location
                                //     //pickup: response.data.pic_up_location.split(",").trim()
                                // });

                            } else {
                                viewUtils.showToast(response.message.trim());
                            }
                        }
                    });
            })
        }
    }

    _trackorder = index => {
        this.props.navigation.navigate('Ordertrack', {
            serviceId: this.state.listItem.service_id,
            serviceName: this.state.listItem.service_name,
            quantity: this.state.listItem.qty,
            description: this.state.listItem.description,
            houseNumber: '',
            address: '',
            landmark: '',
            contactName: this.state.listItem.pickup_contact_name,
            contactNumber: this.state.listItem.pickup_contact_number,
            pickupLat: this.state.listItem.pic_up_lat,
            pickupLng: this.state.listItem.pic_up_long,
            pickup_location: this.state.listItem.pic_up_location,

            dropAddress: '',
            dropHouseNumber: '',
            dropLandmark: '',
            dropContactName: this.state.listItem.drop_contact_name,
            dropContactNumber: this.state.listItem.drop_contact_number,
            dropLat: this.state.listItem.drop_lat,
            dropLng: this.state.listItem.drop_long,
            drop_location: this.state.listItem.drop_location,

            vehicleId: this.state.listItem.vehicle_id,
            amount: this.state.listItem.sub_total,
            tax: this.state.listItem.tax_fee,
            totalAmount: this.state.listItem.total_order_price,
            vehicleName: this.state.listItem.vehicle_brand + " " + this.state.listItem.vehicle_model,
            vehicleImage: this.state.listItem.vehicle_type_icon,
            distance: this.state.listItem.total_distance_km,
            time: this.state.listItem.timeto_destination,

            paymentMethod: this.state.listItem.payment_method,
            orderId: this.state.listItem.id,
        })
    }

    _cancelorder = index => {
        this.setState({ isLoading: true }, async () => {
            var url = Config.baseUrl + Config.cancelorder;
            var reqJson = {
                userid: await AsyncStorage.getItem('@userid'),
                orderid: this.props.navigation.state.params.orderId,
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
                        console.log(response)
                        this.setState({ isLoading: false });
                        if (response.status == "true") {
                            console.log(response.data)
                            this.props.navigation.navigate('OrderHome')

                        } else {
                            viewUtils.showToast(response.message.trim());
                        }
                    }
                });
        })

    }


    render() {
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
                            i <= this.state.listItem.driver_rating
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }

        let React_Native_Rating_Bar_form = [];
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar_form.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.starImageForm}
                        source={
                            i <= this.state.Default_Rating_form
                                ? { uri: this.Star }
                                : { uri: this.Blue_Star }
                        }
                    />
                </TouchableOpacity>
            );
        }

        return (
            <View style={styles.container}>
                <GeneralStatusBar backgroundColor={this.state.isModalVisibleInfo ? Color.transparent : Color.white} barStyle="dark-content" />
                <Spinner visible={this.state.isLoading} textContent={''} />

                <Header
                    onMenu={() => this.props.navigation.goBack()}
                    onNotification={() => this.props.navigation.navigate('Notification')}
                />

                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Order Details</Text>
                </View>

                <ScrollView >
                    <View style={{ paddingBottom: 200 }}>
                        <View style={styles.topNavigation}>
                            <View style={styles.leftNavigation}>
                                <Text style={styles.subTitle}>{this.state.date}</Text>
                                <Text style={[styles.subTitle, { lineHeight: height * 0.023 }]}>{this.state.time}</Text>
                            </View>
                            <View style={styles.rightNavigation}>
                                <Text style={styles.subTitle}>{this.state.listItem.orderid}</Text>
                                <Text style={[styles.subTitle, { textTransform: 'capitalize', lineHeight: height * 0.023, color: this.state.listItem.order_status == "pending" ? Color.red : this.state.listItem.status == "Delivered" ? Color.light_green : 'orange' }]}>
                                    {this.state.listItem.order_status}</Text>
                            </View>
                        </View>
                        <View style={styles.topNavigation}>
                            <View style={styles.paymentMethodDiv}>
                                <Text style={styles.paymentMethod}> {this.state.listItem.payment_method} </Text>
                            </View>
                        </View>

                        <View style={styles.orderBox}>

                            {this.state.listItem.order_status == "pending" || this.state.listItem.order_status == "cancelled" || this.state.listItem.order_status == undefined ?
                                null
                                :
                                <View style={[styles.navigation, { borderBottomWidth: 1 }]}>
                                    <View style={styles.profile_container}>
                                        <Image source={{ uri: this.state.listItem.driver_profile }} style={styles.userImage} />
                                    </View>
                                    <View style={styles.leftNavigation}>
                                        <View style={styles.rightNav}>
                                            <Text style={styles.name}>{this.state.listItem.driver_name}</Text>
                                            <View style={styles.childView}>
                                                <Text style={styles.rateTiItle}>You Rated </Text>
                                                {React_Native_Rating_Bar}
                                            </View>
                                        </View>
                                    </View>
                                </View>}
                            <View style={[styles.navigation, { borderBottomWidth: 1 }]}>
                                <View style={[styles.leftNavigation, { flexDirection: 'row', alignItems: 'center' }]}>
                                    <Text style={styles.subTitle}>Order Fare : </Text>
                                    <Text style={{ fontSize: width * 0.038, color: Color.dark_blue, fontFamily: Font.bold, }}>₹ {this.state.listItem.total_order_price}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.subTitle}>Distance : </Text>
                                    <Text style={{ fontSize: width * 0.038, color: Color.dark_blue, fontFamily: Font.bold }}>{this.state.listItem.order_distance}</Text>
                                </View>
                            </View>

                            <View style={styles.locationNav}>
                                <View style={styles.timeline}>
                                    <View style={styles.line}>
                                        <View style={[styles.topLine, styles.hiddenLine]} />
                                        <View style={styles.bottomLine} />
                                    </View>
                                    <View style={[styles.dot, { backgroundColor: Color.green }]} />
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.locationTitle}>{this.state.pickupLocation}</Text>
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
                                    <Text style={styles.locationTitle}>{this.state.dropLocation}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.orderBox}>

                            <View style={[styles.navigation, { borderBottomWidth: 1 }]}>
                                <View style={[styles.leftNavigation, { flexDirection: 'row', alignItems: 'center' }]}>
                                    <Text style={styles.subTitle}>Service : </Text>
                                    <Text style={{ fontSize: width * 0.038, fontFamily: Font.semi_bold, }}>{this.state.listItem.service_name}</Text>
                                </View>
                            </View>

                            <View style={[styles.navigation, { borderBottomWidth: 1 }]}>
                                <View style={[styles.leftNavigation, { flexDirection: 'row', alignItems: 'center' }]}>
                                    <Text style={styles.subTitle}>Quantity : </Text>
                                    <Text style={{ fontSize: width * 0.038, fontFamily: Font.semi_bold, }}>{this.state.listItem.qty} {this.state.listItem.service_name}</Text>
                                </View>
                            </View>

                            <View style={[styles.navigation, { borderBottomWidth: 1 }]}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.subTitle}>Description : </Text>
                                    <Text style={[styles.subTitle, { flex: 1, fontFamily: Font.semi_bold }]}>{this.state.listItem.description}</Text>
                                </View>
                            </View>

                        </View>


                        <View style={styles.orderBox}>
                            <View style={styles.invoiceTitleContainer}>
                                <Text style={styles.invoiceTitle}>Invoice Detail</Text>
                            </View>

                            <View style={[styles.invoiceNavigation]}>
                                <View style={styles.leftNavigation}>
                                    <Text style={styles.subTitleInv}>Fare Price</Text>
                                </View>
                                <View style={styles.rightNavigation}>
                                    <Text style={styles.subTitleInv}>₹ {this.state.listItem.sub_total}</Text>
                                </View>
                            </View>

                            <View style={[styles.invoiceNavigation]}>
                                <View style={styles.leftNavigation}>
                                    <Text style={styles.subTitleInv}>Tax 1 <Text style={{ fontSize: width * 0.03 }}>(18%)</Text></Text>
                                </View>
                                <View style={styles.rightNavigation}>
                                    <Text style={styles.subTitleInv}>₹ {this.state.listItem.tax_fee}</Text>
                                </View>
                            </View>

                            {/* <View style={[styles.invoiceNavigation]}>
                            <View style={styles.leftNavigation}>
                                <Text style={styles.subTitleInv}>Tax 2 <Text style={{ fontSize: width * 0.03 }}>(8%)</Text></Text>
                            </View>
                            <View style={styles.rightNavigation}>
                                <Text style={styles.subTitleInv}>₹ 20.00</Text>
                            </View>
                        </View> */}

                            <View style={[styles.invoiceNavigation, { borderBottomWidth: 0 }]}>
                                <View style={styles.leftNavigation}>
                                    <Text style={[styles.subTitleInv, { color: Color.dark_blue, fontFamily: Font.bold }]}>Total Invoice</Text>
                                </View>
                                <View style={styles.rightNavigation}>
                                    <Text style={[styles.subTitleInv, { color: Color.dark_blue, fontFamily: Font.bold }]}>₹ {this.state.listItem.total_order_price}</Text>
                                </View>
                            </View>
                        </View>

                        {this.state.listItem.order_status == 'delivered' ?

                            <View style={styles.mainBtnContainer}>
                                <View style={styles.leftBtnContainer}>
                                    <Button
                                        title="Rate Driver"
                                        titleStyle={styles.btnTitle}
                                        buttonStyle={styles.btn}
                                        onPress={() => this.setState({ isModalVisibleInfo: true })}
                                    />
                                </View>
                                <View style={styles.rightBtnContainer}>
                                    <Button
                                        title="Dispute"
                                        titleStyle={styles.btnTitle}
                                        buttonStyle={styles.btn}
                                        onPress={() => this.setState({ disputeModalVisible: true })}
                                    />
                                </View>
                            </View>
                            :
                            this.state.listItem.order_status == 'cancelled' ?
                                null
                                :
                                this.state.listItem.order_status == undefined ?
                                    null
                                    :
                                    this.state.listItem.order_status == "pending" ?
                                        <View style={styles.buttonContainer}>
                                            <Button
                                                title="Cancel Your Order"
                                                titleStyle={styles.btnTitle}
                                                buttonStyle={styles.btn}
                                                onPress={() => this._cancelorder()}
                                            />
                                        </View>
                                        :
                                        <View style={styles.buttonContainer}>
                                            <Button
                                                title="Track Your Order"
                                                titleStyle={styles.btnTitle}
                                                buttonStyle={styles.btn}
                                                onPress={() => this._trackorder()}
                                            />
                                        </View>
                        }
                    </View>
                </ScrollView>
                <Modal
                    isVisible={this.state.isModalVisibleInfo}
                    style={[styles.footerModal, { bottom: this.state.keyboardSpace ? this.state.keyboardSpace : 0 }]}
                    onBackdropPress={() => this.setState({ isModalVisibleInfo: false })}
                >
                    <View style={styles.contentModel}>

                        <View style={styles.inputContainer}>
                            <Text style={styles.titleModal}>Rate</Text>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Star Rating</Text>
                                <View style={[styles.childView, { marginTop: height * 0.005 }]}>{React_Native_Rating_Bar_form}</View>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Review</Text>
                                <TextInput
                                    style={styles.textBox}
                                    autoCapitalize="none"
                                    placeholder="Enter Review"
                                    keyboardType="default"
                                    value={this.state.review}
                                    onChangeText={(value) => this.setState({ review: value })}
                                    ref={input => { this.review = input }}
                                    onFocus={() => this.setState({ reviewError: null })}
                                />
                                {this.state.reviewError &&
                                    <Text style={styles.error}>{this.state.reviewError}</Text>
                                }
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Submit"
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.button}
                                onPress={() => this.addReview()}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    isVisible={this.state.disputeModalVisible}
                    style={[styles.centerModal]}
                >
                    <View style={styles.centerContentModel}>
                        <TouchableHighlight style={styles.closeTouchable} onPress={() => this.setState({ disputeModalVisible: false })} underlayColor="transparent">
                            <View style={styles.closeContainer}>
                                <Text style={styles.cross}> ✕ </Text>
                            </View>
                        </TouchableHighlight>
                        <View style={styles.inputContainer}>
                            <Text style={styles.centerTitleModal}>Order ID : {this.state.listItem.orderid}</Text>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Dispute Reasone</Text>
                                <RNPickerSelect
                                    value={this.state.selectedDispute}
                                    onValueChange={(value, index) =>
                                        this.setState({ selectedDispute: value, disputeId: index, reasonError: null })}
                                    items={this.state.disputeList.map((item, index) => (
                                        {
                                            label: item.reason,
                                            value: item.reason
                                        }
                                    ))}
                                    placeholder={{
                                        label: 'Select Reason',
                                        value: null,
                                        //color: '#9e9e9e'
                                    }}
                                    placeholderTextColor={Color.grey_5}
                                    useNativeAndroidPickerStyle={false}
                                    Icon={() => {
                                        return <Icon name='chevron-thin-down' color={Color.dark_blue} size={width * 0.07} style={{ alignSelf: 'flex-end' }} />;
                                    }}
                                    textInputProps={{
                                        fontFamily: Font.regular,
                                        fontSize: width * 0.055,
                                        width: '100%',
                                        padding: 0,
                                        paddingTop: 6,
                                        paddingBottom: 4,
                                        borderBottomColor: Color.dark_blue,
                                        borderBottomWidth: 2,
                                        alignItems: 'center',
                                        //borderWidth: 1, 
                                    }}
                                    inputAndroidContainer={{
                                        borderWidth: 3
                                    }}
                                />
                                {this.state.reasonError &&
                                    <Text style={styles.error}>{this.state.reasonError}</Text>
                                }
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Dispute Message</Text>
                                <TextInput
                                    style={[styles.textBox, { maxHeight: 100, height: 100, textAlignVertical: 'top' }]}
                                    autoCapitalize="none"
                                    placeholder="Dispute Message"
                                    keyboardType="default"
                                    multiline={true}
                                    value={this.state.message}
                                    onChangeText={(value) => this.setState({ message: value })}
                                    ref={input => { this.message = input }}
                                    onFocus={() => this.setState({ reasonError: null })}
                                />
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Create Dispute"
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.button}
                                onPress={() => this.createDispute()}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

