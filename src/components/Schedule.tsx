'use client'

import Dropdown from '@/components/Dropdown'
import { Response } from '@/types/types'
import { useState, useEffect } from 'react'
import GridBody from './Grid/GridBody'
import GridHeader from './Grid/GridHeader'

const currentYear = new Date().getFullYear()
const seasons = Array.from({ length: 5 }, (_, i) => {
  const year = currentYear - i
  return { value: String(year), label: String(year) }
})

const Schedule = ({ season }: { season: string }) => {
  const [data, setData] = useState<Response | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/${season}`)
        if (!res.ok) throw new Error('Network response was not ok')
        const json = await res.json()
        setData(json)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [season])

  const handleSeasonChange = (value: string) => {
    location.replace(`/schedule/${value}`)
  }

  const gridStyle = {
    display: 'grid',
    gap: 2,
    gridTemplateColumns: `120px repeat(${data?.teams.length || 0}, 1fr)`
  }

  return (
    <main className='mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between mt-8 mb-4'>
        <h1 className='text-4xl'>Indian Premier League {season} Schedule</h1>
        <Dropdown
          value={season}
          onChange={handleSeasonChange}
          options={seasons}
          placeholder='Select Season'
        />
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {data && (
        <div className='match-grid' style={gridStyle}>
          <div /> {/* Empty top-left cell */}
          <GridHeader teams={data.teams} />
          <GridBody teams={data.teams} matches={data.data} />
        </div>
      )}
    </main>
  )
}

export default Schedule
