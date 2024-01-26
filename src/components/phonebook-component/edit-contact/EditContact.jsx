// Імпорт бібліотек,компонентів і логіки Redux
import React from 'react';
import Button from '@mui/material/Button';
import EditContactModal from './EditContactModal';
import { useDispatch } from 'react-redux';
import { editContact } from '../../../redux/contactsAsyncThunk';
// Основна функція компоненту
const EditContact = ({ contact }) => {
  const dispatch = useDispatch();
  // Редагування контакту
  const handleEdit = () => {
    dispatch(
      editContact({
        contactId: contact.id,
        name: contact.name,
        number: contact.number,
      })
    );
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleEdit}>
        Edit
      </Button>
      <EditContactModal contact={contact} />
    </div>
  );
};
// Експорт
export default EditContact;
