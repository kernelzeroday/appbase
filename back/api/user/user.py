from fastapi import HTTPException
from database.query import query_get, query_put, query_update
from .auth import Auth
from .models import *

from datetime import timedelta, datetime

from collections import defaultdict
import math
from math import ceil
import calendar
from typing import List, Dict


import pytz
auth_handler = Auth()

###################################################################################################
############################################# USER ################################################
###################################################################################################

# register user using UserSignUpRequestModel
def register_user(user_model: UserSignUpRequestModel):
    user = get_user_by_email(user_model.user_email)
    if len(user) != 0:
        raise HTTPException(
            status_code=409, detail='Email user already exists.')
    hashed_password = auth_handler.encode_password(user_model.user_password)

    query_put("""
                INSERT INTO user (
                    user_first_name,
                    user_last_name,
                    user_email,
                    user_password_hash,
                    user_timezone,
                    user_role
                ) VALUES (%s,%s,%s,%s,%s,%s)
                """,
            (
                user_model.user_first_name,
                user_model.user_last_name,
                user_model.user_email,
                hashed_password,
                user_model.user_timezone,
                user_model.user_role
            )
            )
    user = get_user_by_email(user_model.user_email)
    return user[0]

# sign in user using SignInRequestModel
def sign_in_user(user_model: SignInRequestModel):
    user = get_user_by_email(user_model.user_email)
    if len(user) == 0:
        raise HTTPException(
            status_code=404, detail='Email user not found.')
    if not auth_handler.verify_password(user_model.user_password, user[0]['user_password_hash']):
        raise HTTPException(
            status_code=401, detail='Incorrect password.')
    user = get_user_by_email(user_model.user_email)
    return user[0]

"""
def signin_user(email, password):
    user_dict = get_user_by_email(email)
    if len(user_dict) == 0:
        print('Invalid email')
        raise HTTPException(status_code=401, detail='Invalid email')
    if (not auth_handler.verify_password(password, user_dict[0]['password_hash'])):
        print('Invalid password')
        raise HTTPException(status_code=401, detail='Invalid password')
    return user_dict[0]
"""


####################################################################################################
######################################## USER DATA QUERIES #########################################
####################################################################################################

# get all users query
def get_all_users():
    user = query_get("""
        SELECT  
            user.id,
            user.user_first_name,
            user.user_last_name,
            user.user_email
        FROM user
        """, ())
    return user

# get user by email query
def get_user_by_email(email: str):
    user = query_get("""
        SELECT 
            user.id,
            user.user_first_name,
            user.user_last_name,
            user.user_email,
            user.user_password_hash,
            user.user_timezone
        FROM user 
        WHERE user_email = %s
        """, (email))
    return user

# get user by id query
def get_user_by_id(id: int):
    user = query_get("""
        SELECT 
            user.id,
            user.user_first_name,
            user.user_last_name,
            user.user_email,
        FROM user 
        WHERE id = %s
        """, (id))
    return user


###################################################################################################
######################################## USER TIME SHEET ##########################################
###################################################################################################

