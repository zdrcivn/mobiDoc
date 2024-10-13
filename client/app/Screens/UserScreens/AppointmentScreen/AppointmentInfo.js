import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {
  DocBoyProfile,
  DocGirlProfile,
} from '../../../Components/ImageBackgrounds';
import {AuthContext} from '../../../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AppointmentInfo({route, navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={{flex: 1}}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Consultation')}>
            <Icon name="ios-chevron-back" size={40} style={{right: 10}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.nameHeaderText}>
              Dr. {route.params.fname}
              {'\n'}
              {route.params.lname}
            </Text>
            <Text style={styles.descriptionText}>
              {route.params.description}
            </Text>
            <Text style={styles.descriptionText}>
              {route.params.time_availability}
            </Text>
          </View>
          <View>
            {route.params.gender == 'Male' ? (
              <DocBoyProfile />
            ) : (
              <DocGirlProfile />
            )}
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.aptInfoText}>Consultation Information</Text>
        </View>
        <View>
          <View>
            <View
              style={{
                marginTop: 10,
                borderRadius: 10,
              }}>
              <View>
                <Text style={{fontFamily: 'Roboto-Bold', fontSize: 16}}>
                  Status
                </Text>
                <Text style={styles.statusText}>
                  {route.params.paramStatus}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{marginTop: 10}}>
            <Text style={styles.aboutText}>Reason</Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 10,
            }}>
            <TextInput
              multiline
              numberOfLines={1}
              style={{
                width: '100%',
                color: '#000',
                marginLeft: 10,
                fontSize: 15,
                fontFamily: 'Roboto-Light',
              }}
              editable={false}
              value={route.params.paramReason}
            />
          </View>
        </View>
        {route.params.note == null ? (
          <View></View>
        ) : (
          <View style={{marginTop: 10}}>
            <Text style={styles.aboutText}>Note</Text>
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 10,
              }}>
              <TextInput
                multiline
                numberOfLines={1}
                placeholder="This field is to filled by the doctor only"
                style={{
                  width: '100%',
                  color: '#000',
                  marginLeft: 10,
                  fontSize: 15,
                  fontFamily: 'Roboto-Light',
                }}
                editable={false}
                value={route.params.note}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
  },
  nameHeaderText: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
    color: '#1f1f1f',
  },
  aboutView: {
    marginTop: 10,
  },
  descriptionText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  aboutText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  aptInfoText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#1f1f1f',
  },
  statusText: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
});
