create table "public"."employees" (
    "id" integer generated always as identity not null,
    "name" text
);


CREATE UNIQUE INDEX employees_pkey ON public.employees USING btree (id);

alter table "public"."employees" add constraint "employees_pkey" PRIMARY KEY using index "employees_pkey";
