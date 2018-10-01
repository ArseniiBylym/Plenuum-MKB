
export const isRequired = fieldName => `${fieldName} kötelező`;

export const mustMatch = otherFieldName => {
  return (fieldName) => `A jelszavak nem egyeznek.`;
};

export const incorrectPassword = fieldName => `Hibás jelszó.`;

export const minLength = length => {
  return (fieldName) => `${fieldName} must be at least ${length} characters`;
};
