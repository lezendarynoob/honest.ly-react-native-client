import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Feedback from './components/Feedback';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

const fetchFonts = () => {
  return Font.loadAsync({
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'nunito': require('./assets/fonts/Nunito-Regular.ttf')
  });
  };

const Stack = createStackNavigator();

class App extends Component{

  state = {
    isLoaded: false
  }

  render(){

    if(!this.state.isLoaded){
      return(
        <AppLoading startAsync = {fetchFonts} onFinish = {() => this.setState({
          isLoaded : true
        })} />
      );
    }

    return(
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
          />
          <Stack.Screen
            name="Feedback"
            component={Feedback}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


export default App;
