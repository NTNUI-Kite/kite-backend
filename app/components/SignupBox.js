import React from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/RaisedButton';

const signUp = () =>{
  console.log("signup");
}

const signOut = () => {

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

  return(
    <Paper className = "signupBox">
          <p>{text}</p>
          <Button label = {label} onClick = {onClick}/>
    </Paper>
  );
}

export default SignupBox;
