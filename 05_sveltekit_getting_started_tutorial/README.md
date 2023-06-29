# Supabase Tutorial

- [Supabase Tutorial](#supabase-tutorial)
  - [01. Getting Started - Build a User Management App with SvelteKit](#01-getting-started---build-a-user-management-app-with-sveltekit)
    - [Project Setup](#project-setup)
    - [Build App](#build-app)
    - [Supabase Auth Helpers](#supabase-auth-helpers)

## 01. Getting Started - Build a User Management App with SvelteKit

Following:
* [Build a User Management App with SvelteKit](https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit)

### Project Setup

Create a project on the [Supabase Dashboard](https://app.supabase.com/projects)

### Build App

```bash
npm create svelte@latest .
# ┌  Welcome to SvelteKit!
# │
# ◇  Which Svelte app template?
# │  Skeleton project
# │
# ◇  Add type checking with TypeScript?
# │  Yes, using TypeScript syntax
# │
# ◇  Select additional options (use arrow keys/space bar)
# │  none
# │
# └  Your project is ready!
npm install
npm install @supabase/supabase-js
```

Create `.env` using config from Supabase Project Dashboard:
```env
PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_KEY"
```

> Note: `.env.local` will take precedence over `.env` if one exists

### Supabase Auth Helpers

Install modules:
```bash
npm install @supabase/auth-helpers-sveltekit @supabase/supabase-js
```

Setup server hooks in `src/hooks.server.ts` so auth is easily accessible from front and back-ends:
```ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  })

  /**
   * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}
```

Declare additional types in `src/app.d.ts`:
```ts
import { SupabaseClient, Session } from '@supabase/supabase-js'

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient
      getSession(): Promise<Session | null>
    }
    interface PageData {
      session: Session | null
    }
    // interface Error {}
    // interface Platform {}
  }
}
```

Create `src/routes/+layout.server.ts`:
```ts
export const load = async ({ locals: { getSession } }) => {
  return {
    session: await getSession(),
  }
}
```

Create `src/routes/+layout.ts`:
```ts
import { invalidate } from '$app/navigation'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}
```

Update `src/routes/+layout.svelte`:
```svelte
<script lang="ts">
	import '../styles.css'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="container" style="padding: 50px 0 100px 0">
	<slot />
</div>
```