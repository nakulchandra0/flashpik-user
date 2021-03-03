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
    TouchableWithoutFeedback,
    ImageBackground,
    TextInput,
    ScrollView,
    TouchableOpacity,
    FlatList,
    BackHandler,
    PermissionsAndroid,
    Keyboard
} from 'react-native';

import MapView, {
    Marker,
    Callout,
    CalloutSubview,
    ProviderPropType, PROVIDER_GOOGLE
} from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import { Button, Input } from 'react-native-elements';
import marker from '../../../assets/img/pin_pick.png';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Contacts from 'react-native-contacts';
import Modal from "react-native-modal";
import Permissions from 'react-native-permissions';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import RetroMapStyles from '../../component/RetroMapStyles.json';
import CustomCallout from '../../component/callout';
import Color from '../../component/color';
import Font from '../../component/font';
import Header from '../../component/header';
import styles from './styles';
import ApiService from "../../config/ApiService";
import Utility from "../../config/utility";
import { add } from 'react-native-reanimated';

var { width, height } = Dimensions.get('window');

/* map lat long */
const ASPECT_RATIO = width / height;
const LATITUDE = 23.026157;
const LONGITUDE = 72.597413;
const LATITUDE_DELTA = 0.0015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class Pickup extends React.PureComponent {
    constructor(props) {
        super(props);
        apiService = new ApiService();
        viewUtils = new Utility();
        this.state = {
            isModalVisible: false,
            isLoading: false,
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
                // latitude: 23.026157,
                // longitude: 72.597413,
                // latitudeDelta: LATITUDE_DELTA,
                // longitudeDelta: LONGITUDE_DELTA
            },
            marker: {
                latitude: LATITUDE,
                longitude: LONGITUDE
            },
            locationName: "",

            serviceId: null,
            serviceName: null,
            quantity: null,
            description: null,

            address: "",
            houseNumber: null,
            landmark: null,
            contactName: null,
            contactNumber: null,

            fetchedContacts: [],
            oldContacts: [],

            addressError: null,
        }
    }

    componentDidMount() {

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

        this.setState({
            serviceId: this.props.navigation.state.params.serviceId,
            serviceName: this.props.navigation.state.params.serviceName,
            quantity: this.props.navigation.state.params.quantity,
            description: this.props.navigation.state.params.description,
        })

        Geolocation.getCurrentPosition(
            position => {
                //alert(position)
                console.log('position', position)
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }
                });
                var location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                Geocoder.geocodePosition(location).then(res => {
                    // console.log('location name', res)
                    this.setState({
                        locationName: res[0].formattedAddress,
                        //address: res[0].formattedAddress,
                    })
                    //this.placesRef && this.placesRef.setAddressText(res[0].formattedAddress)
                })
                    .catch(err => console.warn(err))

                this.setState({
                    marker: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                })
            },
            (error) => viewUtils.showToast(error.message),
            { enableHighAccuracy: true },
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    addMarker(coordinates) {
        // Remove the following line after testing, its just to show coordinates as a warning in console.
        console.warn('coordinate', coordinates);
        this.setState({
            marker: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
            },
            region: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        })
        var location = {
            lat: coordinates.latitude,
            lng: coordinates.longitude,
        };

        Geocoder.geocodePosition(location).then(res => {
            console.log('location name', res)
            this.setState({
                locationName: res[0].formattedAddress,
                address: res[0].formattedAddress,
            })
            this.placesRef && this.placesRef.setAddressText(res[0].formattedAddress)
        })
            .catch(err => console.warn(err))

    }

    // pickLocationHandler = event => {
    //     const coords = event.coords;
    //     this.map.animateToRegion({
    //         ...this.state.region,
    //         latitude: coords.latitude,
    //         longitude: coords.longitude
    //     });
    // };

    // onRegionChange = region => {
    //     //alert(JSON.stringify(region))
    //     this.setState({
    //         region
    //     })

    //     var location = {
    //         lat: region.latitude,
    //         lng: region.longitude,
    //     };

    //     Geocoder.geocodePosition(location).then(res => {
    //         var loc = res[0].formattedAddress;
    //         this.setState({ locationName: loc })
    //     })
    //         .catch(err => console.warn(err))

    //     //setTimeout(() => { this.setState({ pulse: 1 }) }, 1000)
    // }

    _navigate = () => {
        // if (this.state.contactNumber !== null) {
        //     length = this.state.contactNumber.length
        // }

        const { houseNumber, address, landmark, contactName, contactNumber } = this.state;
        !houseNumber ? this.setState({ houseNumberError: "House Number required" }) : "";
        address == "" ? this.setState({ addressError: "Address required" }) : "";
        !landmark ? this.setState({ landmarkError: "Landmark required" }) : "";
        !contactName ? this.setState({ contactNameError: "Contact Name required" }) : "";
        !contactNumber ? this.setState({ contactNumberError: "Contact Number required" }) : this.setState({ contactNumberError: null });
        // contactNumber ? length > 10 ? this.setState({ contactNumberError: "Only 10 digit allowed " }) : "" : "";
        // contactNumber ? length < 10 ? this.setState({ contactNumberError: "Only 10 digit required " }) : "" : "";

        if (houseNumber && address && landmark && contactNumber && contactName) {
            this.props.navigation.navigate('Drop', {
                serviceId: this.state.serviceId,
                serviceName: this.state.serviceName,
                quantity: this.state.quantity,
                description: this.state.description,
                houseNumber: this.state.houseNumber,
                address: this.state.address,
                landmark: this.state.landmark,
                contactName: this.state.contactName,
                contactNumber: this.state.contactNumber,
                pickupLat: this.state.marker.latitude,
                pickupLng: this.state.marker.longitude,
            });
            // this.setState({
            //     serviceId: null,
            //     serviceName: null,
            //     quantity: null,
            //     description: null,
            //     houseNumber: null,
            //     address: null,
            //     landmark: null,
            //     contactName: null,
            //     contactNumber: null,
            //     pickupLat: null,
            //     pickupLng: null,
            // })
        }
    }

    getContact = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: "Cool Photo App READ_CONTACTS Permission",
                    message:
                        "Cool Photo App needs access to your CONTACTS " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the CONTACTS");

                this.setState({ isLoading: true }, async () => {
                    Contacts.getAll((err, contacts) => {
                        if (err) throw err;
                        const contactNumber = contacts.filter((number) => {
                            if (number.phoneNumbers.length != 0) {
                                var n_number = Object.assign({}, number);
                                n_number.isSelected = false;
                                n_number.image = "";
                                return n_number;
                            }
                        });
                        //alert(JSON.stringify(contactNumber)); return;
                        contactNumber.sort(function (a, b) {
                            var AfamilyName = a.givenName == "" ? "" : a.givenName;
                            var BfamilyName = b.givenName == "" ? "" : b.givenName;
                            if (AfamilyName.toLowerCase() < BfamilyName.toLowerCase()) { return -1; }
                            if (AfamilyName.toLowerCase() > BfamilyName.toLowerCase()) { return 1; }
                            return 0;
                        });
                        // console.log(contactNumber);
                        this.setState({ isLoading: false, fetchedContacts: contactNumber, oldContacts: contactNumber, isModalVisible: true });
                    })
                });
            } else {
                console.log("READ_CONTACTS permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    searchContacts = (text) => {
        text = text.toLowerCase();
        const { fetchedContacts, oldContacts } = this.state;

        //let contactsOld = contactsListOld;
        //let groupsOld = groupsListOld;
        let contactListFilter = oldContacts.filter((item) => {
            var familyName = item.familyName != null ? item.familyName : "";
            if (item.givenName.toLowerCase().match(text) || familyName.toLowerCase().match(text)) {
                return item;
            }
        })

        if (!text || text === '') {
            this.setState({
                fetchedContacts: oldContacts
            });
        } else if (!Array.isArray(contactListFilter) && !contactListFilter.length) {
            this.setState({
                fetchedContacts: []
            });
        } else if (Array.isArray(contactListFilter)) {
            this.setState({
                fetchedContacts: contactListFilter
            });
        }
    }

    renderItem({ item, index }) {
        const lengthArray = this.state.fetchedContacts.length;
        const { contacts } = this.state;
        return (
            <TouchableOpacity onPress={() => this.setState({ contactNumber: item.phoneNumbers[0].number, isModalVisible: false })} >
                <View style={styles.contactsItemContainer}>
                    <View style={styles.contactsAvatarCont}>
                        <Text style={styles.fontReg}>{item.givenName.substring(0, 1)}{item.middleName.substring(0, 1)}</Text>
                    </View>
                    <View style={styles.notificationTextView} >
                        <Text style={styles.contactName}>{item.givenName} {item.middleName} {item.familyName}</Text>
                        <Text style={styles.number}> {item.phoneNumbers[0].number} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    onContactChangeText(value) {

        const re = /^[0-9+\b]+$/;
        if (value != "" && !re.test(value)) return false;

        if (value.split("+").length - 1 > 1) return false;

        this.setState({ contactNumber: value })

    }

    render() {
        const { region, pulse, locationName, address } = this.state

        return (
            <View style={styles.container}>
                <GeneralStatusBar backgroundColor={Color.transparent} barStyle="light-content" />
                <Spinner visible={this.state.isLoading} textContent={''} />
                <Header
                    onMenu={() => this.props.navigation.toggleDrawer()}
                    onNotification={() => this.props.navigation.navigate('Notification')}
                />

                <Text style={styles.title}>Pick up Location</Text>
                {/* <View style={styles.mapContainer}>

                    <MapView
                        style={styles.map}
                        region={region}
                        //onRegionChangeComplete={this.onRegionChange}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={RetroMapStyles}
                        minZoomLevel={8}
                        zoomEnabled={true}
                        showsIndoorLevelPicker={true}
                        //onRegionChange={() => this.setState({ pulse: 0 })}
                        //ref={ref => this.mapView = ref}
                        followsUserLocation={true}
                        onPress={(e) => this.addMarker(e.nativeEvent.coordinate)}
                    >
                        <Marker
                            coordinate={this.state.marker}
                            calloutOffset={{ x: -8, y: 28 }}
                            calloutAnchor={{ x: 0.5, y: 0.4 }}
                            ref={ref => { this.marker2 = ref; }}
                            tracksViewChanges={false}
                        >
                            <Image source={require('../../../assets/img/pin_pick.png')} style={{ width: width * 0.065, height: width * 0.09 }} />
                            <Callout
                                tooltip
                                style={styles.customView}
                            >
                                <CustomCallout>
                                    <Text style={styles.toolAddress}>
                                        {this.state.locationName.length > 18 ? this.state.locationName.substring(0, 17) + '...' : this.state.locationName}
                                    </Text>
                                </CustomCallout>
                            </Callout>

                        </Marker>
                    </MapView>
                </View> */}

                <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'} >
                    <View>
                        {/* <View style={styles.inputContainer}> */}



                        <View style={styles.mapContainer}>

                            <MapView
                                style={styles.map}
                                region={region}
                                //onRegionChangeComplete={this.onRegionChange}
                                provider={PROVIDER_GOOGLE}
                                customMapStyle={RetroMapStyles}
                                minZoomLevel={8}
                                zoomEnabled={true}
                                showsIndoorLevelPicker={true}
                                //onRegionChange={() => this.setState({ pulse: 0 })}
                                //ref={ref => this.mapView = ref}
                                followsUserLocation={true}
                                onPress={(e) => this.addMarker(e.nativeEvent.coordinate)}
                            >
                                <Marker
                                    coordinate={this.state.marker}
                                    calloutOffset={{ x: -8, y: 28 }}
                                    calloutAnchor={{ x: 0.5, y: 0.4 }}
                                    ref={ref => { this.marker2 = ref; }}
                                    tracksViewChanges={false}
                                >
                                    <Image source={require('../../../assets/img/pin_pick.png')} style={{ width: width * 0.065, height: width * 0.09 }} />
                                    <Callout
                                        tooltip
                                        style={styles.customView}
                                    >
                                        <CustomCallout>
                                            <Text style={styles.toolAddress}>
                                                {this.state.locationName.length > 18 ? this.state.locationName.substring(0, 17) + '...' : this.state.locationName}
                                            </Text>
                                        </CustomCallout>
                                    </Callout>

                                </Marker>
                            </MapView>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.label}>House No. / Flat No.</Text>
                            <TextInput
                                style={styles.textBox}
                                autoCapitalize="none"
                                placeholder="Enter House No. / Flat No."
                                keyboardType="default"
                                placeholderTextColor={Color.black}
                                value={this.state.houseNumber}
                                onChangeText={(value) => this.setState({ houseNumber: value })}
                                ref={input => { this.houseNumber = input }}
                                onFocus={() => this.setState({ houseNumberError: null })}
                            />
                            {this.state.houseNumberError &&
                                <Text style={styles.error}>{this.state.houseNumberError}</Text>
                            }
                        </View>

                        <View style={this.state.addressError != null ? [styles.textContainer, { height: 90 }] : [styles.textContainer, { height: 70 }]}>
                            <Text style={styles.label}>Address</Text>
                            <GooglePlacesAutocomplete
                                placeholder='Enter Address'
                                placeholderTextColor={Color.black}
                                minLength={3} // minimum length of text to search
                                autoFocus={false}
                                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                                listViewDisplayed='false'    // true/false/undefined
                                fetchDetails={true}
                                renderDescription={row => row.description} // custom description render
                                ref={ref => { this.placesRef = ref }}
                                onPress={(data, details = null) => {
                                    // 'details' is provided when fetchDetails = true     
                                    this.setState({
                                        marker: {
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                        },
                                        locationName: details.formatted_address,
                                        region: {
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                            latitudeDelta: LATITUDE_DELTA,
                                            longitudeDelta: LONGITUDE_DELTA
                                        },
                                        address: details.formatted_address,
                                        addressError: null,
                                    });
                                }}
                                getDefaultValue={() => this.state.address}
                                onSubmitEditing={() =>
                                    this.setState({
                                        listViewDisplayed: false,
                                    })}
                                query={{
                                    //available options: https://developers.google.com/places/web-service/autocomplete
                                    key: 'AIzaSyDi5VGZuYU7nnEX6WYj1DrAJygtagR3i2M',
                                    language: 'en', // language of the results
                                    types: ['(address)'], // default: 'geocode'
                                }}

                                styles={{
                                    container: {
                                        flexDirection: 'column-reverse',
                                    },
                                    textInput: {
                                        width: '100%',
                                        padding: 0,
                                        paddingBottom: 5,
                                        borderBottomColor: Color.dark_blue,
                                        borderBottomWidth: 1.5,
                                        fontFamily: Font.regular,
                                        fontSize: height * 0.02,
                                        paddingTop: 6,
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                    },
                                    textInputContainer: {
                                        backgroundColor: Color.white,
                                        borderTopColor: Color.white,
                                        borderBottomColor: Color.white,
                                        height: 30,
                                        fontFamily: Font.regular,
                                        fontSize: height * 0.02,
                                        flexDirection: 'row',
                                    },
                                    description: {
                                        fontWeight: 'bold'
                                    },

                                    predefinedPlacesDescription: {
                                        color: Color.dark_blue
                                    },

                                    poweredContainer: {
                                        display: 'none'
                                    },

                                    listView: {
                                        backgroundColor: '#F3F3F3',
                                        zIndex: 1,
                                        position: 'absolute',
                                        bottom: 35,
                                        width: '100%',
                                        // overflow: 'hidden'
                                    },
                                }}
                                debounce={300} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                            />

                            {this.state.addressError != null ?
                                <Text style={[styles.error, { paddingBottom: 20, paddingTop: 6 }]}>{this.state.addressError}</Text> : <Text></Text>
                            }
                        </View>
                        <View style={[styles.textContainer, { marginTop: -10 }]}>
                            <Text style={styles.label}>Landmark</Text>
                            <TextInput
                                style={styles.textBox}
                                autoCapitalize="none"
                                placeholder="Enter Landmark"
                                keyboardType="default"
                                placeholderTextColor={Color.black}
                                value={this.state.landmark}
                                onChangeText={(value) => this.setState({ landmark: value })}
                                ref={input => { this.landmark = input }}
                                onFocus={() => this.setState({ landmarkError: null })}
                            />
                            {this.state.landmarkError &&
                                <Text style={styles.error}>{this.state.landmarkError}</Text>
                            }
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.label}>Contact Name</Text>
                            <TextInput
                                style={styles.textBox}
                                autoCapitalize="none"
                                placeholder="Enter Contact Name"
                                keyboardType="default"
                                placeholderTextColor={Color.black}
                                value={this.state.contactName}
                                onChangeText={(value) => this.setState({ contactName: value })}
                                ref={input => { this.contactName = input }}
                                onFocus={() => this.setState({ contactNameError: null })}
                            />
                            {this.state.contactNameError &&
                                <Text style={styles.error}>{this.state.contactNameError}</Text>
                            }
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.label}>Contact Number</Text>
                            <View style={[styles.textContainerImage]}>
                                <TextInput
                                    style={[styles.textBox, { flex: 1 }]}
                                    placeholder="Enter Contact Number"
                                    underlineColorAndroid="transparent"
                                    keyboardType="phone-pad"
                                    placeholderTextColor={Color.black}
                                    value={this.state.contactNumber}
                                    // onChangeText={(value) => this.setState({ contactNumber: value })}
                                    onChangeText={(value) => this.onContactChangeText(value)}
                                    ref={input => { this.contactNumber = input }}
                                    onFocus={() => this.setState({ contactNumberError: null })}
                                />
                                <TouchableHighlight underlayColor="transparent" onPress={() => this.getContact()} style={styles.contactImage}>
                                    <Image source={require('../../../assets/img/contact_book.png')} style={styles.contact} />
                                </TouchableHighlight>
                            </View>
                            {this.state.contactNumberError &&
                                <Text style={styles.error}>{this.state.contactNumberError}</Text>
                            }

                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Save & Continue"
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.button}
                                onPress={() => this._navigate()}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>

                <Modal
                    isVisible={this.state.isModalVisible}
                    style={[styles.footerModal, { bottom: this.state.keyboardSpace ? this.state.keyboardSpace : 0 }]}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                >
                    <View style={styles.contactContent}>
                        <View style={styles.popupHeader}>
                            {/* <TouchableOpacity style={styles.buttonPopupHeader} onPress={() => this.setState({ isModalVisible: false })}>
                                <Image style={styles.popupIconClose} source={require("../../../assets/img/icon_close.png")} />
                            </TouchableOpacity> */}
                            <Text style={styles.modalHeader}> Select Contact</Text>

                            <View style={styles.searchContainer}>
                                <View style={styles.searchIconContainer}>
                                    <Icon name='search' style={styles.searchIcon} />
                                </View>
                                <TextInput
                                    onChangeText={this.searchContacts}
                                    value={this.state.searchValue}
                                    underlineColorAndroid="transparent"
                                    autoCorrect={false}
                                    placeholder="Search..."
                                    style={styles.searchBox}
                                />
                            </View>
                        </View>
                        <FlatList
                            refreshing={true}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.fetchedContacts}
                            extraData={this.state}
                            numColumns={1}
                            renderItem={this.renderItem.bind(this)}
                            scrollEnabled={true}
                            style={styles.flatlist}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={'always'}
                        />
                    </View>
                </Modal>

            </View>
        );
    }
}



