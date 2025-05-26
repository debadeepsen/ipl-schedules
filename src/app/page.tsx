
import { redirect } from 'next/navigation'

export default function Home() {
  return redirect('/schedule/' + new Date().getFullYear().toString())
}
