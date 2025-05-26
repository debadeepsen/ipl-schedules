import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { MatchData } from "@/types/types";

export async function GET(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const season = pathname.replace("/api/", "");

  try {
    // Define the path to your JSON files
    const filePath = path.join(process.cwd(), "src", "data", `${season}.json`);

    // Read and parse the file
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent) as MatchData[];
    const leagueMatches = data.filter((d) => d.HomeTeam !== "To be announced");
    const teams = [...new Set(leagueMatches.map((item) => item.HomeTeam))].flat().sort();

    return NextResponse.json({
      data: leagueMatches.toSorted((a, b) => {
        if (a.HomeTeam === b.HomeTeam) {
          return a.MatchNumber - b.MatchNumber;
        }
        return a.HomeTeam.localeCompare(b.HomeTeam);
      }),
      teams,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "File not found or invalid JSON" },
      { status: 404 }
    );
  }
}
