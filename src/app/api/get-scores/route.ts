import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabase-server";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("scoreboard")
    .select("*")
    .order("score_seconds", { ascending: true })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
