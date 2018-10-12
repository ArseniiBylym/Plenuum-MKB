import Api_v2 from './api.v2';
import Api_mock_v2 from './api.mock.v2';

const API_VERSIONS = {
    API_V1:"API_V1",
    API_MOCK_V1:"API_MOCK_V1",
    API_V2:"API_V2",
    API_MOCK_V2:"API_MOCK_V2"
};

const getApi = () => {
    let api;
    switch (process.env.REACT_APP_API_VERSION) {
        case API_VERSIONS.API_V2:
        api = new Api_v2();
        break;
        case API_VERSIONS.API_MOCK_V2:
        api = new Api_mock_v2();
        break;
        default:
        console.log('case 3')
        api = new Api_v2();
            break;
    }
    return api;
};

const Api = getApi();
export default Api;
