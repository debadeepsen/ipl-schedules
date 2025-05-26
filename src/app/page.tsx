"use client";
import { MatchData, Response } from "@/types/types";
import { formatDate, getShortName } from "@/utils/utils";
import Image from "next/image";
import { useState, useEffect, Fragment } from "react";

export default function Home() {
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/2025")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}

        {!!data && (
          <div
            className="match-grid"
            style={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: `repeat(${data.teams.length + 1}, 1fr`,
            }}
          >
            <div></div>
            {data.teams.map((team) => (
              <div key={team} className="header-cell">{getShortName(team)}</div>
            ))}
            {data.teams.map((team) => (
              <Fragment key={team + "_row"}>
                <div className="header-cell">{getShortName(team)}</div>
                {data.teams.map((opponent) => (
                  <div key={team + "x" + opponent}>
                    {team === opponent ? "" : data.data.filter(e =>
                      (e.HomeTeam === team && e.AwayTeam === opponent) ||
                      (e.HomeTeam === opponent && e.AwayTeam === team)
                    ).map((match: MatchData) => (
                      <div key={'match_' + match.MatchNumber} className="mb-2">
                        {/* <Image
                          src={`/flags/${getShortName(team)}.png`}
                          alt={team}
                          width={24}
                          height={16}
                        /> */}
                        <span>
                          {formatDate(match.DateUtc)} - {match.Location}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        )}

        {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      </main>
    </div>
  );
}
