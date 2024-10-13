import {View, Text, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../context/AuthContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomAlert from '../../../Components/CustomAlert';

const CustomDrawer = props => {
  const {user, logout} = useContext(AuthContext);
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);

  return (
    <View style={{flex: 1}}>
      <CustomAlert
        displayMode={'question'}
        displayMsg={'Are you sure you want to logout?'}
        visibility={showQuestionPopup}
        okAlert={logout}
        dismissAlert={setShowQuestionPopup}
      />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#1f1f1f'}}>
        <View style={{padding: 20}}>
          {user.gender == 'Male' ? (
            <Image
              source={require('../../../assets/images/boy-profile.png')}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../../../assets/images/girl-profile.png')}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
              resizeMode="contain"
            />
          )}

          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontFamily: 'Roboto-Bold',
            }}>
            {user.first_name} {user.last_name}
          </Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#1f1f1f',
          }}
          onPress={() => setShowQuestionPopup(true)}>
          <Icon name="ios-exit-outline" size={30} color="#fff" />
          <Text
            style={{fontSize: 12, fontFamily: 'Roboto-Bold', color: '#fff'}}>
            {' '}
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