# get user timesheet data by email query
def get_user_timesheet_by_email(email: str) -> List[Dict]:
    user = query_get("""
        SELECT 
            clock_times.clock_in_time,
            clock_times.clock_out_time
        FROM user
        LEFT JOIN clock_times ON user.id = clock_times.user_id 
        WHERE user_email = %s
        """, (email,))
    
    data = []
    for row in user:
        clock_in_time = row['clock_in_time']
        clock_out_time = row['clock_out_time']
        data.append({'clock_in_time': clock_in_time, 'clock_out_time': clock_out_time})


    # Step 1: Sort the list by the clock_in_time
    sorted_data = sorted(data, key=lambda k: k['clock_in_time'])

    # Step 2: Calculate the total hours for each day
    days_data = {}
    for item in sorted_data:
        date = item['clock_in_time'].date()
        if date not in days_data:
            days_data[date] = {'clock_in_times': [item['clock_in_time'].strftime('%H:%M:%S')], 'clock_out_times': [item['clock_out_time'].strftime('%H:%M:%S')], 'total_hours': 0}
        else:
            days_data[date]['clock_in_times'].append(item['clock_in_time'].strftime('%H:%M:%S'))
            days_data[date]['clock_out_times'].append(item['clock_out_time'].strftime('%H:%M:%S'))

        days_data[date]['total_hours'] += (item['clock_out_time'] - item['clock_in_time']).total_seconds() / 3600.0

    # Step 3: Create a new key that holds the week number and month name
    for i, (key, value) in enumerate(sorted(days_data.items()), 1):
        week_number = (i-1) // 7 + 1
        month_name = key.strftime('%B')
        days_data[key]['week_number'] = week_number
        days_data[key]['month_name'] = month_name

    # Step 4: Calculate the total hours for each week and month
    weeks_data = {}
    months_data = {}
    for key, value in days_data.items():
        week_number = value['week_number']
        month_name = value['month_name']
        if week_number not in weeks_data:
            weeks_data[week_number] = {'total_hours': 0}
        if month_name not in months_data:
            months_data[month_name] = {'total_hours': 0}
        weeks_data[week_number]['total_hours'] += value['total_hours']
        months_data[month_name]['total_hours'] += value['total_hours']

    # Create a list of the formatted results
    results = []
    for key, value in days_data.items():
        week_number = value['week_number']
        month_name = value['month_name']
        results.append({
            'date': key.strftime('%Y-%m-%d'),
            'clock_in_times': value['clock_in_times'],
            'clock_out_times': value['clock_out_times'],
            'total_hours': round(value['total_hours'], 2),
            'week_number': week_number,
            'week_total_hours': round(weeks_data[week_number]['total_hours'], 2),
            'month_name': month_name,
            'month_total_hours': round(months_data[month_name]['total_hours'], 2),
        })

    return results



# admin function to get all users time records for the week and month and return a list of the formatted results
def get_all_users_time_records():
    # get all users time records
    data = query_get("""
        SELECT 
            clock_times.id,
            clock_times.user_id,
            clock_times.clock_in_time,
            clock_times.clock_out_time,
            user.user_email,
            user.user_timezone
        FROM clock_times
        INNER JOIN user ON clock_times.user_id = user.id
        ORDER BY clock_times.clock_in_time ASC;
    """)

    # convert the user dictionary to a UserResponseModel object
    user = UserTimeZoneResponseModel(**data)

    # get the timezone of the user
    set_timezone = pytz.timezone(user.user_timezone)

    # convert the clock_in_time and clock_out_time to the user's timezone
    clock_in = data['clock_in_time'].astimezone(set_timezone)
    clock_out = data['clock_out_time'].astimezone(set_timezone)

    # convert the clock_in_time and clock_out_time to a string
    clock_in = clock_in.strftime('%Y-%m-%d %H:%M:%S')
    clock_out = clock_out.strftime('%Y-%m-%d %H:%M:%S')

    # create a list of the formatted results
    results = []
    for item in data:
        results.append({
            'id': item['id'],
            'user_id': item['user_id'],
            'user_email': item['user_email'],
            'clock_in_time': clock_in,
            'clock_out_time': clock_out,
            'total_hours': round((item['clock_out_time'] - item['clock_in_time']).total_seconds() / 3600.0, 2),
        })

    return results



###################################################################################################
######################################## USER TIME QUERIES ########################################
###################################################################################################

# get users timezone by email and return only the timezone data
def get_user_timezone_by_email(email: str):
    user = query_get("""
        SELECT 
            user.id,
            user.user_email,
            user.user_timezone
        FROM user 
        WHERE user_email = %s
        """, (email))
    return user[0]

