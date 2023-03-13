import http from './http';
//import {
  //UserModel,
  //SigninModel,
  //Token,
  //UserRegisterOrUpdateModel,
//} from './model';

import { UserUpdateRequestModel, TokenModel, SignInRequestModel, UserResponseModel } from './apimodels';

class ApiService {
  signup(data: UserUpdateRequestModel) {
    return http.post<UserResponseModel>('/v1/signup', data);
  }

  signin(data: SignInRequestModel) {
    return http.post<{ user: UserResponseModel; token: TokenModel }>('/v1/signin', data);
  }

  updateUser(data: UserUpdateRequestModel) {
    return http.post<UserResponseModel>('/v1/user/update', data);
  }

  getUsers() {
    return http.get<UserResponseModel[]>('/v1/users');
  }
}

export default new ApiService();
