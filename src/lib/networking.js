const loginPath="/login";

export const HTTPMethod = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    PUT:'PUT'
};

const defaultParameters = {
    method: HTTPMethod.GET,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

export default class Networking {

    // HELPERS

    async fetchFromAPI(url, parameters = defaultParameters){
        parameters = this.addTokenToRequestHeader(parameters);
        return fetch(url, parameters)
            .then(this.handleErrors);
    }

    addTokenToRequestHeader(parameters){
        parameters.headers['api-version'] = '1.0.0';
        parameters.credentials = "include";
        parameters.cache = "no-store";

        return parameters;
    }

    //ERRORS

    handleErrors(response){
        if (!response.ok) {
            if (response.status === 401 && window.location.pathname !== loginPath) {
                window.location = loginPath;
            }
            throw Error(response.status);
        }
        return response.json();
    }

}
