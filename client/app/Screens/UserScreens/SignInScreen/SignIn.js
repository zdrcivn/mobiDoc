import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import CustomAlert from '../../../Components/CustomAlert';
import CustomForgot from '../../../Components/CustomForgot';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';

const SignIn = () => {
  const {login} = useContext(AuthContext);
  const userRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [showPassIcon, setShowPassIcon] = useState('eye');
  const [showForgot, setShowForgot] = useState(false);
  const [oldEmail, setOldEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <View style={styles.container}>
      <CustomForgot
        visibility={showForgot}
        dismissAlert={() => {
          setShowForgot(false);
          setOldEmail('');
        }}
        okAlert={async () => {
          try {
            const checkUser = await axios.post(
              `${BASE_URL}/users/forgot-password`,
              {
                email: oldEmail,
              },
            );
            if (checkUser.status == 200) {
              setShowForgot(false);
              setIsSuccess(true);
              setOldEmail('');
            } else {
              throw new Error();
            }
          } catch (error) {
            setIsError(true);
          }
        }}
        value={oldEmail}
        onChangeText={val => setOldEmail(val)}
      />
      <CustomAlert
        displayMode={'success'}
        displayMsg={`Successful! Your new password is 1234`}
        visibility={isSuccess}
        okAlert={setIsSuccess}
      />
      <CustomAlert
        displayMode={'failed'}
        displayMsg={'No user with this email'}
        visibility={isError}
        okAlert={setIsError}
      />
      <View style={styles.topView}>
        <Image
          source={require('../../../assets/images/mobiDocLogo.png')}
          resizeMode="contain"
          style={{width: 100, height: 100}}
        />
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{color: '#1f1f1f', fontSize: 35, fontFamily: 'Roboto-Bold'}}>
            mobi
          </Text>
          <Text
            style={{color: '#00b4d8', fontSize: 25, fontFamily: 'Roboto-Bold'}}>
            Doc
          </Text>
        </View>
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.headingStyle}>Login</Text>
        <View style={styles.textInputForm}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="ios-person"
              size={20}
              color="#fff"
              style={{marginTop: 20, right: 10}}
            />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={'#fff'}
              style={styles.textInputStyle}
              ref={userRef}
              onChangeText={val => {
                setEmail(val);
              }}
              value={email}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 11,
            }}>
            <Icon
              name="ios-lock-closed"
              size={20}
              color="#fff"
              style={{marginTop: 20, right: 10}}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={showPass}
              placeholderTextColor={'#fff'}
              style={styles.textInputStyle}
              onChangeText={val => {
                setPassword(val);
              }}
              value={password}
            />
            <TouchableOpacity
              style={{
                marginTop: 10,
              }}
              onPress={() => {
                if (showPassIcon == 'eye') {
                  setShowPassIcon('eye-off');
                  setShowPass(false);
                } else if (showPassIcon == 'eye-off') {
                  setShowPassIcon('eye');
                  setShowPass(true);
                }
              }}>
              <Icon name={showPassIcon} color={'#fff'} size={20} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.buttonSIgnIn}
            onPress={() => {
              login(email, password);
              setEmail(''), setPassword('');
            }}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.forgotCreateView}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={{color: '#fff', fontFamily: 'Roboto-Light', fontSize: 10}}>
              Create Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowForgot(true)}>
            <Text
              style={{color: '#fff', fontFamily: 'Roboto-Light', fontSize: 10}}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#1f1f1f',
    backgroundColor: '#fff',
  },
  topView: {
    width: '100%',
    height: '55%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    width: '100%',
    height: '45%',
    backgroundColor: '#1f1f1f',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    //borderTopWidth: 2,
    //borderLeftWidth: 2,
    // borderRightWidth: 2,
    //borderColor: '#0003',
  },
  headingStyle: {
    marginLeft: 63,
    marginTop: 30,
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
  },
  textInputForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
  },
  textInputStyle: {
    width: '60%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginTop: 20,
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Roboto-Medium',
  },
  buttonSIgnIn: {
    width: '80%',
    height: 52,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    color: '#000',
  },
  forgotCreateView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    marginHorizontal: 40,
  },
});

export default SignIn;
