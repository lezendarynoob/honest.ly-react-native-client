import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Text, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Dashboard from './Dashboard';
import transport from './config/transport';
import io from 'socket.io-client';

socket = io('http://192.168.43.106:4000');

export default class HomeScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isAuthenticated: false,
            teachers: []
        }
        socket.on('comment', (msg) => {
            let i;
            for(i = 0; i < this.state.teachers.length; i++){
                if(this.state.teachers[i]._id === msg.id){
                    break;
                }
            }
            let tchs = [...this.state.teachers];
            tchs[i].comments.push(msg.comment);
            this.setState({teachers: tchs}, () => {
                this.props.navigation.navigate('Feedback', {teacher: this.state.teachers[i]});
            });
        });
    }

  


    login = () => {
        this.props.navigation.push('Login');
    }

    signup = () => {
        this.props.navigation.push('SignUp');
    }

    logout = async () => {
        try{
            let res = await transport.get('/auth/logout');
            if(res.data.message === 'done'){
                this.props.navigation.push('Home');
            }
        }catch(err){
            console.log(err);
        }
    }

    toFeedback = (teacher) => {
        this.props.navigation.navigate('Feedback', {teacher: teacher});
    }

    fetchTeachers = async () => {
        try{
            let res = await transport.get('teacher/getAll');
            this.setState({
                teachers: res.data.teachers
            });
        }catch(err){
            console.log(err);
        }
    }

    static pushComment = (id, comment) => {
        socket.emit('comment', {id, comment});
    }


    async componentDidMount(){
        try{
            let res = await transport.get('/auth/isAuthenticated');
            this.setState({
                isAuthenticated: res.data.isAuthenticated,
                isLoaded: true
            });
        } catch(err){
            console.log(err);
        }
    }

    content = () => {
        if(!this.state.isAuthenticated){
            return(
                <View style = {styles.container}>
                    <Image source = {require('../assets/honestly.png')} style = {styles.logo} />
                    <Image source = {require('../assets/man-writing-book-on-deskook.png')} style = {styles.illustration} />
                    <TouchableWithoutFeedback onPress = {this.login}>
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
        }else{
            return <Dashboard logout = {this.logout} toFeedback = {this.toFeedback} fetchTeachers = {this.fetchTeachers} teachers = {this.state.teachers} />
        }
    }

    render(){
        if(this.state.isLoaded){
            return this.content();
        }else{
            return null;
        }
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
    illustration: {
        height: '25rem',
        width: '25rem'

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
    }
  });
  