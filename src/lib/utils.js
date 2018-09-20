import Constants from './constants';

export const Utils = () => {
    const sortUsers = (array) => {
        //Passing an array of user
        array.sort((a, b) => {
            return a.firstName.localeCompare(b.firstName) || a.lastName.localeCompare(b.lastName);
        });
        return array;
    };

    const sortArray = (array) => {
        array.sort((a, b) => {
            return (new Date(b.updatedAt) - new Date(a.updatedAt));
        });
        return array;
    };


    const validateEmail = (email) => {
        return Constants.RegexExpressions.emailChecking.test(email);
    };

    return { sortUsers, sortArray, validateEmail };
};
