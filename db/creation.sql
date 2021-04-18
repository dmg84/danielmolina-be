CREATE SCHEMA IF NOT EXISTS danielmolina;

create extension if not exists "uuid-ossp"
    schema public
    version '1.1';

create extension if not exists pgcrypto
    schema public
    version '1.3';

create table if not exists danielmolina.users
(
    id       uuid default public.uuid_generate_v4() not null,
    username text                                   not null,
    password text                                   not null,
    constraint users_pkey primary key (id)
)
