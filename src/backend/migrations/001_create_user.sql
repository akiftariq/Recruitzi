-- drop tables
drop table if exists public.users;

-- user table
create table if not exists public.users(
id SERIAL primary key,
	firstName VARCHAR(255) not null,
	lastName VARCHAR(255) not null,
	DOB VARCHAR(50) not null,
	cell VARCHAR(50),
	email VARCHAR(50) not null unique,
	"password" VARCHAR(255) not null
);

INSERT INTO public.users
(firstname, lastname, dob, cell, email, "password")
VALUES('User1', 'User1', '01-01-2000', '12345678910', 'usr1@example.com', '$2b$10$P8.YrlzsgJ6XiOCIwwiFluUlsZEiOhW0cG3/LtSt0H1RtlC0ZbGlG');
INSERT INTO public.users
(firstname, lastname, dob, cell, email, "password")
VALUES('User2', 'User2', '01-01-2000', '12345678910', 'usr2@example.com', '$2b$10$P8.YrlzsgJ6XiOCIwwiFluUlsZEiOhW0cG3/LtSt0H1RtlC0ZbGlG');
INSERT INTO public.users
(firstname, lastname, dob, cell, email, "password")
VALUES('User3', 'User3', '01-01-2000', '12345678910', 'usr3@example.com', '$2b$10$P8.YrlzsgJ6XiOCIwwiFluUlsZEiOhW0cG3/LtSt0H1RtlC0ZbGlG');
