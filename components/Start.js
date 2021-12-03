import React from 'react';
import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import { TextInput } from 'react-native-gesture-handler';

const backgroundImage = require('../assets/BackgroundImage.png');

export default class Start extends React.Component {

    state = {
        name: '',
        backgroundColor: ''
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
                    <Text style={styles.title}>Line</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputName} placeholder="Your Name" value={this.state.name} onChangeText={(name) => this.setState({name: name})} />
                        <Text style={styles.backgroundColorText}>Choose background color:</Text>
                        <View style={styles.chooseColor}>
                            <TouchableOpacity style={styles.touchableOpacity1} onPress={() => this.setState({backgroundColor: '#090C08'})} />
                            <TouchableOpacity style={styles.touchableOpacity2} onPress={() => this.setState({backgroundColor: '#474056'})} />
                            <TouchableOpacity style={styles.touchableOpacity3} onPress={() => this.setState({backgroundColor: '#8A95A5'})} />
                            <TouchableOpacity style={styles.touchableOpacity4} onPress={() => this.setState({backgroundColor: '#B9C6AE'})} />
                        </View>
                        <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Chat', {name: this.state.name, backgroundColor: this.state.backgroundColor})} >
                            <Text style={styles.chatButton}>Start Chatting</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1
    },

    backgroundImage: {
        flex: 1,
        justifyContent: "center"
    },

    title: {
        fontSize: 45,
        fontWeight: "600",
        color: "#fff",
        textAlign: "center",
        marginTop: 50
    },

    inputContainer: {
        backgroundColor: "#fff",
        width: "88%",
        height: "44%",
        alignSelf: "center",
        marginTop: 200,
        flexDirection: "column",
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 20
    },

    inputName: {
        fontSize: 16,
        width: "88%",
        fontWeight: "300",
        color: "#757083",
        borderWidth: 2,
        borderColor: "grey",
        paddingLeft: 10,
        opacity: 0.5,
        borderRadius: 3,
        marginBottom: 40,
        alignSelf: "center",
        height: 60
    },

    backgroundColorText: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 1,
        marginLeft: 23,
        marginBottom: 20,
    },

    chooseColor: {
        alignSelf: "center",
        width: "88%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30
    },

    touchableOpacity1: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: "#090C08"
    },

    touchableOpacity2: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: "#474056"
    },

    touchableOpacity3: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: "#8A95A5"
    },

    touchableOpacity4: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: "#B9C6AE"
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