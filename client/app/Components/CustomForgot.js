import {View, Text, Modal, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomForgot({
  visibility,
  dismissAlert,
  okAlert,
  value,
  onChangeText,
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
              height: 200,
              width: '90%',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 7,
              elevation: 10,
            }}>
            <View style={{marginTop: 10}}>
              <Text style={{fontFamily: 'Roboto-Bold'}}>
                Please enter your email
              </Text>
            </View>
            <View
              style={{
                width: '90%',
                borderBottomWidth: 1,
                borderColor: '#1f1f1f',
                marginTop: 20,
                marginBottom: 45,
                borderRadius: 5,
              }}>
              <TextInput
                placeholder="Enter your email address"
                value={value}
                style={{fontFamily: 'Roboto-Regular'}}
                onChangeText={onChangeText}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 50,
              }}>
              <>
                <TouchableOpacity
                  style={{
                    width: '40%',
                    justifyContent: 'center',
                    backgroundColor: '#0077b6',
                    borderColor: '#ddd',
                    borderBottomWidth: 0,
                    borderRadius: 5,
                    bottom: 0,
                    marginBottom: 10,
                    marginRight: 10,
                    alignItems: 'center',
                  }}
                  onPress={() => okAlert(false)}>
                  <Text style={{fontFamily: 'Roboto-Bold', color: '#fff'}}>
                    OK
                  </Text>
                </TouchableOpacity>
              </>
              <>
                <TouchableOpacity
                  style={{
                    width: '40%',
                    justifyContent: 'center',
                    backgroundColor: 'grey',
                    borderColor: '#ddd',
                    borderBottomWidth: 0,
                    borderRadius: 5,
                    bottom: 0,
                    marginBottom: 10,
                    alignItems: 'center',
                  }}
                  onPress={() => dismissAlert(false)}>
                  <Text style={{fontFamily: 'Roboto-Bold', color: '#fff'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
