import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    StatusBar,
    Alert,
    BackHandler
} from 'react-native';

import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
// import { StackActions } from '@react-navigation/native';
/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Header from '../../component/goBackNotification';
import Color from '../../component/color';
import Font from '../../component/font'
import styles from './styles';

var { width, height } = Dimensions.get('window');

export default class Splash extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
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
        }
    }

    componentDidMount() {

        const backAction = () => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Menu' })],
            });
            this.props.navigation.dispatch(resetAction);
            return true;
        };

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

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
    }

    _navigate = index => {
        this.props.navigation.navigate('Ordertrack', {
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
            orderId: this.state.orderId,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <GeneralStatusBar backgroundColor={Color.white} barStyle="dark-content" />
                <Header
                    onMenu={() => {
                        //this.props.navigation.goBack()
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Menu' })],
                        });
                        this.props.navigation.dispatch(resetAction);

                    }}
                    onNotification={() => this.props.navigation.navigate('Notification')}
                />

                <View style={styles.mainContainer}>
                    <Image source={require('../../../assets/img/thank_you.png')} style={styles.logo} />
                    <Text style={styles.mainTitle}>Thank You! {'\n'}Order is processed</Text>
                    <Text style={styles.subTitle}>Sit back and relax. Order Will come to you</Text>

                    <View style={styles.bottomContainer}>
                        <Button
                            title="Track Your Order"
                            titleStyle={styles.buttonTitle}
                            buttonStyle={styles.button}
                            onPress={() => this._navigate()}
                        />
                    </View>
                </View>

            </View>

        );
    }
}



