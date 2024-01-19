drop table if exists public.users;

create table if not exists public.users(
	id SERIAL primary key not null,
	firstName VARCHAR(255) not null,
	lastName VARCHAR(255) not null,
	DOB VARCHAR(50) not null,
	cell VARCHAR(50) null,
	email VARCHAR(50) not null,
	"password" VARCHAR(50)
);

INSERT INTO public.users
(firstname, lastname, dob, cell, email, "password")
VALUES('firstname usr1', 'lastname usr1', '01-01-2000', '1234567', 'usr1@example.com', 'password123');


select * from public.users;