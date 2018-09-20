

export const Errors = () => {

  const handleError = (error, handler) => {
    switch (error.message) {
      case '401':
        handler();
        break;
      default:
        handler();
    }
  };

  return {handleError};
};
