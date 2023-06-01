from fastapi import HTTPException
from database.query import query_get, query_put, query_update
from .auth import Auth
from .models import UserUpdateRequestModel
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm.exc import MultipleResultsFound
from werkzeug.security import generate_password_hash, check_password_hash

auth_handler = Auth()


def register_user(user_model: UserUpdateRequestModel):
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        user = session.query(User).filter_by(email=user_model.email).one_or_none()
        if user is not None:
            raise HTTPException(
                status_code=409, detail='Email user already exists.')
        hashed_password = auth_handler.encode_password(user_model.password)
        user = User(
            first_name=user_model.first_name,
            last_name=user_model.last_name,
            email=user_model.email,
            password_hash=hashed_password
        )
        session.add(user)
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
    return user


def signin_user(email: str, password: str) -> User:
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        user = session.query(User).filter_by(email=email).one()
        if not check_password_hash(user.password_hash, password):
            raise Exception("Invalid password")
    except NoResultFound:
        raise Exception(f"No user found with email {email}")
    except MultipleResultsFound:
        raise Exception(f"Multiple users found for email {email}")
    finally:
        session.close()
    return user


def update_user(user_model: UserUpdateRequestModel):
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        user = session.query(User).filter_by(email=user_model.email).one_or_none()
        if user is None:
            raise HTTPException(
                status_code=404, detail='User not found.')
        hashed_password = auth_handler.encode_password(user_model.password)
        user.first_name = user_model.first_name
        user.last_name = user_model.last_name
        user.email = user_model.email
        user.password_hash = hashed_password
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
    return user



def get_user_by_email(email: str):
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        user = session.query(User).filter_by(email=email).one()
    except NoResultFound:
        user = None
    except MultipleResultsFound:
        raise Exception(f"Multiple users found for email {email}")
    finally:
        session.close()
    return user

