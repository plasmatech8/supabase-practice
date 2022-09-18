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
    - [Setup](#setup)
    - [Managing functions](#managing-functions)
    - [Security](#security)
  - [SvelteKit Application](#sveltekit-application)
    - [Type Generation](#type-generation)
  - [CICD workflow](#cicd-workflow)

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

### Setup

Make sure deno is installed
```bash
brew install deno
```
Install the Deno VS Code extension and run the `Deno: Initialise Workspace Configuration` command.

### Managing functions

```bash
supabase functions new hello-world # create code for a function
supabase functions serve hello-world # serve a single function
supabase functions deploy hello-world # deploy a single function
```

> It is literally impossible to serve more than one function
> from the local container environment :(

### Security

User details can be obtained using the Supabase client:
```ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.6";
export const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "", // exported by default when deployed
  Deno.env.get("SUPABASE_ANON_KEY") ?? "" // exported by default when deployed
);
// ...
const user = supabase.auth.user();
```

Consider using `zod` for input parameter validation.

There is currently no security policy (like RLS) for edge functions...

## SvelteKit Application

* Sveltekit
* svelte-forms-lib
* lodash
* supabase-js
* @fortawesome/fontawesome-free
* daisyui
* tailwindcss
* axios

### Type Generation

To generate types:
```bash
supabase gen types typescript --local > lib/database.types.ts
```

> The `functions` block appears to be empty. Are there plans to add input parameter validation
> and typing for edge functions? Database function too?

> There is currently no type generation tools for any other language than TS/JS

## CICD workflow
