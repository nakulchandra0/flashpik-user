import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    StatusBar,
    Alert, 
    FlatList,
    TouchableWithoutFeedback,
    TouchableHighlight,
    BackHandler
} from 'react-native';

import { Header, Badge,} from 'react-native-elements';

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font'
import styles from './styles';

var { width, height } = Dimensions.get('window');
 
export default class Splash extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                { "title": "FAQ" },
                { "title": "Privacy Policy" },
                { "title": "Term and Condition" }
            ]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <GeneralStatusBar backgroundColor={Color.light_blue} barStyle="light-content" />
                <Header
                    leftComponent={
                        <View style={styles.nav}>
                            <View style={styles.headerLeft}>
                                <TouchableHighlight underlayColor="transparent" onPress={()=>this.props.navigation.toggleDrawer()}>
                                    <Image source={require('../../../assets/img/side_menu.png')} style={styles.menuIcon}/>
                                </TouchableHighlight>
                            </View>
                        </View>
                    } 
                    containerStyle={{
                        backgroundColor: Color.light_blue,
                        borderBottomWidth: 0,
                        height: Platform.OS === 'ios' ? 70 - 20:  70 - 20,  
                        paddingTop: Platform.OS === 'ios' ? - 20:  0 
                    }}
                />
                 
                <View style={styles.mainContainer}>
                    <View style={{width: width, alignItems: 'center' }}>
                        <Image source={require('../../../assets/img/flashpik.png')} style={styles.flashpik} />
                    </View>
                    <View style={{width: width, alignItems: 'center' }}>
                        <Text style={styles.version}>Version 1.0.0</Text>
                    </View>
                    <View style={{width: width, alignItems: 'center' }}>
                        <Image source={require('../../../assets/img/app_logo.png')} style={styles.logo} />
                    </View>

                    <View style={{ paddingVertical: width * 0.05 }}> 
                        <View style={styles.box}>
                            <TouchableWithoutFeedback>
                                <Text style={styles.title}>FAQ</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.box}>
                            <TouchableWithoutFeedback>
                                <Text style={styles.title}>Privacy Policy</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.box}>
                            <TouchableWithoutFeedback>
                                <Text style={styles.title}>Terms and Conditions</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    
                    <View style={styles.bottom_view}>
                        <Image source={require('../../../assets/img/bottom_layer.png')} style={styles.bottom_image} />
                    </View>
                </View>
            </View>
        
        );
    }
}



