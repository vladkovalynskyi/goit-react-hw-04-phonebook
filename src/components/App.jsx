import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export function App() {
  const [contacts, setContacts] = useState( () => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts ? JSON.parse(storedContacts) : [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    setFilter(e.target.value);
  };

  const addContact = newContact => {
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const searchContact = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact => {
      return `${contact.name}${contact.number}`
        .toLowerCase()
        .includes(normalizedFilter);
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm
        contacts={contacts}
        addContact={addContact}
        handleChange={handleChange}
      />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleChange} />
      <ContactList contacts={searchContact()} deleteContact={deleteContact} />
    </div>
  );
}
