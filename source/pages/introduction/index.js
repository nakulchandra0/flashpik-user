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
    BackHandler
} from 'react-native';

import { Button } from 'react-native-elements';
import ViewPager from '@react-native-community/viewpager';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font'
import styles from './styles';

var { width, height } = Dimensions.get('window');
 
export default class Introduction extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
 
    _navigate = async() => {
        if(await AsyncStorage.getItem('email') == null) {
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Signup' })], 0)
        } 
    }

    render() {
        return (
            <ViewPager style={{flex: 1}} initialPage={0} scrollEnabled={false} ref={viewPager => { this.viewPager = viewPager }}>
                <View style={styles.container}>  
                    <GeneralStatusBar backgroundColor={Color.transparent} barStyle="light-content" />
                    <TouchableHighlight underlayColor={'transparent'} style={styles.skipContainer} onPress={() => this._navigate()}>
                        <Text style={styles.skipText}> SKIP </Text>
                    </TouchableHighlight>
                    <View style={styles.topContainer}>
                        <Image source={require('../../../assets/img/slide_1.png')} style={styles.slideImage} />
                    </View>

                    <View style={styles.middleContainer}>
                        <Text style={styles.title}>PICKUP</Text>
                        <Text style={styles.content}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Text>
                    </View>
                    <View style={styles.btnBtnContainer}>
                        <Button
                            title="Next"
                            titleStyle={styles.buttonTitle}
                            buttonStyle={styles.button}
                            onPress={() => this.viewPager.setPage(1)}
                        />
                    </View>
                    <ImageBackground  source={require('../../../assets/img/bottom_layer.png')} style={styles.bottom_view} />
                </View>

                <View style={styles.container}>
                    <GeneralStatusBar backgroundColor={Color.transparent} barStyle="light-content" />
                    <TouchableHighlight underlayColor={'transparent'} style={styles.skipContainer} onPress={() => this._navigate()}>
                        <Text style={styles.skipText}> SKIP </Text>
                    </TouchableHighlight>
                    <View style={styles.topContainer}>
                        <Image source={require('../../../assets/img/slide_2.png')} style={styles.slideImage} />
                    </View>

                    <View style={styles.middleContainer}>
                        <Text style={styles.title}>On The Way</Text>
                        <Text style={styles.content}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Text>
                    </View>

                    <View style={styles.btnBtnContainer}>
                        <Button
                            title="Next"
                            titleStyle={styles.buttonTitle}
                            buttonStyle={styles.button}
                            onPress={() => this.viewPager.setPage(2)}
                        />
                    </View>
                    <ImageBackground  source={require('../../../assets/img/bottom_layer.png')} style={styles.bottom_view} />
                </View>

                <View style={styles.container}>
                    <GeneralStatusBar backgroundColor={Color.transparent} barStyle="light-content" />
                    <TouchableHighlight underlayColor={'transparent'} style={styles.skipContainer} onPress={() => this._navigate()}>
                        <Text style={styles.skipText}> SKIP </Text>
                    </TouchableHighlight>
                    <View style={styles.topContainer}>
                        <Image source={require('../../../assets/img/slide_3.png')} style={styles.slideImage} />
                    </View>

                    <View style={styles.middleContainer}>
                        <Text style={styles.title}>Delivered</Text>
                        <Text style={styles.content}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Text>
                    </View>
                    <View style={styles.btnBtnContainer}>
                        <Button
                            title="Get Start"
                            titleStyle={styles.buttonTitle}
                            buttonStyle={styles.button}
                            onPress={()=>this._navigate()}
                        />
                    </View>
                    <ImageBackground  source={require('../../../assets/img/bottom_layer.png')} style={styles.bottom_view} />
                </View>
            </ViewPager>
            
        );
    }

 
}



 