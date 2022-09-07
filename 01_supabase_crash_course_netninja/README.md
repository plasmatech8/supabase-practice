# Supabase Crash Course

Tutorial: [Supabase Crash Course](https://www.youtube.com/playlist?list=PL4cUxeGkcC9hUb6sHthUEwG7r9VDPBMKO) by The Net Ninja
Code: [Github repository](https://github.com/iamshaunjp/Supabase-Tutorial-for-Beginners/tree/starter-project/src)

Contents:
- [Supabase Crash Course](#supabase-crash-course)
  - [01. Creating a project](#01-creating-a-project)

## 01. Creating a project

Go to Subabase and create an account. Create a project with an appropriate password.

![](images/2022-09-07-22-38-20.png)

Copy the public anon API key and project URL.

![](images/2022-09-07-22-38-53.png)

Store these in a `.env` file. e.g.
```env
REACT_APP_SUPABASE_URL=ABC.com
REACT_APP_ANON_KEY=abc.123.xyz
```

Install Supabase library:
```bash
npm install @supabase/supabase-js
```

Under the API tab, there will instuctions/documentation on how to connect and do things.

Initialse a Supabase client in a module `src/config/supabaseClient.js`:
```js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://huwcariuwoamctredfhk.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
```