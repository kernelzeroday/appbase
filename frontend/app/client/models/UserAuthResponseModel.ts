/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TokenModel } from './TokenModel';
import type { UserResponseModel } from './UserResponseModel';

export type UserAuthResponseModel = {
    token: TokenModel;
    user: UserResponseModel;
};

