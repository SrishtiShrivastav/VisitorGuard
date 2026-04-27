import qrcode
from fastapi.responses import FileResponse
from fastapi import APIRouter
from app.database import Base, engine, SessionLocal
from app.models import Visitor, Admin
import random
import smtplib
from email.mime.text import MIMEText
from fastapi import UploadFile, File

def send_otp_email(receiver_email, otp):
    msg = MIMEText(f"Your VisitorGuard OTP is: {otp}")

    msg["Subject"] = "VisitorGuard OTP"
    msg["From"] = "admin@visitorguard.com"
    msg["To"] = receiver_email

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login("mistermk854@gmail.com", "xfebfbjemrsqufhw")
    server.sendmail(
        "admin@visitorguard.com",
        receiver_email,
        msg.as_string()
    )
    server.quit()
router = APIRouter()

Base.metadata.create_all(bind=engine)
db = SessionLocal()

existing_admin = db.query(Admin).filter(
    Admin.email == "admin@visitorguard.com"
).first()

if not existing_admin:
    admin = Admin(
        email="admin@visitorguard.com",
        password="1234"
    )
    db.add(admin)
    db.commit()



# Home
@router.get("/")
def home():
    return {"message": "VisitorGuard Backend Running"}

# Register Visitor
@router.post("/register")
def register(data: dict):
    db = SessionLocal()

    otp_code = str(random.randint(1000, 9999))

    visitor = Visitor(
        name=data["name"],
        mobile=data["mobile"],
        email=data["email"],
        purpose=data["purpose"],
        person_to_meet=data["person_to_meet"],
        status="Pending",
        otp=otp_code
    )

    db.add(visitor)
    db.commit()
    db.refresh(visitor)
    send_otp_email(data["email"], otp_code)

    return {
    "message": "OTP sent to email",
    "otp": otp_code,
    "visitor_id": visitor.id
    }
# Admin Login
@router.post("/login")
def login(data: dict):
    db = SessionLocal()

    admin = db.query(Admin).filter(
        Admin.email == data["email"],
        Admin.password == data["password"]
    ).first()

    if admin:
        return {"success": True}

    return {"success": False}

# Dashboard Data
@router.get("/dashboard")
def dashboard():
    db = SessionLocal()

    visitors = db.query(Visitor).all()

    total = len(visitors)
    inside = len([v for v in visitors if v.status == "Inside"])
    pending = len([v for v in visitors if v.status == "Pending"])
    exited = len([v for v in visitors if v.status == "Exited"])

    visitor_list = []

    for v in visitors:
        visitor_list.append({
    "id": v.id,
    "name": v.name,
    "mobile": v.mobile,
    "email": v.email,
    "purpose": v.purpose,
    "person_to_meet": v.person_to_meet,
    "check_in": v.check_in,
    "check_out": v.check_out,
    "status": v.status
})

    return {
        "total": total,
        "inside": inside,
        "pending": pending,
        "exited": exited,
        "alerts": 0,
        "visitors": visitor_list
    }


# Reports Data
@router.get("/reports")
def reports():
    db = SessionLocal()

    visitors = db.query(Visitor).all()

    total = len(visitors)
    inside = len(
        [v for v in visitors if v.status == "Inside"]
    )
    exited = len(
        [v for v in visitors if v.status == "Exited"]
    )
    pending = len(
        [v for v in visitors if v.status == "Pending"]
    )

    return {
        "total": total,
        "inside": inside,
        "exited": exited,
        "pending": pending
    }
from datetime import datetime


@router.post("/scan/{visitor_id}")
def scan_qr(visitor_id: int):
    db = SessionLocal()

    visitor = db.query(Visitor).filter(
        Visitor.id == visitor_id
    ).first()

    if not visitor:
        return {"message": "Visitor not found"}

    # First Scan = Check In
    if visitor.status == "Pending":
        visitor.status = "Inside"
        visitor.check_in = datetime.now().strftime("%I:%M %p")
        db.commit()

        return {
            "message": "Checked In",
            "status": "Inside"
        }

    # Second Scan = Check Out
    elif visitor.status == "Inside":
        visitor.status = "Exited"
        visitor.check_out = datetime.now().strftime("%I:%M %p")
        db.commit()

        return {
            "message": "Checked Out",
            "status": "Exited"
        }

    return {
        "message": "Already Exited",
        "status": "Exited"
    }
@router.get("/qr/{visitor_id}")
def generate_qr(visitor_id: int):
    filename = f"qr_{visitor_id}.png"

    img = qrcode.make(
        f"Visitor ID: {visitor_id} | VisitorGuard"
    )

    img.save(filename)

    return FileResponse(
        filename,
        media_type="image/png"
    )
@router.post("/upload-face/{visitor_id}")
async def upload_face(
    visitor_id: int,
    file: UploadFile = File(...)
):
    contents = await file.read()

    filename = f"face_{visitor_id}.jpg"

    with open(filename, "wb") as f:
        f.write(contents)

    db = SessionLocal()

    visitor = db.query(Visitor).filter(
        Visitor.id == visitor_id
    ).first()

    if visitor:
        visitor.photo = filename
        db.commit()

    return {"message": "Face uploaded"}