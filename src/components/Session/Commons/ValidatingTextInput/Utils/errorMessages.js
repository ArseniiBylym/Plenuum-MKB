
export const isRequired = fieldName => `${fieldName} is required`;

export const mustMatch = otherFieldName => {
  return (fieldName) => `The passwords don’t match.`;
};

export const incorrectPassword = fieldName => `Incorrect password.`;

export const minLength = length => {
  return (fieldName) => `${fieldName} must be at least ${length} characters`;
};
