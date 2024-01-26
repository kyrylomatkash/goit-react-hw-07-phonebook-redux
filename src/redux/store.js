// Імпорт компонентів Redux
import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactSlice';
import { filterReducer } from './filterSlice';

// Ред'юсери
const reducer = {
  contacts: contactsReducer,
  filter: filterReducer,
};

// Експорт
export const store = configureStore({
  reducer: reducer,
});
