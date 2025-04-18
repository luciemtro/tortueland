import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabase-server"; // Assure-toi que supabaseServer est bien exporté

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("quotes")
      .select("text, author, created_at")
      .order("created_at", { ascending: false }); // Récupère les citations, triées par date décroissante

    if (error) {
      console.error("Erreur Supabase:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur interne:", error);
    return NextResponse.json(
      {
        error: "Une erreur s'est produite lors de la récupération des données",
      },
      { status: 500 }
    );
  }
}
