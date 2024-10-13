import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {
  DocBoyProfile,
  DocGirlProfile,
} from '../../../Components/ImageBackgrounds';
import {AuthContext} from '../../../context/AuthContext';
import {BASE_URL} from '../../../utils/config';
import axios from 'axios';

import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const [description, setDescription] = useState('');
  const [timeAvail, setTimeAvail] = useState('');
  const [first_name, setFname] = useState('');
  const [last_name, setLname] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchUser = async () => {
    setIsFetching(false);
    axios.get(`${BASE_URL}/users/${user.id}`, []).then(res => {
      let userData = res.data;

      setDescription(userData.description);
      setTimeAvail(userData.time_availability);
      setFname(userData.first_name);
      setLname(userData.last_name);
      setAge(userData.age);
      setGender(userData.gender);
      setEmail(userData.email);
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const onRefresh = () => {
    setIsFetching(true);
    fetchUser();
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <Text style={{fontSize: 30, fontFamily: 'Roboto-Bold', color: '#000'}}>
          User Profile
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        {user.gender == 'Male' ? <DocBoyProfile /> : <DocGirlProfile />}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={{fontFamily: 'Roboto-Bold'}}>Active </Text>
          <Icon
            name="ios-checkmark-circle"
            size={15}
            color="green"
            style={{alignSelf: 'center'}}
          />
        </View>
      </View>

      <View style={{marginBottom: 40}}>
        <View style={styles.TextInputContainer}>
          <Text style={styles.descTextStyle}>Description</Text>
          <TextInput
            value={description}
            style={styles.textStyle}
            editable={false}
          />
        </View>
        <View style={styles.TextInputContainer}>
          <Text style={styles.descTextStyle}>Time Availability</Text>
          <TextInput
            value={timeAvail}
            style={styles.textStyle}
            editable={false}
          />
        </View>
        <View style={styles.TextInputContainer}>
          <Text style={styles.descTextStyle}>First Name</Text>
          <TextInput
            value={first_name}
            style={styles.textStyle}
            editable={false}
          />
        </View>
        <View style={styles.TextInputContainer}>
          <Text style={styles.descTextStyle}>Last Name</Text>
          <TextInput
            value={last_name}
            style={styles.textStyle}
            editable={false}
          />
        </View>
        <View style={styles.TextInputContainer}>
          <Text style={styles.descTextStyle}>Age</Text>
          <TextInput
            value={age.toString()}
            style={styles.textStyle}
            editable={false}
          />
        </View>
        <View style={styles.TextInputContainer}>
          <Text style={styles.descTextStyle}>Gender</Text>
          <TextInput value={gender} style={styles.textStyle} editable={false} />
        </View>
        <View style={styles.TextInputContainer}>
          <Text style={styles.descTextStyle}>Email</Text>
          <TextInput value={email} style={styles.textStyle} editable={false} />
        </View>

        <TouchableOpacity
          style={styles.changePass}
          onPress={() => navigation.navigate('ChangePass')}>
          <Text style={styles.textStyle}>Change Password</Text>
          <Icon name="ios-arrow-forward-circle" size={35} color={'#000'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  TextInputContainer: {
    borderColor: '#000',
    borderBottomWidth: 1,
    marginTop: 10,
    width: '100%',
  },
  textStyle: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: '#1f1f1f',
  },
  descTextStyle: {
    fontFamily: 'Roboto-Light',
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
  },
  changePass: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    height: 40,
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
