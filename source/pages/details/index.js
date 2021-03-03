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
  BackHandler
} from 'react-native';
  
import { Button, Input, CheckBox } from 'react-native-elements';
import Modal from "react-native-modal";

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font';
import Header from '../../component/goBack';
import styles  from './styles';

var { width, height } = Dimensions.get('window');

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisibleInfo: false,

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
      
            vehicleId: null,
            vehicleName: null,
            vehicleImage: null,
            distance: null,
            time: null,

            amount: null,
            tax: null,
            totalAmount: null,

            isModalVisible: false,
            isLoading: false,
      
            // listItem: [],
            // fetchedContacts: [],
            // oldContacts: [],
      
        };
    }
  
    componentDidMount() {
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
            dropAddress: this.props.navigation.state.params.dropAddress,
            dropHouseNumber: this.props.navigation.state.params.dropHouseNumber,
            dropLandmark: this.props.navigation.state.params.dropLandmark,
            dropContactName: this.props.navigation.state.params.dropContactName,
            dropContactNumber: this.props.navigation.state.params.dropContactNumber,
            dropLat: this.props.navigation.state.params.dropLat,
            dropLng: this.props.navigation.state.params.dropLng,

            vehicleId: this.props.navigation.state.params.vehicleId,
            amount: this.props.navigation.state.params.amount,
            tax: parseFloat(this.props.navigation.state.params.amount * 0.18).toFixed(2),
            //totalAmount: parseFloat(this.props.navigation.state.params.amount) + parseFloat(this.props.navigation.state.params.amount * 0.18).toFixed(2),
            vehicleName: this.props.navigation.state.params.vehicleName,
            vehicleImage: this.props.navigation.state.params.vehicleImage,
            distance: this.props.navigation.state.params.distance,
            time: this.props.navigation.state.params.time,
          })   
          
    }

    _navigate = () => {
        //alert('hi')
        this.props.navigation.navigate('Payment', {
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
            amount: this.state.amount,
            tax: this.state.tax,
            totalAmount: parseFloat(parseFloat(this.state.amount) + parseFloat(this.state.tax)).toFixed(2),
            vehicleId: this.state.vehicleId,
            vehicleName: this.state.vehicleName,
            vehicleImage: this.state.vehicleImage,
            distance: this.state.distance,
            time: this.state.time,
        })
    }

    render() {
        const { region, pulse, locationName } = this.state
        return (
            <View style={styles.container}>  
                <GeneralStatusBar backgroundColor={Color.white} barStyle="dark-content" />
                <Header 
                    onMenu={() => this.props.navigation.goBack()}
                /> 
                    <Text style={styles.title}>Item Detail</Text>   
                    
                    <ScrollView contentContainerStyle={{ paddingHorizontal: width * 0.05}}>
                        <View style={styles.inputContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Item Name</Text>
                                <View style={styles.labelValueContainer}>
                                    <Text style={styles.labelValue}>{this.state.serviceName} </Text>
                                </View>
                                {/* <TextInput
                                    style={styles.textBox}
                                    autoCapitalize="none"
                                    placeholder="Item Name"
                                    keyboardType="default"
                                    value={this.state.serviceName}
                                /> */}
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Quantity </Text>
                                <View style={styles.labelValueContainer}>
                                    <Text style={styles.labelValue}>{this.state.quantity} </Text>
                                </View>

                                {/* <TextInput
                                    style={styles.textBox}
                                    autoCapitalize="none"
                                    placeholder="Quantity"
                                    keyboardType="default"
                                    value={this.state.quantity}
                                /> */}
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Description of item</Text>
                                <View style={styles.labelValueContainer}>
                                    <Text style={styles.labelValue}>{this.state.description} </Text>
                                </View>

                                {/* <TextInput
                                    style={[styles.textBox, { maxHeight: 90, height: 90, textAlignVertical: 'top' }]}
                                    multiline={true}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="none"
                                    placeholder="Description"
                                    keyboardType="default"
                                    value={this.state.description}
                                    onChangeText={(description) => this.setState({ description })}
                                /> */}
                            </View>
                        </View>

                        <View style={styles.invoiceContainer}>
                            <Text style={styles.invoicelTitle}>Invoice Detail</Text>
                                <View style={[styles.infoNav, { paddingTop: width * 0.04, paddingBottom: width * 0.005, borderBottomColor: Color.grey_5, borderBottomWidth: 1 }]}> 
                                    <View style={styles.infoNavBox}>
                                        <Text style={styles.infoNavTitle}>Fare Price</Text>
                                    </View>
                                    <View style={[styles.infoNavBox, { alignItems: 'flex-end'}]}>
                                        <Text style={styles.infoNavTitle}>₹ {this.state.amount} </Text>
                                    </View>
                                </View>
                
                                <View style={[styles.infoNav, { paddingTop: width * 0.005, paddingBottom: width * 0.005, borderBottomColor: Color.grey_5, borderBottomWidth: 1 }]}> 
                                    <View style={[styles.infoNavBox, { flexDirection:'row', alignItems:'center' }]}>
                                        <Text style={styles.infoNavTitle}>Tax</Text>
                                        <TouchableHighlight underlayColor="transparent" onPress={()=>this.setState({ isModalVisibleInfo: true })}>
                                            <Image source={require('../../../assets/img/side_about.png')} style={styles.choiceInfo}/>
                                        </TouchableHighlight>
                                    </View>
                                    <View style={[styles.infoNavBox, { alignItems: 'flex-end'}]}>
                                        <Text style={styles.infoNavTitle}>₹ {this.state.tax}</Text>
                                    </View>
                                </View> 

                                <View style={[styles.infoNav, { paddingBottom: width * 0.03, paddingTop: width * 0.005 }]}> 
                                    <View style={[styles.infoNavBox]}>
                                        <Text style={[styles.infoNavTitle, { fontFamily: Font.bold}]}>Total Pay</Text>
                                    </View>
                                    <View style={[styles.infoNavBox, { alignItems: 'flex-end'}]}>
                                        <Text style={[styles.infoNavTitle, { fontFamily: Font.bold }]}> ₹ {parseFloat(parseFloat(this.state.amount) + parseFloat(this.state.tax)).toFixed(2)} </Text>
                                    </View>
                                </View>   
                            </View>
            
                            <View style={styles.detailContainer}>
                                <View style={{flex:0.27}}>
                                    <Image source={require('../../../assets/img/parcel_box.png')} style={styles.detailImage}/>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={styles.detailTitle}>Deliver to</Text>
                                    <Text style={styles.detailSubTitle}>{this.state.dropHouseNumber}, {this.state.dropLandmark}, {this.state.dropAddress} </Text>
                                </View>
                            </View>
          
                            <View style={{marginBottom: width * 0.03}}>
                                <Button
                                title="Proceed to PAY"
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.button}
                                onPress={() => this._navigate()}
                                />
                            </View>
                            
                        </ScrollView>
        
                        {/* info modal */}
                        <Modal 
                            isVisible={this.state.isModalVisibleInfo} 
                            style={styles.footerModal}
                            onBackdropPress={() => this.setState({ isModalVisibleInfo: false })}
                        >
                            <View style={styles.content}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.titleModal}>Tax Information</Text>
                                    <View style={[styles.infoNavTax, { marginTop: width * 0.01, borderBottomWidth: 0.5, borderBottomColor: Color.dark_blue } ]}> 
                                        <View style={styles.infoNavBox}>
                                            <Text style={styles.infoNavTitle}>Tax 1 <Text style={{fontSize: width * 0.03}}>(18%)</Text></Text>
                                        </View>
                                        <View style={[styles.infoNavBox, { alignItems: 'flex-end'}]}>
                                            <Text style={styles.infoNavTitle}>₹ {this.state.tax}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.infoNavTax}> 
                                        <View style={styles.infoNavBox}>
                                            <Text style={[styles.infoNavTitle, { fontFamily: Font.bold }]}>Total Tax</Text>
                                        </View>
                                        <View style={[styles.infoNavBox, { alignItems: 'flex-end'}]}>
                                            <Text style={[styles.infoNavTitle, { color: Color.dark_blue, fontFamily: Font.bold }]}>₹ {this.state.tax}</Text>
                                        </View>
                                    </View>
                                </View>

                                <Button
                                    title="Okay"
                                    titleStyle={styles.buttonTitle}
                                    buttonStyle={styles.button}
                                    onPress={()=>this.setState({ isModalVisibleInfo: false })}
                                />
                            </View>
                        </Modal>
                    </View>
                );
            }
        }

export default Details;