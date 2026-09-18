-- CaPS Pathways Ecosystem consolidated schema v1
-- PSMS = operational system of record
-- PathwaysHub = analytics/outcomes/CQI layer
-- PostgreSQL / Supabase-ready. Mock/public-repo structure only.

create extension if not exists pgcrypto;

-- ============================================================
-- Shared identity and program backbone
-- ============================================================

create table institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  institution_type text,
  city text,
  state text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table people (
  id uuid primary key default gen_random_uuid(),
  institutional_id text unique,
  pawprint text unique,
  first_name text not null,
  last_name text not null,
  preferred_name text,
  email text,
  phone text,
  institution_id uuid references institutions(id),
  city text,
  county text,
  state text,
  rural_indicator boolean,
  ses_indicator boolean,
  educationally_disadvantaged boolean,
  first_generation boolean,
  classification text,
  expected_graduation_term text,
  expected_graduation_year integer,
  anticipated_medical_school_ec integer,
  current_stage text not null default 'participant',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table programs (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null unique,
  program_type text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table participant_types (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs(id),
  name text not null,
  active boolean not null default true,
  unique(program_id,name)
);

create table cohorts (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs(id),
  code text not null,
  name text not null,
  cohort_type text not null check (cohort_type in ('entering_class','program_year','academic_year','event','other')),
  entering_class_year integer,
  program_year integer,
  academic_year text,
  start_date date,
  end_date date,
  status text not null default 'active',
  notes text,
  unique(program_id,code)
);

create table participations (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  program_id uuid not null references programs(id),
  cohort_id uuid references cohorts(id),
  participant_type_id uuid references participant_types(id),
  participation_status text not null default 'active',
  start_date date,
  end_date date,
  program_year integer,
  -- CQI facts only; PSMS does not process applications/admissions.
  applied boolean,
  accepted boolean,
  attended boolean,
  completed boolean,
  completion_date date,
  scholarship_awarded boolean not null default false,
  scholarship_amount numeric(12,2),
  notes text,
  unique(person_id,program_id,cohort_id,participant_type_id)
);

-- ============================================================
-- Platform security and administration
-- ============================================================

create table app_users (
  id uuid primary key default gen_random_uuid(),
  auth_subject text unique,
  institutional_id text,
  email text not null unique,
  full_name text not null,
  active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

create table roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text
);

create table permissions (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text
);

create table user_roles (
  user_id uuid not null references app_users(id),
  role_id uuid not null references roles(id),
  assigned_at timestamptz not null default now(),
  primary key(user_id,role_id)
);

create table role_permissions (
  role_id uuid not null references roles(id),
  permission_id uuid not null references permissions(id),
  primary key(role_id,permission_id)
);

create table staff_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id),
  person_id uuid not null references people(id),
  assignment_type text not null,
  program_id uuid references programs(id),
  start_date date not null default current_date,
  end_date date,
  active boolean not null default true,
  notes text
);

