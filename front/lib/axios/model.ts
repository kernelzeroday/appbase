export interface SigninModel {
  email: string;
  password: string;
}

export interface UserRegisterOrUpdateModel {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UserModel {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  timezone: string;
  clock_in_time: string;
  clock_out_time: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}

export interface UserTimeZoneResponseModel {
  id: number;
  email: string;
  user_timezone: string;
}

export interface ClockTimesResponseModel {
  id: number;
  clock_in_time: Date; 
  clock_out_time: Date;
}


export interface TimesheetModel {
  clock_times: Array<ClockTimesResponseModel>;
}
