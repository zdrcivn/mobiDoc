import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Homescreen/HomeScreen';
import AppointmentScreen from '../AppointmentScreen/AppointmentScreen';
import AddScreen from '../AddScreen/AddScreen';
import Appointment from '../AddScreen/Appointment';

import MessageStack from './MessageStack';
import ProfileStack from '../Navigation/ProfileStack';
import ConsultationStack from './ConsultationStack';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const SchedStack = createNativeStackNavigator();

const AddStack = ({navigation}) => (
  <SchedStack.Navigator>
    <SchedStack.Screen
      name="DoctorList"
      component={AddScreen}
      options={{headerShown: false}}
    />
    <SchedStack.Screen
      name="Appointment"
      component={Appointment}
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
    } else if (routeName == 'VideoCall') {
      return 'none';
    } else if (routeName == 'ChangePass') {
      return 'none';
    } else if (routeName == 'ConsultationInfo') {
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
        component={MessageStack}
      />
      <Tab.Screen
        name="Add"
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            height: 70,
            backgroundColor: '#1f1f1f',
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-add-circle" color={'#fff'} size={60} />
          ),
          tabBarActiveBackgroundColor: '#2A2A2A',
        })}
        component={AddStack}
      />
      <Tab.Screen
        name="Appointment"
        component={ConsultationStack}
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
        // options={{
        //   tabBarIcon: ({color, size}) => (
        //     <Icon name="ios-calendar" color={'#fff'} size={size} />
        //   ),
        //   tabBarActiveBackgroundColor: '#2A2A2A',
        // }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
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
