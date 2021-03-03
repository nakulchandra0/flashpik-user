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
    TouchableOpacity,
    FlatList,
    Keyboard,
    BackHandler,
    NativeModules,
    ActivityIndicator,
    DeviceEventEmitter,
    NativeEventEmitter,
    Linking
} from 'react-native';

import { Button, Input, CheckBox } from 'react-native-elements';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import RNUpiPayment from 'react-native-upi-payment';
import paytm from 'react-native-paytm';
// import UpiPayment from 'react-native-upi-payment';
import Toast from 'react-native-easy-toast';
import { StackActions, NavigationActions } from 'react-navigation';
/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font';
import Header from '../../component/goBack';
import styles from './styles';
import Config from '../../config/config';
import ApiService from "../../config/ApiService";
import Utility from "../../config/utility";

var { width, height } = Dimensions.get('window');
var paytmEvent = null;

const paytmConfig = {
    MID: Config.mid_key,
    WEBSITE: 'DEFAULT',
    CHANNEL_ID: 'WAP',
    INDUSTRY_TYPE_ID: 'Retail',
    CALLBACK_URL: 'https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp'
};
class Details extends React.Component {

    constructor(props) {
        super(props);
        apiService = new ApiService();
        viewUtils = new Utility();
        this.state = {
            listItem: [],
            // options: [
            //     {
            //         "title": "Paytm Wallet",
            //         "subtitle": "Link Wallet",
            //         "image": require('../../../assets/img/paytm.png'),
            //         "selected": false
            //     },
            //     {
            //         "title": "BHIM UPI",
            //         "subtitle": "Link UPI",
            //         "image": require('../../../assets/img/upi.png'),
            //         "selected": false
            //     },
            //     {
            //         "title": "Google Pay",
            //         "subtitle": "Link UPI",
            //         "image": require('../../../assets/img/gpay.png'),
            //         "selected": false
            //     },
            //     {
            //         "title": "Cash on Delivery",
            //         "subtitle": "",
            //         "image": require('../../../assets/img/cod.png'),
            //         "selected": false
            //     }
            // ],
            enable: false,
            isModalVisibleInfo: false,
            selectedIndex: null,
            buttonTitle: "Proceed to PAY",
            keyboardSpace: '',

            userId: null,
            serviceId: null,
            serviceName: null,
            quantity: null,
            description: null,

            address: "",
            houseNumber: null,
            landmark: null,
            contactName: null,
            contactNumber: null,
            pickupLat: null,
            pickupLng: null,
            pickup_location: null,
            pickup_latlong: null,

            dropAddress: "",
            dropHouseNumber: null,
            dropLandmark: null,
            dropContactName: null,
            dropContactNumber: null,
            dropLat: null,
            dropLng: null,
            drop_location: null,
            drop_latlong: null,

            vehicleId: null,
            amount: null,
            tax: null,
            totalAmount: null,
            vehicleName: null,
            vehicleImage: null,
            distance: null,
            time: null,

            paymentMethod: null,
            paymentMethodId: null,
            transactionInfo: null,

            isModalVisible: false,
            isLoading: false,

            selected: null,

            //UPI
            Status: "",
            txnId: "",
            GOOGLE_PAY: "GOOGLE_PAY",
            PHONEPE: 'PHONEPE',
            PAYTM: 'PAYTM',
            message: "",
            random: Math.random().toString(36).substring(2, 8),

            //Paytm
            //amount: 0,
            order_id: '',
            processing: false,
            payment_text: 'Requesting payment, please wait...'

        };

        //this._setAmount = this._setAmount.bind(this);

        this._startPayment = this._startPayment.bind(this);
        this._handlePaytmResponse = this._handlePaytmResponse.bind(this);

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

        paytmEvent = new NativeEventEmitter(NativeModules.RNPayTm);
        paytmEvent.addListener('PayTMResponse', this._handlePaytmResponse);

        this.setState({ userId: await AsyncStorage.getItem('@userid') })
        this.setState({
            serviceId: this.props.navigation.state.params.serviceId,
            serviceName: this.props.navigation.state.params.serviceName,
            quantity: this.props.navigation.state.params.quantity,
            description: this.props.navigation.state.params.description,
            houseNumber: this.props.navigation.state.params.houseNumber,
            address: this.props.navigation.state.params.address,
            landmark: this.props.navigation.state.params.landmark,
            contactName: this.props.navigation.state.params.contactName,
            contactNumber: this.props.navigation.state.params.contactNumber,
            pickupLat: this.props.navigation.state.params.pickupLat,
            pickupLng: this.props.navigation.state.params.pickupLng,
            pickup_location: `${this.props.navigation.state.params.houseNumber}, ${this.props.navigation.state.params.landmark}, ${this.props.navigation.state.params.address}`,
            pickup_latlong: `${this.props.navigation.state.params.pickupLat},${this.props.navigation.state.params.pickupLng}`,

            dropAddress: this.props.navigation.state.params.dropAddress,
            dropHouseNumber: this.props.navigation.state.params.dropHouseNumber,
            dropLandmark: this.props.navigation.state.params.dropLandmark,
            dropContactName: this.props.navigation.state.params.dropContactName,
            dropContactNumber: this.props.navigation.state.params.dropContactNumber,
            dropLat: this.props.navigation.state.params.dropLat,
            dropLng: this.props.navigation.state.params.dropLng,
            drop_location: `${this.props.navigation.state.params.dropHouseNumber}, ${this.props.navigation.state.params.dropLandmark}, ${this.props.navigation.state.params.dropAddress}`,
            drop_latlong: `${this.props.navigation.state.params.dropLat},${this.props.navigation.state.params.dropLng}`,

            vehicleId: this.props.navigation.state.params.vehicleId,
            amount: this.props.navigation.state.params.amount,
            tax: this.props.navigation.state.params.tax,
            totalAmount: this.props.navigation.state.params.totalAmount,
            vehicleName: this.props.navigation.state.params.vehicleName,
            vehicleImage: this.props.navigation.state.params.vehicleImage,
            distance: this.props.navigation.state.params.distance,
            time: this.props.navigation.state.params.time,
        })

        this.setState({ isLoading: true }, async () => {
            var url = Config.baseUrl + Config.payment;
            var reqJson = {
                userid: await AsyncStorage.getItem('@userid')
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

                        if (response.status == "true") {
                            this.setState({ listItem: response.data });
                            console.log('list', this.state.listItem)
                        } else {
                            viewUtils.showToast(response.message.trim());
                        }

                        this.setState({ isLoading: false })
                    }
                });
        });
    }


    // Paytm Implementation
    componentWillUnmount() {
        if (paytmEvent) {
            paytmEvent.removeListener('PayTMResponse', this._handlePaytmResponse);
            paytmEvent = null;
        }
    }

    // _setAmount(much) {
    //     this.setState({ amount: much });
    //     this._amountTxtBox.setNativeProps({ text: much.toString() });
    // }

    async _startPayment() {
        if (this.state.processing) return;
        var uid = this.state.userId; //user id for user who is initiating the payment
        // var mid_key = Config.mid_key; //any API key to authenticate REST end point
        var amount = parseInt(this.state.totalAmount);

        // if(amount == 0 || amount == ''){
        //     this.refs.toast.show('Please select or enter a valid amount'); return;
        // }
        // if(amount <= 1){
        //     this.refs.toast.show('Minimum purchase limit is 10 rupees'); return;
        // }
        // if(amount > 1000){
        //     this.refs.toast.show('Maximum purchase limit is 1000 rupees'); return;
        // }

        amount = amount.toString(); //amount must be passed a string else paytm will crash if amount is int type

        this.setState({ isLoading: true, processing: true, payment_text: 'Requesting payment, please wait...' });
        var type = 1; //credit
        //start transaction, generate request from server
        // var url = 'http://test.takedoodles.com/paytm/generate_checksum.php';
        var url = 'http://cipherbrainstest.com/paytm/generate_checksum.php';
        //alert(this.state.order_id)
        // var body = JSON.stringify({
        //     user: uid,
        //     order: '1',
        //     email: 'test@gmail.com',
        //     mobile: '7777777777',
        //     amount: this.state.amount,
        //     type: type,
        // });
        var body = JSON.stringify({
            user: uid,
            mid: paytmConfig.MID,
            orderId: 'ORDERID_98765',
            email: await AsyncStorage.getItem('@email'),
            mobile: await AsyncStorage.getItem('@phone'),
            amount: this.state.totalAmount
        });

        fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: body
        })
            .then((responseJson) => responseJson.json())
            .then((response) => {
                console.log('response =====>', response)

                if (response.responseCode == 401) {
                    this.setState({ isLoading: false });
                    console.log('RESPONSE', response);
                    viewUtils.showToast('Unauthorized REST API request');
                }
                else {
                    this.setState({ isLoading: false });
                    //this response from REST endpoint will contain all the required data to start payment
                    //please check php file for sample
                    // var data = response.paramList;
                    var data = response.data;
                    console.log('data =====>', data)
                    this.setState({ order_id: data.ORDER_ID });


                    var details = {
                        mode: 'Production', // 'Staging' or 'Production'
                        MID: data.MID,
                        INDUSTRY_TYPE_ID: data.INDUSTRY_TYPE_ID, //Prod
                        WEBSITE: data.WEBSITE, //prod
                        CHANNEL_ID: data.CHANNEL_ID,
                        TXN_AMOUNT: data.TXN_AMOUNT,
                        ORDER_ID: data.ORDER_ID,
                        EMAIL: data.EMAIL,
                        MOBILE_NO: data.MOBILE_NO,
                        CUST_ID: data.CUST_ID,
                        CHECKSUMHASH: data.CHECKSUMHASH,
                        CALLBACK_URL: data.CALLBACK_URL
                    };
                    console.log(details);
                    paytm.startPayment(details);
                }
            })
            .catch((error) => {
                alert(JSON.stringify(error.message))
                this.setState({ isLoading: false, processing: false });
                //Alert.alert('Error', 'Unable to initiate transaction, please try again');
            });
    }

    _handlePaytmResponse(body) {

        // {
        //     "BANKNAME": "WALLET",
        //     "BANKTXNID": "151045425568",
        //     "CHECKSUMHASH": "Zp/szo/usxuLgZ8Fj//LtOSNO8dqDXpaWJxryOW/dyexRebcWTMXI09PPGeoPdkbb/hx5mo3Eh7xpqJ466IDXCtrG02slzvkGsMp6hEjhCE=",
        //     "CURRENCY": "INR",
        //     "GATEWAYNAME": "WALLET",
        //     "MID": "ybXZbd37909828396443",
        //     "ORDERID": "ORDER802356049715621",
        //     "PAYMENTMODE": "PPI",
        //     "RESPCODE": "01",
        //     "RESPMSG": "Txn Success",
        //     "STATUS": "TXN_SUCCESS",
        //     "TXNAMOUNT": "1.00",
        //     "TXNDATE": "2021-01-12 14:54:07.0",
        //     "TXNID": "20210112111212800110168677374058969",
        //     "status": "Success"
        //   }
        //alert('paytm response')
        //console.log("CHECKSUMHASH ", body.CHECKSUMHASH);

        if (body.STATUS == "TXN_SUCCESS") {
            console.log(body);
            this.setState({ transactionInfo: body.TXNID })
            viewUtils.showToast('Transaction successful');
            this._navigate();
        } else {
            console.log(body); //check paytm response for any fail case message and details
            viewUtils.showToast('Paytm payment fail');
            //Alert.alert('Failed', result);
        }
        this.setState({ processing: false, payment_text: '' });

    }




    // Payment selection method
    _selectOption = (index, name) => {
        // console.log('selected index', index)
        // console.log('selected index', name)
        // this.setState({selected: index})
        // var data = this.state.listItem;
        // data.map(function (value, i) {
        //     data[i].selected = false;
        // })
        // data[index].selected = true;
        this.setState({ enable: true, selectedIndex: index, paymentMethod: name, paymentMethodId: index });

        if (index != 4) {
            this.setState({ isModalVisibleInfo: true, buttonTitle: "Proceed to PAY" })
        } else {
            this.setState({ buttonTitle: "Confirm your Order" })
        }
    }

    renderItem({ item, index }) {
        const lengthArray = this.state.listItem.length;
        return (
            <TouchableHighlight underlayColor="transparent" onPress={() => this._selectOption(item.id, item.payment_name)}>
                <View style={lengthArray - 1 == index ? [styles.navigation, { borderBottomWidth: 1, borderBottomColor: Color.grey_2, }] : styles.navigation}>
                    <View style={styles.leftNavigation}>
                        <Image source={{ uri: item.payment_image }} style={styles.payImage} />
                        <Text style={styles.payTitle}>{item.payment_name}
                            {/* <Text style={styles.payTitleSub}>
                                {item.payment_name == "Paytm Wallet" ?
                                    `   (Link Wallet)` : item.payment_name == "Cash on Delivery" ? `` : `   (Link UPI)`}
                            </Text> */}
                        </Text>
                    </View>
                    <View style={styles.rightNavigation}>
                        {/* <TouchableHighlight underlayColor="transparent" onPress={() => this._selectOption(item.id, item.payment_name)}> */}
                        <View>
                            <View style={styles.radioBorder}>
                                {this.state.selectedIndex == item.id &&
                                    <View style={styles.innerRadio} />
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }


    _navigate = () => {
        this.setState({ isModalVisibleInfo: false, isLoading: false })

        this.setState({ isLoading: true }, async () => {
            var url = Config.baseUrl + Config.booking;
            var reqJson = {
                customer_id: await AsyncStorage.getItem('@userid'),
                service_id: this.state.serviceId,
                vehicle_type_id: this.state.vehicleId,
                goods_qty: this.state.quantity,
                goods_description: this.state.description,
                pic_up_location: this.state.pickup_location,
                drop_location: this.state.drop_location,
                pic_up_latlong: this.state.pickup_latlong,
                drop_latlong: this.state.drop_latlong,
                pickup_contact_name: this.state.contactName,
                pickup_contact_number: this.state.contactNumber,
                drop_contact_name: this.state.dropContactName,
                drop_contact_number: this.state.dropContactNumber,
                total_order_price: this.state.totalAmount,
                sub_total: this.state.amount,
                tax_fee: this.state.tax,
                total_distance_km: this.state.distance,
                payment_method: this.state.paymentMethodId,
                payment_info: this.state.paymentMethod == "Cash on Delivery" ? 'cod' : this.state.transactionInfo,
                timeto_destination: this.state.time
            };

            console.log(JSON.stringify(reqJson))
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
                            //this.setState({ listItem: response.data });
                            console.log("Booking",response.message);
                            
                            this.props.navigation.replace('Thanks', {
                                serviceId: this.state.serviceId,
                                serviceName: this.state.serviceName,
                                quantity: this.state.quantity,
                                description: this.state.description,

                                houseNumber: this.state.houseNumber,
                                address: this.state.address,
                                landmark: this.state.landmark,
                                contactName: this.state.contactName,
                                contactNumber: this.state.contactNumber,
                                pickupLat: this.state.pickupLat,
                                pickupLng: this.state.pickupLng,
                                pickup_location: this.state.pickup_location,

                                dropAddress: this.state.dropAddress,
                                dropHouseNumber: this.state.dropHouseNumber,
                                dropLandmark: this.state.dropLandmark,
                                dropContactName: this.state.dropContactName,
                                dropContactNumber: this.state.dropContactNumber,
                                dropLat: this.state.dropLat,
                                dropLng: this.state.dropLng,
                                drop_location: this.state.drop_location,

                                vehicleId: this.state.vehicleId,
                                amount: this.state.amount,
                                tax: this.state.tax,
                                totalAmount: this.state.totalAmount,
                                vehicleName: this.state.vehicleName,
                                vehicleImage: this.state.vehicleImage,
                                distance: this.props.navigation.state.params.distance,
                                time: this.props.navigation.state.params.time,

                                paymentMethod: this.state.paymentMethod,
                                orderId: response.data.order_id,
                            });

                        } else {
                            viewUtils.showToast(response.message.trim());
                        }

                        this.setState({ isLoading: false })
                    }
                });
        });
    }

    render() {
        const { region, pulse, locationName } = this.state

        // Gpay functions 
        var RandomNumber = Math.floor(Math.random() * 100) + 1;
        var randomString = Math.random().toString(36).substring(2, 8);
        var that = this;

        function floo() {
            console.log('Floo ===>')
            RNUpiPayment.intializePaymentGoogle({
                vpa: 'jayisuser@oksbi',
                payeeName: 'Flashpik',
                amount: that.state.amount,
                transactionNote: '',
                transactionRef: 'flref-' + RandomNumber + '-' + randomString + '-fl'
            }, successCallback, GoogleFailureCallback);
        }

        // BHIM UPI functions 
        function _UPIPayment() {
            console.log('upi payment ===>')

            RNUpiPayment.intializePayment({
                vpa: 'jayisuser@oksbi', // or can be john@ybl or mobileNo@upi
                payeeName: 'mansi',
                amount: that.state.amount,
                transactionRef: 'flref-' + RandomNumber + '-' + randomString + '-fl'
            }, successCallback, failureCallback);
        }

        async function GoogleFailureCallback(data) {
            console.log('failure ===>')

            if (data['status'] == "FAILURE") {
                console.log(data);
                viewUtils.showToast(data['message']);

                const supported = await Linking.canOpenURL('https://pay.google.com/intl/en_in/about/?&gclid=CjwKCAjwx9_4BRAHEiwApAt0zjs5DYn22V_9UK4yg7QdQ3wkytJ7rCHdpUuxWj9QLcq1b17B0bfolxoCsEUQAvD_BwE');
                if (supported) {
                    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                    // by some browser in the mobile
                    await Linking.openURL('https://pay.google.com/intl/en_in/about/?&gclid=CjwKCAjwx9_4BRAHEiwApAt0zjs5DYn22V_9UK4yg7QdQ3wkytJ7rCHdpUuxWj9QLcq1b17B0bfolxoCsEUQAvD_BwE');
                } else {
                    alert("Don't know how to open this URL");
                }
            }
            // in case of googlePay
            else if (data['Status'] == "FAILURE") {
                console.log(data);
                viewUtils.showToast("App closed without doing payment");
            }
            // in case of phonepe
            else if (data['Status'] == "Failed") {
                console.log(data);
                viewUtils.showToast("App closed without doing payment");
            }
            // in case of phonepe
            else if (data['Status'] == "Submitted") {
                viewUtils.showToast("Transaction done but pending");
                console.log(data.txnId);
                that.setState({ transactionInfo: data.txnId })
                that._navigate(data.txnId);
            }
            // any other case than above mentioned
            else if (data['Status'] == "SUCCESS") {
                viewUtils.showToast("Transaction successfull");
                console.log(data.txnId);
                that.setState({ transactionInfo: data.txnId })
                that._navigate();
            }
        }

        async function failureCallback(data) {
            console.log('failure ===>')

            if (data['status'] == "FAILURE") {
                console.log(data);
                viewUtils.showToast(data['message']);

                const supported = await Linking.canOpenURL('https://www.google.com/url?sa=t&source=web&rct=j&url=https://play.google.com/store/apps/details%3Fid%3Din.org.npci.upiapp%26hl%3Den%26referrer%3Dutm_source%253Dgoogle%2526utm_medium%253Dorganic%2526utm_term%253Dbhim%2Bmake%2Bindia%2Bcashless%2Bdownload%2Blink%26pcampaignid%3DAPPU_1_b1EZX4eqHI_Uz7sP38qF0A0&ved=2ahUKEwjHneyWgePqAhUP6nMBHV9lAdoQ5YQBMAB6BAgNEAI&usg=AOvVaw2FsQhoBDjS6TN6hmQhjJ6O&cshid=1595494814354');
                if (supported) {
                    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                    // by some browser in the mobile
                    await Linking.openURL('https://www.google.com/url?sa=t&source=web&rct=j&url=https://play.google.com/store/apps/details%3Fid%3Din.org.npci.upiapp%26hl%3Den%26referrer%3Dutm_source%253Dgoogle%2526utm_medium%253Dorganic%2526utm_term%253Dbhim%2Bmake%2Bindia%2Bcashless%2Bdownload%2Blink%26pcampaignid%3DAPPU_1_b1EZX4eqHI_Uz7sP38qF0A0&ved=2ahUKEwjHneyWgePqAhUP6nMBHV9lAdoQ5YQBMAB6BAgNEAI&usg=AOvVaw2FsQhoBDjS6TN6hmQhjJ6O&cshid=1595494814354');
                } else {
                    alert("Don't know how to open this URL");
                }
            }
            // in case of googlePay
            else if (data['Status'] == "FAILURE") {
                console.log(data);
                viewUtils.showToast("App closed without doing payment");
            }
            // in case of phonepe
            else if (data['Status'] == "Failed") {
                console.log(data);
                viewUtils.showToast("App closed without doing payment");
            }
            // in case of phonepe
            else if (data['Status'] == "Submitted") {
                viewUtils.showToast("Transaction done but pending");
                console.log(data.txnId);
                that.setState({ transactionInfo: data.txnId })
                that._navigate(data.txnId);
            }
            // any other case than above mentioned
            else if (data['Status'] == "SUCCESS") {
                viewUtils.showToast("Transaction successfull");
                console.log(data.txnId);
                that.setState({ transactionInfo: data.txnId })
                that._navigate();
            }
        }

        function successCallback(data) {
            console.log('Success ===>')

            //console.log(data.txnId);
            that.setState({ transactionInfo: data.txnId });
            that._navigate();
        }

        return (
            <View style={[styles.container, styles.dltContainer]}>
                <GeneralStatusBar backgroundColor={this.state.isModalVisibleInfo ? Color.transparent : Color.white} barStyle="dark-content" />
                <Spinner visible={this.state.isLoading} textContent={''} />

                <Header
                    onMenu={() => this.props.navigation.goBack()}
                />

                <View style={styles.mainContainer}>
                    <Text style={styles.title}>PAY ₹ {this.state.totalAmount}</Text>
                    <Text style={styles.subTitle}>Select Payment Method</Text>

                    <View style={styles.optionContainer}>
                        <FlatList
                            refreshing={true}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.listItem}
                            extraData={this.state}
                            numColumns={1}
                            renderItem={this.renderItem.bind(this)}
                        />
                    </View>
                </View>

                <View style={styles.bottomContainer}>
                    <Button
                        title={this.state.buttonTitle}
                        titleStyle={styles.buttonTitle}
                        buttonStyle={styles.button}
                        disabledStyle={styles.disableButton}
                        disabledTitleStyle={styles.disableTitleButton}
                        disabled={!this.state.enable}
                        onPress={() => { this.state.selectedIndex == 1 ? this._startPayment() : this.state.selectedIndex == 2 ? _UPIPayment() : this.state.selectedIndex == 3 ? floo() : this._navigate() }}
                    />
                </View>

                {/* info modal */}
                {/* <Modal
                    isVisible={this.state.isModalVisibleInfo}
                    style={[styles.footerModal, { bottom: this.state.keyboardSpace ? this.state.keyboardSpace : 0 }]}
                >
                    <View style={styles.content}>

                        <View style={styles.inputContainer}>
                            <Text style={styles.titleModal}>{this.state.selectedIndex == 1 ? "Link Paytm Wallet" : this.state.selectedIndex == 2 ? "Link BHIM UPI" : "Link Google Pay"}</Text>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>
                                    {this.state.selectedIndex == 1 ? "Please provide your registered mobile number to send OTP" : this.state.selectedIndex == 1 ? "Please enter your VPA (ex: phonenumber@upi)" : "Enter your phone number registered with GooglePay"}
                                </Text>

                                {this.state.selectedIndex == 1 &&
                                    <TextInput
                                        style={styles.textBox}
                                        autoCapitalize="none"
                                        placeholder="Enter Contact"
                                        keyboardType="number-pad"
                                        value="7567843935"
                                    />
                                }

                                {this.state.selectedIndex == 2 &&
                                    <TextInput
                                        style={styles.textBox}
                                        autoCapitalize="none"
                                        placeholder="1234567890@upi"
                                        keyboardType="default"
                                        value="1234567890@upi"
                                    />
                                }

                                {this.state.selectedIndex == 3 &&
                                    <TextInput
                                        style={styles.textBox}
                                        autoCapitalize="none"
                                        placeholder="Enter Contact"
                                        keyboardType="number-pad"
                                        value="1234567890"
                                    />
                                }
                            </View>
                        </View>

                        <View style={{ paddingBottom: width * 0.04, paddingTop: width * 0.02 }}>
                            <Button
                                title={this.state.selectedIndex == 1 ? "Send OTP" : "PAY"}
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.button}
                                onPress={() => { this.state.selectedIndex == 1 ? this._startPayment() : floo(this.state.GOOGLE_PAY) }}
                            />
                        </View>
                    </View>

                </Modal>
 */}
            </View>
        );
    }
}

export default Details;