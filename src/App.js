import React , { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Card, CardSection, Spinner } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null }
    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyB-I14DBTYmlx9rq_wYXE6NNcw_OiKlr4o",
            authDomain: "authentication-b1ae0.firebaseapp.com",
            databaseURL: "https://authentication-b1ae0.firebaseio.com",
            projectId: "authentication-b1ae0",
            storageBucket: "authentication-b1ae0.appspot.com",
            messagingSenderId: "1079381687357"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });    
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn){
            case true:
                return (
                    <Card>
                    <CardSection>
                        <Button>
                        Log Out
                        </Button>
                    </CardSection>
                    </Card>
                );            
            case false:
                 return <LoginForm />
            default:
                return <Spinner size='large' />
        }

       
    }

    render() {
        return (
        <View>
            <Header headerText="Authentication" />
            {this.renderContent()}
        </View> 
        );   
    }
}

export default App;