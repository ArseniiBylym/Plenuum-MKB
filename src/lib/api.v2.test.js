import Api from './api.v2';
import "isomorphic-fetch";

const Api_v2 = new Api();

describe("Tests for api", () => {

    describe("Login", () => {

        const mockEmail = "mockemail@mockemail.com";
        const mockPassword = "mockpassword";
        const mockLoggedUser = { token: "mockToken"};

        test("It should successfully log user", async () => {
            Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => {
                return Promise.resolve(mockLoggedUser);
            });

            const testing = await Api_v2.login(mockEmail, mockPassword);
            expect(testing).toEqual(mockLoggedUser)
        });
    });

    describe("userMySelf", () => {

        test("Successfully get the user", async () => {
            const mockUser = {
                "_id": "5984342227cd340363dc84c7",
                "firstName": "peter",
                "lastName": "szabo",
                "email": "peter.szabo@hipteam.io",
                "pictureUrl": ""
            };

            Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => {
               return Promise.resolve(mockUser);
            });

            const myself = await Api_v2.userMySelf();
            expect(myself).toEqual(mockUser);
        });

        test("Fail to get the user", async () => {
            const mockError = "mockError";
            Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => {
                return Promise.reject(mockError);
            });

            await expect(Api_v2.userMySelf()).rejects.toMatch(mockError);
        });
    });

    describe("Tags", () => {

        test("Successfully tags for an organization", async () => {

            const mockTags = [{
                    "_id": "5989b97ddc5d02286b4dd531",
                    "updatedAt": "2017-08-08T13:15:41.950Z",
                    "createdAt": "2017-08-08T13:15:41.950Z",
                    "title": "TestTitle",
                    "isActive": true,
                    "order": 1
                }];

            const mockOrgId = "mockOrgId";
            Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.resolve(mockTags) });
            const tags = await Api_v2.tags(mockOrgId);
            expect(tags).toEqual(mockTags);
        });
    });


    describe("Profile Picture", () => {

        test("Successfully update user image", async () => {

            const mockPictureUrl = "mockPictureUrl";
            Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.resolve(mockPictureUrl) });
            const userPicture = await Api_v2.setPicture(mockPictureUrl);
            expect(userPicture).toEqual(mockPictureUrl);

        });
    });

    describe("Change Password", () => {

        test("Successfully change password", async () => {
            const mockBody = {
                email: "mock@mockemail.com",
                password: "mockcurrentpassword",
                newPassword: "mocknewpassword"
            };

            const mockResponse = { message: "Mock successfull response" };
            Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.resolve(mockResponse) });
            const changePassword = await Api_v2.changePassword(mockBody);
            expect(changePassword).toEqual(mockResponse);
        });

        test("Fail on change password", async () => {

            const mockBody = {
                email: "mock@mockemail.com",
                password: "mockcurrentpassword",
                newPassword: "mocknewpassword"
            };

            const mockResponse = { message: "Mock failure response" };
            Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.reject(mockResponse) });
            await expect(Api_v2.changePassword(mockBody)).rejects.toEqual(mockResponse);

        });
    });

    describe("Logout", () => {

        test("Successfully logout", async () => {
            const mockResponse = { message: "Mock successfull response" };
            Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.resolve(mockResponse) });
            const logout = await Api_v2.logout();
            expect(logout).toEqual(mockResponse);
        });

        test("Failure logout", async () => {
            const mockResponse = { message: "Mock failure response" };
            Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.reject(mockResponse) });
            await expect(Api_v2.logout()).rejects.toEqual(mockResponse);
        });
    });

    describe("Feedbacks", () => {

        describe("List feedbacks", () => {

            test("Should successfully retrieve incoming feedbacks", async () => {
                const mockType = true;
                const mockUserId = "5984342227cd340363dc84c7";
                const mockResponse = [{
                            "_id": "59843630e7e093038ed33179",
                            "updatedAt": "2017-08-04T08:54:08.178Z",
                            "createdAt": "2017-08-04T08:54:08.178Z",
                            "senderId": "5984342227cd340363dc84be",
                            "recipientId": "5984342227cd340363dc84c7",
                            "message": "Chuck Norris's first program was kill -9.",
                            "type": "CONTINUE",
                            "requestId": "",
                            "tags": [],
                            "privacy": []
                        }];

                Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.resolve(mockResponse) });
                const feedbacks = await Api_v2.feedbacks(mockType);
                expect(feedbacks[0].recipientId).toEqual(mockUserId);
            });

            test("Should successfully retrieve sent feedbacks", async () => {
                const mockType = false;
                const mockUserId = "5984342227cd340363dc84c7";
                const mockResponse = [
                    {
                        "_id": "59843630e7e093038ed331b5",
                        "updatedAt": "2017-08-04T08:54:08.198Z",
                        "createdAt": "2017-08-04T08:54:08.198Z",
                        "senderId": "5984342227cd340363dc84c7",
                        "recipientId": "5984342227cd340363dc84af",
                        "message": "Chuck Norris doesn't use GUI, he prefers COMMAND line.",
                        "type": "CONTINUE",
                        "requestId": "",
                        "tags": [],
                        "privacy": []
                    }];
                const mockOrgId = "mockOrgId";
                Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.resolve(mockResponse) });
                const feedbacks = await Api_v2.feedbacks(mockType, mockOrgId);
                expect(feedbacks[0].senderId).toEqual(mockUserId);
            });

            test("Should fail on retrieve sent feedbacks", async () => {
                const mockType = true;
                const mockUserId = "5984342227cd340363dc84af";
                const mockResponse = [{
                    "_id": "59843630e7e093038ed33179",
                    "updatedAt": "2017-08-04T08:54:08.178Z",
                    "createdAt": "2017-08-04T08:54:08.178Z",
                    "senderId": "5984342227cd340363dc84be",
                    "recipientId": "5984342227cd340363dc84c7",
                    "message": "Chuck Norris's first program was kill -9.",
                    "type": "CONTINUE",
                    "requestId": "",
                    "tags": [],
                    "privacy": []
                }];
                const mockOrgId = "mockOrgId";
                Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.resolve(mockResponse) });
                const feedbacks = await Api_v2.feedbacks(mockType, mockOrgId);
                expect(feedbacks[0].recipientId).not.toEqual(mockUserId);
            });

            test("Should fail on retrieve incoming feedbacks", async () => {
                const mockType = true;
                const mockUserId = "5984342227cd340363dc84af";
                const mockResponse = [{
                    "_id": "59843630e7e093038ed33179",
                    "updatedAt": "2017-08-04T08:54:08.178Z",
                    "createdAt": "2017-08-04T08:54:08.178Z",
                    "senderId": "5984342227cd340363dc84be",
                    "recipientId": "5984342227cd340363dc84c7",
                    "message": "Chuck Norris's first program was kill -9.",
                    "type": "CONTINUE",
                    "requestId": "",
                    "tags": [],
                    "privacy": []
                }];
                const mockOrgId = "mockOrgId";
                Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.resolve(mockResponse) });
                const feedbacks = await Api_v2.feedbacks(mockType, mockOrgId);
                expect(feedbacks[0].senderId).not.toEqual(mockUserId);
            });
        });

        describe("Post feedbacks", () => {

            test("Successfully post feedback", async () => {
                const mockFeedback = {
                    "senderId": "5984342227cd340363dc84c7",
                    "recipientId": "5984342227cd340363dc84a9",
                    "message": "Message text ",
                    "type": "CONSIDER",
                    "_id": "59cb763878ee0108d5e68ac2",
                    "tags": [],
                    "privacy": []
                };

                const mockResponse = {
                    "updatedAt": "2017-09-27T09:58:16.406Z",
                    "createdAt": "2017-09-27T09:58:16.406Z",
                    "senderId": "5984342227cd340363dc84c7",
                    "recipientId": "5984342227cd340363dc84a9",
                    "message": "Message text ",
                    "type": "CONSIDER",
                    "_id": "59cb763878ee0108d5e68ac2",
                    "tags": [],
                    "privacy": []
                };
                const mockOrgId = "mockOrgId";
                Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.resolve(mockResponse) });
                const postFeedback = await Api_v2.postFeedback(mockFeedback, mockOrgId);
                expect(postFeedback).toEqual(mockResponse);
            });

            test("Fail on post feedback", async () => {
                const mockFeedback = {};
                const mockResponse = { message: "Mock failure response" };
                const mockOrgId = "mockOrgId";
                Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.reject(mockResponse) });
                await expect(Api_v2.postFeedback(mockFeedback, mockOrgId)).rejects.toEqual(mockResponse);
            });

        });

    });

    describe("Requests", () => {

        test("Request should successfully retrieve a the specified request", async () => {

            const mockRequestId = "59844c1cd0b5d006da3c9620";
            const mockOrgId = "hipteam";
            const mockResponse = {
                "_id": "59844c1cd0b5d006da3c9620",
                "updatedAt": "2017-08-04T10:27:40.781Z",
                "createdAt": "2017-08-04T10:27:40.781Z",
                "senderId": "5984342227cd340363dc84bd",
                "requestMessage": "Mock test request message",
                "recipientId": [ "5984342227cd340363dc84bb", "5984342227cd340363dc84c7", "5984342227cd340363dc84ac" ]
            };

            Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.resolve(mockResponse) });
            const request = await Api_v2.request(mockRequestId, mockOrgId);
            expect(request._id).toEqual(mockRequestId);
        });

        test("Sent Requests should retrieve the requests sent by user", async () => {
            const mockUserId = "5984342227cd340363dc84c7";
            const mockResponse = [{
                    "_id": "59cb85e878ee0108d5e68ac4",
                    "updatedAt": "2017-09-27T11:05:12.181Z",
                    "createdAt": "2017-09-27T11:05:12.181Z",
                    "senderId": "5984342227cd340363dc84c7",
                    "requestMessage": "Request message",
                    "recipientId": [
                        "5984342227cd340363dc84af"
                    ]}];
            const mockOrgId = "mockOrgId";
            Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.resolve(mockResponse) });
            const sentRequests = await Api_v2.sentRequests();
            expect(sentRequests[0].senderId).toEqual(mockUserId, mockOrgId);
        });

        test("Send request", async () => {
            const mockUserId = "5984342227cd340363dc84c7";
            const mockRequest = { "recipientId": ["5984342227cd340363dc84af"], "requestMessage": "mock request" };
            const mockResponse = {
                "updatedAt": "2017-09-27T11:05:12.181Z",
                "createdAt": "2017-09-27T11:05:12.181Z",
                "senderId": "5984342227cd340363dc84c7",
                "requestMessage": "mock request",
                "_id": "59cb85e878ee0108d5e68ac4",
                "recipientId": [
                    "5984342227cd340363dc84af"
                ]
            };
            const mockOrgId = "mockOrgId";
            Api_v2.fetchFromAPI = jest.fn().mockImplementation(() => { return Promise.resolve(mockResponse) });
            const postRequest = await Api_v2.postFeedbackRequest(mockRequest);
            expect(postRequest.senderId).toEqual(mockUserId, mockOrgId);

        });

    });
});