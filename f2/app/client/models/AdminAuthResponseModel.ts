/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TokenModel } from './TokenModel';
import type { AdminResponseModel } from './AdminResponseModel';

// TODO user -> admin
export type AdminAuthResponseModel = {
    token: TokenModel;
    user: AdminResponseModel;
};
