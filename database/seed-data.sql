-- PathwaysHub MVP Mock Seed Data
-- Mock data only. Do not replace with real student records in a public repository.

-- Programs
insert into programs (id, program_name, program_type, active) values
  ('00000000-0000-0000-0000-000000000101', 'MMRSEP', 'preprofessional', true),
  ('00000000-0000-0000-0000-000000000102', 'Medical Explorations', 'preprofessional', true),
  ('00000000-0000-0000-0000-000000000103', 'JPAWS', 'preprofessional', true),
  ('00000000-0000-0000-0000-000000000104', 'PAWS', 'preadmission', true),
  ('00000000-0000-0000-0000-000000000105', 'PEN', 'preadmission', true),
  ('00000000-0000-0000-0000-000000000106', 'Bryant Scholars', 'preadmission', true),
  ('00000000-0000-0000-0000-000000000107', 'Springfield Scholars', 'preadmission', true),
  ('00000000-0000-0000-0000-000000000108', 'MedPrep I', 'preprofessional', true),
  ('00000000-0000-0000-0000-000000000109', 'MedPrep II', 'preprofessional', true);

-- Program Cohorts
insert into program_cohorts (id, program_id, cohort_code, cohort_name, cohort_type, entering_class_year, program_year, status, notes) values
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101', '2026', 'MMRSEP 2026', 'program_year', null, 2026, 'active', 'Program year cohort'),
  ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000102', '2026', 'Medical Explorations 2026', 'program_year', null, 2026, 'active', 'Program year cohort'),
  ('00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000103', '2026', 'JPAWS 2026', 'program_year', null, 2026, 'active', 'Program year cohort'),
  ('00000000-0000-0000-0000-000000000204', '00000000-0000-0000-0000-000000000104', 'EC27', 'PAWS EC27', 'entering_class', 2027, null, 'active', 'Expected medical school entering class'),
  ('00000000-0000-0000-0000-000000000205', '00000000-0000-0000-0000-000000000104', 'EC28', 'PAWS EC28', 'entering_class', 2028, null, 'active', 'Expected medical school entering class'),
  ('00000000-0000-0000-0000-000000000206', '00000000-0000-0000-0000-000000000106', 'EC29', 'Bryant EC29', 'entering_class', 2029, null, 'active', 'Expected medical school entering class');

-- People
insert into people (id, first_name, last_name, email, phone, city, county, state, rural_indicator, ses_indicator, educationally_disadvantaged, first_generation, anticipated_medical_school_ec, current_stage) values
  ('00000000-0000-0000-0000-000000000301', 'Avery', 'Johnson', 'avery.johnson@example.edu', null, 'Columbia', 'Boone', 'MO', false, true, true, true, 'EC30', 'participant'),
  ('00000000-0000-0000-0000-000000000302', 'Maya', 'Robinson', 'maya.robinson@example.edu', null, 'Moberly', 'Randolph', 'MO', true, true, true, false, 'EC29', 'participant'),
  ('00000000-0000-0000-0000-000000000303', 'Jordan', 'Ellis', 'jordan.ellis@example.edu', null, 'Kansas City', 'Jackson', 'MO', false, false, true, true, 'EC27', 'preadmission'),
  ('00000000-0000-0000-0000-000000000304', 'Taylor', 'Nguyen', 'taylor.nguyen@example.edu', null, 'Springfield', 'Greene', 'MO', false, false, false, false, 'EC28', 'preadmission'),
  ('00000000-0000-0000-0000-000000000305', 'Cameron', 'Brooks', 'cameron.brooks@example.edu', null, 'Mexico', 'Audrain', 'MO', true, false, true, true, 'EC27', 'matriculant'),
  ('00000000-0000-0000-0000-000000000306', 'Riley', 'Carter', 'riley.carter@example.edu', null, 'St. Louis', 'St. Louis City', 'MO', false, true, true, true, null, 'resident');

-- Participation
insert into participation (id, person_id, program_id, cohort_id, program_year, applied, accepted, attended, completed, scholarship_awarded, scholarship_amount, completion_date, notes) values
  ('00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 2026, true, true, true, true, true, 100.00, '2026-06-25', 'Mock MMRSEP participant'),
  ('00000000-0000-0000-0000-000000000402', '00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000203', 2026, true, true, true, false, false, null, null, 'Mock JPAWS participant'),
  ('00000000-0000-0000-0000-000000000403', '00000000-0000-0000-0000-000000000303', '00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000204', 2025, true, true, true, false, false, null, null, 'Mock PAWS EC27 student'),
  ('00000000-0000-0000-0000-000000000404', '00000000-0000-0000-0000-000000000304', '00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000205', 2026, true, true, true, false, false, null, null, 'Mock PAWS EC28 student'),
  ('00000000-0000-0000-0000-000000000405', '00000000-0000-0000-0000-000000000305', '00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000204', 2024, true, true, true, true, false, null, '2026-05-01', 'Mock PAWS completer'),
  ('00000000-0000-0000-0000-000000000406', '00000000-0000-0000-0000-000000000306', '00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000204', 2022, true, true, true, true, false, null, '2024-05-01', 'Mock PAWS alumnus');

-- Academics
insert into academics (id, person_id, academic_year, reporting_term, cumulative_gpa, science_gpa, mcat_score, mcat_date, notes) values
  ('00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000303', '2025-2026', 'Spring 2026', 3.72, 3.58, 508, '2026-04-12', 'Mock academic record'),
  ('00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000304', '2025-2026', 'Spring 2026', 3.84, 3.70, 511, '2026-05-03', 'Mock academic record'),
  ('00000000-0000-0000-0000-000000000503', '00000000-0000-0000-0000-000000000305', '2024-2025', 'Spring 2025', 3.65, 3.49, 506, '2025-03-22', 'Mock academic record');

-- Matriculation
insert into matriculation (id, person_id, medical_school, matriculation_term, matriculation_year, expected_graduation_year, notes) values
  ('00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000305', 'University of Missouri School of Medicine', 'Fall', 2027, 2031, 'Mock matriculation record'),
  ('00000000-0000-0000-0000-000000000602', '00000000-0000-0000-0000-000000000306', 'University of Missouri School of Medicine', 'Fall', 2024, 2028, 'Mock matriculation record');

-- Residency Match
insert into residency_match (id, person_id, match_year, specialty, institution, city, state, primary_care, missouri_match, notes) values
  ('00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000000306', 2028, 'Family Medicine', 'University of Missouri Health Care', 'Columbia', 'MO', true, true, 'Mock match outcome');
