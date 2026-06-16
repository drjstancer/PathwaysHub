-- PathwaysHub MVP Schema
-- Batch 3: Student Profiles, Program Participation, Academic Tracking, Match Tracking, Executive Dashboard support

create table people (
  id uuid primary key,
  first_name text not null,
  last_name text not null,
  email text,
  phone text,
  city text,
  county text,
  state text,
  rural_indicator boolean,
  ses_indicator boolean,
  educationally_disadvantaged boolean,
  first_generation boolean,
  anticipated_medical_school_ec text,
  current_stage text,
  created_at timestamp default now()
);

create table programs (
  id uuid primary key,
  program_name text not null,
  program_type text not null,
  active boolean default true
);

create table program_cohorts (
  id uuid primary key,
  program_id uuid references programs(id),
  cohort_code text not null,
  cohort_name text not null,
  cohort_type text not null,
  entering_class_year integer,
  program_year integer,
  cohort_start_date date,
  cohort_end_date date,
  status text default 'active',
  notes text
);

create table participation (
  id uuid primary key,
  person_id uuid references people(id),
  program_id uuid references programs(id),
  cohort_id uuid references program_cohorts(id),
  program_year integer,
  applied boolean default false,
  accepted boolean default false,
  attended boolean default false,
  completed boolean default false,
  scholarship_awarded boolean default false,
  scholarship_amount numeric,
  completion_date date,
  notes text
);

create table academics (
  id uuid primary key,
  person_id uuid references people(id),
  academic_year text,
  reporting_term text,
  cumulative_gpa numeric,
  science_gpa numeric,
  mcat_score integer,
  mcat_date date,
  notes text
);

create table matriculation (
  id uuid primary key,
  person_id uuid references people(id),
  medical_school text,
  matriculation_term text,
  matriculation_year integer,
  expected_graduation_year integer,
  notes text
);

create table residency_match (
  id uuid primary key,
  person_id uuid references people(id),
  match_year integer,
  specialty text,
  institution text,
  city text,
  state text,
  primary_care boolean,
  missouri_match boolean,
  notes text
);
