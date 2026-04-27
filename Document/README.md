# VisitorGuard – AI Powered QR Based Visitor Management System

VisitorGuard is a smart visitor management system developed to digitalize office and campus visitor entry processes using QR technology, OTP verification, dashboard analytics, and secure check-in/check-out flow.

## Features

* Visitor Registration Form
* Email OTP Verification
* Unique QR Pass Generation
* Secure Admin Login
* QR Camera Scanner for Entry / Exit
* Automatic Check-In / Check-Out
* Dashboard with Visitor Records
* Reports with Charts
* CSV Export
* FastAPI Backend + React Frontend

## Tech Stack

### Frontend

* React.js
* Vite
* CSS3
* Axios
* Recharts
* html5-qrcode

### Backend

* Python
* FastAPI
* SQLite
* SQLAlchemy
* SMTP Email Service

## Project Structure

```text
VisitorGuard/
│── backend/
│── visitorguard-frontend/
│── Document/
│── Demo Video/
│── README.md
```

## Installation

### Frontend

```bash
cd visitorguard-frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Demo Video

See project demo in the `Demo Video` folder or provided link.

## Documents

Project documentation is available in the `Document` folder.

## Future Enhancements

* Face Recognition Authentication
* Cloud Deployment
* SMS Notifications
* Multi-Admin Access

## Author

Developed as an internship by Srishti Shrivastav
