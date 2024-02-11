import React from 'react'
import { Suspense } from 'react'
import Update from '@/components/Update'

function UpdatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Update />
     </Suspense>
  )
}

export default UpdatePage