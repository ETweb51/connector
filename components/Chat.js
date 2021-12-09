import React from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, View } from 'react-native';
import 'react-native-gesture-handler';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
        isConnected: false
      },
    };

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDLxJZbkatT4fPUSKKh0vFAO34QwuPL0oQ",
        authDomain: "line-3676b.firebaseapp.com",
        projectId: "line-3676b",
        storageBucket: "line-3676b.appspot.com",
        messagingSenderId: "773510902956",
        appId: "1:773510902956:web:b1866e781ebdc9208f9b09"
      });
    }
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    let name = this.props.route.params.name;

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {

        this.setState({ isConnected: true });

        this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);

        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: 'https://placeimg.com/140/140/any',
            },
          });
        });

        this.saveMessages();

      } else {
        this.setState({ isConnected: false});
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
      this.saveMessages();
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // through each document
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user
      });
    });
    this.setState({ messages });
  }

  addMessage = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: this.state.user,
    });
  }

  getMessages = async () => {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
      } catch (error) {
        console.log(error.message);
      }
  };

  saveMessages = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }
    

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle ={{
          right: {
            backgroundColor: "#000",
          },
        }}
      />
    );
  }
    
  render() {
    let name = this.props.route.params.name;
    let backgroundColor = this.props.route.params.backgroundColor;

    this.props.navigation.setOptions({title: name});

    return (
      <View style={{ flex: 1, backgroundColor: backgroundColor }}>
        <GiftedChat
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
        />
        { Platform.OS === 'android' ? 
          <KeyboardAvoidingView behavior="height" /> 
          : null}
      </View>
    );
  }
}