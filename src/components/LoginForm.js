import React , { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Button, Card, CardSection, Input } from './common';
import  firebase  from 'firebase';

class LoginForm extends Component {
  state = { email: '',
            password: '',
            error:'',
            loginStatus: '' };

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({
      error: '',
      loginStatus:''
    })
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      this.setState({loginStatus: "Login Successful."});
    })
    .catch(()=>{
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(()=>{
         this.setState({loginStatus: `New user ${email} created`});
      })
      .catch(()=>{
        this.setState({ error: 'Authentication Failed.'});
      });

    });
  }          
  render() {
    return (
    <Card>
      <CardSection>
        <Input 
          placeholder="user@example.com"
          label="Email"
          value = {this.state.email}
          onChangeText={ email => this.setState({email: email})}
         />
      </CardSection>  
      <CardSection>
        <Input 
          secureTextEntry = {true}
          placeholder="password"
          label="Password"
          value = {this.state.password}
          onChangeText={ password => this.setState({password: password})}
         />        
      </CardSection>

      <Text style={styles.errorTextStyle}>
        {this.state.error}
      </Text>
      <Text style={styles.errorTextStyle}>
        {this.state.error}
      </Text>
      <Text style={styles.messageStyle}>
        {this.state.loginStatus}
      </Text>
      <CardSection>
        <Button onPress={this.onButtonPress.bind(this)}>
          Log In
        </Button>    
      </CardSection>                                
    </Card>
    );
  }
}

styles = {
  errorTextStyle:{
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  messageStyle:{
    fontSize: 20,
    alignSelf: 'center',
    color: 'green'
  }
}
export default LoginForm;