import React from 'react';
import {ImageBackground} from 'react-native';

export const DocBoyProfile = () => {
  return (
    <ImageBackground
      source={require('../assets/images/doc.png')}
      style={{width: 90, height: 90, marginTop: 10}}
      resizeMode="contain"
    />
  );
};

export const DocGirlProfile = () => {
  return (
    <ImageBackground
      source={require('../assets/images/girl-doctor.png')}
      style={{width: 90, height: 90, marginTop: 10}}
      resizeMode="contain"
    />
  );
};

export const BoyProfile = () => {
  return (
    <ImageBackground
      source={require('../assets/images/boy-profile.png')}
      style={{width: 90, height: 90}}
      resizeMode="contain"
    />
  );
};

export const GirlProfile = () => {
  return (
    <ImageBackground
      source={require('../assets/images/girl-profile.png')}
      style={{width: 90, height: 90}}
      resizeMode="contain"
    />
  );
};
