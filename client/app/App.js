import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './Screens/UserScreens/Navigation/AuthStack';
import {AuthProvider} from '../app/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthStack />
        {/* <AppStack /> */}
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
