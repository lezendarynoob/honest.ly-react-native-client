import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Text, Platform, TextInput, FlatList, Keyboard } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import HomeScreen from './HomeScreen';

export default class Feedback extends Component{

    state = {
        comment: ''
    }

    commentList = () => {
        if(this.props.route.params.teacher.comments.length === 0){
            return <Text style = {styles.empty}> No Comments Yet </Text>
        }else{
            return(
                <FlatList data = {this.props.route.params.teacher.comments} 
                keyExtractor = {(item, index) => {
                    return item._id;
                }}
                renderItem = {(item) => {
                    return(
                        <View style = {styles.wrapper}>
                            <Text style = {styles.comment}> {item.item.comment} </Text>
                        </View>
                    );
                }} />
            );
        }
    }

    send = () => {
        HomeScreen.pushComment(this.props.route.params.teacher._id, this.state.comment);
        this.setState({
            comment: ''
        });
        Keyboard.dismiss();
    }


    render(){
        let teacher = this.props.route.params.teacher;
        return(
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Image style = {styles.img} source = {{uri: `data:${teacher.photo.contentType};base64,${teacher.photo.data}`}} />
                    <Text style = {styles.headtext}> {teacher.name} </Text>
                </View>
                <View style = {styles.scrollArea}>
                    {this.commentList()}
                </View>
                <View style = {styles.footer}>
                    <TextInput style = {styles.input} onChangeText = {text => this.setState({comment: text})} placeholder = "Give your Feedback" value = {this.state.comment} />
                    <TouchableWithoutFeedback onPress = {this.send}>
                        <Text style = {styles.send}> Send </Text>
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
    header:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: '4.2rem',
    },
    img: {
        height: '4rem',
        width: '4rem',
        borderRadius: 50,
        marginLeft: '1rem'
    },
    headtext:{
        fontSize: '1.25rem',
        marginLeft: '1rem',
        marginTop: '0.75rem',
        fontFamily: 'nunito-bold'
    },
    scrollArea: {
        height: '28rem',
        alignSelf: 'flex-start',
        marginTop: '1.5rem',
        width: '100%',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-start',
        backgroundColor: '#f2f2f2',
        height: '3rem',
        padding: '0.25rem'
    },
    input: {
        height: '2rem',
        padding: '0.25rem',
        marginLeft: '1rem',
        fontSize: '1.25rem',
        width: '15rem',
        fontFamily: 'nunito'
    },
    send: {
        backgroundColor: '#000',
        color: '#f2f2f2',
        fontFamily: 'nunito-bold',
        fontSize: '1.25rem',
        padding: '0.25rem',
        borderRadius: '0.4rem',
        width: '4.5rem',
        textAlign: 'center',
        marginLeft: '1rem'
    },
    empty: {
        fontFamily: 'nunito',
        fontSize: '1rem',
        marginTop: '10rem',
        marginLeft: '6rem'
    },
    comment: {
        fontFamily: 'nunito',
        fontSize: '1rem',
        color: '#fff',
        
    },
    wrapper: {
        backgroundColor: '#000',
        padding: '0.25rem',
        borderRadius: '0.5rem',
        marginLeft: '1rem',
        marginTop: '0.5rem',
        maxWidth: '17rem'
    }
  });
  