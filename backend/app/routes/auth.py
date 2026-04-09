from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserLogin
from app.config.database import SessionLocal
from app.services.auth_services import authenticate_user, create_token
from app.schemas.user import UserCreate
from app.services.auth_services import create_user
router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# @router.post("/login")
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    try:
        db_user = authenticate_user(db, user.email, user.password)

        if not db_user:
            raise HTTPException(status_code=400, detail="Credenciales inválidas")

        token = create_token({"user_id": db_user.id})

        return {"token": token}

    except Exception as e:
        print("ERROR:", e)  # 👈 ESTO
        raise HTTPException(status_code=500, detail=str(e))
    
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.email, user.password)

    if not db_user:
        raise HTTPException(status_code=400, detail="Credenciales inválidas")

    token = create_token({"user_id": db_user.id})

    return {"token": token}




@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = create_user(db, user.email, user.password)

    if not new_user:
        raise HTTPException(status_code=400, detail="Usuario ya existe")

    return {"message": "Usuario creado correctamente"}