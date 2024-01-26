// Імпорт компонентів,бібліотек,Redux логіки і селекторів
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterAction } from '../../../redux/filterSlice';
import { selectFilter } from '../../../redux/selectors';

import { AppContainer, SearchInput, Heading } from './filterstyles';
// Основна функція компоненту
const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  // Зміна значення фільтра
  const handleChange = e => {
    dispatch(filterAction(e.target.value));
  };

  return (
    <AppContainer>
      <Heading>Contacts</Heading>
      <SearchInput
        label="Search"
        variant="outlined"
        value={filter}
        onChange={handleChange}
        placeholder="Search contacts..."
      />
    </AppContainer>
  );
};
// Експорт
export default Filter;
