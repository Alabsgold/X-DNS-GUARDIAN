import motor.motor_asyncio
import os
from datetime import datetime

# Use environment variable or default to localhost
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client.xdns_guardian

async def save_scan_result(scan_data):
    try:
        # Add timestamp if not present
        if "created_at" not in scan_data:
            scan_data["created_at"] = datetime.utcnow()
        
        await db.scans.insert_one(scan_data)
    except Exception as e:
        print(f"Database Error: {e}")

async def get_recent_scans(limit=10):
    try:
        cursor = db.scans.find().sort("created_at", -1).limit(limit)
        scans = await cursor.to_list(length=limit)
        # Convert ObjectId to string for JSON serialization
        for scan in scans:
            if "_id" in scan:
                scan["_id"] = str(scan["_id"])
        return scans
    except Exception as e:
        print(f"Database Read Error: {e}")
        return []
