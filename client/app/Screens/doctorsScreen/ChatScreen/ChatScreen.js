import {View, Text, FlatList, LogBox, Image} from 'react-native';
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
import {AuthContext} from '../../../context/AuthContext';
import axios from 'axios';
import CustomAlert1 from '../../../Components/CustomAlert1';
import CustomAlert from '../../../Components/CustomAlert';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

const ChatScreen = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [details, setDetails] = useState('');

  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };
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
          userName: inbx.user2.first_name + ' ' + inbx.user2.last_name,
          gender: inbx.user2.gender,
          messageText: inbx.Chats[0].message,
          messageUser: inbx.Chats[0].user_id,
        }));
        setItems(newInbx);
      });
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <Container>
      <CustomAlert
        visibility={isSuccess}
        displayMode={'success'}
        displayMsg={'Chat deleted'}
        okAlert={setIsSuccess}
      />
      <View
        style={{
          padding: 20,
          paddingLeft: 0,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: '#000',
            marginTop: 10,
          }}>
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
                userName: item.userName,
                paramKey: item.id,
                userGender: item.gender,
              })
            }
            onLongPress={() => {
              setShowSuccess(true);
              setDetails(item.id);
            }}>
            <CustomAlert1
              visibility={showSuccess}
              dismissAlert={() => {
                setShowSuccess(false), setDetails('');
              }}
              okAlert={async () => {
                await axios
                  .delete(`${BASE_URL}/inboxes/${details}`, {
                    where: {
                      id: details,
                    },
                  })
                  .then(() => {
                    axios.delete(`${BASE_URL}/${details}/chats`, {
                      where: {
                        inbox_id: details,
                      },
                    });
                    setShowSuccess(false);
                    setDetails('');
                    setItems(prevItemState =>
                      prevItemState.filter(item => item.id !== details),
                    );
                    onRefresh();
                    setIsSuccess(true);
                  });
              }}
            />

            <UserInfo>
              <UserImgWrapper>
                {item.gender == 'Male' ? (
                  <UserImg
                    source={require('../../../assets/images/boy-profile.png')}
                  />
                ) : (
                  <UserImg
                    source={require('../../../assets/images/girl-profile.png')}
                  />
                )}
              </UserImgWrapper>

              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
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
