class Validator {
  constructor() {
    this.emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }
  required(value) {
    if (!value.toString().trim().length) {
      return 'Required field';
    }
  }

  email(value) {
    if (!this.emailRegex.test(value)) {
      return 'Invalid email address.'
    }
  }

  minLength(value, size) {
    if (value.toString().trim().length < size) {
      return `This field must have at least ${size} characters.`
    }
  }
}

export default Validator;



