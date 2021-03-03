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
  BackHandler,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import moment from 'moment';
import { Button, Input, CheckBox } from 'react-native-elements';
import Modal from "react-native-modal";
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font';
import Header from '../../component/header';
import styles  from './styles';
import Config from '../../config/config';
import ApiService from "../../config/ApiService";
import Utility from "../../config/utility";

var { width, height } = Dimensions.get('window');

export default class Orders extends React.Component {
    
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            // dispute: [
            //     {
            //         "date": "Fri 08 Nov 2019",
            //         "time": "9:15 AM",
            //         "status": "In Review",
            //         "resaon": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            //         "orderid": "78FGF78H74T",
            //         "id": "4578ETRF249H",
            //     },
            //     {
            //         "date": "Fri 08 Nov 2019",
            //         "time": "9:15 AM",
            //         "status": "Resolved",
            //         "resaon": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            //         "orderid": "78FGF78H74T",
            //         "id": "4578ETRF249H",
            //     },
            //     {
            //         "date": "Fri 08 Nov 2019",
            //         "time": "9:15 AM",
            //         "status": "Resolved",
            //         "resaon": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            //         "orderid": "78FGF78H74T",
            //         "id": "4578ETRF249H",
            //     },
            // ]
            dispute: []
        };
        
    }
    
    componentDidMount = async () => {
        this.setState({ isLoading: true }, async () => {
            var url = Config.baseUrl + Config.disputelist;
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
                        console.log(response)
                        this.setState({ isLoading: false });
                        if (response.status == "true") {
                            this.setState({ dispute: response.data })
                            viewUtils.showToast(response.message.trim());
                        } else {
                            viewUtils.showToast(response.message.trim());
                        }
                    }
                });
        })
    }

    _navigate = (date,time, dispute_id, status, order_id, reason) => {
        // console.log('date-->',date,', time-->',time,', dispute id-->',dispute_id,', status-->',status,', order id-->',order_id,', reason-->',reason)
        this.props.navigation.navigate('Disputedetail', {date:date, time:time, dispute_id:dispute_id, status:status, order_id:order_id, reason:reason})
    }

    renderItem({ item, index }) {
        const lengthArray = this.state.dispute.length;
        return (
            <TouchableWithoutFeedback onPress={()=>this._navigate(item.dispute_date.split(' ')[0].trim()+' '+item.dispute_date.split(' ')[1].trim(), item.dispute_date.split(' ')[2].trim()+' '+item.dispute_date.split(' ')[3].trim(), item.dispute_id, item.dispute_status, item.order_id, item.reason)}>
                <View style={styles.orderBox}>
                    <View style={styles.topNavigation}>
                        <View style={styles.leftNavigation}>
                            <Text style={styles.subTitle}>{item.dispute_date.split(' ')[0].trim()+' '+item.dispute_date.split(' ')[1].trim()}</Text>
                            <Text style={[styles.subTitle, {lineHeight: height * 0.023 }]}>{item.dispute_date.split(' ')[2].trim()+' '+item.dispute_date.split(' ')[3].trim()}</Text>
                        </View>
                        <View style={styles.rightNavigation}>
                            <Text style={[styles.subTitle, { color: Color.dark_blue, fontFamily: Font.bold, fontSize: width * 0.042 } ]}>{item.dispute_id}</Text>
                            <Text style={[styles.subTitle, { lineHeight: height * 0.023, color: item.status == "Resolved" ? Color.light_green : 'orange', fontFamily: Font.semi_bold, textTransform:'capitalize' } ]}>{item.dispute_status}</Text>
                        </View>
                    </View> 

                    <View style={[styles.nav, {marginTop: height * 0.008, flexDirection: 'row' }]}>
                        <View style={{width: width * 0.16 }}>
                            <Text style={styles.heading}>Order Id</Text>
                        </View> 
                        <View style={{ width: width * 0.04, }}>
                            <Text> : </Text>
                        </View> 
                        <View>
                            <Text style={{ color: Color.dark_blue, fontSize: width * 0.038, fontFamily: Font.semi_bold }}>{item.order_id}</Text>
                        </View>
                    </View> 

                    <View style={[styles.nav, {paddingBottom: width * 0.015, flexDirection: 'row'}]}>
                        <View style={{width: width * 0.16 }}>
                            <Text style={styles.heading}>Reason</Text>
                        </View>
                        <View style={{ width: width * 0.04}}>
                            <Text> : </Text>
                        </View> 
                        <View style={{ width: width * 0.65, marginTop: height * 0.005, }}>
                            <Text style={{fontFamily: Font.semi_bold, fontSize: width * 0.031, lineHeight: height * 0.02 }}>{item.reason} </Text>
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
                <Header 
                    onMenu={() => this.props.navigation.toggleDrawer()}
                    onNotification={() => this.props.navigation.navigate('Notification')}
                /> 
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Dispute</Text>
                </View>

                <ScrollView>
                    <FlatList
                        refreshing={true}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.dispute}
                        extraData={this.state}
                        numColumns={1}
                        renderItem={this.renderItem.bind(this)}
                    />
                </ScrollView>
            </View>
        );
    }
}
 
