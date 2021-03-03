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
    BackHandler
} from 'react-native';

import moment from 'moment';
import MapView, {
    Marker,
    Callout,
    CalloutSubview,
    ProviderPropType, PROVIDER_GOOGLE
} from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import marker from '../../../assets/img/pin_pick.png';
import markerDrop from '../../../assets/img/pin_drop.png';
import { Button, Input, CheckBox } from 'react-native-elements';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import RetroMapStyles from '../../component/RetroMapStyles.json';
import Color from '../../component/color';
import Font from '../../component/font';
import Header from '../../component/header';
import styles from './styles';
import Config from '../../config/config';
import ApiService from "../../config/ApiService";
import Utility from "../../config/utility";
import { db } from '../../config/db';
import { Linking } from 'react-native';

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyDi5VGZuYU7nnEX6WYj1DrAJygtagR3i2M';
let itemRef = db.ref('/drivers');

export default class Orders extends Component {
    constructor() {
        super();
        console.log(ASPECT_RATIO);
        viewUtils = new Utility();
        this.state = {
            Default_Rating: 2,
            Max_Rating: 5,

            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },

            coordinates: [
                {
                    latitude: 22.996531,
                    longitude: 72.500516
                },
                {
                    latitude: 23.009651,
                    longitude: 72.507152,
                },
            ],

            marker: {
                latitude: LATITUDE,
                longitude: LONGITUDE
            },

            options: [
                {
                    "title": "Call Driver",
                    "image": require('../../../assets/img/call.png'),
                },
                {
                    "title": "Support",
                    "image": require('../../../assets/img/support.png'),
                },
                {
                    "title": "Share",
                    "image": require('../../../assets/img/share.png'),
                },
                {
                    "title": "Rate",
                    "image": require('../../../assets/img/rate.png'),
                }
            ],

            isModalVisibleContact: false,

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

            dropAddress: "",
            dropHouseNumber: null,
            dropLandmark: null,
            dropContactName: null,
            dropContactNumber: null,
            dropLat: null,
            dropLng: null,
            drop_location: null,

            vehicleId: null,
            amount: null,
            tax: null,
            totalAmount: null,
            vehicleName: null,
            vehicleImage: null,
            distance: null,
            time: null,

            paymentMethod: null,
            orderId: null,


            listItem: [],
            //marker: null,

        };

