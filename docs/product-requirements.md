# Product Requirements: PathwaysHub

## Working name

PathwaysHub: Pathways Success Management System

## Problem statement

CaPS pathway programs generate important student participation, progression, and outcomes data, but the data often lives across spreadsheets, application systems, email records, advising notes, match lists, and institutional reports. This makes annual CQI reporting slower than it needs to be and makes it difficult to tell a longitudinal pathway story.

## MVP goal

Build a lightweight prototype that tracks mock student journeys across pathway programs and produces clear dashboards for CQI and leadership reporting.

## Primary users

- Program coordinator
- Program manager
- Associate dean / leadership reviewer
- Future IT or institutional developer

## MVP scope

### In scope

- Person-centered student record model
- Program participation tracking
- Academic indicators
- Medical school matriculation tracking
- Residency match tracking
- CQI report structure
- Mock dashboard data

### Out of scope for MVP

- Real student data
- Institutional SSO
- Automated Banner or Slate integrations
- Production hosting
- Advising notes with sensitive content
- Predictive analytics

## Core user stories

### Program coordinator

As a coordinator, I need to see each student's program participation history so I can understand progression across JPAWS, PAWS, MMRSEP, and other pathway experiences.

### Program manager

As a manager, I need annual participation and outcomes summaries so I can prepare CQI reports without rebuilding spreadsheets from scratch.

### Leadership reviewer

As a leadership reviewer, I need concise dashboards showing applications, attendance, matriculation, match, Missouri retention, and primary care outcomes.

### Future IT developer

As a developer, I need clear documentation and a normalized data model so the prototype can eventually be rebuilt or hardened for institutional use.

## Success criteria

- A mock student can be tracked from early pathway exposure through match outcome.
- Program participation can be summarized by program year.
- CQI metrics can be calculated from structured tables.
- The model separates person identity from program participation and outcomes.
- No real student data is required to demonstrate the system.

## Phase roadmap

### Phase 1: MVP

- Student/person records
- Program participation
- Academic tracking
- Match tracking
- Executive dashboard

### Phase 2: CQI reporting

- CQI report generator
- Geographic summaries
- Pipeline analytics
- Import templates

### Phase 3: Institutional readiness

- Role-based permissions
- Audit logging
- Data governance workflow
- SSO planning
- Production database review

