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

 

/* common components */
import GeneralStatusBar from '../../component/statusbar/index';
import Color from '../../component/color';
import Font from '../../component/font';
import Header from '../../component/header';
import styles  from './styles';

var { width, height } = Dimensions.get('window');

export default class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [
                { "title": "Notification Title", "date": "Dec 25" },
                { "title": "Notification Title", "date": "Dec 25" },
                { "title": "Notification Title", "date": "Dec 25" },
                { "title": "Notification Title", "date": "Dec 25" },
                { "title": "Notification Title", "date": "Dec 25" },
                { "title": "Notification Title", "date": "Dec 25" },
                { "title": "Notification Title", "date": "Dec 25" },
               
            ],

        };
    }
  
    renderItem({ item, index }) {
        const lengthArray = this.state.options.length;
        return (
            <TouchableHighlight underlayColor="transparent">
                <View style={lengthArray-1 == index ? [styles.navbar, { borderColor:Color.dark_blue, borderBottomWidth: 1, marginBottom: width * 0.1 }]: styles.navbar}>
                    <View style={styles.leftContainer}>
                        <Image source={require('../../../assets/img/notificationIcon.png')} style={styles.icon}/>
                    </View>
                    <View style={styles.centerContainer}>
                        <Text style={styles.notTitle}>{item.title}</Text>
                        <Text style={[styles.notTitle, styles.date]}>{item.date}</Text>
                    </View>
                    <View style={styles.rightContainer}></View>
                </View>
            </TouchableHighlight>
        );
    }   

    
    _navigate = () => {
        this.setState({ isModalVisibleInfo: false })
        this.props.navigation.navigate('Thanks');
    }
  
    render() {
        const { region, pulse, locationName } = this.state
        return (
            <View style={[styles.container, styles.dltContainer]}>  
                <GeneralStatusBar backgroundColor={Color.white} barStyle="dark-content" />
                <Header 
                    onMenu={() => this.props.navigation.toggleDrawer()}
                    onNotification={() => this.props.navigation.navigate('Notification')}
                /> 

                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Notification</Text> 
                </View>

                <ScrollView>
                    <View style={styles.optionContainer}>
                        <FlatList
                            refreshing={true}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.options}
                            extraData={this.state}
                            numColumns={1}
                            renderItem={this.renderItem.bind(this)}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </ScrollView>
            </View>
    );
  }
}
 