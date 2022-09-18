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
  - [Edge Functions](#edge-functions)
    - [Managing functions](#managing-functions)
  - [SvelteKit Application](#sveltekit-application)
    - [Type Generation](#type-generation)
  - [CICD workflow](#cicd-workflow)
  - [Command Cheatsheet](#command-cheatsheet)

## Local Development

### Starting a Local Project

Login (note: there does not appear to be any way to log into a self-hosted supabases)
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

### Managing Local Database Migrations

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

You can also write your migration SQL manually. To create an empty migration file, run:
```bash
supabase migration new <migration-name>
```

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

To list migrations existing on the remote:
```bash
supabase migration list
```

> It is a bit annoying that you need to enter your database password every single time you
> run these commands. Maybe I should make a wrapper command.

If you have a seperate git branch which has a different database structure/migrations,
you will need to create a database branch OR restart the Supabase studio.
This might be a little annoying.

> Maybe I should set up CICD so that when a new branch is created, a new dev Supabase
> Studio instance is created. Might come with complications though. Question: is the UI
> the same as Supabase website or is it simplified like the Supabase local studio?

## Edge Functions

### Managing functions

Install the Deno VS Code extension and run the `Deno: Initialise Workspace Configuration` command.

```bash
supabase functions new hello-world # create code for a function
supabase functions serve hello-world # serve a single function
supabase functions deploy hello-world # deploy a single function
```

> It is literally impossible to serve more than one function
> from the local container environment :(

## SvelteKit Application

### Type Generation

```bash
supabase gen types typescript --local > lib/database.types.ts
```

## CICD workflow

## Command Cheatsheet

| Command                                                         | Description                                                                    |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `supabase login`                                                | Login to Supabase (app.supabase.com)                                           |
| `supabase init`                                                 | Create boilerplate for local project (`supabase/config.toml`)                  |
| `supabase start`                                                | Start local Supabase containers                                                |
| `supabase stop`                                                 | Stop local Supabase containers                                                 |
| `supabase db diff -f <migration-name> --use-migra`              | Pull database changes from local containers to migrations folder (SQL file)    |
| `supabase migration new <migration-name>`                       | Create an empty migration file (SQL file)                                      |
| `supabase link --project-ref <project-id>`                      | Create files to link CLI to this remote project                                |
| `supabase db reset`                                             | Clear all data and reset the local database schema to current migrations       |
| `supabase db push`                                              | Push migrations folder to the remote Supabase (app.supabase.com)               |
| `supabase db remote commit`                                     | Pull database changes from remote Supabase to the migrations folder (SQL file) |
| `supabase migration list`                                       | List migrations that exist in the remote Supabase                              |
| `supabase gen types typescript --local > lib/database.types.ts` | Generate types for                                                             |

Official workflow:
1. Setting Up
   1. Clone a git repo
   2. `supabase link --project-ref <project-id>`
   3. Make a feature branch
   4. `supabase start`
2. Database Change
   1. Make changes to the database
   2. `supabase db diff -f <migration-name> --use-migra`
   3. `supabase gen types typescript --local > lib/database.types.ts`
   4. Ensure web application still works with type changes
3. Edge Functions
   1. `supabase functions new hello-world`
   2. `supabase functions serve hello-world` (we should be able to serve all functions 😡)
   3. Write your function code
4. CICD
   1. Commit change
   2. Make a PR to merge into a staging/production branch
   3. GitHub action runs on each commit => checks that types were updated in the repo
   4. GitHub action runs on merge => deploy
   5. `supabase functions deploy hello-world` (loop over each function)
   6. `supabase link --project-ref <project-id>`
   7. `supabase db push`

Another idea for a workflow: (create full production instances for each branch)
1. Setting Up
   1. Clone a git repo
   2. `supabase link --project-ref <project-id>`
   3. Make a feature branch
   4. `supabase start`
2. CICI on new branch
   1. Creates a new Supabase project (self-hosted would be good, but does not seem very convenient)
   2. Creates a `supabase/.temp/project-ref` file which instructs the CLI what project you are o
3. Database Change
   1. Make changes to the database
   2. `supabase db remote commit`
   3. `supabase gen types typescript --db-url <database-url> > lib/database.types.ts`
   4. Ensure web application still works with type changes
4. PROBLEMS:
   1. There is no `supabase reset` command. The Supabase production instance does not allow this, and a local instance cannot be hosted in the cloud.
   2. It could also be a little bit more annoying to need to enter the database password (you previously did not need to at all)
5. BENEFITS:
   1. We have access to the full Supabase Studio settings/features
   2. We have ability to host all Supabase functions
   3. We can run it like it runs in production (although, web hooks or APIs that require specific endpoints may still break since the URLs will still be different)