from pydantic import BaseModel, EmailStr
from typing import List
from datetime import datetime

class SignInRequestModel(BaseModel):
    email: str
    password: str


class SignUpRequestModel(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str


class UserUpdateRequestModel(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    user_timezone: str


class UserResponseModel(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    password: str
    user_timezone: str

class UserTimeZoneResponseModel(BaseModel):
    id: int
    email: EmailStr
    user_timezone: str

class ClockTimesCreateModel(BaseModel):
    id: int
    clock_in_time: datetime = None
    clock_out_time: datetime = None

#this class is the clocktime response model, this class contains id, clock_in_time, and clock_out_time
class ClockTimesResponseModel(BaseModel):
    id: int
    clock_in_time: datetime = None
    clock_out_time: datetime = None


class TokenModel(BaseModel):
    access_token: str
    refresh_token: str


class UserAuthResponseModel(BaseModel):
    token: TokenModel
    user: UserResponseModel


# this class is the timesheet response model, this class will contain an array of clock objects
class TimesheetResponseModel(BaseModel):
    clock_times: List[ClockTimesResponseModel] = []