        this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
        this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    }

    // async componentWillUpdate() {
    //     var url = Config.baseUrl + Config.orderdetails;
    //     var reqJson = {
    //         userid: await AsyncStorage.getItem('@userid'),
    //         orderid: this.props.navigation.state.params.orderId
    //     };

    //     apiService.executeFormApi(
    //         url,
    //         "POST",
    //         JSON.stringify(reqJson),
    //         async (error, response) => {

    //             if (error !== "") {
    //                 this.setState({ isLoading: false });
    //                 viewUtils.showToast(error);
    //             }

    //             if (response !== null && response !== "") {
    //                 console.log('track==>',response)
    //                 this.setState({ isLoading: false });
    //                 if (response.status == "true") {
    //                     //console.log(response.data)
    //                     this.setState({
    //                         listItem: response.data,
    //                         date: response.data.order_place_date.split(' ')[0].trim(),
    //                         time: response.data.order_place_date.split(' ')[1].trim() + ' ' +response.data.order_place_date.split(' ')[2].trim(),
    //                         pickupLocation: response.data.pic_up_location,
    //                         dropLocation: response.data.drop_location
    //                         //pickup: response.data.pic_up_location.split(",").trim()
    //                     });

    //                 } else {
    //                     viewUtils.showToast(response.message.trim());
    //                 }
    //             }
    //         });
    // }

    async componentDidMount() {
        //alert(this.props.navigation.state.params.orderId)

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
                    console.log('track==>', response)
                    this.setState({ isLoading: false });
                    if (response.status == "true") {
                        //console.log(response.data)
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
            pickup_location: this.props.navigation.state.params.pickup_location,

            dropAddress: this.props.navigation.state.params.dropAddress,
            dropHouseNumber: this.props.navigation.state.params.dropHouseNumber,
            dropLandmark: this.props.navigation.state.params.dropLandmark,
            dropContactName: this.props.navigation.state.params.dropContactName,
            dropContactNumber: this.props.navigation.state.params.dropContactNumber,
            dropLat: this.props.navigation.state.params.dropLat,
            dropLng: this.props.navigation.state.params.dropLng,
            drop_location: this.props.navigation.state.params.drop_location,

            coordinates: [
                {
                    latitude: this.props.navigation.state.params.pickupLat,
                    longitude: this.props.navigation.state.params.pickupLng,
                },
                {
                    latitude: this.props.navigation.state.params.dropLat,
                    longitude: this.props.navigation.state.params.dropLng,
                }
            ],

            // marker: {
            //     latitude: this.props.navigation.state.params.pickupLat,
            //     longitude: this.props.navigation.state.params.pickupLng,
            // },
            region: {
                latitude: this.props.navigation.state.params.pickupLat,
                longitude: this.props.navigation.state.params.pickupLng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },

            vehicleId: this.props.navigation.state.params.vehicleId,
            amount: this.props.navigation.state.params.amount,
            tax: this.props.navigation.state.params.tax,
            totalAmount: this.props.navigation.state.params.totalAmount,
            vehicleName: this.props.navigation.state.params.vehicleName,
            vehicleImage: this.props.navigation.state.params.vehicleImage,
            distance: this.props.navigation.state.params.distance,
            time: this.props.navigation.state.params.time,

            paymentMethod: this.props.navigation.state.params.paymentMethod,
            orderId: this.props.navigation.state.params.orderId,
        })

        // this.setState({ isLoading: true }, async () => {
        // })

        setInterval(() => {
            db.ref(`/drivers/${this.state.listItem.driver_id}`).on('value', (snapshot) => {
                // let latitude = snapshot.child('latitude').val();
                // console.log('data----->',latitude)
                // let longitude = snapshot.child('longitude').val();
                // console.log('data----->',longitude)
                {
                    snapshot.child('latitude').val() !== null &&
                        this.setState({
                            marker: {
                                latitude: snapshot.child('latitude').val(),
                                longitude: snapshot.child('longitude').val()
                            }
                        })
                }
                console.log('marker-->', this.state.marker)
            });
        }, 5000);
    }

    UpdateRating(key) {
        this.setState({ Default_Rating: key });
    }


    onRegionChange = region => {
        //this.setState({ region })

        // var location = {
        //     lat: region.latitude,
        //     lng: region.longitude,
        // };

        // Geocoder.geocodePosition(location).then(res => {
        //     var loc = (res[0].subLocality == null) ? res[0].formattedAddress : res[0].subLocality;
        //     this.setState({ locationName: loc })
        // })
        // .catch(err => console.warn(err))

        //setTimeout(() => { this.setState({ pulse: 1 }) }, 1000)
    }

    _navigate = index => {
        //alert(this.state.orderId)
        if (index == 0) {
            this.call()
        }
        if (index == 1) {
            this.props.navigation.navigate('Disputedetail')
        }
        if (index == 2) {
        }
        if (index == 3) {
            this.props.navigation.navigate('DetailsTrack', {
                visible: true,
                orderId: this.state.orderId,
            })
        }


    }

    call = () => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            // phoneNumber = 'tel:${8000983424}';
            phoneNumber = `tel:${this.state.listItem.driver_number}`;
        }
        else {
            //phoneNumber = 'telprompt:${8000983424}';
            phoneNumber = `telprompt:${this.state.listItem.driver_number}`;
        }
        Linking.openURL(phoneNumber);

        // RNImmediatePhoneCall.immediatePhoneCall('8000983424');
    }

    renderItem({ item, index }) {
        const lengthArray = this.state.options.length;
        return (
            <TouchableHighlight onPress={() => this._navigate(index)} underlayColor="transparent">
                <View style={lengthArray - 1 == index ? [styles.buttonBox, { borderRightWidth: 0 }] : styles.buttonBox}>
                    <Image source={item.image} style={item.title == 'Support' ? { width: width * 0.045, height: width * 0.045, resizeMode: 'contain' } : styles.buttonImage} />
                    <Text style={styles.btnTitle}>{item.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        const vehicle_number = this.state.listItem.driver_vehicle_number
        const { region, pulse, locationName } = this.state
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
                            i <= this.state.Default_Rating
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }

        const mapPadding = {
            right: (width / 5),
            bottom: (height / 23),
            left: (width / 5),
            top: (height / 15)
        };


        return (
            <View style={styles.container}>
                <GeneralStatusBar backgroundColor={Color.white} barStyle="dark-content" />
                <Spinner visible={this.state.isLoading} textContent={''} />

                <Header
                    onMenu={() => this.props.navigation.toggleDrawer()}
                    onNotification={() => this.props.navigation.navigate('Notification')}
                />
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Your Parcel Track</Text>

                    <View style={[styles.locationNav]}>
                        <View style={styles.timeline}>
                            <View style={styles.line}>
                                <View style={[styles.topLine, styles.hiddenLine]} />
                                <View style={styles.bottomLine} />
                            </View>
                            <View style={[styles.dot, { backgroundColor: Color.green }]} />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.locationTitle}>{this.state.listItem.pic_up_location} </Text>
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
                            <Text style={styles.locationTitle}>{this.state.listItem.drop_location} </Text>
                        </View>
                    </View>

                </View>

                <View style={styles.mapContainer}>
                    <MapView

                        style={styles.map}
                        initialRegion={region}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={RetroMapStyles}
                        ref={c => this.mapView = c}
                        //showsUserLocation={true}
                        zoomEnabled={true}
                        onRegionChangeComplete={this.onRegionChange}
                        showsIndoorLevelPicker={true}
                        onRegionChange={() => this.setState({ pulse: 0 })}
                        followsUserLocation={true}
                        mapPadding={{ bottom: 15 }}
                    >
                        {/* <Marker
                            coordinate={this.state.marker}
                            ref={ref => { this.marker2 = ref; }}
                        >
                            <Image source={require('../../../assets/img/scooter.png')} style={{ width: width * 0.042, height: width * 0.065, resizeMode: 'stretch' }} />
                        </Marker> */}

                        <MapView.Marker
                            coordinate={this.state.marker}
                            zIndex={9}
                            anchor={{ x: 0.6, y: 1 }}
                            image={require('../../../assets/img/scooter.png')}
                        >
                        </MapView.Marker>

                        {this.state.coordinates.map((coordinate, index) =>
                            <MapView.Marker coordinate={coordinate}
                                tracksViewChanges={false}>
                                <Icon
                                    key={`coordinate_${index}`}
                                    name='map-marker'
                                    style={{ zIndex: 9, fontSize: width * 0.09, color: index == 0 ? Color.green : Color.red }}
                                />
                                {/* <Image
                            key={`coordinate_${index}`}
                            zIndex={1}
                            source={index == 0 ? require('../../../assets/img/pin_pick.png') : require('../../../assets/img/pin_drop.png')}
                            style={{ width: width * 0.04, height: width * 0.055, resizeMode: 'contain' }}
                            /> */}
                            </MapView.Marker>
                        )}

                        {/* {(this.state.coordinates.length >= 2) && (
                            <MapViewDirections
                                origin={this.state.coordinates[0]}
                                waypoints={this.state.coordinates.slice(1, -1)}
                                destination={this.state.coordinates[this.state.coordinates.length - 1]}
                                apikey={GOOGLE_MAPS_APIKEY}
                                strokeWidth={4}
                                strokeColor={Color.dark_blue}
                                optimizeWaypoints={true}
                                onStart={(params) => {
                                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                                }}
                                // center={this.state.coordinates[0]}
                                onReady={result => {
                                    console.log(`Distance: ${result.distance} km`)
                                    console.log(`Duration: ${result.duration} min.`)
                                    this.setState({ allCoordinates: result.coordinates })
                                    // this.mapView.fitToCoordinates(result.coordinates, {
                                    //     edgePadding: {
                                    //         right: (width / 5),
                                    //         bottom: (height),
                                    //         left: (width / 5),
                                    //         top: (height / 15),
                                    //     }
                                    // });
                                }}
                                onError={(errorMessage) => {
                                    // console.log('GOT AN ERROR');
                                }}
                            />
                        )} */}

                    </MapView>
                </View>

                <View style={styles.bottomContainerInfo}>
                    <View style={styles.navigationRoot}>
                        <View style={styles.navigation}>
                        <View style={styles.left}>

                                <View style={styles.imageContainer}>
                                    <Image source={require('../../../assets/img/user.png')} style={styles.userImage} />
                                </View>
                                <View style={styles.leftNav}>
                                    <Text style={styles.name}>{this.state.listItem.driver_name}</Text>
                                    <View style={styles.childView}>
                                        <Image source={{ uri: this.Star }} style={styles.starGiven} />
                                        <Text style={styles.starTitle}>{this.state.listItem.driver_rating}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.number}>{this.state.listItem.driver_vehicle_number ? this.state.listItem.driver_vehicle_number.toString().substr(0, 6).toUpperCase() : ''}{'\n'}<Text style={{ fontWeight: 'bold', fontSize: width * 0.05 }}>{vehicle_number ? vehicle_number.toString().substr(6, vehicle_number.length) : ''}</Text></Text>
                                <Image source={require('../../../assets/img/track_activa.png')} style={styles.trackIcon} />
                            </View>
                        </View>

                        <View style={{...styles.left,paddingVertical: 0, paddingBottom:width * 0.01, marginTop: -width * 0.02}}>
                            <View style={{...styles.imageContainer,height:0}}></View>
                            <View style={{...styles.leftNav,paddingTop:0}}>
                                <Text style={styles.number}>ETA <Text style={{ fontWeight: 'bold', fontSize: width * 0.03 }}>{this.state.listItem.timeto_destination}</Text></Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.navigationBtn}>
                        <FlatList
                            refreshing={true}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.options}
                            extraData={this.state}
                            numColumns={4}
                            renderItem={this.renderItem.bind(this)}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.bottomContainer} onPress={() => this.setState({ isModalVisibleContact: true })}>
                    <Text style={{ fontFamily: Font.semi_bold, fontSize: width * 0.05 }}>Total Fare
                    <Text style={{ color: Color.dark_blue }}> ₹ {this.state.totalAmount}</Text></Text>
                    <Text style={{ fontFamily: Font.semi_bold, fontSize: width * 0.027, lineHeight: height * 0.017 }}>Pay by {this.state.paymentMethod}</Text>
                </TouchableOpacity>

                <Modal
                    isVisible={this.state.isModalVisibleContact}
                    style={styles.footerModal}
                    onBackdropPress={() => this.setState({ isModalVisibleContact: false })}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.invoiceTitle}>Total Fare<Text style={{ color: Color.dark_blue }}> ₹ {this.state.totalAmount}</Text></Text>
                        <Text style={{ fontFamily: Font.semi_bold, fontSize: width * 0.027, marginBottom: width * 0.03 }}>{this.state.paymentMethod} </Text>

                        <View style={[styles.invoiceNavigation]}>
                            <View style={styles.leftNavigation}>
                                <Text style={styles.subTitleInv}>Basic Fare</Text>
                            </View>
                            <View style={styles.rightNavigation}>
                                <Text style={styles.subTitleInv}>₹ {this.state.amount}</Text>
                            </View>
                        </View>

                        <View style={[styles.invoiceNavigation]}>
                            <View style={styles.leftNavigation}>
                                <Text style={styles.subTitleInv}>Tax 1 <Text style={{ fontSize: width * 0.03 }}>(18%)</Text></Text>
                            </View>
                            <View style={styles.rightNavigation}>
                                <Text style={styles.subTitleInv}>₹ {this.state.tax}</Text>
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
                                <Text style={[styles.subTitleInv, { color: Color.dark_blue, fontFamily: Font.bold }]}>Total Fare</Text>
                            </View>
                            <View style={styles.rightNavigation}>
                                <Text style={[styles.subTitleInv, { color: Color.dark_blue, fontFamily: Font.bold }]}>₹ {this.state.totalAmount}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View >
        );
    }
}

