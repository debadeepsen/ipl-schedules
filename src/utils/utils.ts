export const getShortName = (team: string) => {
  if (team.startsWith("Sun")) return "SRH";
  if (team.startsWith("Pun")) return "PBKS";
  return team
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  // Get day and short month
  const dayPart = date.getDate();
  const monthPart = date
    .toLocaleDateString("en-GB", { month: "short" })
    .toUpperCase();
  return `${dayPart} ${monthPart}`;
}
