import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  LogBox,
} from 'react-native';
import {
  DocBoyProfile,
  DocGirlProfile,
} from '../../../Components/ImageBackgrounds';
import React, {useContext, useEffect, useState} from 'react';
import {sliderData} from '../../../Components/data';
import {windowWidth} from '../../../utils/Dimension';
import {AuthContext} from '../../../context/AuthContext';
import {BASE_URL} from '../../../utils/config';

import Carousel from 'react-native-snap-carousel';
import BannerSlide from '../../../Components/BannerSlide';
import axios from 'axios';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function HomeScreen() {
  const renderBanner = ({item, index}) => {
    return <BannerSlide data={item} />;
  };
  const {user} = useContext(AuthContext);
  const [items, setItems] = useState([]);

  //fetch all the doctors
  const fetchData = async () => {
    axios.get(`${BASE_URL}/users/doctors`, []).then(res => {
      let data = res.data;
      setItems(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    //#142433
    <ScrollView
      style={{flex: 1, backgroundColor: '#ececec'}}
      nestedScrollEnabled={true}>
      <View style={{padding: 20, marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text
            style={{fontSize: 30, fontFamily: 'Roboto-Bold', color: '#000'}}>
            Hello,{'\n'}
            Dr. {user.first_name}
          </Text>
          <TouchableOpacity>
            {user.gender === 'Male' ? <DocBoyProfile /> : <DocGirlProfile />}
          </TouchableOpacity>
        </View>

        <View style={{padding: 10, marginTop: 20}}>
          <Text
            style={{fontSize: 12, fontFamily: 'Roboto-Bold', color: '#000'}}>
            Featured Healthcare Facilities
          </Text>
        </View>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={windowWidth - 50}
          itemWidth={295}
          loop={true}
        />
        <View style={{padding: 10}}>
          <Text
            style={{fontSize: 12, fontFamily: 'Roboto-Bold', color: '#000'}}>
            Popular Doctors
          </Text>
          <ScrollView horizontal={true}>
            <FlatList
              data={items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View
                  style={{
                    width: 295,
                    height: 100,
                    borderRadius: 15,
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                    backgroundColor: '#0583d2',
                  }}>
                  {item.gender == 'Male' ? (
                    <Image
                      source={require('../../../assets/images/doc.png')}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        marginLeft: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/images/girl-doctor.png')}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        marginLeft: 10,
                      }}
                    />
                  )}
                  <View>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'Roboto-Bold',
                        fontSize: 13,
                        marginLeft: 10,
                      }}>
                      {' '}
                      Dr. {item.first_name} {item.last_name}
                    </Text>
                    <View>
                      <Text
                        style={{
                          color: '#fff',
                          marginLeft: 15,
                          fontSize: 10,
                          fontFamily: 'Roboto-Italic',
                        }}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
