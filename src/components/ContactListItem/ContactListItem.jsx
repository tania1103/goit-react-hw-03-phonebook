import React from 'react';
import PropTypes from 'prop-types';

import styles from './ContactListItem.module.css';

import { MdOutlineDeleteForever } from "react-icons/md";
import { IconContext } from 'react-icons';

function DeleteIcon() {
  return (
    <IconContext.Provider
      value={{ size: '25px' , align: 'center' }}
    >
      <div>
      <MdOutlineDeleteForever  />
      </div>
    </IconContext.Provider>
  );
}
 const ContactListItem = ({ contact, onDelete }) => (
  <li>
    {contact.name}: {contact.number}
    <button className={styles.deleteBtn} onClick={() => onDelete(contact.id)}>
    <DeleteIcon /> </button>
  </li>
);

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactListItem;
