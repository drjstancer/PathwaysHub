-- Synthetic demo seed data for ecosystem v1.
-- Do not replace with real protected student data in this public repository.

insert into institutions(id,name,institution_type,city,state) values
('10000000-0000-0000-0000-000000000001','University of Missouri','College/University','Columbia','MO'),
('10000000-0000-0000-0000-000000000002','Lincoln University','College/University','Jefferson City','MO'),
('10000000-0000-0000-0000-000000000003','Missouri State University','College/University','Springfield','MO')
on conflict do nothing;

insert into programs(id,code,name,program_type) values
('20000000-0000-0000-0000-000000000001','JPAWS','JPAWS','preprofessional'),
('20000000-0000-0000-0000-000000000002','PAWS','PAWS','preadmission'),
('20000000-0000-0000-0000-000000000003','PEN','Physician ENgineers','preadmission'),
('20000000-0000-0000-0000-000000000004','BRYANT','Bryant Scholars','preadmission'),
('20000000-0000-0000-0000-000000000005','SPRINGFIELD','Springfield Scholars','preadmission'),
('20000000-0000-0000-0000-000000000006','MMRSEP','MMRSEP','preprofessional'),
('20000000-0000-0000-0000-000000000007','MEDX','Medical Explorations','preprofessional'),
('20000000-0000-0000-0000-000000000008','MEDPREP1','MedPrep I','preprofessional'),
('20000000-0000-0000-0000-000000000009','MEDPREP2','MedPrep II','preprofessional')
on conflict do nothing;

insert into cohorts(id,program_id,code,name,cohort_type,entering_class_year,program_year) values
('30000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000002','EC30','PAWS EC30','entering_class',2030,null),
('30000000-0000-0000-0000-000000000002','20000000-0000-0000-0000-000000000003','2026','PEN 2026','program_year',null,2026),
('30000000-0000-0000-0000-000000000003','20000000-0000-0000-0000-000000000006','2023','MMRSEP 2023','program_year',null,2023),
('30000000-0000-0000-0000-000000000004','20000000-0000-0000-0000-000000000001','2024','JPAWS 2024','program_year',null,2024)
on conflict do nothing;

insert into people(id,institutional_id,pawprint,first_name,last_name,email,institution_id,city,county,state,rural_indicator,first_generation,classification,anticipated_medical_school_ec,current_stage) values
('40000000-0000-0000-0000-000000000001','14000001','ajdemo','Avery','Johnson','avery@example.edu','10000000-0000-0000-0000-000000000001','Columbia','Boone','MO',false,true,'Senior',2030,'preadmission'),
('40000000-0000-0000-0000-000000000002','14000002','mrdemo','Maya','Robinson','maya@example.edu','10000000-0000-0000-0000-000000000002','Jefferson City','Cole','MO',false,true,'Junior',2029,'preadmission'),
('40000000-0000-0000-0000-000000000003','14000003','jedemo','Jordan','Ellis','jordan@example.edu','10000000-0000-0000-0000-000000000003','Springfield','Greene','MO',false,false,'Junior',2030,'participant')
on conflict do nothing;

insert into participations(id,person_id,program_id,cohort_id,participation_status,start_date,applied,accepted,attended,completed) values
('50000000-0000-0000-0000-000000000001','40000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000006','30000000-0000-0000-0000-000000000003','completed','2023-05-01',true,true,true,true),
('50000000-0000-0000-0000-000000000002','40000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000004','completed','2024-09-01',true,true,true,true),
('50000000-0000-0000-0000-000000000003','40000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000002','30000000-0000-0000-0000-000000000001','active','2025-09-01',true,true,true,false),
('50000000-0000-0000-0000-000000000004','40000000-0000-0000-0000-000000000003','20000000-0000-0000-0000-000000000003','30000000-0000-0000-0000-000000000002','active','2026-09-01',true,true,true,false)
on conflict do nothing;

insert into development_experiences(person_id,program_id,experience_type,experience_date,organization,specialty_or_area,preceptor_or_supervisor,hours,reflection,submitted_by_person,review_status)
values ('40000000-0000-0000-0000-000000000003','20000000-0000-0000-0000-000000000003','shadowing','2026-09-15','Demo Health System','Emergency Medicine','Demo Preceptor',8,'Synthetic reflection demonstrating student-submitted experiential learning documentation.',true,'pending');
