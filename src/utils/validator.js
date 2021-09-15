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

  passwordLength(value, size) {
    if (value.length < (size - 1)) return `This field must have at least ${size} characters.`
  }

  selectRequired(value, defaultValue) {
    if ((value.length === 0) || (value === defaultValue)) return 'Invalid selection.'
  }

  phoneNumber(value, size) {
    const isNumber = /^\d+$/.test(value);
    if (!isNumber) return 'Invalid phone number';

    if (value.toString().trim().length < parseInt(size)) return 'Invalid phone number format';
  }
}

export default Validator;



