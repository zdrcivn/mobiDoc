import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../component/CustomDrawer';
import TabNavigator from './TabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import AboutScreen from '../../AboutScreen';
const Drawer = createDrawerNavigator();

const DocAppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="ios-home-outline"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),

          drawerStatusBarAnimation: 'slide',
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="ios-information-circle-outline"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
          drawerStatusBarAnimation: 'slide',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DocAppStack;
