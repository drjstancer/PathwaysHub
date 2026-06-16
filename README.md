# PathwaysHub

PathwaysHub is a lightweight Pathways Success Management System (PSMS) prototype for tracking student participation, progression, matriculation, match outcomes, and CQI reporting across pathway programs.

## Purpose

The first version is designed to help answer practical CQI and leadership questions:

- Who applied, attended, and completed each pathway program?
- Which schools, cities, counties, rural communities, and SES groups are represented?
- Which students progressed from early pathway experiences into preadmission programs?
- Which students matriculated into medical school?
- Where did students match for residency?
- How many matched in Missouri?
- How many matched into primary care or specialty fields?

## Initial modules

- Student profiles
- Program participation tracking
- Academic tracking
- Medical school outcomes
- Residency match outcomes
- CQI reporting
- Executive dashboard

## Data safety

This repository should use mock data only until institutional data governance is approved. Do not commit real student records, identifiable student information, transcripts, MCAT reports, GPA files, advising notes, or exports containing protected education records.

Before real data use, complete institutional review for FERPA compliance, approved storage, role-based access controls, audit logging, retention policy, and user access governance.

## Recommended stack

- Next.js
- TypeScript
- Supabase/PostgreSQL
- Row-level security
- Role-based permissions

## Status

Initial scaffold in progress.
