# supabase-practice

Typing???:
* Edge functions
* Database reading (& writing)
* Database (RPC) functions

Hosting?:
* I have a slight desire to deploy my sveltekit app to a supabase edge function...
* Although, I think the CloudFlare CDN (CloudFlare pages) or Netlify CDN, could be a better CDN

Configuration as code:
* Can we add RLS database rules in our codebase???
* Can we add email templates in our codebase?

Migrations:
* Are migrations possible?
* Do we need to use Prisma???

Other notes:
* TypeSense or Agolia is going to have a more effective search engine

Functions:
* It is possible to use postgres as a cron server for time-based triggers (see [this](https://github.com/supabase/supabase/discussions/7646#discussioncomment-3123091)). But is there an official method?
* Are there database triggers for edge functions ???