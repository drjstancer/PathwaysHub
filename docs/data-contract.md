# PSMS → PathwaysHub Data Contract

## Purpose

Defines the boundary between operational PSMS records and PathwaysHub analytical consumption.

## Principle

PathwaysHub reads curated data. It does not duplicate operational entry.

## Shared keys

- `person_id` — stable identity across the entire pathway journey.
- `program_id` — stable program identifier.
- `cohort_id` — optional cohort context.
- `participation_id` — one person's membership in a program/cohort.

## Operational source domains

### Engagement
- events
- attendance

### Support
- meetings
- follow-ups/referrals

### Progress
- courses
- academic snapshots
- requirements

### Development
- development experiences
- reflections/review state
- PAWS shadowing workflow where applicable

### Intervention
- alerts
- intervention actions
- outcomes/resolution

## PathwaysHub analytical domains

- program participation fact
- cohort metrics
- person journey
- CQI program summary
- access/geography summary
- matriculation outcomes
- residency outcomes
- workforce outcomes

## Refresh model

Initial implementation can query the same PostgreSQL database through secured views. If institutional scale or governance later requires a warehouse, the same contract can become an ETL/ELT interface.

## Sensitive fields

Restricted advising notes and other high-sensitivity operational notes should not flow into PathwaysHub analytical views. PathwaysHub should receive counts/statuses where needed, not note bodies.

## Comparison rules

Program/student comparisons must:
- preserve context and cohort/time period
- distinguish counts from rates
- avoid deterministic prediction
- avoid opaque composite rankings
- suppress or aggregate small cells where institutional privacy rules require it
