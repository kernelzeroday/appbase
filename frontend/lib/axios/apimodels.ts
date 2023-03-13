/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export interface SignInRequestModel {
  email: string;
  password: string;
}
export interface SignUpRequestModel {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
export interface TokenModel {
  access_token: string;
  refresh_token: string;
}
export interface UserAuthResponseModel {
  token: TokenModel;
  user: UserResponseModel;
}
export interface UserResponseModel {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}
export interface UserUpdateRequestModel {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
