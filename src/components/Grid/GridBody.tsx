import { MatchData } from "@/types/types"
import { getShortName } from "@/utils/utils"
import { Fragment } from "react"
import GridCell from "./GridCell"

const GridBody = ({
  teams,
  matches
}: {
  teams: string[]
  matches: MatchData[]
}) => (
  <>
    {teams.map(team => (
      <Fragment key={`${team}_row`}>
        <div className='header-cell row-header'>{getShortName(team)}</div>
        {teams.map(opponent => (
          <GridCell
            key={`${team}x${opponent}`}
            team={team}
            opponent={opponent}
            matches={matches}
          />
        ))}
      </Fragment>
    ))}
  </>
)

export default GridBody