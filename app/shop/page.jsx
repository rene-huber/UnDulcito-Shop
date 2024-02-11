import Shop from '@/components/Shop'
import { Suspense } from 'react'

function Store() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
   <Shop />
     </Suspense>
  )
}

export default Store