import { Suspense } from 'react'
import Update from '@/components/Update'

function UpdateWork() {
  return (
    <Suspense fallback={<div>Loading...</div>}>

    <Update />
  </Suspense>
  )
}

export default UpdateWork