# save the user's clock-in time to the database
def save_user_time_by_email_clockin(email: str):
    # get the user object from the user's email
    user_dict = get_user_timezone_by_email(email)
    user_id = user_dict['id']

    # convert the user dictionary to a UserResponseModel object
    user = UserTimeZoneResponseModel(**user_dict)

    # get the timezone of the user
    set_timezone = pytz.timezone(user.user_timezone)

    # check if the user has an existing clock-in record without a clock-out time
    existing_record = query_get("""
        SELECT * FROM clock_times WHERE user_id = %s AND clock_out_time IS NULL;
    """, (user_id))

    #check if the user has any time records
    if len(existing_record) == 0:
            
        # get the current time in the user's timezone
        clock_in = datetime.now(set_timezone)

        # save the new clock-in time to the database
        query_put("""
            INSERT INTO clock_times (user_id, clock_in_time, clock_out_time)
            VALUES (%s, %s, NULL);
        """,
            (user_id, clock_in)
        )

        return clock_in

    elif existing_record is not None:
        # user has an existing clock-in record without a clock-out time, return an error message
        return "Error: You cannot clock in again until you have clocked out."

# save the user's clock-out time to the database
def save_user_time_by_email_clockout(email: str):
    # get the user object from the user's email
    user_dict = get_user_timezone_by_email(email)
    user_id = user_dict['id']

    # convert the user dictionary to a UserResponseModel object
    user = UserTimeZoneResponseModel(**user_dict)

    # get the timezone of the user
    set_timezone = pytz.timezone(user.user_timezone)

    # get the current time in the user's timezone
    clock_out = datetime.now(set_timezone)

    # if there is no clock in time for the user, return an error message
    if len(query_get("""
        SELECT * FROM clock_times WHERE user_id = %s AND clock_out_time IS NULL;
    """, (user_id))) == 0:
        return "Error: You cannot clock out without first clocking in."

    # update the clock-out time for the most recent clock-in record for the user
    query_put("""
        UPDATE clock_times
        SET clock_out_time = %s
        WHERE user_id = %s AND clock_out_time IS NULL
        ORDER BY clock_in_time DESC
        LIMIT 1;
    """,
        (clock_out, user_id)
    )

    return clock_out


###################################################################################################
############################################## ADMIN ##############################################
###################################################################################################

# admin function to return admin role
def admin_get_role(admin: str):
    admin = get_admin_by_email(admin.admin_email)
    return admin[0]['admin_role']


# get admin data by email using AdminResponseModel and return only the admin data
def get_admin_by_email(email: str):
    admin = query_get("""
        SELECT 
            admin.id,
            admin.admin_email,
            admin.admin_password
            admin.admin_timezone,
            admin.admin_role
        FROM admin 
        WHERE admin_email = %s
        """, (email))
    return admin[0]

# admin function to signup admin user using AdminSignUpRequestModel, if admin has already been created, return an error message
def admin_signup(admin: AdminSignUpRequestModel):
    # check if admin has already been created
    if len(query_get("""
        SELECT * FROM admin;
    """)) > 0:
        return "Error: Admin has already been created."

    # hash the password using AuthHandler
    hashed_password = auth_handler.get_password_hash(admin.password)

    # save the new admin email, first name,  last name,  password , role to the database
    query_put("""
        INSERT INTO admin (admin_email, admin_password, admin_role)
        VALUES (%s, %s, %s);
    """,
        (admin.admin_email, hashed_password, admin.admin_role)
    )
    admin = get_admin_by_email(admin.admin_email)

    return admin


# admin function to login admin user using AdminSignInRequestModel, if admin has not been created, return an error message
def admin_login(admin: AdminSignInRequestModel):

    admin = get_admin_by_email(admin.admin_email)
    if len(admin) == 0:
        raise HTTPException(
            status_code=404, detail='Admin user not found.')
    if not auth_handler.verify_password(admin.password, admin[0]['password_hash']):
        raise HTTPException(
            status_code=401, detail='Incorrect password.')
    admin = get_admin_by_email(admin.admin_email)
    return admin[0]


# admin function to create / add non admin users using AdminUserSignUpRequestModel only if the admin has admin role
def admin_create_user(admin: str, user: AdminUserSignUpRequestModel):
    admin = admin_get_role(admin.admin_email)
    # if admin is not an admin, return an error message
    if admin != 'admin':
        return "Error: You do not have permission to view this page."

    # hash the password using AuthHandler
    hashed_password = auth_handler.get_password_hash(user.user_password)

    # save the new user email, first name,  last name,  password , role , timezone to the database
    query_put("""
        INSERT INTO user (user_email, user_first_name, user_last_name, user_password, user_role, user_timezone)
        VALUES (%s, %s, %s, %s, %s, %s);
    """,
        (user.user_email, user.user_first_name, user.user_last_name, hashed_password, user.user_role, user.user_timezone)
    )
    user = get_user_by_email(user.user_email)
    return user[0]

