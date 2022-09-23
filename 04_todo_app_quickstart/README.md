# Supabase Quickstart - SvelteKit - Todo App

Following: https://supabase.com/docs/guides/with-sveltekit

It instructs us to use app.supabase.com, but we should be able to develop locally as well
if we do `supabase db remote commit`. We also need to setup the `config.toml` with the
settings manually.

> question: are all features supported?
> * Edge functions only supports a single function
> * Is federated auth supported? Magic link auth?
> * Storage?
> It would be better if there was no difference between dev/prod servers

## 01. Project Set-Up

Go to [app.supabase.com](https://app.supabase.com) and create a new project.

Go into SQL Editor and run the `User Management Starter`

```sql
-- Create a table for Public Profiles
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  website text,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime
  add table profiles;

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update an avatar." on storage.objects
  for update with check (bucket_id = 'avatars');
```

Get API keys `URL` and `anon` key from the API page.

## 02. Building the App

Initialise a SvelteKit skeleton app.

```bash
npm init svelte@next supabase-sveltekit
cd supabase-sveltekit
npm install
npm install @supabase/supabase-js
```

Create a `.env` file.

```env
VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_KEY"
```

Create a Supabase client object.
