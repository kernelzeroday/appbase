//will become SignInRequestModel in refactoring
export interface SigninModel {
  email: string;
  password: string;
}

//will  become UserUpdateRequestModel in refactoring
export interface UserRegisterOrUpdateModel {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

//will  become UserResponseModel in refactoring
export interface UserModel {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

//will  become TokenModel in refactoring
export interface Token {
  access_token: string;
  refresh_token: string;
}
