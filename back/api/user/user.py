from fastapi import HTTPException
from database.query import query_get, query_put, query_update
from .auth import Auth
from .models import UserUpdateRequestModel, UserResponseModel

auth_handler = Auth()


def register_user(user_model: UserUpdateRequestModel):
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
                    timezone
                ) VALUES (%s,%s,%s,%s,%s)
                """,
              (
                  user_model.first_name,
                  user_model.last_name,
                  user_model.email,
                  hashed_password,
                  user_model.timezone
              )
              )
    user = get_user_by_email(user_model.email)
    return user[0]


def signin_user(email, password):
    user = get_user_by_email(email)
    if len(user) == 0:
        print('Invalid email')
        raise HTTPException(status_code=401, detail='Invalid email')
    if (not auth_handler.verify_password(password, user[0]['password_hash'])):
        print('Invalid password')
        raise HTTPException(status_code=401, detail='Invalid password')
    return user[0]


def update_user(user_model: UserUpdateRequestModel):
    hashed_password = auth_handler.encode_password(user_model.password)
    query_put("""
            UPDATE user 
                SET first_name = %s,
                    last_name = %s,
                    email = %s,
                    password_hash = %s,
                    timezone = %s,
                WHERE user.email = %s;
            """,
              (
                  user_model.first_name,
                  user_model.last_name,
                  user_model.email,
                  hashed_password,
                  user_model.timezone,
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
            user.password_hash
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

#get user by email and return user
def get_user_by_email(email: str):
    user = query_get("""
        SELECT 
            user.id,
            user.first_name,
            user.last_name,
            user.email,
            user.password_hash
        FROM user 
        WHERE email = %s
        """, (email))
    return user

#get user by email and return time data
def get_user_time_by_email(email: str):
    user = query_get("""
        SELECT 
            user.id,
            user.first_name,
            user.last_name,
            user.email,
            user.clock_in,
            user.clock_out
        FROM user 
        WHERE email = %s
        """, (email))
    return user

# save new time data to user
def save_user_time_by_email_clockin(email: str, clock_in: str):
    #get the user object from the user's email
    user = get_user_by_email(email)
    #append the new clock-in and clock-out times to the user object
    user.clock_in_times.append(clock_in)
    #save the updated user object to the database
    query_put("""
            UPDATE user
                SET clock_in = %s,
                WHERE user.email = %s;
            """,
                (
                    user.clock_in_times,
                    user.clock_out_times,
                    user.email
                )
            )
    return user

# save new time data to user clock out
def save_user_time_by_email_clockout(email: str, clock_out: str):
    #get the user object from the user's email
    user = get_user_by_email(email)
    #append the new clock-out time to the user object
    user.clock_out_times.append(clock_out)
    #save the updated user object to the database
    query_put("""
            UPDATE user
                SET clock_out = %s,
                WHERE user.email = %s;
            """,
                (
                    user.clock_out_times,
                    user.email
                )
            )
    return user