-- CMTX AX Planner OS Database Schema
-- Version: 1.0

-- 1. Employee Management (for Survey & Auth)
CREATE TABLE employees (
    employee_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(100),
    position VARCHAR(50),
    joined_date DATE
);

-- 2. GR Hub (Government Relations)
CREATE TABLE gr_opportunities (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    agency VARCHAR(200),
    budget BIGINT,
    deadline TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Inbox', -- Inbox, Tracker, Deadline Radar
    policy_impact TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gr_stakeholders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    organization VARCHAR(200),
    role VARCHAR(100),
    interaction_history TEXT,
    influence_level INTEGER CHECK (influence_level BETWEEN 1 AND 5)
);

-- 3. Industry Intelligence
CREATE TABLE industry_signals (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50), -- Supply Chain, Competitor, Regulatory
    title TEXT,
    source_url TEXT,
    severity VARCHAR(20) DEFAULT 'Normal', -- Risk Radar
    summary TEXT,
    insight_score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. AX Planning
CREATE TABLE ax_frictions (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) REFERENCES employees(employee_id),
    department VARCHAR(100),
    friction_category VARCHAR(100),
    description TEXT,
    intensity INTEGER CHECK (intensity BETWEEN 1 AND 10),
    status VARCHAR(50) DEFAULT 'Pending'
);

CREATE TABLE ax_opportunities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    domain VARCHAR(50),
    expected_value TEXT,
    feasibility INTEGER,
    priority VARCHAR(20) DEFAULT 'Medium'
);

-- 5. Survey Responses
CREATE TABLE survey_responses (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) REFERENCES employees(employee_id),
    consent_given BOOLEAN DEFAULT FALSE,
    qualitative_feedback TEXT,
    q1_score INTEGER,
    q2_score INTEGER,
    q3_score INTEGER,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);