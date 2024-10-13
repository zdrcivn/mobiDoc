import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import CustomAlert from '../../../Components/CustomAlert';
import CustomAlert1 from '../../../Components/CustomAlert1';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import {AuthContext} from '../../../context/AuthContext';

const AppointmentScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(3);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [details, setDetails] = useState('');

  const fetchData = async () => {
    axios.get(`${BASE_URL}/appointments/${user.id}`, []).then(res => {
      let appoint = res.data;
      setItems(appoint);
      setIsFetching(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  const listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: '100%',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        displayMode={'success'}
        displayMsg={'Consultation successfully deleted!'}
        visibility={showSuccessPopup}
        okAlert={setShowSuccessPopup}
      />
      <View style={{marginBottom: 20}}>
        <Text style={{fontSize: 30, fontFamily: 'Roboto-Bold', color: '#000'}}>
          List of Consultations
        </Text>
      </View>
      <FlatList
        onRefresh={onRefresh}
        refreshing={isFetching}
        data={items.slice(0, itemCount)}
        ItemSeparatorComponent={listViewItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View>
            <CustomAlert1
              displayMode={'success'}
              visibility={showChoices}
              dismissAlert={() => {
                setShowChoices(false), setDetails('');
              }}
              okAlert={() => {
                axios.delete(`${BASE_URL}/appointments/${details}`, {
                  where: {
                    apt_id: details,
                  },
                });
                {
                  setShowChoices(false);
                  setDetails('');
                  setItems(prevItemState =>
                    prevItemState.filter(item => item.apt_id !== details),
                  );
                  setShowSuccessPopup(true);
                }
              }}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Appointment', {
                  fname: item.User.first_name,
                  lname: item.User.last_name,
                  family_history: item.User.family_history,
                  age: item.User.age,
                  gender: item.User.gender,
                  email: item.User.email,
                  paramKey: item.apt_id,
                  paramReason: item.reason,
                  paramStatus: item.status,
                  paramUserId: item.user_id,
                })
              }
              onLongPress={() => {
                setShowChoices(true);
                setDetails(item.apt_id);
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#0583d2',
                    borderRadius: 15,
                    height: 120,
                  }}>
                  {item.User.gender == 'Male' ? (
                    <Image
                      source={require('../../../assets/images/boy-profile.png')}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        alignSelf: 'center',
                      }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/images/girl-profile.png')}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        alignSelf: 'center',
                      }}
                      resizeMode="contain"
                    />
                  )}
                  <View
                    style={{flexDirection: 'column', justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Roboto-Black',
                        color: '#fff',
                      }}>
                      {item.User.first_name} {item.User.last_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#fff',
                        fontFamily: 'Roboto-Medium',
                      }}>
                      Status:
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'space-between',
                        marginTop: 10,
                      }}>
                      {item.status == 'Pending' ? (
                        <View
                          style={{
                            width: '40%',
                            backgroundColor: '#fde12a',
                            alignItems: 'center',
                            borderRadius: 30,
                          }}>
                          <Text
                            style={{fontFamily: 'Roboto-Medium', fontSize: 10}}>
                            {item.status}
                          </Text>
                        </View>
                      ) : item.status == 'Declined' ? (
                        <View
                          style={{
                            width: '40%',
                            backgroundColor: '#e04555',
                            alignItems: 'center',
                            borderRadius: 30,
                          }}>
                          <Text
                            key={item.status}
                            style={{fontFamily: 'Roboto-Medium', fontSize: 10}}>
                            {item.status}
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            width: '40%',
                            backgroundColor: '#47b881',
                            alignItems: 'center',
                            borderRadius: 30,
                          }}>
                          <Text
                            key={item.status}
                            style={{fontFamily: 'Roboto-Medium', fontSize: 10}}>
                            {item.status}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}></FlatList>
    </View>
  );
};

export default AppointmentScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
