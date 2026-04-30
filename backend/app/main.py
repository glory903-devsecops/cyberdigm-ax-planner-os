from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(title="CMTX AX Planner OS API")

# --- Models ---

class GRProgram(BaseModel):
    id: int
    title: str
    agency: str
    budget: str
    deadline: str
    status: str

class IndustrySignal(BaseModel):
    id: int
    category: str
    title: str
    severity: str
    impact: str
    summary: Optional[str] = None

class AXOpportunity(BaseModel):
    id: int
    title: str
    domain: str
    intensity: int
    priority: str
    savings: str

class SurveySubmit(BaseModel):
    employee_id: str
    consent: bool
    q1_answer: str
    random_answers: List[str]

# --- Endpoints ---

@app.get("/")
async def root():
    return {"message": "CMTX AX Planner OS API is running", "version": "1.0.0"}

@app.get("/api/gr/opportunities", response_model=List[GRProgram])
async def get_gr_opportunities():
    # TODO: Connect to PostgreSQL
    return [
        {"id": 1, "title": "2024년 시스템 반도체 기술개발", "agency": "산업부", "budget": "25억", "deadline": "2024-05-15", "status": "In Progress"}
    ]

@app.get("/api/intelligence/signals", response_model=List[IndustrySignal])
async def get_signals():
    # TODO: Connect to PostgreSQL
    return [
        {"id": 1, "category": "Supply Chain", "title": "냉매 소재 수급 지연", "severity": "High", "impact": "High"}
    ]

@app.post("/api/survey/submit")
async def submit_survey(data: SurveySubmit):
    # TODO: Save to PostgreSQL
    if not data.consent:
        raise HTTPException(status_code=400, detail="Consent is required")
    return {"status": "success", "submitted_at": datetime.now()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
