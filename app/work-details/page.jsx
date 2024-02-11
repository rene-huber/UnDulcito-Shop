import Details from '@/components/Details'
import { Suspense } from 'react'

function DetailsWork() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
   <Details />
    </Suspense>
  )
}

export default DetailsWork