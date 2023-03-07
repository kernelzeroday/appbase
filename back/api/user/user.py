from fastapi import HTTPException
from database.query import query_get, query_put, query_update
from .auth import Auth
from .models import UserUpdateRequestModel, UserResponseModel
from datetime import datetime, timedelta
import pytz
auth_handler = Auth()


def register_user(user_model: UserUpdateRequestModel):
    try:
        user = get_user_by_email(user_model.email)
        if len(user) != 0:
            raise HTTPException(
                status_code=409, detail='Email user already exists.')
        hashed_password = auth_handler.encode_password(user_model.password)

        query_put("""
                    INSERT INTO user (
                        first_name,
                        last_name,
                        email,
                        password_hash,
                        user_timezone
                    ) VALUES (%s,%s,%s,%s,%s)
                    """,
                (
                    user_model.first_name,
                    user_model.last_name,
                    user_model.email,
                    hashed_password,
                    user_model.user_timezone
                )
                )
        user = get_user_by_email(user_model.email)
        return user[0]
    except HTTPException as e:
        print(e)
        if 'user_timezone' in str(e):
            raise HTTPException(status_code=422, detail='Timezone field is required')
        else:
            raise


def signin_user(email, password):

    user_dict = get_user_by_email(email)
    
    user_dict = user_dict[0]
    # convert the user dictionary to a UserResponseModel object
    user = UserResponseModel(**user_dict)

    if len(user) == 0:
        print('Invalid email')
        raise HTTPException(status_code=401, detail='Invalid email')
    if (not auth_handler.verify_password(password, user.password_hash)):
        print('Invalid password')
        raise HTTPException(status_code=401, detail='Invalid password')
    
    return user


def update_user(user_model: UserUpdateRequestModel):
    hashed_password = auth_handler.encode_password(user_model.password)
    query_put("""
            UPDATE user 
                SET first_name = %s,
                    last_name = %s,
                    email = %s,
                    password_hash = %s,
                    user_timezone = %s,
                WHERE user.email = %s;
            """,
              (
                  user_model.first_name,
                  user_model.last_name,
                  user_model.email,
                  hashed_password,
                  user_model.user_timezone,
                  user_model.email,
              )
              )
    user = get_user_by_email(user_model.email)
    return user[0]


def get_all_users():
    user = query_get("""
        SELECT  
            user.id,
            user.first_name,
            user.last_name,
            user.email
        FROM user
        """, ())
    return user


def get_user_by_email(email: str):
    user = query_get("""
        SELECT 
            user.id,
            user.first_name,
            user.last_name,
            user.email,
            user.password_hash,
            user.user_timezone,
            user.clock_in_times,
            user.clock_out_times
        FROM user 
        WHERE email = %s
        """, (email))
    return user


def get_user_by_id(id: int):
    user = query_get("""
        SELECT 
            user.id,
            user.first_name,
            user.last_name,
            user.email,
        FROM user 
        WHERE id = %s
        """, (id))
    return user


#get user by email and return time data
def get_user_timesheet_by_email(user_model: UserResponseModel):
    user = query_get("""
        SELECT 
            user.id,
            user.first_name,
            user.last_name,
            user.email,
            user.user_timezone,
            user.clock_in_times,
            user.clock_out_times
        FROM user 
        WHERE email = %s
        """, (user_model.email))
    return user[0]

# get users timezone by email and return only the timezone data
def get_user_timezone_by_email(email: str):
    user = query_get("""
        SELECT 
            user.id,
            user.email,
            user.user_timezone
        FROM user 
        WHERE email = %s
        """, (email))
    return user[0]['user_timezone']

# save new clocl in time data to user
def save_user_time_by_email_clockin(email: str):
    # get the user object from the user's email
    user_dict = get_user_by_email(email)

    # convert the user dictionary to a UserResponseModel object
    user = UserResponseModel(**user_dict)

    # get the timezone of the user
    set_timezone = pytz.timezone(user.user_timezone)

    # get the current time in the user's timezone
    clock_in = datetime.now(set_timezone)
    # if the user doesn't have any clock_out_times yet, set the field to an empty list first
    if user.clock_in_times is None:
        user.clock_in_times = []

    #append the new clock-in and clock-out times to the user object based off the timezone
    user.clock_in_times.append(clock_in)
    
    #save the updated user object to the database
    query_put("""
            UPDATE user
                SET clock_in_times = %s
                WHERE user.email = %s;
            """,
                (
                    user.clock_in_times,
                    user.email
                )
            )
    return user.dict()

# save new time data to user clock out
def save_user_time_by_email_clockout(email: str):
    # get the user object from the user's email
    user_dict = get_user_by_email(email)

    # convert the user dictionary to a UserResponseModel object
    user = UserResponseModel(**user_dict)

    # get the timezone of the user
    set_timezone = pytz.timezone(user.user_timezone)

    # convert the clock out time to the user's timezone
    clock_out = datetime.now(set_timezone)
    # if the user doesn't have any clock_out_times yet, set the field to an empty list first
    if user.clock_out_times is None:
        user.clock_out_times = []

    #append the new clock-in and clock-out times to the user object based off the timezone
    user.clock_out_times.append(clock_out)
    
    #save the updated user object to the database
    query_put("""
            UPDATE user
                SET clock_out_times = %s
                WHERE user.email = %s;
            """,
                (
                    user.clock_out_times,
                    user.email
                )
            )
    return user.dict()