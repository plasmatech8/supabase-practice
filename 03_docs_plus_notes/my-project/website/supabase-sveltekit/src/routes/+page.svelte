<script lang="ts">
    import { createClient } from '@supabase/supabase-js'
    import type { Database } from "./database.types"

    const supabaseUrl = "http://localhost:54321";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs";

    const supabase = createClient<Database>(supabaseUrl, supabaseKey);

    async function hello(){
        // Try out intellisense/autocomplete here
        const { data, error } = await supabase.from("employees").select("*, comp:company(*)").eq("id", 1).single();
        console.log(data?.comp, error);
    }

    const queryList = [
        {
            query: supabase.from("employees").select("*, company(*)").eq("id", 1).single(),
            text: `supabase.from("employees").select("*, company(*)").eq("id", 1).single() - get employee with company - employee references company`
        },
        {
            query: supabase.from("employees").select("*, comp:company(*)").eq("id", 1).single(),
            text: `supabase.from("employees").select("*, comp:company(*)").eq("id", 1).single() - same except with different alias for company`
        },
        {
            query: supabase.from("employees").select("*, comp:company_id(*)").eq("id", 1).single(),
            text: `supabase.from("employees").select("*, comp:company_id(*)").eq("id", 1).single() - same, but make sure it does a specific ID in case we have multiple references to the same table`
        },
        {
            query: supabase.from("company").select("*, employees(*)").eq("id", 1),
            text: `supabase.from("company").select("*, employees(*)").eq("id", 1) - get company with employee/s - employee references company`
        },
        {
            query: supabase.from("employees").select("*, company(*), profile(*)").eq("id", 1).single(),
            text: `supabase.from("employees").select("*, company(*), profile(*)").eq("id", 1).single() - get employee with company and profile - profile references user`
        },
        {
            query: supabase.from("profile").select("*, employees(*)").eq("id", 1),
            text: `supabase.from("profile").select("*, employees(*)").eq("id", 1) - get profile with employee`
        },
        {
            query: supabase.from("employees").select("*, profile(*)").eq("id", 1),
            text: `supabase.from("employees").select("*, profile(*)").eq("id", 1)`
        }
    ]

    async function doQuery(query: PromiseLike<any>){
        const { data, error } = await query;
        return JSON.stringify(data || error, null, 4)
    }

</script>

<h1>Welcome to SvelteKit</h1>

{#each queryList as item}
<pre>
{item.text}
{#await doQuery(item.query)}Loading...{:then ouput}{ouput}{/await}
</pre>
    <hr>
{/each}
