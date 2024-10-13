import React, {useCallback, useEffect, useState, useContext} from 'react';
import {View, Text} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {AuthContext} from '../../../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';

const MessageScreen = ({route}) => {
  const {user} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  //const [isMounted, setIsMounted] = useState(false);

  const socket = io('http://192.168.100.80:8080');
  //const socket = io('http://192.168.124.98:8080');
  //const socket = io('https://5040-111-125-107-20.ap.ngrok.io');

  useEffect(() => {
    let isMounted = true;
    const fetchMessage = async () => {
      await axios
        .get(`${BASE_URL}/${route.params.paramKey}/chats`, {})
        .then(result => {
          if (isMounted) {
            let cht = result.data;
            const newCht = cht.map(chat => ({
              _id: chat.id,
              text: chat.message,
              ...chat,
              user: {
                _id: chat.user_id == user.id ? 1 : 2,
                avatar:
                  chat.User.gender == 'Male'
                    ? require('../../../assets/images/doc.png')
                    : require('../../../assets/images/girl-doctor.png'),
              },
            }));
            setMessages(newCht);
          }
        });
    };
    fetchMessage();
    socket.on('connect', () => console.log('user connected'));
    socket.on('incomingMessage', () => {
      fetchMessage();
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const onSend = useCallback((message = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, message));
    socket.emit(
      'chatMessage',
      {
        message: message[0].text,
      },
      () => {},
    );
    axios.post(`${BASE_URL}/${route.params.paramKey}/create_message`, {
      message: message[0].text,
      user_id: user.id,
    });
  }, []);

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <Ionicons
            name="ios-send"
            style={{marginBottom: 5, marginRight: 15}}
            size={30}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
            fontSize: 12,
            fontFamily: 'Roboto-Light',
          },
          left: {
            fontSize: 12,
            fontFamily: 'Roboto-Light',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = props => {
    return <Ionicons name="ios-chevron-down-outline" size={32} color="#333" />;
  };

  return (
    <GiftedChat
      messagesContainerStyle={{backgroundColor: '#fff'}}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default MessageScreen;
