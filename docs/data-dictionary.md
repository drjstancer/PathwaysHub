# PathwaysHub Data Dictionary

This document defines the core data fields for the PathwaysHub MVP. Definitions should be reviewed before real student data is entered.

## people

One record per person for the life of the pathway relationship.

| Field | Type | Definition |
|---|---|---|
| id | uuid | Unique internal identifier. |
| first_name | text | Preferred or legal first name, depending on institutional standard. |
| last_name | text | Legal last name or institutional record name. |
| email | text | Primary email address. |
| person_stage | text | Current broad stage: applicant, participant, preadmission, matriculant, resident, physician. |
| created_at | timestamp | Date/time record was created. |

## programs

One record per pathway program.

| Field | Type | Definition |
|---|---|---|
| id | uuid | Unique internal identifier. |
| program_name | text | Program name, such as JPAWS, PAWS, MMRSEP, Medical Explorations, PEN, Bryant, or Springfield Scholars. |
| program_type | text | Preprofessional, preadmission, medical education, or workforce. |

## participation

One record per person per program year.

| Field | Type | Definition |
|---|---|---|
| id | uuid | Unique internal identifier. |
| person_id | uuid | Links to people.id. |
| program_id | uuid | Links to programs.id. |
| program_year | integer | Calendar or academic year associated with participation. |
| applied | boolean | Person submitted an application or was recorded as an applicant. |
| accepted | boolean | Person was selected or accepted. |
| attended | boolean | Person attended at least one official program activity. |
| completed | boolean | Person met local completion expectations for the program. |

## academics

Academic indicators used for advising and aggregate CQI reporting.

| Field | Type | Definition |
|---|---|---|
| id | uuid | Unique internal identifier. |
| person_id | uuid | Links to people.id. |
| cumulative_gpa | numeric | Cumulative GPA for the reporting period. |
| science_gpa | numeric | Math/science or BCPM-style GPA, depending on institutional standard. |
| mcat_score | integer | MCAT total score. |
| term_label | text | Term or reporting period, such as Fall 2025 or 2025-2026. |

## matriculation

Medical school matriculation records.

| Field | Type | Definition |
|---|---|---|
| id | uuid | Unique internal identifier. |
| person_id | uuid | Links to people.id. |
| medical_school | text | Medical school where the person matriculated. |
| matriculation_year | integer | Year of matriculation. |

## residency_match

Residency match outcomes.

| Field | Type | Definition |
|---|---|---|
| id | uuid | Unique internal identifier. |
| person_id | uuid | Links to people.id. |
| match_year | integer | Year of residency match. |
| specialty | text | Matched specialty. |
| institution | text | Matched residency institution. |
| state | text | State of matched residency institution. |
| primary_care | boolean | True if specialty is classified as primary care by local reporting standard. |
| missouri_match | boolean | True if residency institution is located in Missouri. |

## Working definitions

### Participant

A person who attended at least one official program activity or session.

### Completer

A person who satisfied the program's documented completion expectations.

### Rural indicator

To be defined by institutional standard. Recommended sources include county-level rural classification or school/community designation.

### SES indicator

To be defined by collected data source. Do not infer SES manually without a documented rule.

### Primary care

Recommended MVP classification includes Family Medicine, Internal Medicine, Pediatrics, and Medicine-Pediatrics. OB/GYN, Psychiatry, and Emergency Medicine should be reported separately unless leadership defines them as part of an expanded workforce category.

### Missouri match

A match where the residency institution is physically located in Missouri.

### Active student

A person currently engaged in a program or still being tracked for progression/outcomes.
