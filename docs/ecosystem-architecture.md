# CaPS Pathways Ecosystem Architecture

## Decision

PathwaysHub is the canonical repository for the connected ecosystem. The ecosystem has two product surfaces over one governed data foundation.

### PSMS
Operational participant-success system of record.

### PathwaysHub
Analytics, outcomes, CQI, comparison, and reporting layer.

## Core rule

**Enter once, use many times.**

Attendance, meetings, requirements, experiences, interventions, and participant updates are entered in PSMS. PathwaysHub consumes shared tables and curated analytical views. It must not create a second operational copy of the same record.

## Five PSMS pillars

1. Engagement — events, attendance, seminars, workshops, retreats.
2. Support — HTM, Well-Being, CASE, MedOpp, referrals and follow-up.
3. Progress — courses, GPA, MCAT, requirements.
4. Development — shadowing, clinical exposure, research, service, leadership, professional development, reflections.
5. Intervention — alerts, outreach, intervention actions, outcomes, escalation, resolution.

## Consolidated PAWS capabilities to adopt

- requirement applicability by program/participant type/classification
- automatic/bulk requirement generation
- restricted advising notes
- granular role/permission model
- audit logging
- import validation
- CSV/XLSX/PDF reporting interfaces
- GPA calculation
- PAWS shadowing vetting/matching
- intervention outcomes and follow-up
- repeat-risk / repeat-attention logic as transparent decision support
- time-to-resolution metrics
- advisor workload/intervention metrics

## PathwaysHub outcomes layer

PathwaysHub adds:
- program application/acceptance facts for CQI only
- attendance/completion facts
- scholarship outcomes
- geography/rural/access indicators
- medical-school matriculation
- residency match
- specialty
- Missouri retention
- primary-care classification
- future workforce outcomes

It does not process applications or admissions decisions.

## Cohort model

Cohorts must support multiple bases:
- entering class
- program year
- academic year
- event cohort
- custom/other

This replaces the earlier assumption that every cohort is Program + ECY.

## Data ownership

| Domain | Owner |
|---|---|
| Person identity | Shared core |
| Program membership | PSMS/shared core |
| Attendance | PSMS |
| Requirements | PSMS |
| Meetings/advising | PSMS |
| Courses/GPA | PSMS |
| Development experiences | PSMS/student self-service |
| Alerts/interventions | PSMS |
| Historical application/acceptance facts | Shared outcomes |
| Completion | Shared outcomes |
| Matriculation | PathwaysHub outcomes |
| Residency match | PathwaysHub outcomes |
| Workforce outcomes | PathwaysHub outcomes |
| CQI metrics/views | PathwaysHub |
| Executive comparisons | PathwaysHub |

## Deployment target

Recommended production direction:
- Next.js application
- PostgreSQL / Supabase-compatible schema
- campus SSO integration
- RLS + least privilege
- audit logging
- private institutional hosting/data governance approval

No real protected student data belongs in the public repository.
