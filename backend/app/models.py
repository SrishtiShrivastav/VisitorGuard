from sqlalchemy import Column, Integer, String
from app.database import Base


class Visitor(Base):
    __tablename__ = "visitors"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    mobile = Column(String, nullable=False)
    email = Column(String, nullable=False)
    photo = Column(String, default="")

    purpose = Column(String, nullable=False)
    person_to_meet = Column(String, nullable=False)

    status = Column(String, default="Pending")
    otp = Column(String, default="")
    qr_code = Column(String, default="")

    check_in = Column(String, default="-")
    check_out = Column(String, default="-")
    


class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)