// Валідація поля для імені
export const validateName = name => {
  if (!name.trim()) {
    return 'Name is required.';
  }

  if (!/^[a-zA-Zа-яА-Я\s]{1,30}$/.test(name)) {
    return 'Name should contain only letters and be no longer than 30 characters.';
  }

  return null;
};
// Валідація поля для номеру
export const validateNumber = number => {
  if (!number.trim()) {
    return 'Number is required.';
  }

  if (!/^\d{1,15}$/.test(number)) {
    return 'Number should contain only digits and be no longer than 15 characters.';
  }

  return null;
};
