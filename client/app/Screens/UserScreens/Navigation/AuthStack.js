import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../SignInScreen/SignIn';
import SignUp from '../SignUpScreen/SignUp';
import Next from '../SignUpScreen/Next';
import AppStack from '../Navigation/AppStack';
import {AuthContext} from '../../../context/AuthContext';

import DocAppStack from '../../doctorsScreen/navigation/DocAppStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const {user} = useContext(AuthContext);
  return (
    <Stack.Navigator
      //screenOptions={{headerShown: false}}
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      {user.role == 'patient' ? (
        <Stack.Screen name="HomeScreen" component={AppStack} />
      ) : user.role == 'doctor' ? (
        <>
          <Stack.Screen name="Doc Homepage" component={DocAppStack} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Next" component={Next} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
