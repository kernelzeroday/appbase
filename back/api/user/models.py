from pydantic import BaseModel, EmailStr
from typing import List

# this class is sign in request model
class SignInRequestModel(BaseModel):
    email: str
    password: str


# this class is user data response model
class UserResponseModel(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    password: str
    user_timezone: str
    user_role: str

# this class is user timezone response model
class UserTimeZoneResponseModel(BaseModel):
    id: int
    email: EmailStr
    user_timezone: str

# this class is the clocktime create model, this class contains id, clock_in_time, and clock_out_time
class ClockTimesCreateModel(BaseModel):
    id: int
    clock_in_time: datetime = None
    clock_out_time: datetime = None

#this class is the clocktime response model, this class contains id, clock_in_time, and clock_out_time
class ClockTimesResponseModel(BaseModel):
    id: int
    clock_in_time: datetime = None
    clock_out_time: datetime = None

#this class is the token response model, this class contains access_token and refresh_token
class TokenModel(BaseModel):
    access_token: str
    refresh_token: str

# this class is the user auth response model, this class contains token and user
class UserAuthResponseModel(BaseModel):
    token: TokenModel
    user: UserResponseModel


# this class is the timesheet response model, this class will contain an array of clock objects
class TimesheetResponseModel(BaseModel):
    clock_times: List[ClockTimesResponseModel] = []


# this class is the timesheet response model for all users in the database, this class will contain an array of clock objects for all users
class TimesheetResponseModelAllUsers(BaseModel):
    clock_times: List[ClockTimesResponseModel] = []
    users: List[UserResponseModel] = []
    user_time_zones: List[UserTimeZoneResponseModel] = []
    all_users: List[UserResponseModel] = []


# this class is for admin signup request model
class AdminSignUpRequestModel(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    admin_role: str

# this class is for admin signin request model
class AdminSignInRequestModel(BaseModel):
    email: str
    password: str

# this class is for admin response model
class AdminResponseModel(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    password: str
    admin_role: str

# this class is for admin role response model
class AdminRoleResponseModel(BaseModel):
    id: int
    email: EmailStr
    admin_role: str

# this class is for admin time sheet response for all users in the database, this class will contain an array of clock objects for all users
class AdminTimesheetResponseModelAllUsers(BaseModel):
    clock_times: List[ClockTimesResponseModel] = []
    users: List[UserResponseModel] = []
    user_time_zones: List[UserTimeZoneResponseModel] = []
    all_users: List[UserResponseModel] = []

# this class is admin user data update request model
class AdminUserUpdateRequestModel(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    user_timezone: str