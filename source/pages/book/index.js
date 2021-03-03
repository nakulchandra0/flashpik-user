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
  KeyboardAvoidingView,
  Keyboard,
  BackHandler,
  PermissionsAndroid
} from 'react-native';

import MapView, {
  Marker,
  Callout,
  CalloutSubview,
  ProviderPropType,
  PROVIDER_GOOGLE,
  Polyline
} from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import marker from '../../../assets/img/pin_pick.png';
import markerDrop from '../../../assets/img/pin_drop.png';
import { Button, Input, CheckBox } from 'react-native-elements';
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import Contacts from 'react-native-contacts';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import RetroMapStyles from '../../component/RetroMapStyles.json';
import CustomCallout from '../../component/callout';
import Color from '../../component/color';
import Font from '../../component/font';
import Header from '../../component/goBack';
import styles from './styles';
import Config from '../../config/config';
import ApiService from "../../config/ApiService";
import Utility from "../../config/utility";
// import { db } from '../../config/db';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyDi5VGZuYU7nnEX6WYj1DrAJygtagR3i2M';
// let itemRef = db.ref('/drivers');

class Book extends React.Component {
  constructor(props) {
    super(props);
    apiService = new ApiService();
    viewUtils = new Utility();
    this.state = {
      instruction: [
        { "title": "Fare includes 10 mins free loading & unloading time." },
        { "title": "₹ 2.0/min for additional loading/unloading time." },
        { "title": "Fare may change if route or location changes." },
        { "title": "Fare includes toll charges, if any." },
        { "title": "Parking charges will be paid by customer." },
        { "title": "We don't allow overloading." },
        { "title": "General Provision affiliates is subject to Ahmedabad Jrusdiction only." },
      ],
      
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

      coordinates: [
        {
          latitude: null, 
          longitude: null,
        },
        {
          latitude: null, 
          longitude: null
        },
      ],

      markers: [
        {
          coordinates: {
            latitude: 22.996531,
            longitude: 72.505525
          },
        },
        {
          coordinates: {
            latitude: 23.002976,
            longitude: 72.500915
          },
        },
        {
          coordinates: {
            latitude: 23.000664,
            longitude: 72.499790
          },
        },
        {
          coordinates: {
            latitude: 23.000703,
            longitude: 72.495447
          },
        }
      ],

      enable: false,

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

      dropAddress: "",
      dropHouseNumber: null,
      dropLandmark: null,
      dropContactName: null,
      dropContactNumber: null,
      dropLat: null,
      dropLng: null,

      isModalVisible: false,
      isLoading: false,

      listItem: [],
      fetchedContacts: [],
      oldContacts: [],
      latLong: [],
      latLongResponce: [],

      vehicleId: null,
      amount: null,
      vehicleName: null,
      vehicleImage: null,
      distance: null,
      time: null,
      // pickLocation: "46, Angle Arcade, Coraporate Road",
      // dropLocation: "46, ABC Tower, Gurukul Road",
      selectedVehicle: "Activa",
      isModalVisibleInfo: false,
      isModalVisibleContact: false,
      keyboardSpace: '',

      infoId: null,
      infoVehicleName: null,
      infoVehicleImg: null,
      infoCapacity: null,

    };

    this.mapView = null;

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

  async componentDidMount() {
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
      dropAddress: this.props.navigation.state.params.dropAddress,
      dropHouseNumber: this.props.navigation.state.params.dropHouseNumber,
      dropLandmark: this.props.navigation.state.params.dropLandmark,
      dropContactName: this.props.navigation.state.params.dropContactName,
      dropContactNumber: this.props.navigation.state.params.dropContactNumber,
      dropLat: this.props.navigation.state.params.dropLat,
      dropLng: this.props.navigation.state.params.dropLng,

      region: {
        latitude: this.props.navigation.state.params.pickupLat,
        longitude: this.props.navigation.state.params.pickupLng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

    })

    this.setState({ isLoading: true }, async () => {
      var url = Config.baseUrl + Config.vehicalList;
      var reqJson = {
        userid: await AsyncStorage.getItem('@userid'),
        serviceid: this.state.serviceId,
        pickup_lat: this.state.pickupLat,
        pickup_long: this.state.pickupLng,
        drop_lat: this.state.dropLat,
        drop_long: this.state.dropLng,
      };
      
      console.log('req ===>',reqJson)
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
              this.setState({ listItem: response.data });
              console.log(response)
              // alert(response);
            } else {
              viewUtils.showToast(response.message.trim());
            }
          }
        });
    })
  
    this.setState({ isLoading: true }, async () => {
      var url = Config.baseUrl + Config.nearbydriver;
      var reqJson = {
        userid: await AsyncStorage.getItem('@userid'),
        pickup_lat: this.state.pickupLat,
        pickup_long: this.state.pickupLng,
      };
      //console.log(reqJson)
      apiService.executeFormApi(
        url,
        "POST",
        JSON.stringify(reqJson),
        async (error, response) => {

          if (error !== "") {
            // this.setState({ isLoading: false });
            viewUtils.showToast(error);
          }

          if (response !== null && response !== "") {
            // this.setState({ isLoading: false });
            if (response.status == "true") {

              this.setState({latLongResponce: response.data})
              console.log('latLong=====>',this.state.latLongResponce)
            } else {
              viewUtils.showToast(response.message.trim());
            }
          }
        });
      })
    
  }

  renderItemInstruction({ item, index }) {
    const lengthArray = this.state.instruction.length;
    return (
      <View style={styles.instructionBox}>
        <View style={{ flex: 0.04, justifyContent:'center' }}>
          <View style={styles.instructionDot} />
        </View>
      <View style={{ flex: 1,  justifyContent: 'center' }}>
          <Text style={styles.instructionTitle}>{item.title}</Text>
        </View>
      </View>
    );
  }

  renderItem({ item, index }) {
    const lengthArray = this.state.listItem.length;
    return (
      <View style={styles.bookChoiceBox}>
        <Text style={[styles.bookChoiceTitle, { color: this.state.vehicleId == item.id ? Color.dark_blue : Color.black }, { fontFamily: this.state.vehicleId == item.id ? Font.bold : Font.regular }]}>{item.vehicle_name}</Text>
        <TouchableHighlight style={this.state.vehicleId == item.id ? styles.selectedBookChoiceContainer : styles.bookChoiceContainer} underlayColor="transparent" onPress={() => this._selectChoice(item.id, item.amount, item.vehicle_name, item.vehicle_image, item.distance, item.time)}>
          {/* <Image source={item.selected ? item.vehicle_image : item.vehicle_image_thumb} style={item.selected ? styles.selectedChoiceIcon : styles.choiceIcon} /> */}
          <Image source={{ uri: item.vehicle_image }} style={this.state.vehicleId == item.id ? styles.selectedChoiceIcon : styles.choiceIcon} />
        </TouchableHighlight>

        <Text style={[styles.bookChoiceSubTitle1, { color: this.state.vehicleId == item.id ? Color.dark_blue : Color.black }]}>{item.distance.split(' ')[0].trim()} Kms.</Text>
        {/* <Text style={[styles.bookChoiceSubTitle1, { color: item.selected ? Color.dark_blue : Color.black }]}>{item.distance}</Text> */}
        <View style={styles.bookChoiceInfoContainer}>
          {/* <Text style={[styles.bookChoiceSubTitle2, { color: item.selected ? Color.dark_blue : Color.black }]}>₹ {item.amount}</Text> */}
          <Text style={[styles.bookChoiceSubTitle2, { color: this.state.vehicleId == item.id ? Color.dark_blue : Color.black }]}>₹ {item.amount}</Text>
          <TouchableHighlight underlayColor="transparent" onPress={() => this.setState({ isModalVisibleInfo: true, infoId: item.id, infoVehicleName: item.vehicle_name, infoVehicleImg: item.vehicle_image, infoCapacity: item.capacity })}>
            <Image source={require('../../../assets/img/side_about.png')} style={styles.bookChoiceInfo} />
          </TouchableHighlight>
        </View>

        {/* info modal */}
        <Modal
          isVisible={this.state.isModalVisibleInfo}
          style={styles.footerModal}
          onBackdropPress={() => this.setState({ isModalVisibleInfo: false })}
        >
          <View style={styles.content}>
            <View style={styles.modalImgContainerInfo}>
              <Image source={{ uri: this.state.infoVehicleImg }} style={styles.modalImgContainerInfoIcon} />
              <Text style={styles.modalImgContainerInfoTitle}>  {this.state.infoVehicleName} </Text>
            </View>
            <View style={[styles.infoNav, {
              paddingTop: width * 0.03,
              paddingBottom: width * 0.02,
              borderBottomColor: Color.grey_8, borderBottomWidth: 0.5
            }]}>
              <View style={[styles.infoNavBox]}>
                <Text style={styles.infoNavTitle}>Capacity</Text>
              </View>
              <View style={[styles.infoNavBox, { alignItems: 'flex-end' }]}>
                <Text style={[styles.infoNavTitle, { fontFamily: Font.bold, }]}> {this.state.infoCapacity} Kgs.</Text>
              </View>
            </View>

            <View style={[styles.infoNav,
            { borderBottomColor: Color.grey_8, borderBottomWidth: 0.5, paddingBottom: width * 0.015 }]}>
              <View style={[styles.infoNavBox]}>
                <Text style={styles.infoNavTitle}>Size</Text>
              </View>
              <View style={[styles.infoNavBox, { alignItems: 'flex-end' }]}>
                <Text style={[styles.infoNavTitle, { fontFamily: Font.bold, }]}>2.5ft X 3ft</Text>
              </View>
            </View>

            <View style={styles.instruction}>
              <FlatList
                refreshing={true}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.instruction}
                extraData={this.state}
                numColumns={1}
                renderItem={this.renderItemInstruction.bind(this)}
              />
            </View>
            <View style={{ paddingBottom: width * 0.04, paddingTop: width * 0.02 }}>
              <Button
                title="Okay"
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                onPress={() => this.setState({ isModalVisibleInfo: false })}
              />
            </View>
          </View>
        </Modal>

      </View>
    );
  }

  _selectChoice = (id, amount, name, image, distance, time) => {
    this.setState({
      vehicleId: id,
      amount: amount,
      vehicleName: name,
      vehicleImage: image,
      distance: distance,
      time: time,
      enable: true
    });
    // var data = this.state.listItem;
    // data.map(function (value, i) {
    //   data[i].selected = false;
    // })
    // data[index].selected = true;

    // this.setState({ listItem: data, selectedVehicle: data[index].title });

  };

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

    // edited by developer
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

  renderItemContact({ item, index }) {
    const lengthArray = this.state.fetchedContacts.length;
    console.log(lengthArray)
    console.log(item)
    // console.log(item.phoneNumbers[0].number)
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

  _navigate = () => {
    const { houseNumber, address, landmark, contactName, contactNumber, dropHouseNumber, dropAddress, dropLandmark, dropContactName, dropContactNumber, vehicleId, amount } = this.state;
    !contactName ? this.setState({ contactNameError: "Contact Name required" }) : "";
    !contactNumber ? this.setState({ contactNumberError: "Contact Number required" }) : this.setState({ contactNumberError: null });
    // !vehicleId ? alert("Select vehicle") : "";

    if (vehicleId && amount && houseNumber && address && landmark && contactNumber && contactName && dropHouseNumber && dropAddress && dropLandmark) {
      // && dropContactName && dropContactNumber
      this.props.navigation.navigate('Details', {
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
        dropAddress: this.state.dropAddress,
        dropHouseNumber: this.state.dropHouseNumber,
        dropLandmark: this.state.dropLandmark,
        dropContactName: this.state.dropContactName,
        dropContactNumber: this.state.dropContactNumber,
        dropLat: this.state.dropLat,
        dropLng: this.state.dropLng,
        vehicleId: this.state.vehicleId,
        amount: this.state.amount,
        vehicleName: this.state.vehicleName,
        vehicleImage: this.state.vehicleImage,
        distance: this.state.distance,
        time: this.state.time,
      });

      this.setState({
        isModalVisibleContact: false
      })
    }
  }

  render() {
    const { region, pulse, locationName, address, dropAddress } = this.state
    return (
      <View style={[styles.container, styles.bookContainer]}>
        <GeneralStatusBar backgroundColor={this.state.isModalVisibleInfo || this.state.isModalVisibleContact ? Color.transparent : Color.white} barStyle="dark-content" />
        <Spinner visible={this.state.isLoading} textContent={''} />
        <Header
          onMenu={() => this.props.navigation.goBack()}
          onNotification={() => this.props.navigation.navigate('Notification')}
        />
        <ScrollView>
          <View style={styles.bookNavTop}>
            <View style={styles.bookNavTopLeft}>
              <View style={[styles.bookDot, { backgroundColor: Color.green }]} />
              <Text style={styles.bookNavTopTitle}>{this.state.address.length > 15 ? this.state.address.substring(0, 18) + '...' : this.state.address}</Text>
            </View>
            <View style={styles.bookNavTopRight}>
              <View style={[styles.bookDot, { backgroundColor: Color.red }]} />
              <Text style={styles.bookNavTopTitle}>{this.state.dropAddress.length > 15 ? this.state.dropAddress.substring(0, 19) + '...' : this.state.dropAddress}</Text>
            </View>
          </View>

          <View style={styles.pickMapContainer}>
            <MapView
              style={styles.pickMap}
              initialRegion={region}
              provider={PROVIDER_GOOGLE}
              customMapStyle={RetroMapStyles}
              ref={c => this.mapView = c}
              
              onRegionChangeComplete={this.onRegionChange}
              showsIndoorLevelPicker={true}
              onRegionChange={() => this.setState({ pulse: 0 })}
              followsUserLocation={false}
            >
              {/* {this.state.markers.map((marker, index) => (
                  console.log('marker==>',marker.coordinates)
                //   <MapView.Marker coordinate={marker.coordinates}>
                //   <Image 
                //   source={require('../../../assets/img/scooter.png')} 
                //   style={{
                //     width: width * 0.085, height: width * 0.085, resizeMode: 'contain',
                //     // transform: [
                //     //   { rotate: `${Math.floor(Math.random() * 360)}deg` }
                //     // ],
                //   }} />
                // </MapView.Marker>
              ))}  */}

              {this.state.latLongResponce.map((marker, index) =>
                <MapView.Marker coordinate={{latitude: JSON.parse(marker.latitudes), longitude: JSON.parse(marker.longitudes)}} zIndex={9} 
                  //tracksViewChanges={false} 
                  anchor={{x: 0.6, y: 1}}
                  image={require('../../../assets/img/scooter.png')}
                  //style={{width:10, height:5}}
                  // style={{
                  //   transform: [
                  //     { rotate: `${Math.floor(Math.random() * 360)}deg` }
                  //   ]
                  // }}
                  >
                    {/* <Image
                      key={`coordinate_${index}`}
                      //defaultCenter={coordinate}
                      tracksViewChanges={false}
                      //optimized={true}
                      //onRegionChange={() => this.setState({ pulse: 0 })}
                      source={require('../../../assets/img/scooter.png')}
                      style={{ width: width * 0.04, 
                        height: width * 0.055, 
                        resizeMode: 'contain',
                        //transform: [{ rotate: `${Math.floor(Math.random() * 360)}deg` }] 
                      }}
                    />  */}
                </MapView.Marker>
              )}

              {this.state.coordinates.map((coordinate, index) =>
                <MapView.Marker coordinate={coordinate} zIndex={9} 
                  tracksViewChanges={false} 
                  >
                    <Icon name='map-marker' style={{fontSize: width * 0.05, color: index==0? Color.green : Color.red}}/>
                    {/* <Image
                      key={`coordinate_${index}`}
                      defaultCenter={coordinate}
                      source={index == 0 ? marker : markerDrop}
                      style={{ width: width * 0.04, height: width * 0.055, resizeMode: 'contain' }}
                    /> */}
                </MapView.Marker>
              )}

              {(this.state.coordinates.length >= 2) && (
                    <MapViewDirections
                      origin={this.state.coordinates[0]}
                      waypoints={this.state.coordinates.slice(1, -1)}
                      destination={this.state.coordinates[this.state.coordinates.length - 1]}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={2}
                      strokeColor={Color.dark_blue}
                      optimizeWaypoints={true}
                      onStart={(params) => {
                        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                      }}
                      onReady={result => {
                        this.mapView.fitToCoordinates(result.coordinates, {
                          edgePadding: {
                            right: (width / 20),
                            bottom: (height / 20),
                            left: (width / 20),
                            top: (height / 20),
                          }
                        });
                      }}
                      onError={(errorMessage) => {
                        // console.log('GOT AN ERROR');
                      }}
                    />
                  )}
            </MapView>
          </View>

            <View style={styles.bookChoice}>
              <FlatList
                refreshing={this.state.listItem}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.listItem}
                extraData={this.state}
                numColumns={3}
                renderItem={this.renderItem.bind(this)}
                scrollEnabled={false}
              />
            </View>

            <View style={styles.pickUpContactContainer}>
              <Text style={styles.pickupTitle}>Pickup Contact Information</Text>
              <Text style={[styles.pickupTitleInfo, { paddingVertical: 3 }]}>{this.state.contactNumber} - {this.state.contactName} </Text>
            </View>

            <View style={styles.serviceContainer}>
              <Text style={styles.pickupTitle}>Selected Service</Text>
              <Text style={[styles.pickupTitleInfo]}>{this.state.serviceName} </Text>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.serviceTitle}>Quantity : <Text style={{ color: Color.dark_blue, fontFamily: Font.bold }}> {this.state.quantity} {this.state.serviceName}</Text></Text>
              </View>

              <View style={{ flexDirection: 'row', paddingBottom: width * 0.03 }}>
                <Text style={styles.serviceTitle}>Description : <Text style={{ color: Color.dark_blue, fontFamily: Font.bold, }}> {this.state.description} </Text></Text>
              </View>
            </View>

            <View style={[styles.buttonContainer, { paddingBottom: width * 0.04, paddingTop: width * 0.02 }]}>
              <Button
                title={`Book ${this.state.selectedVehicle}`}
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                disabledStyle={styles.disableButton}
                disabledTitleStyle={styles.disableTitleButton}
                disabled={!this.state.enable}
                onPress={() => this.setState({ isModalVisibleContact: true })}
              />
            </View>

        </ScrollView>

          {/* contact modal */}
          <Modal
            isVisible={this.state.isModalVisibleContact}
            style={[styles.footerModal, { bottom: this.state.keyboardSpace ? this.state.keyboardSpace : 0 }]}
            onBackdropPress={() => this.setState({ isModalVisibleContact: false })}
          >

            <View style={styles.content}>
              <View style={styles.inputContainer}>
                <Text style={styles.titleModal}>Pickup Contact Information</Text>
                <View style={[styles.textContainer, { marginTop: 15 }]}>
                  <Text style={styles.label}>Contact Name</Text>
                  <TextInput
                    style={styles.textBox}
                    autoCapitalize="none"
                    placeholder="Enter Contact Name"
                    keyboardType="default"
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
                  <View style={[styles.bookTextContainerImage]}>
                    <TextInput
                      style={[styles.textBox, { flex: 1 }]}
                      placeholder="Enter Contact Number"
                      underlineColorAndroid="transparent"
                      keyboardType="phone-pad"
                      value={this.state.contactNumber}
                      onChangeText={(value) => this.setState({ contactNumber: value })}
                      ref={input => { this.contactNumber = input }}
                      onFocus={() => this.setState({ contactNumberError: null })}
                    />
                    <TouchableHighlight underlayColor="transparent" onPress={() => this.getContact()} style={styles.bookContactImage}>
                      <Image source={require('../../../assets/img/contact_book.png')} style={styles.bookContact} />
                    </TouchableHighlight>
                  </View>
                  {this.state.contactNumberError &&
                    <Text style={styles.error}>{this.state.contactNumberError}</Text>
                  }
                </View>
              </View>
              <View style={{ paddingBottom: width * 0.04, paddingTop: width * 0.02 }}>
                <Button
                  title="Update"
                  titleStyle={styles.buttonTitle}
                  buttonStyle={styles.button}
                  onPress={() => this._navigate()}
                />
              </View>
            </View>
          </Modal>

          {/* contact list modal */}
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
                renderItem={this.renderItemContact.bind(this)}
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

export default Book;