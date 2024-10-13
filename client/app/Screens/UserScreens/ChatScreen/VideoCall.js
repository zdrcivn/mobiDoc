import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const VideoCall = ({route, navigation}) => {
  const [micIcon, setIsMicOn] = useState('mic-off-sharp');
  const [camIcon, setCamIcon] = useState('camera-off');
  return (
    <View style={styles.container}>
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{route.params.userName}</Text>
        <Text style={styles.ring}>ringing...</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="ios-camera-reverse" color={'#fff'} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            if (camIcon == 'camera-off') {
              setCamIcon('camera');
            }
            if (camIcon == 'camera') {
              setCamIcon('camera-off');
            }
          }}>
          <MaterialCommunityIcon name={camIcon} color={'#fff'} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            if (micIcon == 'mic-off-sharp') {
              setIsMicOn('mic-sharp');
            }
            if (micIcon == 'mic-sharp') {
              setIsMicOn('mic-off-sharp');
            }
          }}>
          <Icon name={micIcon} color={'#fff'} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, {backgroundColor: 'red'}]}
          onPress={() =>
            navigation.navigate('ChatMessage', {
              userName: route.params.userName,
            })
          }>
          <MaterialCommunityIcon name="phone-hangup" color={'#fff'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoCall;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#7b4e80',
  },
  cameraPreview: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    marginTop: 40,
    marginBottom: 15,
  },
  ring: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Roboto-Light',
  },
  buttonContainer: {
    backgroundColor: '#333333',
    padding: 20,
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    backgroundColor: '#4a4a4a',
    padding: 15,
    borderRadius: 50,
  },
});
