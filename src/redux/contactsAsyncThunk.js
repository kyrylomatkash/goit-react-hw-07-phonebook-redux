// Імпорт бібліотек
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://65ac7a8fadbd5aa31bdf4569.mockapi.io/';

// Підвантаження контактів
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error fetching contacts: ${error.message}`);
    }
  }
);
// Додавання контактів
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/contacts', { name, number });
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error adding contact: ${error.message}`);
    }
  }
);
// Видалення контактів
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const existingContact = await axios.get(`/contacts/${contactId}`);
      if (!existingContact.data) {
        return rejectWithValue('Contact does not exist');
      }
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue(`Error deleting contact: ${error.message}`);
    }
  }
);
// Редагування контактів
export const editContact = createAsyncThunk(
  'contacts/editContact',
  async ({ contactId, name, number }, { rejectWithValue }) => {
    try {
      const existingContact = await axios.get(`/contacts/${contactId}`);
      if (!existingContact.data) {
        return rejectWithValue('Contact does not exist');
      }
      const response = await axios.put(`/contacts/${contactId}`, {
        name,
        number,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(`Error editing contact: ${error.message}`);
    }
  }
);
// Видалення усіх контактів
export const clearAllContacts = createAsyncThunk(
  'contacts/clearAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/contacts');
      const contacts = response.data;
      await Promise.all(
        contacts.map(contact => axios.delete(`/contacts/${contact.id}`))
      );
      return true;
    } catch (error) {
      return rejectWithValue(`Error clearing contacts: ${error.message}`);
    }
  }
);
