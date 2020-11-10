import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Text, Platform, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


export default class Dashboard extends Component{

    state = {
        isLoaded: false
    }

    async componentDidMount(){
        await this.props.fetchTeachers();
        this.setState({
            isLoaded: true
        });
    }
    
    content() {
        let list = this.props.teachers.map(teacher => {
            return(
                <TouchableWithoutFeedback key = {teacher._id} onPress = {() => this.handleClick(teacher)}>
                    <View style = {styles.card}>
                        <Image style = {styles.img} source = {{uri: `data:${teacher.photo.contentType};base64,${teacher.photo.data}`}} />
                        <Image style = {styles.img2} source = {{uri: `data:${teacher.photo.contentType};base64,${teacher.photo.data}`}} />
                        <Text style = {styles.name}> {teacher.name} </Text>
                    </View>
                </TouchableWithoutFeedback>
                
            );
        } );

        return(
            <ScrollView style = {{width: '100%'}}>
                <View style = {styles.list}>
                    {list}
                </View>
            </ScrollView>
        );
    }

    handleClick = (teacher) => {
        this.props.toFeedback(teacher);
    }

    render(){
       
        return(
            <View style = {styles.container}>
                <View style = {styles.head}>
                    <Image source = {require('../assets/honestly.png')} style = {styles.logo} />
                    <TouchableWithoutFeedback onPress = {this.props.logout} >
                        <Text style = {styles.logout}> Logout </Text>
                    </TouchableWithoutFeedback>
                </View>
                
                {this.state.isLoaded ? this.content() : <Text style = {styles.loading}> Loading... </Text>}
                
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
        position: 'absolute',
        left: '0.7rem'
    },
    head:{
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        height: '4.2rem',
        borderBottomWidth: 1,
        backgroundColor: '#f2f2f2'
    },
    logout: {
        fontFamily: 'nunito-bold',
        fontSize: '1.2rem',
        position: 'absolute',
        right: '0.7rem',
        top: '1.2rem',
        borderWidth: 2,
        borderRadius: 5,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
        
        
    },
    card: {
        margin: '1rem',
        borderWidth: '0.1rem',
        width: '8.2rem',
        borderRadius: '0.2rem'
    },
    img: {
        height: '10rem',
        width: '8rem',
        tintColor: '#000'
    },
    img2: {
        position: 'absolute',
        opacity: 0.6,
        height: '10rem',
        width: '8rem'
    },
    loading: {
        paddingTop: '55%',
        fontFamily: 'nunito',
        fontSize: '1rem'
    },
    name: {
        fontFamily: 'nunito-bold',
        fontSize: '0.8rem',
        margin: '0.2rem',
        textAlign: 'center',
        borderTopWidth: '0.1rem',
        marginTop: '0.1rem'
    },
    
  });
  