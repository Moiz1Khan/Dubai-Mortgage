import { NextRequest } from "next/server";
import { getSupabaseAnonServerClient } from "@/lib/supabase/server";

export async function requireAdminFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!token) {
    return { ok: false as const, response: new Response("Unauthorized", { status: 401 }) };
  }

  const supabase = getSupabaseAnonServerClient();
  const { data, error } = await supabase.auth.getUser(token);
  const user = data.user;
  if (error || !user?.email) {
    return { ok: false as const, response: new Response("Unauthorized", { status: 401 }) };
  }

  const allowedEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (allowedEmail && user.email.toLowerCase() !== allowedEmail) {
    return { ok: false as const, response: new Response("Forbidden", { status: 403 }) };
  }

  return { ok: true as const, user };
}
