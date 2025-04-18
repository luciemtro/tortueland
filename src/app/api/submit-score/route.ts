import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabase-server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { pseudo, score } = body;

  if (!pseudo || typeof score !== "number") {
    return NextResponse.json({ error: "Mauvaises données" }, { status: 400 });
  }

  const { error } = await supabaseServer
    .from("scoreboard")
    .insert({ pseudo, score_seconds: score });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
