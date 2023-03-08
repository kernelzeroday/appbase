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
    user_timezone: str


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


class TokenModel(BaseModel):
    access_token: str
    refresh_token: str


class UserAuthResponseModel(BaseModel):
    token: TokenModel
    user: UserResponseModel


