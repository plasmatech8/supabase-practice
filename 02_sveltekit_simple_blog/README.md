# Simple SvelteKit Supabase blog

TODO: do database user profile and posts
TODO: try typescript
TODO: ? try out using a custom stores for user profile (for writing data)

## Auth

Managing auth state:
```ts
export const user = readable<User | null>(null, (set) => {
	set(supabase.auth.user());
	supabase.auth.onAuthStateChange((_, session) => set(session?.user || null));
});
```

Signing in:
```ts
const { user, error } = await supabase.auth.signIn({ email, password });
if (user) {
    goto('/app');
}
if (error) {
    errorMessage = error.message;
}
```

## Notes

### 01. Should I rely purely on supabase library or use stores?

idk, I think I will stick with using stores.

#### using library only

```svelte
<script lang="ts">
    let user = supabase.auth.user();
    supabase.auth.onAuthStateChange((_, session) => user = session.user);
</script>

{$if user}
    {user.email}
{/if}
```

Feels less bloated, but a little more code in components. Less consistent with other stores.

#### using stores

```ts
export const user = readable<User | null>(null, (set) => {
	set(supabase.auth.user());
	supabase.auth.onAuthStateChange((_, session) => set(session?.user || null));
});
```

```svelte
<script lang="ts">
    import { user } from "$/lib/stores"
</script>

{#if $user}
    {$user.email}
{/if}
```

More boilerplate in stores, but quite concise in the components.

I can also create readable stores for the user profile! It will change when auth state changes.

What if the user changes their profile settings? Then I would need to listen to database changes.
Might be better to use a writable store which also has a start function (same as readable store).
