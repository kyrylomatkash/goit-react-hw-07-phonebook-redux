// Імпорт компонентів,бібліотек і Redux логіки
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction } from '../../../redux/contactSlice';
import ContactExistsModal from '../contact-list/ContactAlreadyExist';
import { toast } from 'react-toastify';
// Імпорт стилів
import {
  AppContainer,
  Heading,
  StyledForm,
  StyledTextField,
  AddButton,
} from './contactformstyles.js';

// Основна функція компоненту
const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [contactExistsModalOpen, setContactExistsModalOpen] = useState(false);
  // Додавання контакту
  const handleAddContact = () => {
    if (!name.trim() || !number.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }
    // Відслідковування вже існуючого контакту у списку
    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExists) {
      setContactExistsModalOpen(true);
    } else {
      dispatch(addContactAction({ name, number }));
      toast.success('Contact added successfully.');
      setName('');
      setNumber('');
    }
  };

  return (
    <AppContainer>
      <Heading>Phonebook</Heading>
      <StyledForm>
        <StyledTextField
          label="Name*"
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <StyledTextField
          label="Number*"
          variant="outlined"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
        <AddButton variant="outlined" onClick={handleAddContact}>
          Add Contact
        </AddButton>
      </StyledForm>
      <ContactExistsModal
        isOpen={contactExistsModalOpen}
        onClose={() => setContactExistsModalOpen(false)}
      />
    </AppContainer>
  );
};
// Експорт
export default ContactForm;
