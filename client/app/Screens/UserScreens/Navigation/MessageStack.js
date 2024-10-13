import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../ChatScreen/ChatScreen';
import MessageScreen from '../ChatScreen/MessageScreen';
import VideoCall from '../ChatScreen/VideoCall';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatStack = createNativeStackNavigator();

const MessageStack = ({navigation}) => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <ChatStack.Screen
        name="ChatMessage"
        component={MessageScreen}
        options={({route}) => ({
          title: route.params.userName || route.params.paramKey,
          headerTitleStyle: {
            fontFamily: 'Roboto-Bold',
          },
          headerBackTitle: route.params.userGender,
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() =>
                  navigation.navigate('VideoCall', {
                    userName: route.params.userName,
                    userGender: route.params.userGender,
                  })
                }>
                <Icon name="ios-videocam" size={30} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <ChatStack.Screen
        name="VideoCall"
        component={VideoCall}
        options={({route}) => ({
          headerShown: false,
          headerStyle: {
            backgroundColor: '#7b4e80',
          },
          headerTintColor: '#fff',
        })}
      />
    </ChatStack.Navigator>
  );
};

export default MessageStack;
