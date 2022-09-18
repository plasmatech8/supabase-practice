# Supabase Docs: todo app plus workflow

[SvelteKit guide](https://supabase.com/docs/guides/with-sveltekit)

[Local development guide](https://supabase.com/docs/guides/cli/local-development)

[CICD workflow guide](https://supabase.com/docs/guides/cli/cicd-workflow)

- [Supabase Docs: todo app plus workflow](#supabase-docs-todo-app-plus-workflow)
  - [Local Development](#local-development)
  - [Remote Deployment (& Linkage)](#remote-deployment--linkage)
  - [SvelteKit Application](#sveltekit-application)
  - [CICD workflow](#cicd-workflow)

## Local Development

Login
```bash
supabase login
```

Create project
```bash
mkdir my-project
cd my-project
supabase init
```

Start Supabase local containers (make sure docker is running)
```bash
supabase start
```

This might take a while.

From then, you can see the URLs for API, DB, Studio, Inbucket, and anon/service_role keys.

The Studio UI is held under http://localhost:54323

The default project is connected.

> It is worth noting that most settings are located under `config.toml` and are not
> available in the studio UI. (e.g. auth settings, )

You can create database changes in the studio UI (SQL or manually, storage yet, urls, etc).

```sql
create table employees (
    id integer primary key generated always as identity,
    name text
);

insert into public.employees (name)
values
  ('Erlich Backman'),
  ('Richard Hendricks'),
  ('Monica Hall');
```

Then, to create a migrations file you can run:
```bash
supabase db diff -f create_employees --use-migra # migra makes it faster & more concise
```

And to reset the database to current migrations, you can run:
```bash
supabase db reset
```
(this will delete all your data)


## Remote Deployment (& Linkage)

Create a project and link it by using the command:
```bash
supabase link --project-ref <project-id>
```

## SvelteKit Application

## CICD workflow