// Імпорт компонентів Redux
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
  clearAllContacts,
} from './contactsAsyncThunk';
// Стейт
const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Підвантаження контактів
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      // Додавання контактів
      .addCase(addContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      // Видалення контактів
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      // Редагування контактів
      .addCase(editContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const { id, name, number } = action.payload;
        const index = state.items.findIndex(contact => contact.id === id);
        if (index !== -1) {
          state.items[index] = { id, name, number };
        }
        state.isLoading = false;
      })
      .addCase(editContact.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      // Видалення усіх контактів
      .addCase(clearAllContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearAllContacts.fulfilled, state => {
        state.items = [];
        state.isLoading = false;
      })
      .addCase(clearAllContacts.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});
// Експорт
export const contactsReducer = contactSlice.reducer;
