// const getApiBaseUrl = (app) => {

//     if ( window.location.href.indexOf( "app.plenuum.com" ) !== -1 ){
//         return "https://api.plenuum.com";
//     }
//     else if ( window.location.href.indexOf( "app.staging.plenuum.com" ) !== -1 ){
//         return "https://api.staging.plenuum.com";
//     }
//     else if ( window.location.href.indexOf( "localhost:3000" ) !== -1 ){
//         return "http://localhost:5000";
//     }
//     else {
//         return "http://localhost:5000"
//     }
// };

// const getGAId = (app) => {
//     if (app === undefined) {
//         return "UA-88251195-7";
//     }else if (app.includes('prod')) {
//         return "UA-88251195-8";
//     }else{
//         return "UA-88251195-7";
//     }
// };

// export const EnvVariable = {
//     port: "5000",
//     host: getApiBaseUrl(process.env.REACT_APP_SERVER_ENVIRONMENT),
//     domain: "http://localhost:3000/",
//     version: '1.0.0',
//     buildNumber: '86',
//     googleAnalyticsId: getGAId(process.env.REACT_APP_SERVER_ENVIRONMENT)
// };

const getApiBaseUrl = (app) => {

    if (window.location.href.indexOf('app.plenuum.com') !== -1) {
        return "https://api.plenuum.com";
    }
    else if (window.location.href.indexOf('app.staging.plenuum.com') !== -1) {
        return 'https://api.staging.plenuum.com';
    }
    else {
        return "http://localhost:5000";
    }
 };
 
 const getGAId = (app) => {
    if (app === undefined) {
        return "UA-88251195-7";
    }else if (app.includes('prod')) {
        return "UA-88251195-8";
    }else{
        return "UA-88251195-7";
    }
 };
 
 export const EnvVariable = {
    port: "5000",
    host: getApiBaseUrl(process.env.REACT_APP_SERVER_ENVIRONMENT),
    domain: "http://localhost:3000/",
    version: '1.0.0',
    buildNumber: '86',
    googleAnalyticsId: getGAId(process.env.REACT_APP_SERVER_ENVIRONMENT)
 };