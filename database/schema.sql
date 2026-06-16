-- PathwaysHub MVP Schema

create table people (
  id uuid primary key,
  first_name text,
  last_name text,
  email text,
  person_stage text,
  created_at timestamp
);

create table programs (
  id uuid primary key,
  program_name text,
  program_type text
);

create table participation (
  id uuid primary key,
  person_id uuid,
  program_id uuid,
  program_year integer,
  applied boolean,
  accepted boolean,
  attended boolean,
  completed boolean
);

create table academics (
  id uuid primary key,
  person_id uuid,
  cumulative_gpa numeric,
  science_gpa numeric,
  mcat_score integer,
  term_label text
);

create table matriculation (
  id uuid primary key,
  person_id uuid,
  medical_school text,
  matriculation_year integer
);

create table residency_match (
  id uuid primary key,
  person_id uuid,
  match_year integer,
  specialty text,
  institution text,
  state text,
  primary_care boolean,
  missouri_match boolean
);
