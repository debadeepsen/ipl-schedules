import { MatchData } from '@/types/types'
import { formatDate } from '@/utils/utils'

const GridCell = ({
  team,
  opponent,
  matches
}: {
  team: string
  opponent: string
  matches: MatchData[]
}) => {
  if (team === opponent) return <div />

  const relevantMatches = matches.filter(
    m =>
      (m.HomeTeam === team && m.AwayTeam === opponent) ||
      (m.HomeTeam === opponent && m.AwayTeam === team)
  )

  const { dayPart, monthPart } = formatDate(relevantMatches[0]?.DateUtc || '')

  return (
    <div>
      {relevantMatches.map(match => (
        <div key={`match_${match.MatchNumber}`} className='mb-2'>
          <div className='flex items-center gap-2'>
            <div className='bg-gray-500/50 p-1 px-2 rounded-md flex flex-col items-center justify-center'>
              <div className='text-sm'>{dayPart}</div>
              <div className='text-xs uppercase'>{monthPart}</div>
            </div>
            <div>{match.Location}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GridCell