# admin function to delete users using UserUpdateRequestModel only if the admin has admin role
def admin_delete_user(admin: str, user: AdminUserUpdateRequestModel):
    admin = admin_get_role(admin.admin_email)
    # if admin is not an admin, return an error message
    if admin[0]['admin_role'] != 'admin':
        return "Error: You do not have permission to view this page."

    # delete the user from the database
    query_put("""
        DELETE FROM user
        WHERE user_email = %s;
    """,
        (user.user_email)
    )
    return "User deleted."

# admin function to update users password using UserUpdateRequestModel only if the admin has admin role
def admin_update_user_password(admin: str, user: AdminUserUpdateRequestModel):
    admin = admin_get_role(admin.admin_email)
    # if admin is not an admin, return an error message
    if admin != 'admin':
        return "Error: You do not have permission to view this page."

    # hash the password using AuthHandler
    hashed_password = auth_handler.get_password_hash(user.user_password)

    # update the user's password in the database
    query_put("""
        UPDATE user
        SET password = %s
        WHERE user_email = %s;
    """,
        (hashed_password, user.user_email)
    )
    user = get_user_by_email(user.user_email)
    return user[0]

# admin function to get all users' time records using AdminTimesheetResponseModelAllUsers
def admin_get_all_users_timesheet(admin: str, user_data: List[dict]) -> List[dict]:

    admin = admin_get_role(admin)
    # if admin is not an admin, return an error message
    if admin != 'admin':
        return "Error: You do not have permission to view this page."

    today = datetime.today()
    start_of_week = today - timedelta(days=today.weekday())
    end_of_week = start_of_week + timedelta(days=6)

    data = query_get(f"""
        SELECT 
            clock_times.user_id,
            user.user_first_name,
            user.user_last_name,
            user.user_email,
            DATE(clock_times.clock_in_time) AS date,
            TIME(clock_times.clock_in_time) AS clock_in_time,
            TIME(clock_times.clock_out_time) AS clock_out_time
        FROM clock_times
        JOIN user ON clock_times.user_id = user.id
        WHERE clock_times.clock_in_time BETWEEN '{start_of_week}' AND '{end_of_week}'
        ORDER BY clock_times.user_id, DATE(clock_times.clock_in_time), clock_times.clock_in_time, clock_times.clock_out_time;
    """)

    results = []
    for item in data:
        user_id = item['user_id']
        first_name = item['user_first_name']
        last_name = item['user_last_name']
        email = item['user_email']
        date = item['date']
        clock_in_time = item['clock_in_time']
        clock_out_time = item['clock_out_time']

        # find the existing result for this date, or create a new one if none exists
        result = next((r for r in results if r['user_id'] == user_id and r['date'] == date), None)
        if result is None:
            result = {
                'user_id': user_id,
                'user_first_name': first_name,
                'user_last_name': last_name,
                'user_email': email,
                'date': date,
                'clock_in_times': [],
                'clock_out_times': [],
                'total_hours': 0.0,
                'week_number': start_of_week.isocalendar()[1],
                'week_total_hours': 0.0,
                'month_name': today.strftime('%B'),
                'month_total_hours': 0.0
            }
            results.append(result)

        # add the clock in/out times to the result
        result['clock_in_times'].append(clock_in_time)
        result['clock_out_times'].append(clock_out_time)

    # calculate the total hours for each result
    for result in results:
        clock_in_times = result['clock_in_times']
        clock_out_times = result['clock_out_times']
        total_hours = sum([(datetime.strptime(out, '%H:%M:%S') - datetime.strptime(clock_in, '%H:%M:%S')).total_seconds() / 3600.0 for clock_in, out in zip(clock_in_times, clock_out_times)])
        result['total_hours'] = round(total_hours, 2)
        result['week_total_hours'] = round(total_hours, 2)
        result['month_total_hours'] = round(total_hours, 2)

    return results