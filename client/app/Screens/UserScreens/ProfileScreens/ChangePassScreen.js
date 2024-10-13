import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import CustomAlert from '../../../Components/CustomAlert';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';

const ChangePassScreen = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassIcon, setShowPassIcon] = useState('ios-eye-outline');
  const [showPassIcon2, setShowPassIcon2] = useState('ios-eye-outline');
  const [showOldPass, setShowOldPass] = useState(true);
  const [showNewPass, setShowNewPass] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const onChangePasswordHandler = password => {
    setPassword(password);
  };
  const onChangeNewPasswordHandler = newPassword => {
    setNewPassword(newPassword);
  };

  const onSubmit = async () => {
    if (!password) {
      setShowError(true);
      return;
    } else if (!newPassword) {
      setShowError(true);
      return;
    } else if (newPassword == password) {
      setShowError(true);
      return;
    }
    try {
      const resp = await axios.post(`${BASE_URL}/users/${user.id}/password`, {
        password: password,
      });
      if (resp.status == 201) {
        axios
          .put(`${BASE_URL}/users/${user.id}/password`, {
            password: newPassword,
          })
          .then(() => {
            setShowSuccess(true);
            setPassword('');
            setNewPassword('');
          });
      } else {
        throw new Error();
      }
    } catch (error) {
      setShowError(true);
    }
  };
  return (
    <View style={styles.container}>
      <CustomAlert
        visibility={showSuccess}
        displayMode={'success'}
        displayMsg={'Password changed successfully!'}
        okAlert={() => navigation.navigate('ProfileScreen')}
      />
      <CustomAlert
        visibility={showError}
        displayMode={'failed'}
        displayMsg={
          !password
            ? 'Please enter your old password'
            : !newPassword
            ? 'Please enter new password'
            : newPassword == password
            ? 'You entered the same password'
            : 'Not your old password'
        }
        okAlert={setShowError}
      />
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileScreen'),
              setNewPassword(''),
              setPassword('');
          }}>
          <Icon name="ios-chevron-back" size={40} style={{right: 10}} />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <View>
          <Text style={styles.headingTextStyle}>Change Password</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Old Password"
            secureTextEntry={showOldPass}
            value={password}
            onChangeText={onChangePasswordHandler}
            style={styles.textStyle}
          />
          <TouchableOpacity
            onPress={() => {
              if (showPassIcon == 'ios-eye-outline') {
                setShowPassIcon('ios-eye-off-outline');
                setShowOldPass(false);
              } else if (showPassIcon == 'ios-eye-off-outline') {
                setShowPassIcon('ios-eye-outline');
                setShowOldPass(true);
              }
            }}>
            <Icon name={showPassIcon} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="New Password"
            secureTextEntry={showNewPass}
            value={newPassword}
            onChangeText={onChangeNewPasswordHandler}
            style={styles.textStyle}
          />
          <TouchableOpacity
            onPress={() => {
              if (showPassIcon2 == 'ios-eye-outline') {
                setShowPassIcon2('ios-eye-off-outline');
                setShowNewPass(false);
              } else if (showPassIcon2 == 'ios-eye-off-outline') {
                setShowPassIcon2('ios-eye-outline');
                setShowNewPass(true);
              }
            }}>
            <Icon name={showPassIcon2} size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => onSubmit()}>
          <Text
            style={{color: '#fff', fontSize: 16, fontFamily: 'Roboto-Bold'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
  },
  headingTextStyle: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
    color: '#000',
  },
  passwordContainer: {
    flex: 1,
  },
  textInputContainer: {
    borderColor: '#000',
    borderBottomWidth: 1,
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    width: '90%',
  },
  submitButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#0077b6',
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
