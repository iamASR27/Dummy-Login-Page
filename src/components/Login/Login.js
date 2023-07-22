import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: "", isValid: false};
}
const passwordReducer = (state, action) => {
  if (action.type === 'USER_PASSWORD') {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if (action.type === 'INPUT_BLUR_PASSWORD') {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: "", isValid: false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredCollege, setEnteredCollege] = useState("");
  const [collegeIsValid, setCollegeIsValid] = useState();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: "", isValid: null});

  useEffect(() => {
    console.log("Effect Running!");
    return () => {
      console.log("Effect Cleanup!");
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("Checking form validity!")
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 1
  //     );
  //   }, 500);
  //   return () => {
  //     console.log('CLean up!');
  //     clearTimeout(identifier);
  //   };

  // }, [enteredEmail, enteredPassword, enteredCollege]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.isValid &&
        enteredCollege.trim().length > 1
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'USER_PASSWORD', val: event.target.value});
    setFormIsValid(
      emailState.isValid &&
        event.target.value.trim().length > 6 &&
        enteredCollege.trim().length > 1
    );
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
    setFormIsValid(
      emailState.isValid &&
        passwordState.isValid &&
        event.target.value.trim().length > 1
    );
  };
  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR_PASSWORD'});
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 1);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState, passwordState, enteredCollege);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
