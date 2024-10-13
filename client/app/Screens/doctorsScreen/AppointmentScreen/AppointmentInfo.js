import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState, useContext, useEffect} from 'react';
import {BoyProfile, GirlProfile} from '../../../Components/ImageBackgrounds';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import CustomAlert from '../../../Components/CustomAlert';
import {AuthContext} from '../../../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const AppointmentInfo = ({route, navigation}) => {
  const [disabled, setDisabled] = useState(false);
  const [disabledDecline, setDisabledDecline] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showDeclinedPopup, setShowDeclinedPopup] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isSelected1, setIsSelected1] = useState(false);
  const [choices, setChoices] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabled1, setIsDisabled1] = useState(false);

  const {user} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <CustomAlert
        displayMode={'success'}
        displayMsg={'Consultation Approved'}
        visibility={showSuccessPopup}
        okAlert={setShowSuccessPopup}
      />
      <CustomAlert
        displayMode={'success'}
        displayMsg={'Consultation Declined'}
        visibility={showDeclinedPopup}
        okAlert={setShowDeclinedPopup}
      />

      <View style={{flex: 1}}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ListOfAppointments')}>
            <Icon name="ios-chevron-back" size={40} style={{right: 10}} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.nameHeaderText}>
            {route.params.fname}
            {'\n'}
            {route.params.lname}
          </Text>
          {route.params.gender == 'Male' ? <BoyProfile /> : <GirlProfile />}
        </View>

        <View>
          <Text style={styles.aboutText}>About</Text>
        </View>
        <View style={styles.aboutView}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontFamily: 'Roboto-Medium', marginRight: 10}}>
              Family History:
            </Text>
            <Text style={{fontFamily: 'Roboto-Regular'}}>
              {route.params.family_history}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontFamily: 'Roboto-Medium', marginRight: 10}}>
              Age:
            </Text>
            <Text style={{fontFamily: 'Roboto-Regular'}}>
              {route.params.age}
            </Text>
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
          <View style={{marginTop: 20}}>
            <Text style={{fontFamily: 'Roboto-Italic'}}>
              Below are the choices before declining
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              value={isSelected}
              disabled={isDisabled}
              onValueChange={newValue => {
                if (isSelected == false) {
                  setChoices(`I can't accommodate right now.`);
                  setIsSelected(newValue);
                  setDisabledDecline(false);
                  setDisabled(true);
                  setIsDisabled1(true);
                } else {
                  setChoices('');
                  setIsDisabled1(false);
                  setDisabledDecline(true);
                  setDisabled(false);
                  setIsSelected(newValue);
                }
              }}
            />
            <Text style={{fontFamily: 'Roboto-Medium', fontSize: 13}}>
              I can't accommodate right now.
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              value={isSelected1}
              disabled={isDisabled1}
              onValueChange={newValue => {
                if (isSelected1 == false) {
                  setChoices(`Your reason is not not under my field.`);
                  setIsSelected1(newValue);
                  setDisabled(true);
                  setIsDisabled(true);
                  setDisabledDecline(false);
                } else {
                  setChoices('');
                  setIsDisabled(false);
                  setDisabledDecline(true);
                  setDisabled(false);
                  setIsSelected1(newValue);
                }
              }}
            />
            <Text style={{fontFamily: 'Roboto-Medium', fontSize: 13}}>
              Your reason is not under my field.
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          marginBottom: 10,
          height: 40,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '50%',
            backgroundColor: '#0077b6',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderWidth: 1,
            justifyContent: 'center',
          }}
          disabled={disabled}
          onPress={async () => {
            try {
              const resp = await axios.put(
                `${BASE_URL}/appointments/status/${route.params.paramKey}`,
                {
                  status: 'Approved',
                },
              );
              if (resp.status == 200) {
                await axios.post(`${BASE_URL}/inbox`, {
                  user1Id: user.id,
                  user2Id: route.params.paramUserId,
                  message: `Your consultation for today has been approved!`,
                });
                setDisabled(true);
                setDisabledDecline(true);
              } else {
                throw new Error();
              }
            } catch (error) {
              console.log('Error', error);
              alert('Error accepting consultation');
            }
            setShowSuccessPopup(true);
            setIsDisabled(true);
            setIsDisabled1(true);
          }}>
          <Text
            style={{
              color: '#fff',
              alignSelf: 'center',
              fontSize: 16,
              fontFamily: 'Roboto-Bold',
            }}>
            Accept
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={disabledDecline}
          style={{
            width: '50%',
            backgroundColor: 'grey',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth: 1,
            justifyContent: 'center',
          }}
          onPress={async () => {
            try {
              const resp = await axios.put(
                `${BASE_URL}/appointments/status/${route.params.paramKey}`,
                {
                  status: 'Declined',
                  note: choices,
                },
              );
            } catch (error) {
              console.log('Error', error);
              alert('Error declining consultation');
            }
            setShowDeclinedPopup(true);
            setDisabledDecline(true);
            setDisabled(true);
            setIsDisabled(true);
            setIsDisabled1(true);
          }}>
          <Text
            style={{
              color: '#fff',
              alignSelf: 'center',
              fontSize: 16,
              fontFamily: 'Roboto-Bold',
            }}>
            Decline
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentInfo;
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
