import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../../../utils/config';
import axios from 'axios';

const AddScreen = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchUser = async () => {
    axios.get(`${BASE_URL}/users/doctors`, []).then(res => {
      let item = res.data;
      setItems(item);
      setIsFetching(false);
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onRefresh = () => {
    setIsFetching(true);
    fetchUser();
  };

  const listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  return (
    <View
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: '#ececec',
      }}>
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'Roboto-Bold',
          color: '#000',
          marginBottom: 20,
        }}>
        List of Doctors
      </Text>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              width: '100%',
              borderRadius: 20,
              backgroundColor: '#0583d2',
              marginTop: 10,
            }}
            onPress={() =>
              navigation.navigate('Appointment', {
                fname: item.first_name,
                lname: item.last_name,
                description: item.description,
                time_availability: item.time_availability,
                gender: item.gender,
                paramKey: item.id,
              })
            }>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{paddingTop: 25, paddingBottom: 25}}>
                {item.gender == 'Male' ? (
                  <Image
                    source={require('../../../assets/images/doc.png')}
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 50,
                      marginLeft: 20,
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/girl-doctor.png')}
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 50,
                      marginLeft: 20,
                    }}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: 15,
                  paddingLeft: 0,
                  marginLeft: 10,
                  width: 300,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto-Bold',
                      color: '#fff',
                    }}>
                    Dr. {item.first_name} {item.last_name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#fff',
                      fontFamily: 'Roboto-Medium',
                    }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}></FlatList>
    </View>
  );
};

export default AddScreen;
