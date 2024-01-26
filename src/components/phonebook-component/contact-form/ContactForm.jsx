// Імпорт компонентів,бібліотек,Redux логіки і селекторів
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectIsLoading } from '../../../redux/selectors';
import { addContact } from '../../../redux/contactsAsyncThunk';
import ContactExistsModal from '../contact-list/ContactAlreadyExist';
import { toast } from 'react-toastify';
import { validateName, validateNumber } from './validation';
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
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [contactExistsModalOpen, setContactExistsModalOpen] = useState(false);
  // Додавання контакту
  const handleAddContact = () => {
    if (contacts.length >= 100) {
      toast.error('Contacts limit reached. Cannot add more contacts.');
      return;
    }
    // Валідація
    const nameNotValid = validateName(name);
    const numberNotValid = validateNumber(number);

    if (nameNotValid) {
      toast.error(nameNotValid);
      return;
    }

    if (numberNotValid) {
      toast.error(numberNotValid);
      return;
    }
    // Відслідковування вже існуючого контакту за іменем або номером у списку
    const isContactExists = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (isContactExists) {
      setContactExistsModalOpen(true);
    } else {
      dispatch(addContact({ name, number }));
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
        <AddButton
          variant="outlined"
          onClick={handleAddContact}
          disabled={isLoading}
        >
          {isLoading ? 'Fetching Data...' : 'Add Contact'}
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
