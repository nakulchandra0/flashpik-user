import React from 'react';
import { Platform, StatusBar, Text, View, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Header, Badge,} from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Icon } from 'react-native-elements';

var { width, height } = Dimensions.get('window');
 
import Color from './color'
import Font from './font'
 

export default class HeaderFile extends React.Component {
    render() {
        return (
            <Header
                leftComponent={
                    <View style={styles.nav}>
                        <View style={styles.headerLeft}>
                            <TouchableHighlight underlayColor="transparent" onPress={this.props.onMenu}>
                                <Image source={require('../../assets/img/side_menu.png')} style={styles.menuIcon}/>
                            </TouchableHighlight>
                        </View>
                    </View>
                } 
                rightComponent={
                    <View style={styles.nav}>
                        <TouchableHighlight underlayColor="transparent" onPress={this.props.onNotification}>
                            <View style={{paddingRight: width * 0.02}}>
                                <Image source={require('../../assets/img/notification.png')} style={styles.notificationIcon}/>
                                <Badge status="success" containerStyle={styles.badge} badgeStyle={{backgroundColor: Color.light_blue, borderColor: Color.light_blue}} value={<Text style={styles.bText}>2</Text>} />
                            </View>
                        </TouchableHighlight>
                    </View>
                } 
                containerStyle={{
                    backgroundColor: Color.white,
                    borderBottomWidth: 0,
                    height: Platform.OS === 'ios' ? 70 - 20:  70 - 20,  
                    paddingTop: Platform.OS === 'ios' ? - 20:  0 
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    headerLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: width * 0.025,
        //borderWidth: 1,
    },
    
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: width * 0.03
    },
    
    menuIcon: {
        width: width * 0.08, 
        height: width * 0.08, 
        resizeMode:'contain'
    },

    notificationIcon: {
        width: width * 0.065, 
        height: width * 0.065, 
        resizeMode:'contain'
    },

    badge: {
        position: 'absolute', 
        top: -6, 
        right: 2
    },

    bText: {
        color: Color.white, 
        fontSize: width * 0.03
    },
  
});


