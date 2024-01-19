drop table if exists public.users;

create table if not exists public.users(
	id SERIAL primary key not null,
	firstName VARCHAR(255) not null,
	lastName VARCHAR(255) not null,
	DOB VARCHAR(50) not null,
	cell VARCHAR(50) null,
	email VARCHAR(50) not null,
	"password" VARCHAR(255) not null
);

INSERT INTO public.users
(firstname, lastname, dob, cell, email, "password")
VALUES('firstname usr1', 'lastname usr1', '01-01-2000', '1234567', 'usr1@example.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzcjFAZXhhbXBsZS5jb20iLCJpYXQiOjE3MDU3MDY0ODh9.E6t-KRkqsnbw2oI36X3EnKf-fKV2ePVixXFt2zgcg1E');


select * from public.users;