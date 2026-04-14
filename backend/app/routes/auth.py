from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.schemas.user import UserLogin, UserCreate
from app.config.database import SessionLocal
from app.services.auth_services import (
    authenticate_user,
    create_token,
    create_user,
    decode_token
)
from app.models.user import User

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# LOGIN
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.email, user.password)

    if not db_user:
        raise HTTPException(status_code=400, detail="Credenciales inválidas")

    token = create_token({"user_id": db_user.id})

    return {"token": token}

# REGISTER
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = create_user(db, user.email, user.password)

    if not new_user:
        raise HTTPException(status_code=400, detail="Usuario ya existe")

    return {"message": "Usuario creado correctamente"}

# 🔥 /ME (CLAVE PARA NAVUSER)
@router.get("/me")
def get_me(authorization: str = Header(...), db: Session = Depends(get_db)):
    try:
        token = authorization.split(" ")[1]
        payload = decode_token(token)

        if not payload:
            raise HTTPException(status_code=401, detail="Token inválido")

        user_id = payload.get("user_id")

        user = db.query(User).filter(User.id == user_id).first()

        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        return {
            "name": user.email.split("@")[0],
            "email": user.email,
            "avatar": f"https://ui-avatars.com/api/?name={user.email}"
        }

    except:
        raise HTTPException(status_code=401, detail="Token inválido")