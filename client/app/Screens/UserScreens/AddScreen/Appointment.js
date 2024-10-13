import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useState, useContext} from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import CustomAlert from '../../../Components/CustomAlert';
import TimeAvailabilityModal from '../../../Components/TimeAvailabilityModal';
import {
  DocBoyProfile,
  DocGirlProfile,
} from '../../../Components/ImageBackgrounds';

const Appointment = ({route, navigation}) => {
  const [reason, setReason] = useState('');
  const {user} = useContext(AuthContext);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrPopup, setShowErrPopup] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const onSubmit = async () => {
    if (!reason) {
      setShowErrPopup(true);
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/create-appointment`, {
        user_id: user.id,
        reason,
        doctor_id: route.params.paramKey,
      });
      if (response.status === 200) {
        setShowSuccessPopup(true);
        setReason('');
      } else {
        throw new Error('Error');
      }
    } catch (error) {
      console.log('Err', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TimeAvailabilityModal
        visibility={showDetails}
        okAlert={setShowDetails}
        displayMessage={`Hi! I am Dr. ${
          route.params.fname
        } and is available from ${route.params.time_availability} only.${'\n'}
Consultations outside the said time are considered late and will not be entertained.${'\n'}
Please be guided. Thank you!
        `}
      />
      <CustomAlert
        displayMode={'success'}
        displayMsg={'Appointment for consultation submitted'}
        visibility={showSuccessPopup}
        okAlert={() => {
          setIsDisabled(true);
          setShowSuccessPopup(false);
        }}
      />
      <CustomAlert
        displayMode={'failed'}
        displayMsg={'Please provide a reason'}
        visibility={showErrPopup}
        okAlert={setShowErrPopup}
      />
      <View style={{flex: 1}}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('DoctorList')}>
            <Icon name="ios-chevron-back" size={40} style={{right: 10}} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.headerText}>
              Dr. {route.params.fname} {'\n'}
              {route.params.lname}
            </Text>
            <Text style={styles.descriptionText}>
              {route.params.description}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
                {route.params.time_availability}
              </Text>
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => setShowDetails(true)}>
                <Icon name="ios-help-circle-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {route.params.gender == 'Male' ? (
              <DocBoyProfile />
            ) : (
              <DocGirlProfile />
            )}
          </View>
        </View>
        <View style={styles.header2Container}>
          <Text style={styles.headerText3}>Schedule a {'\n'}Consultation</Text>
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="State your reason here"
            multiline
            numberOfLines={1}
            style={{
              fontSize: 15,
              color: '#000',
              fontFamily: 'Roboto-Light',
            }}
            onChangeText={val => {
              setReason(val);
            }}
            value={reason}
          />
        </View>
      </View>

      <View style={{marginTop: 130}}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={onSubmit}
          disabled={isDisabled}>
          <Text
            style={{color: '#fff', fontSize: 16, fontFamily: 'Roboto-Bold'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Appointment;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
    color: '#000',
  },
  descriptionText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  header2Container: {
    marginTop: 40,
  },
  headerText2: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerText3: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#000',
  },
  textInputContainer: {
    width: '100%',
    height: 180,
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 15,
  },
  submitButton: {
    width: '80%',
    height: 50,
    //backgroundColor: '#bdeaee',
    backgroundColor: '#0077b6',
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
