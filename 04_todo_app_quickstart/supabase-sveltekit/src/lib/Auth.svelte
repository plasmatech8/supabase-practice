<script lang="ts">
    import { supabase } from '$lib/supabaseClient'

    let loading: boolean = false
    let email: string

    const handleLogin = async () => {
        loading = true;
        const { error } = await supabase.auth.signIn({ email });
        if (error) {
            alert(error.message);
        } else {
            alert('Check your email for the login link!');
        }
        loading = false;
    }
  </script>

  <form class="row flex-center flex" on:submit|preventDefault="{handleLogin}">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Svelte</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input
          class="inputField"
          type="email"
          placeholder="Your email"
          bind:value="{email}"
        />
      </div>
      <div>
        <input type="submit" class='button block' value={loading ? "Loading" :
        "Send magic link"} disabled={loading} />
      </div>
    </div>
  </form>