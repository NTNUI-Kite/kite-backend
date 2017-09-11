import React from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/RaisedButton';
import AuthStore from '../stores/AuthStore';
import EventActions from '../actions/EventActions';

const signUp = (eventId) =>{
  EventActions.signup({eventId})
  .then((response) => {
    EventActions.getEvent(eventId)
  });
}

const signOut = (eventId) => {
  EventActions.signoff({eventId})
  .then((response)=>{
    EventActions.getEvent(eventId)
  });
}

const login = () =>{

}

const SignupBox = (props) => {
  let text = "You have not signed up";
  let label = "Sign up";
  let onClick = signUp;

  if(props.hasSignedUp){
    text = "You are signed up"
    label = "Sign out"
    onClick = signOut;
  }

  if(!AuthStore.isAuthenticated()){
    text = "You are not logged in"
    label = "Login"
    onClick = login;
  }

  return(
    <Paper className = "signupBox">
          <p>{text}</p>
          <Button label = {label} onClick = {() => onClick(props.eventId)}/>
    </Paper>
  );
}

export default SignupBox;
