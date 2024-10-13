import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Homescreen/HomeScreen';
import AppointmentScreen from '../AppointmentScreen/AppointmentScreen';

import AppointmentInfo from '../AppointmentScreen/AppointmentInfo';
import ProfileStack from './ProfileStack';
import MessageStack from './MessageStack';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const SchedStack = createNativeStackNavigator();
//const Profile = createNativeStackNavigator();

// const ProfileStack = ({navigation}) => (
//   <Profile.Navigator>
//     <Profile.Screen
//       name="Profile"
//       component={ProfileScreen}
//       options={{headerShown: false}}
//     />
//     <Profile.Screen
//       name="ChangePass"
//       component={ChangePassScreen}
//       options={{headerShown: false}}
//     />
//   </Profile.Navigator>
// );

const AddStack = ({navigation}) => (
  <SchedStack.Navigator>
    <SchedStack.Screen
      name="ListOfAppointments"
      component={AppointmentScreen}
      options={{headerShown: false}}
    />
    <SchedStack.Screen
      name="Appointment"
      component={AppointmentInfo}
      options={({route}) => ({
        headerShown: false,
      })}
    />
  </SchedStack.Navigator>
);

const TabNavigator = () => {
  const getRouteName = route => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName == 'Appointment') {
      return 'none';
    } else if (routeName == 'ChatMessage') {
      return 'none';
    } else if (routeName == 'ChangePass') {
      return 'none';
    } else if (routeName == 'VideoCall') {
      return 'none';
    }
    return 'flex';
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {height: 70, backgroundColor: '#1f1f1f'},
      }}>
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-home-sharp" color={'#fff'} size={size} />
          ),
          tabBarActiveBackgroundColor: '#2A2A2A',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={MessageStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            height: 70,
            backgroundColor: '#1f1f1f',
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-chatbubble-sharp" color={'#fff'} size={size} />
          ),
          tabBarActiveBackgroundColor: '#2A2A2A',
        })}
      />

      <Tab.Screen
        name="AppointmentList"
        component={AddStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            height: 70,
            backgroundColor: '#1f1f1f',
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-calendar" color={'#fff'} size={size} />
          ),
          tabBarActiveBackgroundColor: '#2A2A2A',
        })}
      />
      <Tab.Screen
        component={ProfileStack}
        name="Profile"
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            height: 70,
            backgroundColor: '#1f1f1f',
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-person-sharp" color={'#fff'} size={size} />
          ),
          tabBarActiveBackgroundColor: '#2A2A2A',
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
