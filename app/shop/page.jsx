import Shop from '@/components/Shop'
import { Suspense } from 'react'

function page() {
  return 
  <Suspense fallback={<div>Loading...</div>}>
  <Shop />
</Suspense>

}

export default page