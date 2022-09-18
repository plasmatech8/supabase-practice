# Notes & Commentary

About the Supabase DX.

- [Notes & Commentary](#notes--commentary)
  - [Command Cheatsheet](#command-cheatsheet)
  - [Workflow notes & suggestions](#workflow-notes--suggestions)
  - [CLI notes & suggestions](#cli-notes--suggestions)

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

## Workflow notes & suggestions

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
* PROBLEMS
   * There is no `supabase reset` command. The Supabase production instance does not allow this, and a local instance cannot be hosted in the cloud.
   * It could also be a little bit more annoying to need to enter the database password (you previously did not need to at all)
   * The CLI does not support self-hosted instances (!!!?)
* BENEFITS:
   * We have access to the full Supabase Studio settings/features
   * We have ability to host all Supabase functions
   * We can run it like it runs in production (although, web hooks or APIs that require specific endpoints may still break since the URLs will still be different)

I would really like it if the local Supabase instance provided access to all settings/features.

And all of these settings (auth settings, email settings, etc) could be automatically added
to `supabase/config.toml` or `supabase/config/email-template.html` when a command is executed.
(e.g. config diffs `supabase config diff`, or possibly a universal command).

Or the config can be included in database migrations, idk.

## CLI notes & suggestions

Problems with the current CLI (concistency + intuitivity):
* There are 3 different ways to create migrations files
  * `supabase migration new <migration-name>` make an empty migration
  * `supabase db diff -f <migration-name> --use-migra` pull from local
  * `supabase db remote commit` commit and pull from remote
* Unable to do serve/deploy multiple edge functions at once
  * `supabase functions deploy/serve <can-only-do-one>`
* Consistency
  * `supabase functions create` vs `supabase migrations new`
  * `supabase migration list` vs `supabase db remote changes`
* Remote vs local
  * `supabase db reset` vs `supabase db push`
  * `supabase db push` vs `supabase db reset`
  * `supabase functions serve` vs `supabase functions deploy`
  * It should be more intuitive describing remote vs local interactions

Command structure ideas:
```bash
supabase init
supabase start  # (starts containers + starts all edge functions)
supabase stop
supabase reset  # (reset to current migrations instead of using db subcommand)

supabase migration new -f <migration-name>
supabase migration diff -f <migration-name>

supabase gen types typescript
supabase functions create

# All interactions related to remote are under the remote subcommand

supabase remote login  # (should allow linkage to self-hosted instance too)
supabase remote link   # (should allow linkage to self-hosted instance too)
supabase remote migration push
supabase remote migration commit -f <migration-name>
supabase remote migration list
```
```bash
# ... etc
supabase migration new
supabase migration diff
supabase migration push # push to remote
supabase migration pull # commit and pull from remote

supabase functions new
supabase functions deploy # push to remote
```
```bash
# ... etc
supabase start
supabase stop
supabase reset

# Defaults to --local, use --remote for managing remote

supabase migration new
supabase migration diff --remote # (eq. to remote commit when using --remote)
supabase migration push --remote
supabase migration pull --remote

supabase functions new
supabase functions push --remote

supabase config push --remote
supabase config pull --remote
```