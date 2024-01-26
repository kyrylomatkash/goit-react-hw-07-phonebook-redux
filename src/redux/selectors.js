// Селектор контактів
export const selectContacts = state => state.contacts.items;
// Селектор завантаження
export const selectIsLoading = state => state.contacts.isLoading;
// Селектор фільтру
export const selectFilter = state => state.filter.filter;
