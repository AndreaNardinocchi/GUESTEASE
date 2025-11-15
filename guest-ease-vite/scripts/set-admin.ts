import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

console.log("Supabase URL:", process.env.VITE_SUPABASE_URL);
console.log(
  "Service Role Key exists:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);
console.log("Starting set-admin script...");

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Supabase URL or SERVICE ROLE key missing in .env");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const USER_ID = "e46ebb95-37de-4c43-b97e-3a5c4c9e3f88";

async function setAdmin(userId: string) {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { role: "admin" },
  });

  if (error) {
    console.error("Failed to update user:");
    console.error(JSON.stringify(error, null, 2));
    process.exit(1);
  }

  console.log("User updated successfully:", data);
}

setAdmin(USER_ID);
