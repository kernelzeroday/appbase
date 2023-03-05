import http from './http';
import {
  UserModel,
  SigninModel,
  Token,
  UserRegisterOrUpdateModel,
} from './model';

class ApiService {
  signup(data: UserRegisterOrUpdateModel) {
    return http.post<UserModel>('/v1/signup', data);
  }

  signin(data: SigninModel) {
    return http.post<{ user: UserModel; token: Token }>('/v1/signin', data);
  }

  updateUser(data: UserRegisterOrUpdateModel) {
    return http.post<UserModel>('/v1/user/update', data);
  }

  getUsers() {
    return http.get<UserModel[]>('/v1/users');
  }
  clockIn() {
    return http.post('/v1/clockin');
  }
  clockOut() {
    return http.post('/v1/clockout');
  }
  getTimesheet() {
    return http.get('/v1/timesheet');
  }


}



export default new ApiService();
