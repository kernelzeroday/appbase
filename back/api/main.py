from fastapi import FastAPI, HTTPException, Security
from fastapi.middleware.cors import CORSMiddleware
from database.query import query_get, query_put, query_update
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.responses import StreamingResponse


#from user import Auth, SignInRequestModel, SignUpRequestModel, UserAuthResponseModel, UserUpdateRequestModel, UserResponseModel,  TimesheetResponseModel, AdminSignUpRequestModel, AdminSignInRequestModel, AdminResponseModel, AdminRoleResponseModel, AdminTimesheetResponseModelAllUsers, register_user, signin_user, update_user, get_all_users, get_user_by_id, save_user_time_by_email_clockin, save_user_time_by_email_clockout, get_user_timesheet_by_email
from user import *
from datetime import datetime, timedelta
from io import BytesIO
import openpyxl


app = FastAPI()

origins = [
    "http://api.royaltimeclock.com",
    "http://api.royaltimeclock.com:8000",
    "http://royaltimeclock.com",
    "http://royaltimeclock.com:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()
auth_handler = Auth()


###############################
########## Auth APIs ##########
###############################

# user signup api and return access token
@app.post('/v1/signup', response_model=UserAuthResponseModel)
def signup_api(user_details: UserSignUpRequestModel):
    """
    This sign-up API allow you to obtain your access token.
    """
    user = register_user(user_details)
    access_token = auth_handler.encode_token(user['user_email'])
    refresh_token = auth_handler.encode_refresh_token(user['user_email'])
    return JSONResponse(status_code=200, content={'token': {'access_token': access_token, 'refresh_token': refresh_token}, 'user': user})

 
# user signin api and return access token
@app.post('/v1/signin', response_model=UserAuthResponseModel)
def signin_api(user_details: SignInRequestModel):
    """
    This sign-in API allow you to obtain your access token.
    """
    user = sign_in_user(user_details)
    access_token = auth_handler.encode_token(user['user_email'])
    refresh_token = auth_handler.encode_refresh_token(user['user_email'])
    return JSONResponse(status_code=200, content={'token': {'access_token': access_token, 'refresh_token': refresh_token}, 'user': user})



@app.get('/v1/refresh-token')
def refresh_token_api(refresh_token: str):
    """
    This refresh-token API allow you to obtain new access token.
    """
    new_token = auth_handler.refresh_token(refresh_token)
    return {'access_token': new_token}


################################
########## Users APIs ##########
################################

@app.get("/v1/users", response_model=list[UserResponseModel])
def get_all_users_api(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    This users get API allow you to fetch all user data.
    """
    token = credentials.credentials
    if (auth_handler.decode_token(token)):
        user = get_all_users()
        return JSONResponse(status_code=200, content=jsonable_encoder(user))
    return JSONResponse(status_code=401, content={'error': 'Faild to authorize'})


@app.get("/v1/user/{user_id}", response_model=UserResponseModel)
def get_user_api(user_id: int, credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    This user API allow you to fetch specific user data.
    """
    token = credentials.credentials
    if (auth_handler.decode_token(token)):
        user = get_user_by_id(user_id)
        return JSONResponse(status_code=200, content=jsonable_encoder(user))
    return JSONResponse(status_code=401, content={'error': 'Faild to authorize'})


@app.post('/v1/clockin')
def clockin_api(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    This clockin API allow you to set clock in time.
    """
    token = credentials.credentials
    
    #decode user from token
    user = auth_handler.decode_token(token)
    
    #print the user to the console
    print("Logged in as: " + user)

    user = save_user_time_by_email_clockin(user)

    #get the user id from the user object
    
    #print the user id to the console

    if (auth_handler.decode_token(token)):
        return JSONResponse(status_code=200, content=jsonable_encoder(user))
    return JSONResponse(status_code=401, content={'error': 'Faild to authorize'})

@app.post('/v1/clockout')
def clockout_api(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    This clockout API allow you to set clock out time.
    """
    token = credentials.credentials
    
    #decode user from token
    user = auth_handler.decode_token(token)
    
    #print the user to the console
    print("Logged in as: " + user)
    
    #get the user object from the users email and provide the clock out time
    user = save_user_time_by_email_clockout(user)

    #print the user to the console
    print(user)
    #get the user id from the user object
    
    #print the user id to the console

    if (auth_handler.decode_token(token)):
        return JSONResponse(status_code=200, content=jsonable_encoder(user))
    return JSONResponse(status_code=401, content={'error': 'Faild to authorize'})

# get user time data from database
@app.get('/v1/timecard', response_model=list[TimesheetResponseModel])
def get_timecard_api(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    This timecard API allow you to fetch specific user data.
    """
    token = credentials.credentials

    #decode user from token
    user = auth_handler.decode_token(token)
    
    #print the user to the console

    print("Logged in as: " + user)

    user = get_user_timesheet_by_email(user)

    #print the user to the console
    print(user)

    user = { 'clock_times': user }

    if (auth_handler.decode_token(token)):
        return JSONResponse(status_code=200, content=jsonable_encoder(user))
    return JSONResponse(status_code=401, content={'error': 'Faild to authorize'})




################################
########## Admin APIs ##########
################################

# admin sign up API AdminSignUpRequestModel and return access token
@app.post('/v1/admin/signup', response_model=AdminSignUpRequestModel)
def admin_signup_api(admin_details: AdminSignUpRequestModel):
    """
    This admin sign-up API allow you to register your account, and return access token.
    """
    admin = admin_signup(admin_details)
    access_token = auth_handler.encode_token(admin['admin_email'])
    refresh_token = auth_handler.encode_refresh_token(admin['admin_email'])
    return JSONResponse(status_code=200, content={'token': {'access_token': access_token,'refresh_token': refresh_token}, 'user': admin})


# admin sign in API AdminSignInRequestModel and return access token
@app.post('/v1/admin/signin', response_model=AdminSignInRequestModel)
def admin_signin_api(admin_details: AdminSignInRequestModel):
    """
    This admin sign-in API allow you to obtain your access token.
    """
    admin = admin_login(admin_details)
    access_token = auth_handler.encode_token(admin['admin_email'])
    refresh_token = auth_handler.encode_refresh_token(admin['admin_email'])
    return JSONResponse(status_code=200, content={'token': {'access_token': access_token,'refresh_token': refresh_token}, 'user': admin})

# get users time data from database for admin view only AdminTimesheetResponseModelAllUsers
@app.get('/v1/admin/timecard', response_model=list[AdminTimesheetResponseModelAllUsers])
def get_timecard_api(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    This timecard API allow you to fetch specific user data.
    """
    token = credentials.credentials

    #decode user from token
    admin = auth_handler.decode_token(token)
    
    #print the user to the console

    print("Logged in as: " + admin)

    # get admin data from database
    user = admin_get_all_users_timesheet(admin)

    #print the user to the console
    print(user)

    user = { 'response': user }

    if (auth_handler.decode_token(token)):
        return JSONResponse(status_code=200, content=jsonable_encoder(user))
    return JSONResponse(status_code=401, content={'error': 'Faild to authorize'})

# get users data from database for admin view only AdminTimesheetResponseModelAllUsers download as xlxs file
@app.get('/v1/admin/timecard/download', response_model=list[AdminTimesheetResponseModelAllUsers])
def get_timecard_download_api(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    This TimeCard Download API allow you to fetch specific user data.
    """
    """
    This timecard API allow you to fetch specific user data.
    """
    token = credentials.credentials

    #decode user from token
    admin = auth_handler.decode_token(token)
    
    #print the user to the console
    print("Logged in as: " + admin)

    # get admin data from database
    user = admin_get_all_users_timesheet_download(admin)

    #print the user to the console
    print(user)

    # create a new Excel workbook and add the data to it
    workbook = openpyxl.load_workbook('existing_workbook.xlsx')
    worksheet = workbook.active
    # Read the existing column headings and store them in a list
    existing_headings = []
    for cell in worksheet[1]:
        existing_headings.append(cell.value)

    # Add the new data to the worksheet
    for row_num, data in enumerate(user, start=2):  # start from row 2, since row 1 has the headings
        for col_num, heading in enumerate(existing_headings, start=4):  # start from column 1
            worksheet.cell(row=row_num, column=col_num, value=data.get(heading))

    # save the workbook to a BytesIO object
    stream = BytesIO()
    workbook.save(stream)
    stream.seek(0)

    # create filename with current date
    filename = datetime.now().strftime("%Y-%m-%d") + ".xlsx"

    # return the workbook as a downloadable Excel file with the current date as filename
    response = StreamingResponse(stream, media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.headers['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response



# create users to 'user' table AdminUserUpdateRequestModel for admin view only
@app.post('/v1/admin/user/create', response_model=AdminUserUpdateRequestModel)
def admin_user_create_api(admin_details: AdminUserUpdateRequestModel, credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    This admin user create API allow you to create user.
    """
    token = credentials.credentials

    #decode user from token
    admin = auth_handler.decode_token(token)
    
    #print the user to the console

    print("Logged in as: " + admin)

    # get admin data from database
    user = admin_create_user(admin_details.user_email, admin_details.user_password)

    #print the user to the console
    print(user)

    user = { 'response': user }

    if (auth_handler.decode_token(token)):
        return JSONResponse(status_code=200, content=jsonable_encoder(user))

# change users password using email AdminUserUpdateRequestModel for admin view only
@app.post('/v1/admin/user/update', response_model=AdminUserUpdateRequestModel)
def admin_user_update_api(admin_details: AdminUserUpdateRequestModel, credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    This admin user update API allow you to update user password.
    """
    token = credentials.credentials

    #decode user from token
    admin = auth_handler.decode_token(token)
    
    #print the user to the console

    print("Logged in as: " + admin)

    # get admin data from database
    user = admin_update_user_password(admin_details.email, admin_details.password)

    #print the user to the console
    print(user)

    user = { 'response': user }

    if (auth_handler.decode_token(token)):
        return JSONResponse(status_code=200, content=jsonable_encoder(user))
    return JSONResponse(status_code=401, content={'error': 'Faild to authorize'})


###############################
########## Test APIs ##########
###############################

@app.get('/secret')
def secret_data_api(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    This secret API is just for testing. Need access token to access this API.
    """
    token = credentials.credentials
    if (auth_handler.decode_token(token)):
        return 'Top Secret data only authorized users can access this info'


@app.get('/not-secret')
def not_secret_data_api():
    """
    This not-secret API is just for testing.
    """
    return 'Not secret data'