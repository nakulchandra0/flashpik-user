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
    KeyboardAvoidingView,
    SafeAreaView,
    BackHandler
} from 'react-native';

import moment from 'moment';
import { Button, Input, CheckBox } from 'react-native-elements';
import { GiftedChat, Actions } from 'react-native-gifted-chat'
import { TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font';
import Header from '../../component/goBackNotification';
import styles from './chatStyle';
import { addItem } from '../../config/disputeFirebase';
import { db } from '../../config/db';

var { width, height } = Dimensions.get('window');
let itemRef = db.ref('/dispute_chat');

export default class Orders extends React.Component {

    state = {
        messages: [],
    }

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            // messages: [
            //     {
            //         //_id: 1,
            //         message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
            //         created: new Date(),
            //         user: {
            //             _id: 1,
            //             name: 'React Native',
            //             avatar: 'https://facebook.github.io/react/img/logo_og.png',
            //         },
            //     },
            //     {
            //         //_id: 1,
            //         message: 'Readable content of a page when looking at its layout.',
            //         created: new Date(),
            //         user: {
            //             _id: 2,
            //             name: 'React Native',
            //             avatar: 'https://facebook.github.io/react/img/logo_og.png',
            //         },
            //     },
            // ],
            date: null,
            time: null,
            dispute_id: null,
            status: null,
            order_id: null,
            reason: null,
            userid: null,

            messages: [],
            messageList: [],
        };
    }

    async componentDidMount() {
        //console.log(await AsyncStorage.getItem('@profile'))
        this.setState({
            date: this.props.navigation.state.params.date,
            time: this.props.navigation.state.params.time,
            dispute_id: this.props.navigation.state.params.dispute_id,
            status: this.props.navigation.state.params.status,
            order_id: this.props.navigation.state.params.order_id,
            reason: this.props.navigation.state.params.reason,

            userid: await AsyncStorage.getItem('@userid'),
        })

        // Get Data from firebase
            db.ref(`/dispute_chat/${this.props.navigation.state.params.dispute_id}`).on('value', (snapshot) => {    
                //console.log('data---->',snapshot.val())
                snapshot.forEach((childSnap) => {
                    this.state.messages.unshift(childSnap.val())
                });
            });
    }
    
    async onSend(messages = []) {
        addItem(
            this.state.dispute_id,
            await AsyncStorage.getItem('@userid'),
            moment().format('YYYY-MM-DD hh:mm:ss'),
            await AsyncStorage.getItem('@name'),
            await AsyncStorage.getItem('@profile'),
            messages[0].message
        )
        // this.setState(previousState => ({
        //     messages: GiftedChat.append(previousState.messages, messages),
        // })) 
            db.ref(`/dispute_chat/${this.props.navigation.state.params.dispute_id}`).on('value', (snapshot) => {    
                console.log('data---->',snapshot.val())
                snapshot.forEach((childSnap) => {
                    this.state.messageList.unshift(childSnap.val())
                });
                this.setState({ 
                    messages: this.state.messageList,
                    messageList: []
                })
            });
    }

    renderCustomActions = props =>
        Platform.OS === 'web' ? null : (
        <Actions {...props} onSend={this.onSend} />
    )

    render() {
        return (
            <View style={styles.container}>
                <GeneralStatusBar backgroundColor={Color.white} barStyle="dark-content" />
                <Header
                    onMenu={() => this.props.navigation.goBack()}
                    onNotification={() => this.props.navigation.navigate('Notification')}
                />
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Dispute Detail</Text>
                </View>

                <View style={styles.orderBox}>
                    <View style={styles.topNavigation}>
                        <View style={styles.leftNavigation}>
                            <Text style={styles.subTitle}>{this.state.date}</Text>
                            <Text style={styles.subTitle}>{this.state.time}</Text>
                        </View>
                        <View style={styles.rightNavigation}>
                            <Text style={[styles.subTitle, { fontFamily: Font.semi_bold }]}>{this.state.dispute_id}</Text>
                            <Text style={[styles.subTitle, { color: 'orange', fontFamily: Font.semi_bold, textTransform: 'capitalize' }]}>{this.state.status}</Text>
                        </View>
                    </View>

                    <View style={styles.nav}>
                        <View style={{ width: width * 0.15}}>
                            <Text style={styles.heading}>Order Id </Text>
                        </View>
                        <View style={{ width: width * 0.04}}>
                            <Text style={styles.heading}> : </Text>
                        </View>
                        <View style={{ width: width * 0.7}}>
                            <Text style={[styles.reason, { color: Color.dark_blue, fontSize: width * 0.038, fontFamily: Font.semi_bold }]}>{this.state.order_id}</Text>
                        </View>
                    </View>

                    <View style={[styles.nav, { paddingBottom: width * 0.03 }]}>
                        <View style={{ width: width * 0.15}}>
                            <Text style={styles.heading}>Reason </Text>
                        </View>
                        <View style={{ width: width * 0.04}}>
                            <Text style={styles.heading}> : </Text>
                        </View>
                        <View style={{ width: width * 0.7, marginTop: height * 0.003}}>
                            <Text style={styles.reason}>{this.state.reason}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.chatContainer}>
                    <GiftedChat 
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: 2 
                        }}
                        renderActions={messages => this.renderCustomActions(messages)}
                    />
                    {/* {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />} */}
                </View>
            </View>
        );
    }
}

