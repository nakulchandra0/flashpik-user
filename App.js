/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.disableYellowBox = true;
import React from 'react';
import { AppRegistry, Platform, Dimensions, View, Text, Image, StatusBar, } from 'react-native';
var { width, height } = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Color from './source/component/color'
import Font from './source/component/font'

import { AnimatedCircleBarComponent } from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';
import { FlexibleTabBarComponent } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
import { createAppContainer, createSwitchNavigator, StackActions } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

//Import Custom Sidebar
import CustomSidebarMenu from './source/component/sidemenu';

import Splash from './source/pages/splash';
import Intro from './source/pages/introduction/index';
import Signup from './source/pages/signup/index';
import Signin from './source/pages/signin/index';
import Reset from './source/pages/reset/index';

import Home from './source/pages/welcome/index';
import Track from './source/pages/introduction/index';
import Account from './source/pages/signin/index';


import Pickup from './source/pages/pickup/index'
import Drop from './source/pages/drop/index'
import Book from './source/pages/book/index'
import Details from './source/pages/details/index'
import Payment from './source/pages/payment/index'
import Thanks from './source/pages/thankyou/index'

import Order from './source/pages/orders/index'
import OrderDetails from './source/pages/orderdetail/index'
import Ordertrack from './source/pages/ordertrack/index'

import Profile from './source/pages/profile/index'

import About from './source/pages/about/index'
import Notification from './source/pages/notification/index'
import Dispute from './source/pages/dispute/index'
import Disputedetail from './source/pages/dispute/chat'
import styles from './source/component/statusbar/styles';

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icon;
  let iconName, size;
  if (routeName === 'Home') {
    focused ? iconName = require('./assets/img/home-activate.png') : iconName = require('./assets/img/home-deactive.png');
    size = width * 0.07;

  } else if (routeName === 'Track') {
    focused ? iconName = require('./assets/img/track-activate.png') : iconName = require('./assets/img/track-deactive.png');
    size = width * 0.07;
  }
  else if (routeName === 'Account') {
    focused ? iconName = require('./assets/img/account-activate.png') : iconName = require('./assets/img/account-deactive.png');
    size = width * 0.07;
  }

  return (
    <View>
      <Image source={iconName} style={{ width: size, height: size }} />
    </View>
  )
};

const WelcomeStack = createStackNavigator(
  {
    WelcomeHome: {
      screen: Home,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
    Pickup: {
      screen: Pickup,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
    Drop: {
      screen: Drop,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
  },
  {
    initialRouteName: 'WelcomeHome',
  }
);

const OrderStack = createStackNavigator(
  {
    OrderHome: {
      screen: Order,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
    DetailsTrack: {
      screen: OrderDetails,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },

  },
  {
    initialRouteName: 'OrderHome',
  }
);

const MainStack = createBottomTabNavigator({
  Home: {
    screen: WelcomeStack,
  },
  Track: {
    screen: OrderStack,
  },
  Account: {
    screen: Profile,
  },
},
  {
    tabBarComponent: AnimatedCircleBarComponent,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.dispatch(StackActions.popToTop());
        defaultHandler()
      }
    }),
    tabBarOptions: {
      inactiveTintColor:Color.dark_blue,
      lableStyle: {
        fontFamily: Font.bold,
      },
      style: {
        height: (Platform.OS == "ios") ? (DeviceInfo.hasNotch()) ? (width * 0.22) : width * 0.16 : width * 0.16,
        alignItems: 'center',
        backgroundColor: Color.light_blue,
        fontFamily: Font.bold,
      },
    },
    initialRouteName: 'Home',
  });

const subStack = createBottomTabNavigator({
  Home: {
    screen: WelcomeStack,
  },
  Track: {
    screen: OrderStack,
  },
  Account: {
    screen: Profile,
  },
},
  {
    tabBarComponent: AnimatedCircleBarComponent,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.dispatch(StackActions.pop(0));
        defaultHandler()
      },
    }),
    tabBarOptions: {
      lableStyle: {
        fontFamily: Font.bold,
      },
      style: {
        height: (Platform.OS == "ios") ? (DeviceInfo.hasNotch()) ? (width * 0.22) : width * 0.16 : width * 0.16,
        alignItems: 'center',
        backgroundColor: Color.light_blue,
        fontFamily: Font.bold,
      },
    },
    initialRouteName: 'Account',
  });

const Navigation = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
        drawerLockMode: 'unlocked',
      }
    },
    Intro: {
      screen: Intro,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
        drawerLockMode: 'unlocked',
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
        drawerLockMode: 'unlocked',
      }
    },
    Signin: {
      screen: Signin,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
        drawerLockMode: 'unlocked',
      }
    },
    Reset: {
      screen: Reset,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
        drawerLockMode: 'unlocked',
      }
    },
    Menu: {
      screen: MainStack,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
    Profile: {
      screen: subStack,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
    Book: {
      screen: Book,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
    Details: {
      screen: Details,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,

      }
    },
    Payment: {
      screen: Payment,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
    Thanks: {
      screen: Thanks,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
    Ordertrack: {
      screen: Ordertrack,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
    Notification: {
      screen: Notification,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
    Dispute: {
      screen: Dispute,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    },
    Disputedetail: {
      screen: Disputedetail,
      navigationOptions: {
        gesturesEnabled: false,
        header: null,
      }
    }

  },
  {
    initialRouteName: 'Splash',
    mode: 'slide',
    navigationOptions: {
      gesturesEnabled: false
    }
  });

Navigation.navigationOptions = ({ navigation }) => {
  // console.log(JSON.stringify(navigation))
  let drawerLockMode = 'locked-closed';
  //console.log(JSON.stringify(navigation.state.routes[0].routeName))
  if (navigation.state.routes[0].routeName == "Menu" || navigation.state.routes[0].routeName == "Profile") {
    drawerLockMode = 'unlocked';
  }
  return {
    drawerLockMode,
  };
};

const DrawerNavigator = createDrawerNavigator({
  Main: {
    screen: Navigation,
    navigationOptions: {
      header: null,
    }
  },
},
  {
    initialRouteName: 'Main',
    drawerType: 'back',
    contentComponent: CustomSidebarMenu,
    drawerWidth: Dimensions.get('window').width - Dimensions.get('window').width * 25 / 100,
    overlayColor: Color.transparent,
  }
);

const AppNavigator = createSwitchNavigator({
  Home: DrawerNavigator,
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
