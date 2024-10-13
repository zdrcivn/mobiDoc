import {Modal, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomAlert1({visibility, okAlert, dismissAlert}) {
  return (
    <View>
      <Modal visible={visibility} animationType={'fade'} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              height: 150,
              width: '90%',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 7,
              elevation: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => okAlert(false)}
              style={{
                width: '95%',
                height: '34%',
                borderRadius: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1f1f1f',
                borderColor: '#ddd',
                borderBottomWidth: 0,
                borderRadius: 5,
                //bottom: 0,
                marginTop: 16,
              }}>
              <Text
                style={{color: 'white', margin: 15, fontFamily: 'Roboto-Bold'}}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => dismissAlert(false)}
              style={{
                width: '95%',
                borderRadius: 0,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                backgroundColor: '#1f1f1f',
                borderColor: '#ddd',
                borderBottomWidth: 0,
                borderRadius: 5,
                bottom: 0,
                marginBottom: 10,
              }}>
              <Text
                style={{color: 'white', margin: 15, fontFamily: 'Roboto-Bold'}}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
