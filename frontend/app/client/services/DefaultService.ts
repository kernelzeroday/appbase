/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SignInRequestModel } from '../models/SignInRequestModel';
import type { SignUpRequestModel } from '../models/SignUpRequestModel';
import type { UserAuthResponseModel } from '../models/UserAuthResponseModel';
import type { UserResponseModel } from '../models/UserResponseModel';
import type { UserUpdateRequestModel } from '../models/UserUpdateRequestModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Signup Api
     * This sign-up API allow you to register your account, and return access token.
     * @param requestBody
     * @returns UserAuthResponseModel Successful Response
     * @throws ApiError
     */
    public static signupApiV1SignupPost(
        requestBody: SignUpRequestModel,
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
     * Update User Api
     * This user update API allow you to update user data.
     * @param requestBody
     * @returns UserResponseModel Successful Response
     * @throws ApiError
     */
    public static updateUserApiV1UserUpdatePost(
        requestBody: UserUpdateRequestModel,
    ): CancelablePromise<UserResponseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/user/update',
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
