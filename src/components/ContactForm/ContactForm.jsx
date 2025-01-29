import React, { Component } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import './ContactForm.module.css';

export class ContactForm extends Component {
    state = {
      name: '',
      number: ''
    };

    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
      event.preventDefault();
      const { name, number } = this.state;

      // Validare: Numele trebuie să conțină doar litere și spații, minim 3 caractere
      const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
      if (!nameRegex.test(name)) {
        Notiflix.Notify.failure("The name must contain only letters and spaces (minimum 3 characters).");
        return;
      }

      // Validare: Numărul trebuie să înceapă cu + și să conțină doar cifre (minim 8)
      const phoneRegex = /^\+\d{8,}$/;
      if (!phoneRegex.test(number)) {
        Notiflix.Notify.failure("The phone number must start with '+' and contain only digits (minimum 8).");
        return;
      }

      this.props.onSubmit({ name, number });
      this.setState({ name: '', number: '' });
    };


    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
             type="text"
             name="name"
             value={this.state.name}
             onChange={this.handleChange}
             pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}"
             placeholder="Enter name"
             required
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
              pattern="\+\d{8,}"
              placeholder="+12345678"
              required
             />
          </label>
          <button type="submit">Add Contact</button>
        </form>
      );
    }
  }

  ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  export default ContactForm;
