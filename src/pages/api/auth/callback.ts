import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/util/supabase/api-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create authenticated Supabase Client
  const supabase = createClient(req, res);

  const code = req.query.code;

  if (typeof code === "string") {
    await supabase.auth.exchangeCodeForSession(code);
  }

  res.redirect("/");
}