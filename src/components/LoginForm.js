import React , { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import  firebase  from 'firebase';

class LoginForm extends Component {
  state = { email: '',
            password: '',
            error:'',
            loginStatus: '',
            loading: false };

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({
      error: '',
      loginStatus:'',
      loading: true
    });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      this.setState({
                    loginStatus: "Login Successful.",
                    loading:false
                });
    })
    .catch(()=>{
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(()=>{
         this.setState({
          loginStatus: `New user ${email} created`,
          loading:false
        });
      })
      .catch(()=>{
        this.setState({ 
          error: 'Authentication Failed.',
          loading:false });
      });

    });
  } 

  renderButton(){
    if (this.state.loading){
      return (
        <Spinner size="small" />
      );
    }
    return (
        <Button onPress={this.onButtonPress.bind(this)}>
          Log In
        </Button>   
    )
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
        { this.renderButton() }
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