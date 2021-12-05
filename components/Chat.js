import React from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, View } from 'react-native';
import 'react-native-gesture-handler';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
          messages: [],
        }
      }

    componentDidMount() {
        let name = this.props.route.params.name;
        this.setState({
          messages: [
            {
              _id: 1,
              text: `Hello ${name}`,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
            {
                _id: 3,
                text: `${name} has entered the chat`,
                createdAt: new Date(),
                system: true
            }
          ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages,messages)
        }))
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
                    renderBubble ={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                { Platform.OS === 'android' ? 
                <KeyboardAvoidingView behavior="height" /> 
                : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
});