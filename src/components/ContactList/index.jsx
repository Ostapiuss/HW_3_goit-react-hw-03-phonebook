import React from "react";

import PropTypes from "prop-types";

import './style.scss';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className="contact-list">
      {
        contacts.map((contact) => (
          <li className="contact-list__contact contact" key={contact.id}>
            <span>{contact.name}: {contact.number}</span>
            <button className="contact__delete-button" onClick={() => onDeleteContact(contact.id)}>Delete</button>
          </li>
        ))
      }
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onDeleteContact: PropTypes.func.isRequired
}

export default ContactList;
