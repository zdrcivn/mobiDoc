import {Modal, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

export default function CustomAlert({
  displayMode,
  displayMsg,
  visibility,
  dismissAlert,
  okAlert,
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
            <View style={{alignItems: 'center', margin: 10}}>
              {displayMode == 'success' ? (
                <>
                  <Ionicons
                    name="checkmark-done-circle"
                    color={'green'}
                    size={80}
                  />
                </>
              ) : displayMode == 'failed' ? (
                <>
                  <MaterialIcons name="cancel" color={'red'} size={80} />
                </>
              ) : (
                <Octicons name="question" color={'#000'} size={70} />
              )}
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 5,
                  fontFamily: 'Roboto-Medium',
                }}>
                {displayMsg}
              </Text>
            </View>
            {displayMode == 'question' ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => okAlert(false)}
                    activeOpacity={0.9}
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
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        margin: 15,
                        fontSize: 12,
                        fontFamily: 'Roboto-Medium',
                      }}>
                      OK
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => dismissAlert(false)}
                    style={{
                      width: '40%',
                      justifyContent: 'center',
                      backgroundColor: 'grey',
                      borderColor: '#ddd',
                      borderBottomWidth: 0,
                      borderRadius: 5,
                      bottom: 0,
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        margin: 15,
                        fontSize: 12,
                        fontFamily: 'Roboto-Medium',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
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
                  style={{
                    color: 'white',
                    margin: 15,
                    fontSize: 12,
                    fontFamily: 'Roboto-Bold',
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
