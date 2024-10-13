import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import CustomAlert from '../../../Components/CustomAlert';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';

export default function Next({route, navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const onSubmit = async () => {
    if (!email) {
      setShowError(true);
      return;
    } else if (!password) {
      setShowError(true);
      return;
    } else if (password !== confirmPass) {
      setShowError(true);
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/create-user`, {
        first_name: route.params.first_name,
        last_name: route.params.last_name,
        age: route.params.age,
        gender: route.params.gender,
        family_history: route.params.family_history,
        email: email,
        password: password,
      });
      if (response.status == 200) {
        setShowSuccess(true);
        setEmail('');
        setPassword('');
        setConfirmPass('');
        //navigation.navigate('SignIn');
      }
    } catch (err) {
      //console.log('Error', err);
      setShowError(true);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <CustomAlert
        displayMode="failed"
        visibility={showError}
        okAlert={setShowError}
        displayMsg={
          !email
            ? 'Please enter an email'
            : !password
            ? 'Please enter a password'
            : password !== confirmPass
            ? 'Password did not match'
            : 'Email already exist'
        }
      />
      <CustomAlert
        displayMode="success"
        visibility={showSuccess}
        okAlert={() => navigation.navigate('SignIn')}
        displayMsg={'User created'}
      />
      <View style={{marginLeft: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Icon
            name="chevron-back"
            size={35}
            color="#000"
            style={{marginTop: 20, right: 10}}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <Text
            style={{fontSize: 30, fontFamily: 'Roboto-Bold', color: '#000'}}>
            Few more steps
          </Text>
          <Text
            style={{fontSize: 30, fontFamily: 'Roboto-Bold', color: '#000'}}>
            to continue!
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingLeft: 20,
          marginTop: 50,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, fontFamily: 'Roboto-Bold'}}>
          Login Information{' '}
        </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 15}}>
        <TextInput
          placeholder="Email"
          style={styles.textInputStyle}
          value={email}
          onChangeText={val => setEmail(val)}
        />
        <TextInput
          placeholder="Password"
          style={styles.textInputStyle}
          secureTextEntry={true}
          value={password}
          onChangeText={val => setPassword(val)}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.textInputStyle}
          secureTextEntry={true}
          value={confirmPass}
          onChangeText={val => setConfirmPass(val)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 55,
          marginLeft: 30,
        }}>
        <CheckBox
          style={styles.checkboxStyle}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <View style={{alignSelf: 'center'}}>
          <Text style={{fontFamily: 'Roboto-Italic', fontSize: 12}}>
            By clicking this, you agree that the above{'\n'}information is true
            and correct.
          </Text>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <TouchableOpacity
          style={styles.buttonCreate}
          disabled={!toggleCheckBox}
          onPress={() => onSubmit()}>
          <Text
            style={{color: '#fff', fontFamily: 'Roboto-Bold', fontSize: 15}}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    flex: 1,
  },
  textInputStyle: {
    width: '85%',
    height: 55,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
  },
  checkboxStyle: {
    width: 30,
    height: 30,
  },
  buttonCreate: {
    alignItems: 'center',
    width: '50%',
    height: 52,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 40,
  },
});
