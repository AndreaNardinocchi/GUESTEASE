// // npm install @supabase/supabase-js
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// export const supabase = createClient(supabaseUrl, supabaseKey);

// /**
//  * This taken from https://supabase.com/dashboard/project/mydashsboard,
//  * https://supabase.com/dashboard/project/{supabaseURL}/api
//  * but, for security purposes, I use .env
//  */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or key missing. Check .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
