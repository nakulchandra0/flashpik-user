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
    BackHandler
} from 'react-native';

import { Button, Input } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-community/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font';
import Header from '../../component/header';
import styles from './styles';
import SliderEntry from './BannerSlider';
import Config from '../../config/config';
import ApiService from "../../config/ApiService";
import Utility from "../../config/utility";

var { width, height } = Dimensions.get('window');
const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        apiService = new ApiService();
        viewUtils = new Utility();
        this.state = {
            isModalVisible: false,
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            keyboardSpace: '',
            banner: [
                {
                    title: 'Flashpik',
                    illustration: require('../../../assets/img/slider.png')
                },
                {
                    title: 'Flashpik',
                    illustration: require('../../../assets/img/slider.png')
                },
                {
                    title: 'Flashpik',
                    illustration: require('../../../assets/img/slider.png')
                },

            ],
            listItem: [],
            serviceId: null,
            serviceName: null,

            name: null,
            email: null,
            profile_image: null,
            phone_number: null,

            quantity: null,
            description: null,
            // service: [
            //     {
            //         "title": "Document",
            //         "route": "Document",
            //         "image": require('../../../assets/img/service/document.png')
            //     },
            //     {
            //         "title": "Box",
            //         "route": "Box",
            //         "image": require('../../../assets/img/service/box.png')
            //     },
            //     {
            //         "title": "Briefcase",
            //         "route": "Briefcase",
            //         "image": require('../../../assets/img/service/briefcase.png')
            //     },
            //     {
            //         "title": "Laptop",
            //         "route": "Laptop",
            //         "image": require('../../../assets/img/service/laptop.png')
            //     },
            //     {
            //         "title": "Files",
            //         "route": "Files",
            //         "image": require('../../../assets/img/service/files.png')
            //     },
            //     {
            //         "title": "Pen Drive & Card",
            //         "route": "Pen Drive & Card",
            //         "image": require('../../../assets/img/service/pen_drive.png')
            //     },
            //     {
            //         "title": "Kitchenware",
            //         "route": "Kitchenware",
            //         "image": require('../../../assets/img/service/kitchenware.png')
            //     },
            //     {
            //         "title": "Clothes",
            //         "route": "Clothes",
            //         "image": require('../../../assets/img/service/clothes.png')
            //     },
            //     {
            //         "title": "Speakers",
            //         "route": "Speakers",
            //         "image": require('../../../assets/img/service/speakers.png')
            //     },
            //     {
            //         "title": "Gift",
            //         "route": "Gift",
            //         "image": require('../../../assets/img/service/gift.png')
            //     },
            //     {
            //         "title": "Books",
            //         "route": "Books",
            //         "image": require('../../../assets/img/service/books.png')
            //     },
            //     {
            //         "title": "Luggage",
            //         "route": "Luggage",
            //         "image": require('../../../assets/img/service/luggage.png')
            //     },
            // ]
        }

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

    componentDidMount() {
        this.setState({ isLoading: true }, async () => {
            var url = Config.baseUrl + Config.service;
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
                        this.setState({ isLoading: false });
                        if (response.status == "true") {
                            this.setState({ listItem: response.data });
                        } else {
                            viewUtils.showToast(response.message.trim());
                        }
                    }
                });
        })
    }


    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    selectService = (item, name) => {
        this.setState({ isModalVisible: true, serviceId:item, serviceName:name })
        // alert(this.state.serviceId)
    }

    renderItem({ item, index }) {
        // console.log(item);
        const lengthArray = this.state.listItem.length;
        return (
            <TouchableHighlight underlayColor="transparent" onPress={() => this.selectService(item.id, item.service_name)}>
                <View style={styles.serviceBox}>
                    <View style={styles.serviceImageContainer}>
                        <Image source={{ uri: item.servic_image }} 
                        style={item.title == "Laptop" ? [styles.serviceImage, { marginTop: width * 0.065 }] 
                            : item.title == "Pen Drive & Card" ? {
                            width: '90%', height: '90%', resizeMode: 'contain', marginTop: width * 0.045 } 
                            : styles.serviceImage} />
                         {/* {item.title == "Laptop" ? [styles.serviceImage, { marginTop: width * 0.065 }] 
                             : item.title == "Pen Drive & Card" ? {
                            width: '90%', height: '90%', resizeMode: 'contain', marginTop: width * 0.045 } 
                             : styles.serviceImage}  */}
                    </View>
                    <View style={item.title == "Pen Drive & Card" ? {width: '50%', alignItems: 'center'} : styles.serviceTitleContainer} >
                        {/* style={item.title == "Pen Drive & Card" ? {width: '50%', alignItems: 'center'} : styles.serviceTitleContainer} */}
                        <Text style={item.title == "Pen Drive & Card" ? [styles.serviceTitle, {paddingBottom: width * 0.01, alignSelf:'center'}]: styles.serviceTitle}
                        // style={item.title == "Pen Drive & Card" ? [styles.serviceTitle, {paddingBottom: width * 0.01, alignSelf:'center'}]: styles.serviceTitle}
                        >{item.service_name}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _navigate = async () => {
        const { serviceId, quantity, description } = this.state;
        !quantity ? this.setState({ quantityError: "Quantity required" }) : null;
        !description ? this.setState({ descriptionError: "Description required" }) : null;

        if (quantity && description) {
            this.setState({ isModalVisible: false })
            this.props.navigation.navigate('Pickup', {
                serviceId: this.state.serviceId,
                serviceName: this.state.serviceName,
                quantity: this.state.quantity,
                description: this.state.description,
            });
            // this.setState({ 
            //     serviceId: null,
            //     serviceName: null,
            //     quantity: null,
            //     description: null,
            // })
        }
    }


    render() {
        const { slider1ActiveSlide } = this.state;
        return (
            <View style={styles.container}>
                <GeneralStatusBar backgroundColor={this.state.isModalVisible ? Color.transparent : Color.white} barStyle="dark-content" />
                <Spinner visible={this.state.isLoading} textContent={''} />
                <Header
                    onMenu={() => this.props.navigation.toggleDrawer()}
                    onNotification={() => this.props.navigation.navigate('Notification')}
                />

                <View style={styles.carouselContainer}>
                    <Carousel
                        ref={c => this._slider1Ref = c}
                        data={this.state.banner}
                        renderItem={this._renderItemWithParallax}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        hasParallaxImages={true}
                        firstItem={SLIDER_1_FIRST_ITEM}
                        inactiveSlideScale={0.95}
                        inactiveSlideOpacity={0.7}
                        // inactiveSlideShift={40}
                        containerCustomStyle={styles.slider}
                        contentContainerCustomStyle={styles.sliderContentContainer}
                        loop={true}
                        loopClonesPerSide={2}
                        autoplay={true}
                        autoplayDelay={1000}
                        autoplayInterval={3000}
                        onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                    />
                    <Pagination
                        dotsLength={this.state.banner.length}
                        activeDotIndex={slider1ActiveSlide}
                        containerStyle={styles.paginationContainer}
                        dotColor={Color.dark_blue}
                        dotStyle={styles.paginationDot}
                        inactiveDotColor={Color.white}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        carouselRef={this._slider1Ref}
                        tappableDots={!!this._slider1Ref}
                    />
                </View>

                <View style={styles.serviceContainer}>
                    <Text style={styles.serviceMainTitle}>Type of Services</Text>
                    <FlatList
                        refreshing={true}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.listItem}
                        extraData={this.state}
                        numColumns={3}
                        renderItem={this.renderItem.bind(this)}
                        scrollEnabled={true}
                        style={styles.flatlist}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <Modal
                    isVisible={this.state.isModalVisible}
                    style={[styles.footerModal, { bottom: this.state.keyboardSpace ? this.state.keyboardSpace : 0 }]}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                >
                    <View style={styles.content}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.titleModal}>Goods Information</Text>
                            <View style={[styles.textContainer, { marginTop: height * 0.02 }]}>
                                <Text style={styles.label}>Goods Quantity</Text>
                                <TextInput
                                    style={styles.textBox}
                                    autoCapitalize="none"
                                    placeholder="Enter Quantity"
                                    keyboardType="number-pad"
                                    value={this.state.quantity}
                                    onChangeText={(value) => this.setState({ quantity: value })}
                                    ref={input => { this.quantity = input }}
                                    onFocus={() => this.setState({ quantityError: null })}
                                />
                                {this.state.quantityError &&
                                    <Text style={styles.error}>{this.state.quantityError}</Text>
                                }
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.label}>Goods Description</Text>
                                <TextInput
                                    style={styles.textBox}
                                    keyboardType="default"
                                    placeholder="Very important files so be careful"
                                    value={this.state.description}
                                    onChangeText={(value) => this.setState({ description: value })}
                                    ref={input => { this.description = input }}
                                    onFocus={() => this.setState({ descriptionError: null })}
                                />
                                {this.state.descriptionError &&
                                    <Text style={styles.error}>{this.state.descriptionError}</Text>
                                }
                            </View>
                        </View>
                        <View style={{ paddingBottom: width * 0.02, paddingTop: 0, }}>
                            <Button
                                title="Update"
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.button}
                                onPress={() => this._navigate()}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}



