import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../Input/Input.js';

// Created OUTSIDE the component function
// it doesn't depend or interact with the component
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes('@') };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }

  if (action.type === "INPUT_BLUR") {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }

  return {value: '', isValid: false};
}

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const emailInputRef = useRef();
  const passInputRef = useRef();

  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passState, dispatchPass] = useReducer(passwordReducer, {value: '', isValid: null});

  const {isValid: emailValid} = emailState;
  const {isValid: passValid} = passState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailValid && passValid
      );  
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailValid, passValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    //setFormIsValid(emailState.isValid && passState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({type: 'USER_INPUT', val: event.target.value});
    //setFormIsValid(emailState.isValid && passState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPass({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passState.value);
    } else if (!emailValid) {
      emailInputRef.current.activate();
    } else {
      passInputRef.current.activate();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          value={emailState.value}
          valid={emailValid}
          valueHandler={emailChangeHandler}
          validHandler={validateEmailHandler}
          type="email"
          label="E-Mail"
        />
        <Input
          ref={passInputRef}
          value={passState.value}
          valid={passValid}
          valueHandler={passwordChangeHandler}
          validHandler={validatePasswordHandler}
          type="password"
          label="Password"
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
