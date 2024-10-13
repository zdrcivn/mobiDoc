import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import CustomAlert from '../Components/CustomAlert';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {BASE_URL} from '../utils/config';
import {AuthContext} from '../context/AuthContext';

const AboutScreen = () => {
  const {user} = useContext(AuthContext);
  const [isFeedBack, setIsFeedback] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showError1, setShowError1] = useState(false);

  const onChangeFeedbackHandler = isFeedBack => {
    setIsFeedback(isFeedBack);
  };

  const onSubmit = async () => {
    if (!isFeedBack) {
      setShowError(true);
      return;
    }
    try {
      const resp = await axios.post(`${BASE_URL}/feedback/${user.id}/submit`, {
        feedback: isFeedBack,
        user_id: user.id,
      });
      if (resp.status == 201) {
        setShowSuccessPopup(true);
        setIsFeedback('');
      }
    } catch (error) {
      console.log('Error submitting feedback', error);
      setShowError1(true);
      setIsFeedback('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingTop: 10}}>
        <CustomAlert
          visibility={showSuccessPopup}
          displayMode={'success'}
          displayMsg={'Feedback submitted successfully!'}
          okAlert={setShowSuccessPopup}
        />
        <CustomAlert
          visibility={showError}
          displayMode={'failed'}
          displayMsg={'Please enter feedback'}
          okAlert={setShowError}
        />
        <CustomAlert
          visibility={showError1}
          displayMode={'failed'}
          displayMsg={'You have already submitted a feedback'}
          okAlert={setShowError1}
        />
        <Text style={styles.header}>About</Text>
        <View style={{justifyContent: 'center', marginTop: 30}}>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Text
              style={{fontSize: 40, fontFamily: 'Roboto-Bold', color: '#fff'}}>
              mobi
            </Text>
            <Text
              style={{
                fontSize: 35,
                color: '#00b4d8',
                fontFamily: 'Roboto-Medium',
              }}>
              Doc
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'justify',
              letterSpacing: 1,
              fontFamily: 'Roboto-Light',
              color: '#fff',
            }}>
            {'  '}Is an all-in-one health app for one’s basic needs. Patients
            can consult a doctor anytime, anywhere, and get online consultation
            for their health concerns. {'\n'}
            {'  '}
            We are a group of students who wish to improve the way healthcare is
            delivered and contribute in the healthcare industry. We hope to
            build an ecosystem in which patients may easily obtain healthcare
            services.
          </Text>
        </View>
        <View style={styles.feedBack}>
          <Text style={styles.header}>FeedBack</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder="State your feedback here"
            placeholderTextColor="#fff"
            style={{color: '#fff', fontFamily: 'Roboto-Light', fontSize: 12}}
            value={isFeedBack}
            onChangeText={onChangeFeedbackHandler}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => onSubmit()}>
            <Text
              style={{
                color: '#1f1f1f',
                fontFamily: 'Roboto-Bold',
                fontSize: 16,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text style={{fontSize: 20, fontFamily: 'Roboto-Bold'}}>mobi</Text>
          <Text style={{fontSize: 15, fontFamily: 'Roboto-Medium'}}>Doc</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 12, fontFamily: 'Roboto-Medium'}}>
            All rights reserved 2022
          </Text>
        </View>
        <View style={styles.socialIcon}>
          <View>
            <Icon name="ios-logo-facebook" size={30} style={styles.iconStyle} />
          </View>
          <View>
            <Icon name="ios-logo-twitter" size={30} style={styles.iconStyle} />
          </View>
          <View>
            <Icon
              name="ios-logo-instagram"
              size={30}
              style={styles.iconStyle}
            />
          </View>
          <View>
            <Icon
              name="logo-google-playstore"
              size={30}
              style={styles.iconStyle}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#1f1f1f',
  },
  header: {
    fontSize: 40,
    fontFamily: 'Roboto-Black',
    color: '#fff',
  },
  feedBack: {
    marginTop: 30,
  },
  textInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginTop: 10,
  },
  submitButton: {
    width: '80%',
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 25,
  },
  socialIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 25,
  },
  iconStyle: {
    margin: 10,
  },
});
