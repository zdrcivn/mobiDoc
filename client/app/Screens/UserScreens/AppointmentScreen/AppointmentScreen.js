import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import CustomAlert from '../../../Components/CustomAlert';
import CustomAlert1 from '../../../Components/CustomAlert1';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import {AuthContext} from '../../../context/AuthContext';

const AppointmentScreen = ({route, navigation}) => {
  const {user} = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState([]);
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
    onRefresh();
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
    <View style={{flex: 1, padding: 20, justifyContent: 'center'}}>
      <CustomAlert
        displayMode={'success'}
        displayMsg={'Consultation successfully deleted!'}
        visibility={showSuccessPopup}
        okAlert={setShowSuccessPopup}
      />
      <View style={{marginBottom: 20}}>
        <Text style={{fontSize: 30, fontFamily: 'Roboto-Bold', color: '#000'}}>
          Consultations
        </Text>
      </View>
      <FlatList
        onRefresh={onRefresh}
        refreshing={isFetching}
        data={items}
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
              okAlert={async () => {
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
              onLongPress={() => {
                setShowChoices(true);
                setDetails(item.apt_id);
              }}
              onPress={() =>
                navigation.navigate('ConsultationInfo', {
                  fname: item.Doctor.first_name,
                  lname: item.Doctor.last_name,
                  gender: item.Doctor.gender,
                  description: item.Doctor.description,
                  time_availability: item.Doctor.time_availability,
                  email: item.Doctor.email,
                  paramKey: item.apt_id,
                  paramReason: item.reason,
                  note: item.note,
                  paramStatus: item.status,
                  paramUserId: item.user_id,
                })
              }>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#0583d2',
                  borderRadius: 15,
                  height: 120,
                }}>
                <Image
                  source={require('../../../assets/images/calendar.png')}
                  style={{
                    width: 90,
                    height: 90,
                    alignSelf: 'center',
                  }}
                />
                <View
                  style={{flexDirection: 'column', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto-Bold',
                      color: '#fff',
                    }}>
                    Dr. {item.Doctor.first_name} {item.Doctor.last_name}
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
            </TouchableOpacity>
          </View>
        )}></FlatList>
    </View>
  );
};

export default AppointmentScreen;
