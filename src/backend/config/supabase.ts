import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE;

if (!url || !serviceRole) {
  throw new Error("Url or service role is undefined");
}

const supabase = createClient(url, serviceRole);

export default supabase;
