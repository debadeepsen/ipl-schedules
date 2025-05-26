import Schedule from "@/components/Schedule"

const SchedulePage = async ({ params }: { params: Promise<{ season: string }> }) => {
  const { season } = await params
  return (
    <Schedule season={season || (new Date().getFullYear().toString() as string)} />
  )
}

export default SchedulePage
