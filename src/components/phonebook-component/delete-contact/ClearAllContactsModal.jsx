// Імпорт бібліотек і логіки Redux
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { clearAllContacts } from '../../../redux/contactsAsyncThunk';
// Основна функція компоненту
const ClearAllContactsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  // Видалення усіх контактів
  const handleDeleteAll = () => {
    dispatch(clearAllContacts());
    onClose();
    toast.success('All contacts deleted successfully.');
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to clear the phonebook history? This action
          can't be undone.
          <strong>(Contacts will be deleted from the database)</strong>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteAll} color="primary">
          Clear
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// Експорт
export default ClearAllContactsModal;
