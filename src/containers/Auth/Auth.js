import React, {Component} from 'react';
import axios from 'axios'
import classes from './Auth.module.css';
import Button from '../../components/UI/Buttton/Button';
import Input from '../../components/UI/input/input';
import is from 'is_js';

export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введи нормальный mail, бро!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Введи нормальный пароль, бро!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          password: true,
          minLength: 6,
        }
      }
    }
  }

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler(event, controlName) {
    const formControls = this.state.formControls;
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    })
    this.setState ({
      formControls,
      isFormValid,
    })
  }

  renderInputs(inputs) {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key = {controlName + index}
          type = {control.type}
          value = {control.value}
          valid = {control.valid}
          touched = {control.touched}
          label = {control.label}
          errorMessage = {control.errorMessage}
          shouldValidate = {!!control.validation}
          onChange = {event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTdcyifwa_-HHojdzGyPz8k0hbOqocgt0', authData);
      console.log(response.data);
    }
    catch(e) {
      console.log(e);
    }
  }

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTdcyifwa_-HHojdzGyPz8k0hbOqocgt0', authData);
      console.log(response.data);
    }
    catch(e) {
      console.log(e);
    }
  }

  submitHandler(evt) {
    evt.preventDefault();
  }
  render() {
    return (
      <div className = {classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form onSubmit = {this.submitHandler} className = {classes.AuthForm}>
            {this.renderInputs()}

            <Button
              type = "success"
              onClick = {this.loginHandler}
              disabled = {!this.state.isFormValid}
            >
              Войти
            </Button>

            <Button
              type = "primary"
              onClick = {this.registerHandler}
            >
              Зарегаться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
