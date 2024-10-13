import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CustomAlert from '../../../Components/CustomAlert';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [age, setAge] = useState(null);
  const [familyHistory, setFamilyHistory] = useState('');

  const [showError, setShowError] = useState(false);

  const [selectedGender, setSelectedGender] = useState('Male');

  const onChangeFnameHandler = first_name => {
    setFirstName(first_name);
  };
  const onChangeLnameHandler = last_name => {
    setLastName(last_name);
  };

  const onSubmit = async () => {
    let hasNumber = /\d/;
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!first_name) {
      setShowError(true);
      return;
    } else if (!last_name) {
      setShowError(true);
      return;
    } else if (
      hasNumber.test(first_name) ||
      hasNumber.test(last_name) == true
    ) {
      setShowError(true);
      return;
    } else if (format.test(first_name) || format.test(last_name)) {
      setShowError(true);
      return;
    } else if (!age) {
      setShowError(true);
      return;
    } else if (!familyHistory) {
      setShowError(true);
      return;
    } else {
      navigation.navigate('Next', {
        first_name: first_name,
        last_name: last_name,
        age: age,
        gender: selectedGender,
        family_history: familyHistory,
      });
    }
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <View style={{marginLeft: 20}}>
          <CustomAlert
            displayMode={'failed'}
            visibility={showError}
            okAlert={setShowError}
            displayMsg={
              !first_name
                ? 'Please enter your first name.'
                : !last_name
                ? 'Please enter your last name.'
                : !age
                ? 'Please enter your age.'
                : !familyHistory
                ? 'Please enter your family history!'
                : 'First name or last name invalid!'
            }
          />

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Icon
              name="chevron-back"
              size={35}
              color="#000"
              style={{marginTop: 20, right: 10}}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <Text
            style={{fontSize: 30, fontFamily: 'Roboto-Bold', color: '#000'}}>
            Let's Get Started!
          </Text>
          <Text style={{fontFamily: 'Roboto-Light', fontSize: 12}}>
            Create an Account to continue
          </Text>
        </View>
        <View
          style={{
            paddingLeft: 20,
            marginTop: 50,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Bold'}}>
            Personal Information
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 15}}>
          <TextInput
            placeholder=" First Name"
            style={styles.textInputStyle}
            value={first_name}
            onChangeText={onChangeFnameHandler}
          />
          <TextInput
            placeholder=" Last Name"
            style={styles.textInputStyle}
            value={last_name}
            onChangeText={onChangeLnameHandler}
          />
          <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <View
              style={{
                borderWidth: 1,
                width: '40%',
                borderRadius: 10,
                marginTop: 15,
                marginLeft: 25,
                marginRight: 18,
              }}>
              <TextInput
                placeholder=" Age"
                style={{fontFamily: 'Roboto-Medium', fontSize: 12}}
                value={age}
                onChangeText={val => setAge(val)}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                width: '40%',
                borderRadius: 10,
                marginTop: 15,
              }}>
              <Picker
                selectedValue={selectedGender}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedGender(itemValue)
                }
                style={{height: 50}}>
                <Picker.Item label="Male" value={'Male'} />
                <Picker.Item label="Female" value={'Female'} />
              </Picker>
            </View>
          </View>

          <TextInput
            placeholder=" Family History"
            style={styles.textInputStyle}
            value={familyHistory}
            onChangeText={val => setFamilyHistory(val)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.buttonCreate} onPress={() => onSubmit()}>
        <Text style={{color: '#fff', fontFamily: 'Roboto-Bold', fontSize: 15}}>
          Next
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <Text style={{fontFamily: 'Roboto-Light', fontSize: 12}}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text
            style={{fontFamily: 'Roboto-Bold', color: '#1f1f1f', fontSize: 12}}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
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
  buttonCreate: {
    width: '50%',
    height: 52,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 40,
    marginTop: 60,
  },
});
export default SignUp;
