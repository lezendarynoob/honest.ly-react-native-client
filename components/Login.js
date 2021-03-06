import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Text, Platform, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import transport from './config/transport';
import toast from './config/toast';

export default class Login extends Component{

    state = {
        id: '',
        password: ''
    }

    login = async () => {
        let res = await transport.post('auth/login', {
            username: this.state.id,
            password: this.state.password
        });
        if(res.data.message === 'done'){
            this.props.navigation.push('Home');
        }else{
            toast(res.data.message);
        }
    }

    signup = () => {
        this.props.navigation.push('SignUp');
    }

    render(){
        return(
            <View style = {styles.container}>
                <Image source = {require('../assets/honestly.png')} style = {styles.logo} />
                <Text style = {styles.head} > Login </Text>
                <TextInput style = {styles.text} onChangeText = {text => this.setState({id: text})} placeholder = "Username" /> 
                <TextInput style = {styles.text} secureTextEntry={true} onChangeText = {text => this.setState({password: text})} placeholder = "Password" /> 
                <TouchableWithoutFeedback onPress = {this.login} >
                    <View>
                        <Text style = {styles.login}> Login </Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style = {styles.inline}>
                    <Text style = {styles.sign}> Don't have account?  </Text>
                    <TouchableWithoutFeedback onPress = {this.signup}>
                        <Text style = {styles.signup}> Sign Up </Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 10 : Expo.Constants.statusBarHeight + 10,
        
    },
    logo: {
        height: '4rem',
        width: '8rem',
    },
    head:{
        alignSelf: 'flex-start',
        fontSize: '1.75rem',
        fontFamily: 'nunito-bold',
        paddingLeft: '1.5rem',
        paddingTop: '3rem',
        paddingBottom: '3rem'
    },
    login: {
        backgroundColor: '#000',
        color: '#f2f2f2',
        fontFamily: 'nunito-bold',
        fontSize: '1.25rem',
        padding: '0.75rem',
        borderRadius: '0.7rem',
        width: '20rem'
    },
    signup: {
        fontFamily: 'nunito-bold',
        fontSize: '1.1rem'
    },
    sign: {
        fontFamily: 'nunito',
        fontSize: '1.1rem'

    },
    inline: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: '1.2rem'
    },
    text: {
        fontFamily: 'nunito',
        fontSize: '1.1rem',
        padding: '0.5rem',
        borderWidth: 1,
        width: '20rem',
        marginBottom: '1.5rem',
        borderRadius: '0.7rem'
    }
  });
  