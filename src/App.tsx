import { Navbar } from '@/navigation/Navbar'
import { CustomCursor } from '@/components/CustomCursor'
import { ScrollProgress } from '@/components/ScrollProgress'
import { HomePage } from '@/pages/HomePage'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <HomePage />
    </>
  )
}
