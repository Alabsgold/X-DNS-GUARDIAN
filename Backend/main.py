from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scanner import scan_domain_service
from database import get_recent_scans, save_scan_result
from pydantic import BaseModel

app = FastAPI(title="X-DNS Guardian+ API")

# CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*" # For hackathon demo purposes, allow all
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    domain: str

@app.get("/")
def read_root():
    return {"message": "X-DNS Guardian+ API is running"}

@app.post("/api/v1/scan-domain")
async def scan_domain(request: ScanRequest):
    result = await scan_domain_service(request.domain)
    await save_scan_result(result)
    return result

@app.get("/api/v1/report")
async def get_report():
    # Return recent scans or high risk domains for the admin dashboard
    scans = await get_recent_scans()
    return scans