create table audit_log (
  id bigint generated always as identity primary key,
  app_user_id uuid references app_users(id),
  action text not null,
  entity_name text not null,
  entity_id text,
  before_value jsonb,
  after_value jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- PSMS: Engagement
-- ============================================================

create table events (
  id uuid primary key default gen_random_uuid(),
  program_id uuid references programs(id),
  name text not null,
  event_type text not null,
  event_date date not null,
  start_time time,
  end_time time,
  location text,
  required boolean not null default false,
  hours_awarded numeric(6,2) default 0,
  notes text,
  created_by uuid references app_users(id),
  created_at timestamptz not null default now()
);

create table event_programs (
  event_id uuid not null references events(id) on delete cascade,
  program_id uuid not null references programs(id),
  primary key(event_id,program_id)
);

create table attendance (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  event_id uuid not null references events(id) on delete cascade,
  status text not null check(status in ('attended','late','excused','unexcused','no_show','pending')),
  notes text,
  recorded_by uuid references app_users(id),
  recorded_at timestamptz not null default now(),
  unique(person_id,event_id)
);

-- ============================================================
-- PSMS: Support
-- ============================================================

create table support_meetings (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  program_id uuid references programs(id),
  staff_user_id uuid references app_users(id),
  meeting_type text not null,
  meeting_date date not null,
  meeting_mode text,
  required boolean not null default false,
  summary text,
  follow_up_needed boolean not null default false,
  follow_up_date date,
  concern_level text,
  referral_made boolean not null default false,
  referral_type text,
  restricted_note boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- PSMS: Progress
-- ============================================================

create table course_catalog (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references institutions(id),
  course_number text not null,
  course_name text not null,
  credit_hours numeric(5,2) not null,
  course_category text,
  science_course boolean not null default false,
  math_science_course boolean not null default false,
  active boolean not null default true,
  unique(institution_id,course_number)
);

create table course_records (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  course_id uuid not null references course_catalog(id),
  semester text not null,
  year integer not null,
  grade text,
  grade_points numeric(5,3),
  transfer_type text default 'native',
  repeated_course boolean not null default false,
  include_in_gpa boolean not null default true,
  created_at timestamptz not null default now()
);

create table academic_snapshots (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  academic_year text,
  reporting_term text,
  cumulative_gpa numeric(4,3),
  science_gpa numeric(4,3),
  math_science_gpa numeric(4,3),
  mcat_score integer,
  mcat_date date,
  data_source text,
  notes text,
  recorded_at timestamptz not null default now()
);

create table requirements (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text,
  program_id uuid references programs(id),
  required_for_completion boolean not null default true,
  active boolean not null default true
);

create table requirement_rules (
  id uuid primary key default gen_random_uuid(),
  requirement_id uuid not null references requirements(id) on delete cascade,
  program_id uuid references programs(id),
  participant_type_id uuid references participant_types(id),
  classification text,
  cohort_type text,
  active boolean not null default true
);

create table participant_requirements (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  participation_id uuid references participations(id),
  requirement_id uuid not null references requirements(id),
  requirement_cycle text not null,
  status text not null default 'not_started' check(status in ('not_started','in_progress','completed','waived','not_applicable')),
  completion_date date,
  notes text,
  updated_by uuid references app_users(id),
  updated_at timestamptz not null default now(),
  unique(person_id,requirement_id,requirement_cycle)
);

-- ============================================================
-- PSMS: Development and student self-service
-- ============================================================

create table development_experiences (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  program_id uuid references programs(id),
  experience_type text not null check(experience_type in ('shadowing','clinical','research','service','leadership','professional_development','other')),
  experience_date date not null,
  organization text,
  specialty_or_area text,
  preceptor_or_supervisor text,
  hours numeric(7,2) not null default 0,
  reflection text,
  documentation_link text,
  submitted_by_person boolean not null default false,
  submitted_at timestamptz not null default now(),
  review_status text not null default 'pending' check(review_status in ('pending','reviewed','returned')),
  reviewed_by uuid references app_users(id),
  reviewed_at timestamptz,
  reviewer_notes text
);

create table semester_experience_summaries (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  program_id uuid references programs(id),
  semester text not null,
  year integer not null,
  shadowing_hours numeric(8,2) not null default 0,
  clinical_hours numeric(8,2) not null default 0,
  research_hours numeric(8,2) not null default 0,
  service_hours numeric(8,2) not null default 0,
  leadership_hours numeric(8,2) not null default 0,
  professional_development_hours numeric(8,2) not null default 0,
  unique(person_id,program_id,semester,year)
);

-- PAWS-specific placement/vetting workflow; not generic shadowing experience entry.
create table paws_shadowing_workflows (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  participation_id uuid references participations(id),
  shadowing_cycle text not null,
  eligibility_status text not null default 'not_eligible',
  eligibility_date date,
  vetting_request_date date,
  vetting_status text not null default 'not_started',
  hr_clearance_date date,
  ready_for_matching boolean not null default false,
  match_status text not null default 'not_ready',
  matched_specialty text,
  matched_provider text,
  match_date date,
  completion_date date,
  notes text,
  unique(person_id,shadowing_cycle)
);

-- ============================================================
-- PSMS: Intervention
-- ============================================================

create table alerts (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  program_id uuid references programs(id),
  alert_type text not null,
  severity text not null default 'moderate',
  description text not null,
  status text not null default 'open' check(status in ('open','in_progress','resolved','closed')),
  opened_at timestamptz not null default now(),
  follow_up_date date,
  resolved_at timestamptz,
  resolution_notes text,
  created_by uuid references app_users(id)
);

create table intervention_actions (
  id uuid primary key default gen_random_uuid(),
  alert_id uuid references alerts(id) on delete cascade,
  person_id uuid not null references people(id),
  action_type text not null,
  action_date timestamptz not null default now(),
  outcome text check(outcome in ('no_response','met_with_participant','issue_resolved','escalated','referred','other')),
  notes text,
  performed_by uuid references app_users(id),
  follow_up_date date
);

-- ============================================================
-- PathwaysHub: longitudinal outcomes
-- ============================================================

create table matriculation_outcomes (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  medical_school text not null,
  matriculation_term text,
  matriculation_year integer not null,
  expected_graduation_year integer,
  graduation_year integer,
  notes text
);

create table residency_matches (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  match_year integer not null,
  specialty text not null,
  institution text not null,
  city text,
  state text,
  primary_care boolean,
  missouri_match boolean,
  notes text
);

create table workforce_outcomes (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  as_of_date date not null,
  role_or_specialty text,
  organization text,
  city text,
  state text,
  rural_practice boolean,
  primary_care boolean,
  source text,
  notes text
);

-- ============================================================
-- Analytics views (security invoker for RLS compatibility)
-- ============================================================

create or replace view v_program_operational_metrics
with (security_invoker = true) as
select
  p.id as program_id,
  p.code,
  p.name,
  count(distinct pa.person_id) filter (where pa.participation_status='active') as active_participants,
  count(distinct pa.person_id) filter (where pa.completed=true) as completers
from programs p
left join participations pa on pa.program_id=p.id
group by p.id,p.code,p.name;

create or replace view v_person_pathway_journey
with (security_invoker = true) as
select
  pe.id as person_id,
  pe.first_name,
  pe.last_name,
  pe.current_stage,
  jsonb_agg(
    jsonb_build_object(
      'program',pr.code,
      'cohort',c.code,
      'status',pa.participation_status,
      'completed',pa.completed,
      'start_date',pa.start_date,
      'end_date',pa.end_date
    ) order by coalesce(pa.start_date,pa.completion_date)
  ) filter (where pa.id is not null) as program_journey
from people pe
left join participations pa on pa.person_id=pe.id
left join programs pr on pr.id=pa.program_id
left join cohorts c on c.id=pa.cohort_id
group by pe.id,pe.first_name,pe.last_name,pe.current_stage;

create or replace view v_cqi_program_outcomes
with (security_invoker = true) as
select
  pr.id as program_id,
  pr.code,
  pr.name,
  count(distinct pa.person_id) filter(where pa.applied=true) as applicants,
  count(distinct pa.person_id) filter(where pa.accepted=true) as accepted,
  count(distinct pa.person_id) filter(where pa.attended=true) as attended,
  count(distinct pa.person_id) filter(where pa.completed=true) as completed,
  count(distinct mo.person_id) as medical_school_matriculants,
  count(distinct rm.person_id) as residency_matches,
  count(distinct rm.person_id) filter(where rm.missouri_match=true) as missouri_matches,
  count(distinct rm.person_id) filter(where rm.primary_care=true) as primary_care_matches
from programs pr
left join participations pa on pa.program_id=pr.id
left join matriculation_outcomes mo on mo.person_id=pa.person_id
left join residency_matches rm on rm.person_id=pa.person_id
group by pr.id,pr.code,pr.name;

-- ============================================================
-- RLS foundation
-- ============================================================
-- Production must define institution-approved policies before exposing data.
-- RLS is enabled now so tables are closed by default when used through Supabase.

alter table people enable row level security;
alter table participations enable row level security;
alter table support_meetings enable row level security;
alter table attendance enable row level security;
alter table course_records enable row level security;
alter table academic_snapshots enable row level security;
alter table participant_requirements enable row level security;
alter table development_experiences enable row level security;
alter table paws_shadowing_workflows enable row level security;
alter table alerts enable row level security;
alter table intervention_actions enable row level security;
alter table matriculation_outcomes enable row level security;
alter table residency_matches enable row level security;
alter table workforce_outcomes enable row level security;

create index idx_participations_person on participations(person_id);
create index idx_participations_program on participations(program_id);
create index idx_attendance_person on attendance(person_id);
create index idx_attendance_event on attendance(event_id);
create index idx_meetings_person on support_meetings(person_id);
create index idx_requirements_person on participant_requirements(person_id);
create index idx_experiences_person on development_experiences(person_id);
create index idx_alerts_person_status on alerts(person_id,status);
create index idx_interventions_person on intervention_actions(person_id);
