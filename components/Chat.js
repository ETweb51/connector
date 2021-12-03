import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

export default class Chat extends React.Component {
    
    render() {
        let name = this.props.route.params.name;
        let backgroundColor = this.props.route.params.backgroundColor;

        this.props.navigation.setOptions({title: name});

        return (
            <View style={[ styles.container, {backgroundColor: backgroundColor}]}>
                <Text style={styles.chat}>Chat</Text>
                <Text style={styles.greeting}>Hello {name}, welcome to Line!</Text>
                <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Start')}>
                    <Text style={styles.chatButton}>Go Back</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center"
    },

    chat: {
        fontSize: 45,
        fontWeight: "600",
        color: "#fff",
        textAlign: "center",
        marginTop: 200,
        marginBottom: 100
    },

    greeting: {
        alignSelf: "center",
        color: "#fff",
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 100
    },

    button: {
        height: 50,
        width: "88%",
        alignSelf: "center",
        backgroundColor: "#757083",
        borderRadius: 3,
        justifyContent: "center"
    },

    chatButton: {
        alignSelf: "center",
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    }
});