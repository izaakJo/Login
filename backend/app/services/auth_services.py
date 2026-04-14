from sqlalchemy.orm import Session
from app.models.user import User
from passlib.context import CryptContext
from jose import jwt
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("JWT_SECRET") or "supersecretkey"
ALGORITHM = "HS256"

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def hash_password(password: str):
    return pwd_context.hash(password)

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user

def create_token(data: dict):
    payload = {
        "user_id": data["user_id"]
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except:
        return None

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, email: str, password: str):
    existing = get_user_by_email(db, email)

    if existing:
        return None

    hashed = hash_password(password)
    new_user = User(email=email, password=hashed)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user