from sqlalchemy.orm import Session
from app.models.user import User
from passlib.context import CryptContext
from jose import jwt
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user

def create_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)



# hashear contraseña
def hash_password(password: str):
    return pwd_context.hash(password)
# obtener usuario por email
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()
# crear usuario, si existe devuelve nada
def create_user(db: Session, email: str, password: str):
    existing = get_user_by_email(db, email)

    if existing:
        return None  # ya existe
    # llama a la definicion de hashear pasword
    hashed = hash_password(password)
    # crea un nuevo usuario
    new_user = User(email=email, password=hashed)
    # colocar un objeto en la session db
    db.add(new_user)
    # omite los cambios pendientes y confirma la transaccion actual
    db.commit()
    # caduca y actualiza los atribustos en la instacia
    db.refresh(new_user)

    return new_user