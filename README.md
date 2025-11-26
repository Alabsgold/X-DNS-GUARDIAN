# X-DNS Guardian+ (Theme: Cybersecurity & Trust)

**Team X-CODERS**

## Problem
The .ng namespace lacks an automated, real-time classification system for harmful domains. Manual checks are slow and reactive, leaving users vulnerable to phishing and malware.

## Solution
**X-DNS Guardian+** is a real-time DNS metadata scanner and risk scorer. It instantly profiles domains, assigning a safety score and identifying threats like phishing keywords, short TTLs (fast flux), and missing SSL certificates.

## Features
- **Real-time Scanning**: Queries DNS (A, MX, NS) and RDAP/WHOIS data on the fly.
- **Safety Scorecard**: Visual 0-100 risk assessment.
- **Threat Badges**: Instant identification of specific risks.
- **Admin Dashboard**: Live monitoring of scan activity for registry admins.

## Tech Stack
- **Backend**: Python (FastAPI), dnspython, Motor (MongoDB)
- **Frontend**: Next.js 14, Tailwind CSS, Lucide Icons
- **Database**: MongoDB

## Run Instructions

### Prerequisites
- Docker & Docker Compose (Recommended)
- OR Python 3.9+ and Node.js 18+

### Option 1: Docker (Easiest)
1. Clone the repository.
2. Run `docker-compose up --build`.
3. Access the app at `http://localhost:3000`.

### Option 2: Manual Setup

**Backend:**
```bash
cd Backend
pip install -r requirements.txt
# Ensure MongoDB is running locally on port 27017
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Demo Credentials
- **User**: judge
- **Pass**: Hackathon2025!
