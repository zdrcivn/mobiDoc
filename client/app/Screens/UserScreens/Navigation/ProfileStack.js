import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import ProfileScreen from '../ProfileScreens/ProfileScreen';
import ChangePassScreen from '../ProfileScreens/ChangePassScreen';

const Profile = createNativeStackNavigator();

export default function ProfileStack({navigation}) {
  return (
    <Profile.Navigator>
      <Profile.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Profile.Screen
        name="ChangePass"
        component={ChangePassScreen}
        options={{headerShown: false}}
      />
    </Profile.Navigator>
  );
}
