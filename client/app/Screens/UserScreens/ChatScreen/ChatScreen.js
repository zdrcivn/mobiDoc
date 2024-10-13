import {View, Text, FlatList, LogBox} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from './MessageStyle';
import {BASE_URL} from '../../../utils/config';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

const ChatScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchData().then(data => {
      if (isMounted) fetchData(data);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const fetchData = async () => {
    setIsFetching(false);
    try {
      await axios.get(`${BASE_URL}/inboxes/${user.id}`, {}).then(res => {
        let inbox = res.data;
        const newInbx = inbox.map(inbx => ({
          id: inbx.id,
          userName: inbx.user1.first_name + ' ' + inbx.user1.last_name,
          gender: inbx.user1.gender,
          messageText: inbx.Chats[0].message,
          messageUser: inbx.Chats[0].user_id,
        }));

        setItems(newInbx);
      });
    } catch (error) {
      //console.log('ERROR', error);
    }
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };
  return (
    <Container>
      <View style={{padding: 20, paddingLeft: 0}}>
        <Text style={{fontSize: 30, fontFamily: 'Roboto-Bold', color: '#000'}}>
          Chats
        </Text>
      </View>

      <FlatList
        onRefresh={onRefresh}
        refreshing={isFetching}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <Card
            onPress={() =>
              navigation.navigate('ChatMessage', {
                userName: 'Dr.' + ' ' + item.userName,
                paramKey: item.id,
              })
            }>
            <UserInfo>
              <UserImgWrapper>
                {item.gender == 'Male' ? (
                  <UserImg source={require('../../../assets/images/doc.png')} />
                ) : (
                  <UserImg
                    source={require('../../../assets/images/girl-doctor.png')}
                  />
                )}
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>Dr. {item.userName}</UserName>
                  <PostTime>{item.messageTime}</PostTime>
                </UserInfoText>
                {item.messageUser == user.id ? (
                  <MessageText>You: {item.messageText}</MessageText>
                ) : (
                  <MessageText>{item.messageText}</MessageText>
                )}
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
};

export default ChatScreen;
