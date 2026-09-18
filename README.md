# PathwaysHub Ecosystem

PathwaysHub is the canonical repository for the connected CaPS participant-success ecosystem.

It contains two connected products:

- **PSMS (Pathways Success Management System)** — the operational system of record for active participant success management.
- **PathwaysHub** — the analytics, outcomes, CQI, comparison, and executive reporting layer.

## Product boundary

### PSMS answers
**What is happening with our participants now?**

PSMS owns:
- participant master records
- program participation and cohorts
- requirements/compliance
- events and attendance
- advising/support meetings
- academics and GPA
- development experiences and reflections
- alerts, interventions, follow-ups, and resolution
- PAWS-specific shadowing vetting/matching
- operational dashboards

### PathwaysHub answers
**What does the pathway data tell us over time?**

PathwaysHub owns:
- longitudinal pathway journeys
- cohort and program comparisons
- CQI dashboards
- applications/acceptance/completion outcome facts (not application processing)
- scholarships and access indicators
- medical-school matriculation outcomes
- residency match outcomes
- Missouri retention and primary-care outcomes
- executive, faculty, grant, and program reports

## Architecture

```
                           +----------------------+
                           |     PathwaysHub      |
                           | Analytics / CQI / BI |
                           +----------^-----------+
                                      |
                           curated views / metrics
                                      |
+------------------+       +----------+-----------+
| Student Self-    | ----> |         PSMS         |
| Service          |       | Operational System   |
+------------------+       +----------+-----------+
                                      |
                     shared participant/program model
                                      |
                           +----------v-----------+
                           | PostgreSQL / Supabase|
                           | RLS + Audit + Views  |
                           +----------------------+
```

**Enter once, use many times.** Operational data is created in PSMS. PathwaysHub consumes the shared data model and analytics views; it does not create duplicate attendance, meeting, or requirement records.

## Current build

This branch introduces:
- Next.js 16.3 / React 19.3 application shell
- Ecosystem landing page
- PSMS coordinator dashboard
- Participant 360 view
- PathwaysHub executive dashboard
- Program comparison workspace
- consolidated PostgreSQL/Supabase-ready schema
- analytics views and shared data contract
- migration matrix from the former PAWS/CaPS/PSMS prototypes

All UI data is synthetic. Do not commit real student records or protected education records.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production readiness

Before real student data is used:
- institutional data-governance approval
- campus SSO
- least-privilege role/permission mapping
- row-level security validation
- audit-log review
- approved hosting/storage
- backup and retention plan
- FERPA/security review

See `docs/ecosystem-architecture.md` and `docs/data-contract.md`.
