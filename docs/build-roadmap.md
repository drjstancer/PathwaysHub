# CaPS Pathways Ecosystem — Batch Build Roadmap

This roadmap preserves the agreed product vision:

- **PSMS** is the operational system of record.
- **PathwaysHub** is the analytics, longitudinal outcomes, CQI, comparison, and reporting layer.
- Original CaPS, PAWS, PSMS, and other source repositories remain unchanged unless the user explicitly requests otherwise.
- Prototype/showcase pages evolve alongside the working application.
- Each batch is implemented on its own branch, validated by CI, reviewed, and merged as a coherent increment.

## Batch 1 — PSMS Core Operational Foundation

Status: **Complete**

Scope:
- Participant Directory
- Participant 360
- Programs
- Cohorts
- unified PSMS navigation
- program/cohort/participant relationships
- presentation-ready updates reflecting the operational model

Success criterion:
Staff can locate a participant, understand every current/historical program relationship, see the five-pillar operational snapshot, and move into the appropriate workflow.

## Batch 2 — Engagement + Support Workflows

Status: **Complete**

Scope:
- event creation and management
- multi-program/deduplicated rosters
- persistent attendance workflow
- attendance correction/history
- support meetings
- HTM / CASE / MedOpp / Well-Being distinctions
- follow-up queue
- restricted-note behavior in the application layer

## Batch 3 — Progress + Compliance

Status: **In development**

Scope:
- requirement catalog
- requirement applicability rules
- automatic/bulk requirement generation
- participant compliance views
- course history
- GPA calculations
- academic snapshots / MCAT where applicable
- missing-requirement workflow

## Batch 4 — Development + Student Self-Service

Scope:
- student role experience
- shadowing/clinical/research/service/leadership entry
- reflections and documentation
- staff review/return workflow
- semester rollups
- PAWS-specific shadowing vetting/matching kept distinct from student experience entry

## Batch 5 — Intervention + Security + Audit

Scope:
- alert creation and status lifecycle
- intervention action history
- outcomes, escalation, resolution
- repeat-attention logic
- time to resolution
- granular roles/permissions
- restricted records
- audit history
- admin controls

## Batch 6 — PathwaysHub Intelligence

Scope:
- governed analytical views
- executive dashboard
- cohort/program/time filters
- program comparisons
- participant trajectory comparisons for authorized staff
- pathway transitions
- matriculation/residency/workforce outcomes
- CQI and report catalog
- exports using shared definitions

## Batch 7 — Production Data Infrastructure

Scope:
- PostgreSQL/Supabase connection
- RLS policies
- campus SSO integration points
- data adapters replacing synthetic state
- migration mapping from source systems
- backup/retention configuration
- security/data-governance readiness documentation

The order can be adjusted when infrastructure dependencies require it, but product boundaries should not change.
