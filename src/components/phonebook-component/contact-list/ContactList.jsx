// Імпорт бібліотек,компонентів,логіки Redux
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectContacts,
  selectIsLoading,
  selectFilter,
} from '../../../redux/selectors';
import {
  deleteContact,
  editContact as editContactAction,
  fetchContacts,
} from '../../../redux/contactsAsyncThunk';
import EditContactModal from '../edit-contact/EditContactModal';
import ClearAllContactsModal from '../delete-contact/ClearAllContactsModal';
import ConfirmationDialog from '../delete-contact/DeleteConfirmationModal';
import ContactExistsModal from './ContactAlreadyExist';
import { Typography } from '@mui/material';

// Імпорт стилів
import {
  ContactListContainer,
  StyledList,
  StyledListItem,
  EditButton,
  DeleteButton,
  NoContactsMessage,
  ClearAllButton,
  Loader,
} from './contactliststyles';

// Основна функція компоненту
const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  // Стейти модальних вікон
  const [editContact, setEditContact] = useState(null);
  const [ClearAllModalOpen, setClearAllModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [contactExistsModalOpen, setContactExistsModalOpen] = useState(false);
  // Фільтр по імені
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  // Редагування контакту
  const handleEdit = contact => {
    setEditContact(contact);
  };
  // Видалення контакту
  const handleDelete = contact => {
    setContactToDelete(contact);
    setDeleteConfirmationOpen(true);
  };
  // Підтвердження видалення
  const confirmDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete.id));
      setDeleteConfirmationOpen(false);
    }
  };
  // Відміна видалення
  const cancelDelete = () => {
    setContactToDelete(null);
    setDeleteConfirmationOpen(false);
  };
  // Збереження зміненого контакту
  const handleSaveEdit = ({ id, name, number }) => {
    const isContactExists = contacts.some(
      contact =>
        (contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number === number) &&
        contact.id !== id
    );

    // Відслідковування вже існуючого контакту за іменем або номером у списку
    if (isContactExists) {
      setContactExistsModalOpen(true);
    } else {
      dispatch(editContactAction({ contactId: id, name, number }));
      setEditContact(null);
    }
  };
  // Закриття модального вікна редагування контакту
  const handleCloseEditForm = () => {
    setEditContact(null);
  };
  // Відкриття модального вікна видалення усіх контактів
  const handleOpenClearAllModal = () => {
    setClearAllModalOpen(true);
  };
  // Закриття модального вікна видалення усіх контактів
  const handleCloseDeleteAllModal = () => {
    setClearAllModalOpen(false);
  };

  return (
    <ContactListContainer>
      {isLoading ? (
        <Loader />
      ) : filteredContacts.length > 0 ? (
        <>
          <StyledList>
            {filteredContacts.map(contact => (
              <StyledListItem key={contact.id}>
                <Typography>
                  {contact.name} - {contact.number}
                </Typography>
                <EditButton variant="text" onClick={() => handleEdit(contact)}>
                  Edit
                </EditButton>
                <DeleteButton
                  variant="text"
                  color="error"
                  onClick={() => handleDelete(contact)}
                >
                  Delete
                </DeleteButton>
              </StyledListItem>
            ))}
          </StyledList>
          <ClearAllButton
            variant="outlined"
            color="error"
            onClick={handleOpenClearAllModal}
          >
            Clear history
          </ClearAllButton>
        </>
      ) : (
        <NoContactsMessage>There are no contacts.</NoContactsMessage>
      )}
      {editContact && (
        <EditContactModal
          contact={editContact}
          isOpen={!!editContact}
          onClose={handleCloseEditForm}
          onSave={handleSaveEdit}
        />
      )}
      <ClearAllContactsModal
        isOpen={ClearAllModalOpen}
        onClose={handleCloseDeleteAllModal}
      />
      {deleteConfirmationOpen && (
        <ConfirmationDialog
          open={deleteConfirmationOpen}
          message={`Are you sure you want to delete ${contactToDelete?.name}?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {contactExistsModalOpen && (
        <ContactExistsModal
          isOpen={contactExistsModalOpen}
          onClose={() => setContactExistsModalOpen(false)}
        />
      )}
    </ContactListContainer>
  );
};
// Експорт
export default ContactList;
