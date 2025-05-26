import { getShortName } from '@/utils/utils'

const GridHeader = ({ teams }: { teams: string[] }) => (
  <>
    {teams.map(team => (
      <div key={team} className='header-cell'>
        {getShortName(team)}
      </div>
    ))}
  </>
)

export default GridHeader
