import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';

export default function TimeAvailabilityModal({
  visibility,
  okAlert,

  displayMessage,
}) {
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
              height: '35%',
              width: '90%',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 7,
              elevation: 10,
            }}>
            <View
              style={{
                justifyContent: 'center',
                marginTop: 30,
                alignItems: 'center',
                marginHorizontal: 20,
                marginVertical: 20,
              }}>
              <Text style={{textAlign: 'center', fontFamily: 'Roboto-Medium'}}>
                {displayMessage}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => okAlert(false)}
              style={{
                width: '95%',
                borderRadius: 0,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                backgroundColor: 'blue',
                borderColor: '#ddd',
                borderBottomWidth: 0,
                borderRadius: 5,
                bottom: 0,
                marginBottom: 10,
              }}>
              <Text
                style={{color: 'white', margin: 15, fontFamily: 'Roboto-Bold'}}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
