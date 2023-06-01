from fastapi import FastAPI, HTTPException, Security
from fastapi.middleware.cors import CORSMiddleware
from database.query import query_get, query_put, query_update
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from user import Auth, SignInRequestModel, SignUpRequestModel, UserAuthResponseModel, UserUpdateRequestModel, UserResponseModel, register_user, signin_user, update_user, get_all_users, get_user_by_id

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:4000",
    "http://localhost:19006"
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

@app.post('/v1/signup', response_model=UserAuthResponseModel)
def signup_api(user_details: SignUpRequestModel):
    """
    This sign-up API allows you to register your account and returns an access token.
    """
    user = register_user(user_details)
    access_token = auth_handler.encode_token(user_details.email)
    refresh_token = auth_handler.encode_refresh_token(user_details.email)
    return JSONResponse(status_code=200, content={'token': {'access_token': access_token, 'refresh_token': refresh_token}, 'user': user})


@app.post('/v1/signin', response_model=UserAuthResponseModel)
def signin_api(user_details: SignInRequestModel):
    """
    This sign-in API allows you to obtain your access token.
    """
    user = signin_user(user_details.email, user_details.password)
    access_token = auth_handler.encode_token(user.email)
    refresh_token = auth_handler.encode_refresh_token(user.email)
    return JSONResponse(status_code=200, content={'token': {'access_token': access_token, 'refresh_token': refresh_token}, 'user': user})



################################
########## Users APIs ##########
################################



@app.post("/v1/user/update", response_model=UserResponseModel)
def update_user_api(user_details: UserUpdateRequestModel, credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    This user update API allows you to update user data.
    """
    token = credentials.credentials
    if (auth_handler.decode_token(token)):
        user = update_user(user_details)
        return {'user': user}
    raise HTTPException(status_code=401, detail='Failed to authorize')


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
