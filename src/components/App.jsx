import React from "react";

import { nanoid } from "nanoid";

import ContactList from "../components/ContactList";
import { ContactForm } from "../components/ContactForm";
import Filter from "../components/Filter";

import './App.scss';

export default class App extends React.Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({...this.state, contacts});
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onChangeFilter = (event) => {
    const { value: newSearchValue } = event.target;
    this.setState(() => ({ filter: newSearchValue }));
  }

  onFilterContacts = (filterValue) => {
    return this.state.contacts.filter((contact) => contact.name.toLowerCase().includes(filterValue.toLowerCase()));
  }

  onDeleteContact = (id) => {
    this.setState(() => ({ contacts: this.state.contacts.filter((contact) => contact.id !== id) }));
  }

  isTheSameNameInCollection = (name) => {
    return this.state.contacts.some((contact) => {
      return contact.name.slice(0, contact.name.includes(' ') ? contact.name.indexOf(' ') : contact.name.length).toLowerCase() === name.toLowerCase().trim()
    });
  }

  addContact = (newContact) => {
    const { contacts } = this.state;

    if (newContact.name.length <= 0) {
      alert(`The length should me greater than 0 symbols`);
      return null;
    }

    if (this.isTheSameNameInCollection(newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return null;
    }

    const newContacts = {
      name: newContact.name,
      number: newContact.number,
      id: nanoid()
    }
    this.setState(() => ({ contacts: [...contacts, newContacts] }));
  }

  render() {
    return (
      <div
        className="root-app"
      >
        <div className="root-app__phonebook phonebook">
          <div className="phonebook__form">
            <h2 className="phonebook__title">Phonebook</h2>
            <ContactForm onAddContact={this.addContact} />
          </div>
          <h2 className="phonebook__title">Contacts</h2>
          <Filter onChangeFilter={this.onChangeFilter} />
          <ContactList contacts={this.onFilterContacts(this.state.filter)} onDeleteContact={this.onDeleteContact} />
        </div>
      </div>
    );
  }
}
