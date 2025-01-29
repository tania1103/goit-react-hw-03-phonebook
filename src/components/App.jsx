import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { RiContactsBook2Line } from "react-icons/ri";
import { IoIosContacts } from "react-icons/io";

import './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contact');

    if (savedContacts) {
      try {
        this.setState({ contacts: JSON.parse(savedContacts) });
      } catch (error) {
        console.error("Error parsing contacts from localStorage:", error);
        this.setState({ contacts: [] }); // Resetare în caz de eroare
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    const contactWithSameName = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    const contactWithSameNumber = contacts.find(contact => contact.number === number);

    if (contactWithSameName && contactWithSameNumber) {
      Notiflix.Notify.failure(`A contact with the name ${name} and the number ${number} already exists!`);
      return;
    } else if (contactWithSameName) {
      Notiflix.Notify.failure(`A contact with the name ${name} already exists!`);
      return;
    } else if (contactWithSameNumber) {
      Notiflix.Notify.failure(`A contact with the number ${number} already exists!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));

    Notiflix.Notify.success(`Contact ${name} added successfully!`);
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(filter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className='container'>
        <h1 className='phonebook'>Phonebook <RiContactsBook2Line/></h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts <IoIosContacts /></h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
}
