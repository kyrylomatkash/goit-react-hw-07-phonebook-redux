// Валідація поля для імені
export const validateName = name => {
  if (!name.trim()) {
    return 'Name is required.';
  }

  if (!/^[a-zA-Zа-яА-Я\s-]{1,30}$/.test(name)) {
    return 'Check the name you entered. The name can contain only letters and special character: -';
  }

  return null;
};

// Валідація поля для номеру
export const validateNumber = number => {
  if (!number.trim()) {
    return 'Number is required.';
  }

  if (!/^[\d()-]{1,15}$/.test(number)) {
    return 'Check the number you entered. The number can contain only digits and special characters: () and -';
  }

  return null;
};
