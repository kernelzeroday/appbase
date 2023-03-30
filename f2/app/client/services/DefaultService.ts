/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminFileDownloadResponseModel } from '../models/AdminFileDownloadResponseModel';
import type { AdminFileResponseModel } from '../models/AdminFileResponseModel';
import type { AdminSignInRequestModel } from '../models/AdminSignInRequestModel';
import type { AdminSignUpRequestModel } from '../models/AdminSignUpRequestModel';
import type { AdminTimesheetResponseModelAllUsers } from '../models/AdminTimesheetResponseModelAllUsers';
import type { AdminUserUpdateRequestModel } from '../models/AdminUserUpdateRequestModel';
import type { SignInRequestModel } from '../models/SignInRequestModel';
import type { TimesheetResponseModel } from '../models/TimesheetResponseModel';
import type { UserAuthResponseModel } from '../models/UserAuthResponseModel';
import type { UserResponseModel } from '../models/UserResponseModel';
import type { UserSignUpRequestModel } from '../models/UserSignUpRequestModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Signup Api
     * This sign-up API allow you to obtain your access token.
     * @param requestBody
     * @returns UserAuthResponseModel Successful Response
     * @throws ApiError
     */
    public static signupApiV1SignupPost(
        requestBody: UserSignUpRequestModel,
    ): CancelablePromise<UserAuthResponseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Signin Api
     * This sign-in API allow you to obtain your access token.
     * @param requestBody
     * @returns UserAuthResponseModel Successful Response
     * @throws ApiError
     */
    public static signinApiV1SigninPost(
        requestBody: SignInRequestModel,
    ): CancelablePromise<UserAuthResponseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/signin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Refresh Token Api
     * This refresh-token API allow you to obtain new access token.
     * @param refreshToken
     * @returns any Successful Response
     * @throws ApiError
     */
    public static refreshTokenApiV1RefreshTokenGet(
        refreshToken: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/refresh-token',
            query: {
                'refresh_token': refreshToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Users Api
     * This users get API allow you to fetch all user data.
     * @returns UserResponseModel Successful Response
     * @throws ApiError
     */
    public static getAllUsersApiV1UsersGet(): CancelablePromise<Array<UserResponseModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users',
        });
    }

    /**
     * Get User Api
     * This user API allow you to fetch specific user data.
     * @param userId
     * @returns UserResponseModel Successful Response
     * @throws ApiError
     */
    public static getUserApiV1UserUserIdGet(
        userId: number,
    ): CancelablePromise<UserResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/user/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Clockin Api
     * This clockin API allow you to set clock in time.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static clockinApiV1ClockinPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/clockin',
        });
    }

    /**
     * Clockout Api
     * This clockout API allow you to set clock out time.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static clockoutApiV1ClockoutPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/clockout',
        });
    }

    /**
     * Get Timecard Api
     * This timecard API allow you to fetch specific user data.
     * @returns TimesheetResponseModel Successful Response
     * @throws ApiError
     */
    public static getTimecardApiV1TimecardGet(): CancelablePromise<Array<TimesheetResponseModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/timecard',
        });
    }

    /**
     * Admin Signup Api
     * This admin sign-up API allow you to register your account, and return access token.
     * @param requestBody
     * @returns AdminSignUpRequestModel Successful Response
     * @throws ApiError
     */
    public static adminSignupApiV1AdminSignupPost(
        requestBody: AdminSignUpRequestModel,
    ): CancelablePromise<AdminSignUpRequestModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/admin/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

 /**
     * Admin Signin Api
     * This sign-in API allow you to obtain your access token.
     * @param requestBody
     * @returns UserAuthResponseModel Successful Response
     * @throws ApiError
     */
 public static AdminsigninApiV1SigninPost(
    requestBody: AdminSignInRequestModel,
): CancelablePromise<UserAuthResponseModel> {
    return __request(OpenAPI, {
        method: 'POST',
        url: '/v1/admin/signin',
        body: requestBody,
        mediaType: 'application/json',
        errors: {
            422: `Validation Error`,
        },
    });
}

    /**
     * Get Timecard Api
     * This timecard API allow you to fetch specific user data.
     * @returns AdminTimesheetResponseModelAllUsers Successful Response
     * @throws ApiError
     */
    public static getTimecardApiV1AdminTimecardGet(): CancelablePromise<Array<AdminTimesheetResponseModelAllUsers>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/admin/timecard',
        });
    }

    /**
     * Get Timecard Download Api
     * This timecard API allow you to fetch a report of user time data
     * @returns AdminFileDownloadResponseModel Successful Response
     * @throws ApiError
     */
    public static getTimecardDownloadApiV1AdminTimecardDownloadGet(): CancelablePromise<Array<AdminFileDownloadResponseModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/admin/timecard/download',
        });
    }

    /**
     * Get Files Api
     * This files API allow you to fetch files that have been generated by user and system.
     * @returns AdminFileResponseModel Successful Response
     * @throws ApiError
     */
    public static getFilesApiV1AdminFilesGet(): CancelablePromise<Array<AdminFileResponseModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/admin/files',
        });
    }

    /**
     * Get Files Download Api
     * This files API allows administrators to fetch files that have been generated by the system.
     * @param filePath
     * @returns AdminFileDownloadResponseModel Successful Response
     * @throws ApiError
     */
    public static getFilesDownloadApiV1AdminFilesFilePathGet(
        filePath: string,
    ): CancelablePromise<AdminFileDownloadResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/admin/files/{file_path}',
            path: {
                'file_path': filePath,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Admin User Create Api
     * This admin user create API allow you to create user.
     * @param requestBody
     * @returns AdminUserUpdateRequestModel Successful Response
     * @throws ApiError
     */
    public static adminUserCreateApiV1AdminUserCreatePost(
        requestBody: AdminUserUpdateRequestModel,
    ): CancelablePromise<AdminUserUpdateRequestModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/admin/user/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Admin User Update Api
     * This admin user update API allow you to update user password.
     * @param requestBody
     * @returns AdminUserUpdateRequestModel Successful Response
     * @throws ApiError
     */
    public static adminUserUpdateApiV1AdminUserUpdatePost(
        requestBody: AdminUserUpdateRequestModel,
    ): CancelablePromise<AdminUserUpdateRequestModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/admin/user/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Secret Data Api
     * This secret API is just for testing. Need access token to access this API.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static secretDataApiSecretGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/secret',
        });
    }

    /**
     * Not Secret Data Api
     * This not-secret API is just for testing.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static notSecretDataApiNotSecretGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/not-secret',
        });
    }

}
