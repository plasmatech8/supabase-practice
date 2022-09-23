<script>
  import { user } from '$lib/sessionStore'
  import { supabase } from '$lib/supabaseClient'
  import Auth from '$lib/Auth.svelte'
  import Profile from '$lib/Profile.svelte'

  user.set(supabase.auth.user())

  supabase.auth.onAuthStateChange((_, session) => {
    session?.user && user.set(session.user)
  })
</script>

<div class="container" style="padding: 50px 0 100px 0;">
  {#if $user}
  <Profile />
  {:else}
  <Auth />
  {/if}
</div>