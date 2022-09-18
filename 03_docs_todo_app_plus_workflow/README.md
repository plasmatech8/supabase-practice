# Supabase Docs: todo app plus workflow

[SvelteKit guide](https://supabase.com/docs/guides/with-sveltekit)

[Local development guide](https://supabase.com/docs/guides/cli/local-development)

[CICD workflow guide](https://supabase.com/docs/guides/cli/cicd-workflow)

- [Supabase Docs: todo app plus workflow](#supabase-docs-todo-app-plus-workflow)
  - [Local Development](#local-development)
    - [Starting a Local Project](#starting-a-local-project)
  - [Managing Local Database Migrations](#managing-local-database-migrations)
  - [Remote Development](#remote-development)
    - [Linking a Remote Project](#linking-a-remote-project)
    - [Syncing Remote and Local Migrations](#syncing-remote-and-local-migrations)
  - [SvelteKit Application](#sveltekit-application)
    - [Type Generation](#type-generation)
  - [CICD workflow](#cicd-workflow)

## Local Development

### Starting a Local Project

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

This will create a `supabase` folder and `supabase/config.toml`

Start Supabase local containers (make sure docker is running)
```bash
supabase start
```

This might take a while.

From then, you can see the URLs for API, DB, Studio, Inbucket, and anon/service_role keys.

The Studio UI is held under http://localhost:54323

The default project is connected.

> It is worth noting that most settings are located under `config.toml` and are not
> available in the studio UI. (e.g. auth settings, storage, etc)
> TODO: write a section about the configuration of other settings not related to the database

## Managing Local Database Migrations

You can create database changes in the studio UI using the SQL editor,
or manually change it using visual the table editor.

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

This will create a `supabase/migrations/<timestamp>_create_employees.sql` file.

And to reset the database to current migrations, you can run:
```bash
supabase db reset
```
(this will delete all your data)

## Remote Development

### Linking a Remote Project

Create a project and link it by using the command:
```bash
supabase link --project-ref <project-id>
```

This will create a `supabase/.branches` folder and `supabase/.temp/project-ref` file.

### Syncing Remote and Local Migrations

Push local migrations:
```bash
supabase db push
```

This will run migrations and keeps the existing data intact.

Commit remote changes and pull to your migrations folder:
```bash
supabase db remote commit
```

This will create a `supabase/migrations/<timestamp>_remote_commit.sql` file.

> It is a bit annoying that you need to enter your database password every single time you
> run these commands. Maybe I should make a wrapper command.

If you have a seperate git branch which has a different database structure/migrations,
you will need to create a database branch OR restart the Supabase studio.
This might be a little annoying.

> Maybe I should set up CICD so that when a new branch is created, a new dev Supabase
> Studio instance is created.

## SvelteKit Application

### Type Generation

```bash
supabase gen types typescript --local > lib/database.types.ts
```

## CICD workflow